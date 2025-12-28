
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { email, productId } = await req.json();

        if (!email || !productId) {
            return NextResponse.json({ error: 'Email ve Ürün ID zorunludur.' }, { status: 400 });
        }

        // Check if already registered
        const existing = await prisma.stockNotification.findUnique({
            where: {
                email_productId: {
                    email,
                    productId
                }
            }
        });

        if (existing) {
            return NextResponse.json({ message: 'Bu ürün için zaten bildirim listesindesiniz.' });
        }

        await prisma.stockNotification.create({
            data: { email, productId }
        });

        return NextResponse.json({ success: true, message: 'Talebiniz alındı! Ürün stoğa girdiğinde size haber vereceğiz.' });
    } catch (error) {
        console.error('Notify error:', error);
        return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const notifications = await prisma.stockNotification.findMany({
            include: {
                product: {
                    select: { name: true, images: true, stock: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Fetch notify error:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.stockNotification.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
