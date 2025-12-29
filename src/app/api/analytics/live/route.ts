import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const [sessions, activities, orderCount, revenue] = await Promise.all([
            prisma.visitorSession.findMany({
                where: { lastSeen: { gte: fiveMinsAgo } },
                select: { lat: true, lng: true, city: true, country: true }
            }),
            prisma.liveActivity.findMany({
                where: { createdAt: { gte: fiveMinsAgo } },
                orderBy: { createdAt: 'desc' },
                take: 10
            }),
            prisma.order.count({
                where: { createdAt: { gte: todayStart } }
            }),
            prisma.order.aggregate({
                where: { createdAt: { gte: todayStart } },
                _sum: { totalAmount: true }
            })
        ]);

        return NextResponse.json({
            sessions,
            activities,
            stats: {
                active: sessions.length,
                orders: orderCount,
                revenue: Number(revenue._sum.totalAmount || 0)
            }
        });
    } catch (error) {
        console.error('Session fetch error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
