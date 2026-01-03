
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderId');

    if (!orderNumber) {
        return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { orderNumber },
            select: {
                paymentStatus: true,
                status: true,
                totalAmount: true
            }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({
            isPaid: order.paymentStatus === 'PAID',
            status: order.status
        });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
