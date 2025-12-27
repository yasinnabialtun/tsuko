import { NextResponse } from 'next/server';

// Admin API Key from environment
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// List of allowed admin email domains (when using Clerk)
const ALLOWED_ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',').filter(Boolean);

/**
 * Validate admin API request
 * 
 * Supports two auth methods:
 * 1. API Key (for webhooks, external scripts)
 * 2. Clerk session (for admin panel - checked via middleware)
 * 
 * @returns null if valid, NextResponse error if invalid
 */
export function validateAdminRequest(request: Request): NextResponse | null {
    // Check for API Key in header
    const apiKey = request.headers.get('x-api-key');

    // If API key is provided, validate it
    if (apiKey) {
        if (!ADMIN_API_KEY) {
            console.warn('ADMIN_API_KEY not configured - admin API access denied');
            return NextResponse.json(
                { error: 'Admin API not configured' },
                { status: 503 }
            );
        }

        if (apiKey !== ADMIN_API_KEY) {
            return NextResponse.json(
                { error: 'Invalid API key' },
                { status: 401 }
            );
        }

        // Valid API key
        return null;
    }

    // For browser requests from admin panel:
    // If Clerk is configured, the middleware will handle auth
    // Here we check if request is coming from same origin (CSRF protection)
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;

    // In development, allow localhost
    if (process.env.NODE_ENV === 'development') {
        return null;
    }

    // In production, verify origin matches our site
    if (siteUrl && origin && !origin.includes(siteUrl)) {
        return NextResponse.json(
            { error: 'Cross-origin request denied' },
            { status: 403 }
        );
    }

    // If no protection mechanisms, log warning but allow
    // This is a fallback - proper auth should be via Clerk middleware
    if (!ADMIN_API_KEY && ALLOWED_ADMIN_EMAILS.length === 0) {
        console.warn('⚠️ Admin API accessed without authentication');
    }

    return null;
}

/**
 * Wrap an API handler with admin validation
 */
export function withAdminAuth(
    handler: (request: Request, context?: any) => Promise<NextResponse>
) {
    return async (request: Request, context?: any): Promise<NextResponse> => {
        const validationError = validateAdminRequest(request);
        if (validationError) {
            return validationError;
        }
        return handler(request, context);
    };
}

/**
 * Rate limiter for API endpoints
 * Simple in-memory rate limiting
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
    identifier: string,
    limit: number = 100,
    windowMs: number = 60000
): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(identifier);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (entry.count >= limit) {
        return false;
    }

    entry.count++;
    return true;
}

/**
 * Get client IP for rate limiting
 */
export function getClientIp(request: Request): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown'
    );
}
