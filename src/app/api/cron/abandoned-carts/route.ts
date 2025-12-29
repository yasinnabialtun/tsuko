import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/email';
import { getAbandonedCartEmailHtml } from '@/lib/email-templates';

export async function GET(request: Request) {
    // Secret protection
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (key !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Find orders that are:
        // 1. Status = PENDING
        // 2. Payment Status = UNPAID
        // 3. Created between 2 and 24 hours ago
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const abandonedOrders = await prisma.order.findMany({
            where: {
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                createdAt: {
                    lte: twoHoursAgo,
                    gte: twentyFourHoursAgo
                },
                // Add a flag or check if already emailed if necessary, 
                // but for now we'll just send once.
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        let sentCount = 0;
        for (const order of abandonedOrders) {
            const html = getAbandonedCartEmailHtml({
                customerName: order.customerName,
                orderNumber: order.orderNumber,
                items: order.items.map(item => ({
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.price.toString(),
                    image: item.product.images[0]
                }))
            });

            await resend.emails.send({
                from: `Tsuko Design <${process.env.RESEND_SENDER_EMAIL}>`,
                to: [order.customerEmail],
                subject: 'Sepetinizde bir şeyler kaldı! 🛒',
                html
            });
            sentCount++;
        }

        return NextResponse.json({ success: true, sent: sentCount });

    } catch (error) {
        console.error('Abandoned cart cron error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
