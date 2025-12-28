import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth-utils';

export async function POST(request: Request) {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'tsuko123';

    if (password === adminPassword) {
        // Create secure token with expiration (1 week)
        const token = signToken({ role: 'admin', exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });

        (await cookies()).set('admin_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
