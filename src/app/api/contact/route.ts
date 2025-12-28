import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, subject, message } = body;

        if (!email || !message) {
            return NextResponse.json({ error: 'E-posta ve mesaj zorunludur.' }, { status: 400 });
        }

        // Email content for Admin
        const html = `
            <h2>Yeni İletişim Mesajı</h2>
            <p><strong>Kimden:</strong> ${firstName} ${lastName} (${email})</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <hr />
            <p style="white-space: pre-wrap;">${message}</p>
        `;

        // Send to Admin (using default sender as destination for simplicity, or hardcoded admin email)
        // In real scenario, TO should be admin email
        await sendEmail({
            to: process.env.RESEND_SENDER_EMAIL?.match(/<(.+)>/)?.[1] || 'info@tsukodesign.com',
            subject: `İletişim Formu: ${subject}`,
            html: html,
            replyTo: email
        });

        return NextResponse.json({ success: true, message: 'Mesajınız iletildi.' });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 });
    }
}
