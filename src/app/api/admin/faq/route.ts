import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

// GET /api/admin/faq - List all FAQs
export async function GET(request: Request) {
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const faqs = await (prisma as any).fAQ.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

// POST /api/admin/faq - Create or Update FAQs
export async function POST(request: Request) {
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const { id, question, answer, order, isActive } = body;

        if (id) {
            // Update
            const faq = await (prisma as any).fAQ.update({
                where: { id },
                data: { question, answer, order, isActive }
            });
            return NextResponse.json(faq);
        } else {
            // Create
            const faq = await (prisma as any).fAQ.create({
                data: { question, answer, order, isActive: isActive ?? true }
            });
            return NextResponse.json(faq, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save FAQ' }, { status: 500 });
    }
}

// DELETE /api/admin/faq?id=xxx
export async function DELETE(request: Request) {
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await (prisma as any).fAQ.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
