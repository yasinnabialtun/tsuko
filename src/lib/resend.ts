import { Resend } from 'resend';

// Initialize Resend with API key
// Will return null if no API key, so email features gracefully degrade
const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Email sender address
export const FROM_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Tsuko Design <onboarding@resend.dev>';
export const REPLY_TO_EMAIL = 'info@tsukodesign.com';

// Email Types
export type EmailTemplate =
    | 'welcome'
    | 'order_confirmation'
    | 'order_shipped'
    | 'order_delivered';

// Send email helper
export async function sendEmail({
    to,
    subject,
    html,
    replyTo = REPLY_TO_EMAIL
}: {
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}) {
    if (!resend) {
        console.warn('Resend not configured - skipping email');
        return { success: false, error: 'Resend not configured' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html,
            replyTo
        });

        if (error) {
            console.error('Email send error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Email send exception:', err);
        return { success: false, error: err };
    }
}
