import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from './auth-utils';


// Admin Password from environment - FORCE PROD CHECK
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/**
 * Validate admin API request securely using cookies or API Key
 */
export async function validateAdminRequest(request: Request): Promise<NextResponse | null> {
    // 0. Safety Check for Production
    if (process.env.NODE_ENV === 'production' && !ADMIN_PASSWORD) {
        console.error('CRITICAL: ADMIN_PASSWORD is NOT set in environment variables! Admin access is disabled for safety.');
        return NextResponse.json({ error: 'System Configuration Error' }, { status: 500 });
    }

    // 1. Check for API Key (for external tools/scripts)
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.ADMIN_API_KEY;

    if (apiKey && validApiKey && apiKey === validApiKey) {
        return null; // Valid API Key
    }

    // 2. Check for Admin Session Cookie (for Browser)
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (adminSession) {
        const payload = verifyToken(adminSession.value);
        if (payload && payload.role === 'admin') {
            return null; // Valid Session
        }
    }

    console.warn(`Unauthorized Admin access attempt from IP: ${request.headers.get('x-forwarded-for') || 'unknown'}`);

    return NextResponse.json(
        { error: 'Unauthorized Access' },
        { status: 401 }
    );
}

/**
 * Rate limiter helper
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(identifier: string, limit: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(identifier);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (entry.count >= limit) return false;

    entry.count++;
    return true;
}
