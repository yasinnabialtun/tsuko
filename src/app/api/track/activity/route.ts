import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, city, productName } = body;

        if (!type) {
            return NextResponse.json({ error: 'Missing type' }, { status: 400 });
        }

        const activity = await prisma.liveActivity.create({
            data: {
                type,
                city: city || 'Unknown',
                productName
            }
        });

        // Cleanup old activities (keep last 1 hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        await prisma.liveActivity.deleteMany({
            where: { createdAt: { lt: oneHourAgo } }
        });

        return NextResponse.json(activity);
    } catch (error) {
        console.error('Activity tracking error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
