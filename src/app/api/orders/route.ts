import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';
import { sendEmail } from '@/lib/resend';
import { getOrderConfirmationEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

// GET /api/orders - List orders (admin)
export async function GET(request: Request) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = parseInt(searchParams.get('limit') || '50');

        const whereClause = status ? { status: status as any } : {};

        const orders = await prisma.order.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        // Get stats
        const totalOrders = await prisma.order.count();
        const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });
        const completedOrders = await prisma.order.count({ where: { status: 'DELIVERED' } });

        return NextResponse.json({
            stats: {
                total: totalOrders,
                pending: pendingOrders,
                completed: completedOrders
            },
            orders: orders.map((order: any) => ({
                ...order,
                totalAmount: order.totalAmount.toString()
            }))
        });
    } catch (error) {
        console.error('Orders fetch error:', error);
        return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 });
    }
}

// POST /api/orders - Create new order (Manual admin order)
// Note: Shopier webhooks use /api/webhooks/shopier
export async function POST(request: Request) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const body = await request.json();

        // Validate required fields
        const { customerName, customerEmail, customerPhone, items, totalAmount } = body;

        if (!customerName || !customerEmail || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate order number
        const orderNumber = `TSK-${Date.now().toString(36).toUpperCase()}`;

        // Create order
        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName,
                customerEmail,
                customerPhone: customerPhone || '',
                shippingAddress: body.shippingAddress || '',
                totalAmount: totalAmount || 0,
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity || 1,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // Send order confirmation email
        try {
            await sendEmail({
                to: customerEmail,
                subject: `Siparişiniz Alındı - ${order.orderNumber} | Tsuko Design`,
                html: getOrderConfirmationEmailHtml({
                    orderNumber: order.orderNumber,
                    customerName,
                    items: items.map((item: any) => ({
                        name: item.name || 'Ürün',
                        quantity: item.quantity,
                        price: item.price.toString()
                    })),
                    totalAmount: totalAmount.toString()
                })
            });
        } catch (emailError) {
            console.error('Order confirmation email failed:', emailError);
        }

        return NextResponse.json({
            message: 'Order created successfully',
            orderNumber: order.orderNumber,
            orderId: order.id
        }, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
}
