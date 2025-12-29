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

        const sessions = await prisma.visitorSession.findMany({
            where: {
                lastSeen: { gte: fiveMinsAgo }
            },
            select: {
                lat: true,
                lng: true,
                city: true,
                country: true
            }
        });

        return NextResponse.json(sessions);
    } catch (error) {
        console.error('Session fetch error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
