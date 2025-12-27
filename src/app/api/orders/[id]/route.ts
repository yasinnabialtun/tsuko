import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/resend';
import { getOrderShippedEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Get single order
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                                slug: true
                            }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: 'Sipariş bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json({
            order: {
                ...order,
                totalAmount: order.totalAmount.toString(),
                items: order.items.map((item: any) => ({
                    ...item,
                    price: item.price.toString()
                }))
            }
        });
    } catch (error) {
        console.error('Order fetch error:', error);
        return NextResponse.json({ error: 'Error fetching order' }, { status: 500 });
    }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const existingOrder = await prisma.order.findUnique({
            where: { id }
        });

        if (!existingOrder) {
            return NextResponse.json({ error: 'Sipariş bulunamadı.' }, { status: 404 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: {
                status: body.status ?? existingOrder.status,
                paymentStatus: body.paymentStatus ?? existingOrder.paymentStatus,
                trackingNumber: body.trackingNumber ?? existingOrder.trackingNumber
            }
        });

        // Send shipping notification email if status changed to SHIPPED
        if (body.status === 'SHIPPED' && existingOrder.status !== 'SHIPPED' && body.trackingNumber) {
            try {
                await sendEmail({
                    to: existingOrder.customerEmail,
                    subject: `Siparişiniz Kargoya Verildi - ${existingOrder.orderNumber} | Tsuko Design`,
                    html: getOrderShippedEmailHtml({
                        orderNumber: existingOrder.orderNumber,
                        customerName: existingOrder.customerName,
                        trackingNumber: body.trackingNumber
                    })
                });
            } catch (emailError) {
                console.error('Shipping email failed:', emailError);
            }
        }

        return NextResponse.json({
            message: 'Sipariş güncellendi.',
            order: {
                ...updatedOrder,
                totalAmount: updatedOrder.totalAmount.toString()
            }
        });
    } catch (error) {
        console.error('Order update error:', error);
        return NextResponse.json({ error: 'Error updating order' }, { status: 500 });
    }
}
