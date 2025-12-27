import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderNumber = searchParams.get('orderNumber');

        if (!orderNumber) {
            return NextResponse.json(
                { error: 'Sipariş numarası gereklidir.' },
                { status: 400 }
            );
        }

        const order = await prisma.order.findUnique({
            where: { orderNumber },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                images: true
                            }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json(
                { error: 'Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.' },
                { status: 404 }
            );
        }

        // Format order for response (hide sensitive data)
        const formattedOrder = {
            orderNumber: order.orderNumber,
            status: order.status,
            customerName: order.customerName.split(' ')[0] + ' ' + order.customerName.split(' ').slice(1).map((n: string) => n[0] + '***').join(' '),
            createdAt: order.createdAt.toISOString(),
            totalAmount: order.totalAmount.toString(),
            trackingNumber: order.trackingNumber,
            items: order.items.map((item: any) => ({
                name: item.product?.name || 'Ürün',
                quantity: item.quantity,
                price: item.price.toString()
            }))
        };

        return NextResponse.json({ order: formattedOrder });
    } catch (error) {
        console.error('Order tracking error:', error);
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}
