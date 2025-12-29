import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const recentOrders = await prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                customerName: true,
                createdAt: true,
                items: {
                    take: 1,
                    select: {
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

        const formattedOrders = recentOrders.map(order => {
            const firstName = order.customerName.split(' ')[0];
            const productName = order.items[0]?.product?.name || 'Harika bir ürün';
            const productImage = order.items[0]?.product?.images?.[0] || '/images/hero.png';

            // Randomly pick a Turkish city if we don't store it in a single field easily
            // In a real app, you'd parse shippingAddress or have a city field
            const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir', 'Muğla'];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];

            // Time calculation
            const diff = Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 60000);
            let timeStr = 'Az önce';
            if (diff > 0) {
                if (diff < 60) timeStr = `${diff} dakika önce`;
                else if (diff < 1440) timeStr = `${Math.floor(diff / 60)} saat önce`;
                else timeStr = `${Math.floor(diff / 1440)} gün önce`;
            }

            return {
                id: order.id,
                name: firstName,
                location: randomCity,
                product: productName,
                image: productImage,
                time: timeStr
            };
        });

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error('Public orders fetch error:', error);
        return NextResponse.json([], { status: 500 });
    }
}
