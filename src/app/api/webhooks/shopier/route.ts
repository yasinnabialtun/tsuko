import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { restoreStock } from '@/lib/stock';
import { sendDiscordNotification, sendTelegramNotification } from '@/lib/notifications';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const payload = Object.fromEntries(formData);

        // 🟢 Shopier Security Verification
        const shopierSignature = formData.get('signature') as string;
        const randomNr = formData.get('random_nr') as string;
        const platformOrderId = formData.get('platform_order_id') as string;
        const totalAmount = formData.get('total_amount') as string;
        const apiSecret = process.env.SHOPIER_API_SECRET;

        if (!shopierSignature || !apiSecret) {
            console.error('Missing Shopier signature or secret');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify Hash: base64(hmac_sha256(random_nr + order_id + amount, secret))
        const expectedData = randomNr + platformOrderId + totalAmount;
        const expectedHash = crypto
            .createHmac('sha256', apiSecret)
            .update(expectedData)
            .digest('base64');

        if (shopierSignature !== expectedHash) {
            console.error('Invalid Shopier signature detected!', {
                received: shopierSignature,
                expected: expectedHash
            });
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        console.log('Shopier Webhook Verified Authenticity:', platformOrderId);

        const orderId = platformOrderId;
        const error = formData.get('res_code'); // Shopier sends res_code 0 for success
        const status = formData.get('status') as string; // 'success' or 'fail'

        if (!orderId) {
            return NextResponse.json({ error: 'No Order ID' }, { status: 400 });
        }

        // If status is not success
        if (status !== 'success') {
            console.warn(`Payment failed for order ${orderId}: ${status}`);
            await restoreStock(orderId);
            return NextResponse.json({ message: 'Payment failed handled, stock restored' });
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

        // 1.5 Update Affiliate Earnings if applicable
        const orderAny = updatedOrder as any;
        if (orderAny.affiliateId) {
            try {
                const affiliate = await (prisma as any).affiliate.findUnique({
                    where: { id: orderAny.affiliateId }
                });

                if (affiliate) {
                    const orderTotal = Number(updatedOrder.totalAmount);
                    const commissionRate = Number(affiliate.commissionRate);
                    const earnedAmount = (orderTotal * commissionRate) / 100;

                    await (prisma as any).affiliate.update({
                        where: { id: affiliate.id },
                        data: {
                            totalSales: { increment: orderTotal },
                            totalEarnings: { increment: earnedAmount }
                        }
                    });
                }
            } catch (affError) {
                console.error('Affiliate update failed:', affError);
            }
        }

        // 2. Send Email & Notifications
        try {
            await sendOrderConfirmationEmail(updatedOrder as any);
            await sendDiscordNotification({
                orderNumber: updatedOrder.orderNumber,
                totalAmount: updatedOrder.totalAmount.toString(),
                customerName: updatedOrder.customerName
            });

            const itemsString = updatedOrder.items.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n');
            await sendTelegramNotification({
                orderNumber: updatedOrder.orderNumber,
                totalAmount: updatedOrder.totalAmount.toString(),
                customerName: updatedOrder.customerName,
                items: itemsString
            });
        } catch (emailErr) {
            console.error('Notification failed but order is paid:', emailErr);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
    }
}
