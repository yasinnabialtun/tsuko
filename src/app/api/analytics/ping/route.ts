import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const country = request.headers.get('x-vercel-ip-country') || 'TR';
        const city = request.headers.get('x-vercel-ip-city') || 'Istanbul';
        const lat = parseFloat(request.headers.get('x-vercel-ip-latitude') || '41.0082');
        const lng = parseFloat(request.headers.get('x-vercel-ip-longitude') || '28.9784');

        // We use a temporary cookie or just a fresh ID per session if we want to track unique.
        // For "live" count, we just care about active entries in the last X minutes.
        // To avoid DB bloat, we can use an upsert based on a session ID (if provided) or just create.

        await prisma.visitorSession.create({
            data: {
                country,
                city,
                lat,
                lng,
                lastSeen: new Date()
            }
        });

        // Cleanup old sessions (older than 10 mins) to keep DB light
        const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000);
        await prisma.visitorSession.deleteMany({
            where: {
                lastSeen: { lt: tenMinsAgo }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Ping failed' }, { status: 500 });
    }
}
