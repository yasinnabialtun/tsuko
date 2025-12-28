
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Skip for the login page itself
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        const adminSession = request.cookies.get('admin_session');

        // Check for valid session
        // Check for valid session (existence only, validation happens in API/Layout)
        if (!adminSession) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
