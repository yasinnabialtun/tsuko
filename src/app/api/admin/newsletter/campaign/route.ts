import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';
import { resend } from '@/lib/email';
import { getNewsletterEmailHtml } from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const authError = await validateAdminRequest(req);
    if (authError) return authError;

    try {
        const body = await req.json();
        const { title, content, ctaText, ctaLink } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Başlık ve içerik zorunludur.' }, { status: 400 });
        }

        const subscribers = await prisma.subscriber.findMany({
            where: { isActive: true }
        });

        if (subscribers.length === 0) {
            return NextResponse.json({ error: 'Abone bulunamadı.' }, { status: 400 });
        }

        const emailHtml = getNewsletterEmailHtml({
            title,
            body: content.replace(/\n/g, '<br>'),
            ctaText,
            ctaLink
        });

        // Send emails in batches if possible, but Resend allows single call for multiple recipients in paid plan
        // For starter, we can send one by one or use Bcc (Resend Bcc is limited)
        // We'll send to each subscriber to personalize later if needed.

        const results = await Promise.allSettled(
            subscribers.map(sub =>
                resend.emails.send({
                    from: process.env.RESEND_SENDER_EMAIL || 'Tsuko Design <info@tsukodesign.com>',
                    to: sub.email,
                    subject: title,
                    html: emailHtml
                })
            )
        );

        const succeeded = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        return NextResponse.json({
            success: true,
            message: `${succeeded} e-posta başarıyla gönderildi, ${failed} hata oluştu.`
        });

    } catch (error) {
        console.error('Newsletter Campaign Error:', error);
        return NextResponse.json({ error: 'Kampanya gönderilirken bir hata oluştu.' }, { status: 500 });
    }
}
