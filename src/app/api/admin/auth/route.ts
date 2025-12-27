
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'tsuko123';

    if (password === adminPassword) {
        // Set a secure cookie
        (await cookies()).set('admin_session', 'active', {
            httpOnly: true,
            secure: process.env.NODE_VERSION === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
