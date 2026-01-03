
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * CRON JOB: Cleanup abandoned/pending orders and restore stock
 * Run this every hour via Vercel Cron or similar
 */
export async function GET(request: Request) {
    // Basic Security: Check for Cron Secret
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        // 1. Find PENDING & UNPAID orders older than 1 hour
        const abandonedOrders = await prisma.order.findMany({
            where: {
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                createdAt: { lt: oneHourAgo }
            },
            include: {
                items: true
            }
        });

        if (abandonedOrders.length === 0) {
            return NextResponse.json({ message: 'No abandoned orders to cleanup' });
        }

        console.log(`Cleaning up ${abandonedOrders.length} abandoned orders...`);

        // 2. Process each order: Restore stock and cancel
        for (const order of abandonedOrders) {
            // Restore stock for each item
            for (const item of order.items) {
                if (item.variantId) {
                    await prisma.productVariant.update({
                        where: { id: item.variantId },
                        data: { stock: { increment: item.quantity } }
                    });
                } else {
                    await prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: { increment: item.quantity } }
                    });
                }
            }

            // Mark order as CANCELLED
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: 'CANCELLED',
                    notes: 'Sistem tarafından otomatik iptal (Ödeme tamamlanmadı).'
                }
            });
        }

        return NextResponse.json({
            success: true,
            cleanedCount: abandonedOrders.length
        });

    } catch (error: any) {
        console.error('Cleanup Cron Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
