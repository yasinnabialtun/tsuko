import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids)) {
            return NextResponse.json({ error: 'IDs array required' }, { status: 400 });
        }

        const products = await prisma.product.findMany({
            where: {
                id: { in: ids },
                isActive: true
            },
            include: { category: true }
        });

        const formattedProducts = products.map(p => ({
            ...p,
            price: p.price.toString()
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('Batch fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}
