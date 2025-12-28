import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Admin Route Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const adminToken = request.cookies.get('admin_token');

        // If no token, redirect to login
        if (!adminToken) {
            const loginUrl = new URL('/admin/login', request.url);
            // Optional: Add redirect param to return after login
            loginUrl.searchParams.set('from', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Apply to all admin routes
        '/admin/:path*',
    ],
};
