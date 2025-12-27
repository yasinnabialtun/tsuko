import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/resend';
import { getWelcomeEmailHtml } from '@/lib/email-templates';

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

        let subscriberId = null;
        let alreadySubscribed = false;

        // Try database operations with timeout
        try {
            // Check if already subscribed
            const existingSubscriber = await Promise.race([
                prisma.subscriber.findUnique({ where: { email } }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 5000))
            ]) as any;

            if (existingSubscriber) {
                alreadySubscribed = true;
            } else {
                // Create new subscriber
                const subscriber = await Promise.race([
                    prisma.subscriber.create({
                        data: {
                            email,
                            source: 'website_newsletter'
                        }
                    }),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 5000))
                ]) as any;
                subscriberId = subscriber?.id;
            }
        } catch (dbError) {
            console.error('Database operation failed:', dbError);
            // Continue without database - still send welcome email
        }

        if (alreadySubscribed) {
            return NextResponse.json(
                { message: 'Bu e-posta adresi zaten kayıtlı.', alreadySubscribed: true },
                { status: 200 }
            );
        }

        // Send welcome email with discount code
        try {
            await sendEmail({
                to: email,
                subject: 'Tsuko Design\'a Hoş Geldiniz! 🎉 %10 İndirim Kodunuz İçeride',
                html: getWelcomeEmailHtml(email)
            });
        } catch (emailError) {
            console.error('Welcome email failed:', emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json(
            {
                message: 'Bültene başarıyla abone oldunuz!',
                subscriberId
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
        const subscribers = await Promise.race([
            prisma.subscriber.findMany({
                orderBy: { createdAt: 'desc' },
                take: 100
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 5000))
        ]) as any[];

        return NextResponse.json({
            total: subscribers?.length || 0,
            subscribers: subscribers || []
        });
    } catch (error) {
        console.error('Subscribers fetch error:', error);
        return NextResponse.json({
            total: 0,
            subscribers: [],
            error: 'Database connection failed'
        });
    }
}
