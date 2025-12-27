
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Log webhook payload for debug
        console.log('Shopier Webhook Received:', Object.fromEntries(formData));

        const orderId = formData.get('platform_order_id') as string;
        const error = formData.get('error'); // Shopier sends error if failed

        if (!orderId) {
            return NextResponse.json({ error: 'No Order ID' }, { status: 400 });
        }

        // If error param exists and is not empty, payment failed
        if (error) {
            console.warn(`Payment failed for order ${orderId}: ${error}`);

            // Optional: Restore stock here if payment failed
            // await restoreStock(orderId);

            return NextResponse.json({ message: 'Payment failed logged' });
        }

        const order = await prisma.order.findUnique({
            where: { orderNumber: orderId },
            include: { items: { include: { product: true } } }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Idempotency Check
        if (order.paymentStatus === 'PAID') {
            return NextResponse.json({ message: 'Already processed' });
        }

        // 1. Update Order to PAID
        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: 'PREPARING',
                paymentStatus: 'PAID',
            },
            include: { items: { include: { product: true } } }
        });

        // 2. Send Email
        // Run in background (fire and forget) to reply fast to Shopier
        sendOrderConfirmationEmail(updatedOrder).catch(e => console.error('Email fail', e));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
    }
}
