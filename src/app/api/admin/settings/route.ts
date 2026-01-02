import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';
import { revalidateTag, revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: 'singleton' }
        });

        if (!settings) {
            // Create default settings if not exists
            const defaultSettings = await prisma.settings.create({
                data: { id: 'singleton' }
            });
            return NextResponse.json(defaultSettings);
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings fetch error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const body = await request.json();

        // Ensure discount threshold is Decimal compatible
        const data = { ...body };
        if (data.freeShippingThreshold) {
            data.freeShippingThreshold = parseFloat(data.freeShippingThreshold);
        }

        const settings = await prisma.settings.upsert({
            where: { id: 'singleton' },
            create: { ...data, id: 'singleton' },
            update: data
        });

        revalidatePath('/', 'layout');

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Settings update error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
