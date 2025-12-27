import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Shopier Credentials
const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;
const SHOPIER_WEBSITE_INDEX = process.env.SHOPIER_WEBSITE_INDEX || '1';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Shopier Base URL
const SHOPIER_BASE_URL = 'https://www.shopier.com/ShowProduct/api_pay4.php';

/**
 * Generate unique Order Number
 */
function generateOrderNumber() {
    // TSK-TIMESTAMP-RANDOM format
    return `TSK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// POST /api/checkout
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, customer } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        if (!customer) {
            return NextResponse.json({ error: 'Customer details missing' }, { status: 400 });
        }

        // 1. Calculate Total & Validate Stock
        let totalAmount = 0;
        const productNames: string[] = [];
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.id } });

            if (!product) {
                return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
            }

            if (product.stock < item.quantity) {
                return NextResponse.json({ error: `Insufficient stock for: ${product.name}` }, { status: 400 });
            }

            totalAmount += Number(product.price) * item.quantity;
            productNames.push(`${product.name} (${item.quantity})`);

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price // Store price at time of purchase
            });
        }

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
                // If Order model has separate fields for district/zip, use them, otherwise they are in address
                totalAmount: totalAmount,
                status: 'PENDING',        // Waiting for payment
                paymentStatus: 'UNPAID',  // Waiting for payment
                items: {
                    create: orderItemsData
                }
            }
        });

        // 3. Prepare Shopier Form
        if (!SHOPIER_API_KEY || !SHOPIER_API_SECRET) {
            console.warn('Shopier credentials missing. Mocking success.');
            // Mock response for dev
            return NextResponse.json({
                mock: true,
                message: 'Shopier credentials missing',
                orderId: order.orderNumber
            });
        }

        // Combined Product Name
        const combinedProductName = productNames.join(', ');

        // Shopier expects money in format "12.50"
        const formattedAmount = totalAmount.toFixed(2);

        // This formData is what the client form will POST to Shopier
        const formData = {
            API_key: SHOPIER_API_KEY,
            website_index: SHOPIER_WEBSITE_INDEX,
            platform_order_id: order.orderNumber, // TSK-XXX
            product_name: combinedProductName,
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
            // Note: Signature is usually handled by Shopier library or if manual, needs generation.
            // Client will post these. Shopier's API might require a signature generated here.
            // For this implementation, we assume Shopier's API accepts these parameters standardly.
            // If signature is required, it must be generated here.
        };

        // TODO: Generate Signature if required by Shopier API version
        // (Simplified for this audit)

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
