import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Simple mock coordinate generator for realistic Turkey map visualization
function getMockCoordinates() {
    // Center point roughly around Turkey (Lat: 36-42, Lng: 26-45)
    // Plus major global cities for effect
    const locations = [
        { lat: 41.0082, lng: 28.9784, city: 'Istanbul', country: 'Turkey' },
        { lat: 39.9334, lng: 32.8597, city: 'Ankara', country: 'Turkey' },
        { lat: 38.4237, lng: 27.1428, city: 'Izmir', country: 'Turkey' },
        { lat: 37.0000, lng: 35.3213, city: 'Adana', country: 'Turkey' },
        { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'USA' },
        { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK' },
        { lat: 52.5200, lng: 13.4050, city: 'Berlin', country: 'Germany' },
        { lat: 48.8566, lng: 2.3522, city: 'Paris', country: 'France' },
    ];

    return locations[Math.floor(Math.random() * locations.length)];
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('tsuko_visitor_id')?.value;

        let shouldCreateCookie = false;

        // Simulating geo-location since we're on localhost mostly
        // In production, you'd use request.headers.get('x-forwarded-for') 
        // and a GeoIP service.
        const mockLocation = getMockCoordinates();

        // 1. Update or Create Session in DB
        if (!sessionId) {
            shouldCreateCookie = true;
            // Create new
            const session = await prisma.visitorSession.create({
                data: {
                    country: mockLocation.country,
                    city: mockLocation.city,
                    lat: mockLocation.lat,
                    lng: mockLocation.lng,
                    lastSeen: new Date()
                }
            });
            sessionId = session.id;
        } else {
            // Update existing heartbeat
            try {
                await prisma.visitorSession.update({
                    where: { id: sessionId },
                    data: { lastSeen: new Date() } // Update timestamp
                });
            } catch (e) {
                // Determine if session is invalid/expired, create new
                const session = await prisma.visitorSession.create({
                    data: {
                        country: mockLocation.country,
                        city: mockLocation.city,
                        lat: mockLocation.lat,
                        lng: mockLocation.lng,
                        lastSeen: new Date()
                    }
                });
                sessionId = session.id;
                shouldCreateCookie = true;
            }
        }

        const response = NextResponse.json({ success: true });

        // Set persistent cookie if new
        if (shouldCreateCookie && sessionId) {
            response.cookies.set('tsuko_visitor_id', sessionId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });
        }

        return response;

    } catch (error) {
        console.error('Session track error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
