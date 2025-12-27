import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';
import { sendOrderShippedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/orders/[id] - Get single order (Admin only)
export async function GET(request: Request, { params }: RouteParams) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

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
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

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
            await sendOrderShippedEmail({
                ...updatedOrder,
                trackingNumber: body.trackingNumber
            });
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
