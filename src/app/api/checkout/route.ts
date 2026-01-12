import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { sendDiscordNotification, sendTelegramNotification } from '@/lib/notifications';
import * as crypto from 'crypto';

// Shopier Credentials
const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;
const SHOPIER_WEBSITE_INDEX = process.env.SHOPIER_WEBSITE_INDEX || '1';

// Shopier Base URL
const SHOPIER_BASE_URL = 'https://www.shopier.com/ShowProduct/api_pay4.php';

/**
 * Generate unique Order Number
 */
function generateOrderNumber() {
    // TS-TIMESTAMP-RANDOM format for scalability
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TS-${timestamp}-${random}`;
}

// POST /api/checkout
export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const body = await request.json();
        const { items, customer, couponCode } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        if (!customer) {
            return NextResponse.json({ error: 'Customer details missing' }, { status: 400 });
        }

        // 1. Calculate Total & Validate Stock (Platform Scale Logic)
        let totalAmount = 0;
        const productNames: string[] = [];
        const orderItemsData = [];

        for (const item of items) {
            // Find Product Base
            const product = await prisma.product.findUnique({ where: { id: item.id } });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
            }

            let finalPrice = Number(product.price);
            let checkStock = product.stock;
            let productName = product.name;

            // Handle Variant Logic
            if (item.variantId) {
                const variant = await prisma.productVariant.findUnique({
                    where: { id: item.variantId }
                });

                if (!variant) {
                    return NextResponse.json({ error: `Variant not found: ${item.id}` }, { status: 400 });
                }

                // Override with Variant data
                finalPrice = Number(variant.price);
                checkStock = variant.stock;
                productName = `${product.name} (${variant.title})`; // e.g. "Vase (Red)"
            }

            // Stock Check
            if (checkStock < item.quantity) {
                return NextResponse.json({ error: `Insufficient stock for: ${productName}` }, { status: 400 });
            }

            totalAmount += finalPrice * item.quantity;
            productNames.push(`${productName} x${item.quantity}`);

            orderItemsData.push({
                productId: product.id,
                variantId: item.variantId || null, // Store variant link
                quantity: item.quantity,
                price: finalPrice
            });
        }

        // Apply Coupon if exists
        let discountAmount = 0;
        if (couponCode) {
            const coupon = await prisma.coupon.findUnique({
                where: { code: couponCode.toUpperCase() }
            });

            if (coupon && coupon.isActive) {
                // Determine Validity
                const now = new Date();
                const validDate = (!coupon.startDate || coupon.startDate <= now) &&
                    (!coupon.endDate || coupon.endDate >= now);
                const validLimit = !coupon.usageLimit || coupon.usedCount < coupon.usageLimit;
                const validMin = (!coupon.minAmount || totalAmount >= Number(coupon.minAmount));

                if (validDate && validLimit && validMin) {
                    const val = Number(coupon.discountValue);
                    if (coupon.discountType === 'PERCENTAGE') {
                        discountAmount = (totalAmount * val) / 100;
                    } else {
                        discountAmount = val;
                    }
                }
            }
        }

        // Final Amount calculation
        const finalAmount = Math.max(0, totalAmount - discountAmount);

        // 2. Create Order in DB (PENDING)
        const orderNumber = generateOrderNumber();
        const fullAddress = `${customer.address}, ${customer.district}, ${customer.city}, ${customer.zipCode}`;

        // Check for Affiliate Link
        // Check for Affiliate Link
        let affiliateId = null;
        if (couponCode && (prisma as any).affiliate) {
            try {
                const affiliate = await (prisma as any).affiliate.findUnique({
                    where: { code: couponCode.toUpperCase() }
                });
                if (affiliate && affiliate.isActive) {
                    affiliateId = affiliate.id;
                }
            } catch (e) {
                console.warn('Affiliate check failed, skipping:', e);
            }
        }

        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingAddress: fullAddress,
                city: customer.city,
                totalAmount: finalAmount,
                discountAmount: discountAmount,
                couponCode: discountAmount > 0 ? couponCode.toUpperCase() : null,
                userId: userId || null,
                status: 'PENDING',        // Waiting for payment
                paymentStatus: 'UNPAID',  // Waiting for payment
                // @ts-ignore
                // affiliateId: affiliateId, // Link to affiliate (Disabled until Prisma Client update)
                items: {
                    create: orderItemsData
                }
            }
        });

        // 2.1 Deduct Stock Logic (Multi-level)
        for (const item of orderItemsData) {
            if (item.variantId) {
                await prisma.productVariant.update({
                    where: { id: item.variantId },
                    data: { stock: { decrement: item.quantity } }
                });
            } else {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }
        }

        // 2.2 Increment Coupon Usage & Update Affiliate Stats (Optimistic for now, or should wait for payment?)
        // Let's increment Coupon usage here as intent. 
        // For Affiliate Stats, we should ideally wait for Payment Success. 
        // But for "create order" flow, we just link it.
        // We will update Affiliate Stats in the Webhook when Payment is PAID.

        if (discountAmount > 0 && couponCode) {
            await prisma.coupon.update({
                where: { code: couponCode.toUpperCase() },
                data: { usedCount: { increment: 1 } }
            });
        }


        // 3. Prepare Shopier Form or Mock Response
        if (!SHOPIER_API_KEY || !SHOPIER_API_SECRET) {
            // 🛡️ CRITICAL: SECURITY GUARD
            if (process.env.NODE_ENV === 'production') {
                console.error('CRITICAL: Shopier credentials missing in production!');
                return NextResponse.json({ error: 'Ödeme sistemi şu an devredışı. Lütfen yönetici ile iletişime geçin.' }, { status: 500 });
            }

            console.warn('Shopier credentials missing. Mocking success for development.');

            // AUTO-COMPLETE for Dev
            const updatedOrder = await prisma.order.update({
                where: { id: order.id },
                data: { paymentStatus: 'PAID', status: 'PREPARING' },
                include: { items: { include: { product: true } } }
            });

            // Send Email & Notifications (Dry Run in Dev)
            try {
                await sendOrderConfirmationEmail(updatedOrder as any);
                const itemsString = updatedOrder.items.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n');
                await Promise.all([
                    sendDiscordNotification({
                        orderNumber: updatedOrder.orderNumber,
                        totalAmount: updatedOrder.totalAmount.toString(),
                        customerName: updatedOrder.customerName
                    }),
                    sendTelegramNotification({
                        orderNumber: updatedOrder.orderNumber,
                        totalAmount: updatedOrder.totalAmount.toString(),
                        customerName: updatedOrder.customerName,
                        items: itemsString
                    })
                ]);
            } catch (notifyErr) {
                console.error('Dev notifications failed:', notifyErr);
            }

            return NextResponse.json({
                mock: true,
                message: 'Mock Payment Success (Dev Mode)',
                orderId: order.orderNumber
            });
        }

        // Shopier Integration
        const combinedProductName = productNames.join(', ').substring(0, 95); // Limit length
        const formattedAmount = finalAmount.toFixed(2);

        // Generate Random Number and Signature
        // Signature = Base64(SHA256(identity + random_nr + secret)) ?
        // Standard Shopier Payload Signature Logic:
        // 1. Generate random number
        // 2. Concatenate values in SPECIFIC ORDER
        // 3. Append Secret
        // 4. SHA256 -> Base64

        const random_nr = Math.floor(Math.random() * 999999 + 100000);

        // These fields must match exactly the order Shopier expects for the hash
        // It's usually: API_KEY + website_index + platform_order_id + amount + currency + product_name + product_type + buyer_name + buyer_surname + buyer_email + buyer_account_age + buyer_id_nr + buyer_phone + billing_address + billing_city + billing_country + billing_postcode + shipping_address + shipping_city + shipping_country + shipping_postcode + random_nr + SECRET

        // We are using the Simplified integration or API integration? 
        // With "api_pay4.php" usually we send parameters and Shopier handles it if we send key?
        // Wait, if we use the API method, we MUST send 'signature'.
        // If we use the 'Button' method, we don't.
        // But preventing Error 500 (Installation error) often means bad data.
        // Let's implement the signature.

        // Sanitize string fields to prevent signature mismatch
        const sanitize = (str: string) => str.replace(/[\n\r]/g, ' ').trim();
        const billingAddress = sanitize(customer.address);
        const shippingAddress = sanitize(customer.address);

        const argsForSignature = [
            SHOPIER_API_KEY,
            SHOPIER_WEBSITE_INDEX,
            order.orderNumber,
            customer.firstName,
            customer.lastName,
            customer.email,
            customer.phone,
            billingAddress,
            customer.city,
            'Turkiye',
            customer.zipCode || '00000',
            shippingAddress,
            customer.city,
            'Turkiye',
            customer.zipCode || '00000',
            formattedAmount,
            '0', // currency
            combinedProductName,
            '1', // product_type
            random_nr,
            SHOPIER_API_SECRET
        ];

        const signatureString = argsForSignature.map(val => String(val)).join('');
        const signature = crypto.createHash('sha256').update(signatureString).digest('base64');

        const formData = {
            API_key: SHOPIER_API_KEY,
            website_index: SHOPIER_WEBSITE_INDEX,
            platform_order_id: order.orderNumber,
            product_name: combinedProductName,
            product_type: 1,
            buyer_name: customer.firstName,
            buyer_surname: customer.lastName,
            buyer_email: customer.email,
            buyer_account_age: 0,
            buyer_id_nr: '11111111111',
            buyer_phone: customer.phone,
            billing_address: billingAddress,
            billing_city: customer.city,
            billing_country: 'Turkiye',
            billing_postcode: customer.zipCode || '00000',
            shipping_address: shippingAddress,
            shipping_city: customer.city,
            shipping_country: 'Turkiye',
            shipping_postcode: customer.zipCode || '00000',
            amount: formattedAmount,
            currency: 0,
            random_nr: String(random_nr),
            signature: signature,
            modul_version: '1.0.4',
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/shopier`,
            back_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?orderId=${order.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?orderId=${order.orderNumber}`
        };

        return NextResponse.json({
            success: true,
            action: 'post_form',
            url: SHOPIER_BASE_URL,
            formData
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
    }
}
