
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
