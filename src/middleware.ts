import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // 1. Admin Route Protection (Existing Logic)
    if (isAdminRoute(req)) {
        // Allow access to login page
        if (req.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const adminToken = req.cookies.get('admin_session');

        // If no token, redirect to login
        if (!adminToken) {
            const loginUrl = new URL('/admin/login', req.url);
            loginUrl.searchParams.set('from', req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    const response = NextResponse.next();
    response.headers.set('x-pathname', req.nextUrl.pathname);
    return response;
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - manifest.webmanifest (webmanifest file)
         */
        '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.png$).*)',
    ],
};
