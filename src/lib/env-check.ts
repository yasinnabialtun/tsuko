/**
 * STAFF ARCHITECT ENV VALIDATION
 * This script ensures all critical environment variables are present.
 * Prevents the application from running in a "mostly working" but broken state.
 */

const REQUIRED_ENV = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SITE_URL',
    'SHOPIER_API_KEY',
    'SHOPIER_API_SECRET',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'RESEND_API_KEY',
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID'
];

export function validateEnv() {
    const missing = REQUIRED_ENV.filter(key => !process.env[key]);

    if (missing.length > 0) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`CRITICAL: Missing environment variables: ${missing.join(', ')}`);
        } else {
            console.warn(`⚠️ Warning: Missing environment variables for full functionality: ${missing.join(', ')}`);
        }
    }
}
