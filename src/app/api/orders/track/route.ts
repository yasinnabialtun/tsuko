import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
        return NextResponse.json({ error: 'Sipariş numarası gerekli' }, { status: 400 });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { orderNumber: orderNumber.toUpperCase() },
            select: {
                orderNumber: true,
                status: true,
                paymentStatus: true,
                createdAt: true,
                trackingNumber: true,
                carrier: true,
                customerName: true,
                items: {
                    select: {
                        product: {
                            select: { name: true }
                        },
                        quantity: true
                    }
                }
            } as any
        });

        if (!order) {
            return NextResponse.json({ error: 'Sipariş bulunamadı' }, { status: 404 });
        }

        // Mask customer name for privacy (e.g. Y**** A****)
        const maskName = (name: string) => {
            return name.split(' ').map(part => part[0] + '*'.repeat(part.length - 1)).join(' ');
        };

        return NextResponse.json({
            ...order,
            customerName: maskName((order as any).customerName)
        });
    } catch (error) {
        console.error('Tracking API error:', error);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
