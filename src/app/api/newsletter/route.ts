import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Geçerli bir e-posta adresi giriniz.' },
                { status: 400 }
            );
        }

        // Check if already subscribed
        const existingSubscriber = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existingSubscriber) {
            return NextResponse.json(
                { message: 'Bu e-posta adresi zaten kayıtlı.', alreadySubscribed: true },
                { status: 200 }
            );
        }

        // Create new subscriber
        const subscriber = await prisma.subscriber.create({
            data: {
                email,
                source: 'website_newsletter'
            }
        });

        // TODO: Send welcome email with Resend
        // await sendWelcomeEmail(email);

        return NextResponse.json(
            {
                message: 'Bültene başarıyla abone oldunuz!',
                subscriberId: subscriber.id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}

// GET - List subscribers (admin only - add auth later)
export async function GET() {
    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        return NextResponse.json({
            total: subscribers.length,
            subscribers
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error fetching subscribers' },
            { status: 500 }
        );
    }
}
