import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { sendDiscordNotification } from '@/lib/notifications';

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

                // Optionally deduct from base product total stock if tracking aggregate
                // await prisma.product.update({ ... stock: { decrement: ... } }) 
            } else {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }
        }

        // 2.2 Increment Coupon Usage
        if (discountAmount > 0 && couponCode) {
            await prisma.coupon.update({
                where: { code: couponCode.toUpperCase() },
                data: { usedCount: { increment: 1 } }
            });
        }

        // 3. Prepare Shopier Form or Mock Response
        if (!SHOPIER_API_KEY || !SHOPIER_API_SECRET) {
            console.warn('Shopier credentials missing. Mocking success.');

            // AUTO-COMPLETE for Dev
            const updatedOrder = await prisma.order.update({
                where: { id: order.id },
                data: { paymentStatus: 'PAID', status: 'PREPARING' },
                include: { items: { include: { product: true } } }
            });

            // Send Email
            await sendOrderConfirmationEmail(updatedOrder);

            // Send Discord Notification
            await sendDiscordNotification({
                orderNumber: updatedOrder.orderNumber,
                totalAmount: updatedOrder.totalAmount.toString(),
                customerName: updatedOrder.customerName
            });

            // Mock response for dev
            return NextResponse.json({
                mock: true,
                message: 'Mock Payment Success (Dev Mode)',
                orderId: order.orderNumber
            });
        }

        // Shopier Integration
        const combinedProductName = productNames.join(', ');
        const formattedAmount = finalAmount.toFixed(2);

        const formData = {
            API_key: SHOPIER_API_KEY,
            website_index: SHOPIER_WEBSITE_INDEX,
            platform_order_id: order.orderNumber,
            product_name: combinedProductName, // Aggregated names
            product_type: 1, // Physical
            buyer_name: customer.firstName,
            buyer_surname: customer.lastName,
            buyer_email: customer.email,
            buyer_phone: customer.phone,
            buyer_address_line1: customer.address,
            buyer_city: customer.city,
            buyer_country: 'Turkiye',
            buyer_postcode: customer.zipCode || '00000',
            product_count_of_packages: 1,
            amount: formattedAmount,
            currency: 0, // TRY
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
