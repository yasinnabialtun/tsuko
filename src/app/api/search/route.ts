import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ products: [], posts: [] });
    }

    try {
        // Parallel search
        const [products, posts] = await Promise.all([
            prisma.product.findMany({
                where: {
                    isActive: true,
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } }
                    ]
                },
                take: 5,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    images: true,
                    price: true, // Decimal field, careful with serialization
                    category: { select: { name: true } }
                }
            }),
            prisma.blogPost.findMany({
                where: {
                    published: true,
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { excerpt: { contains: query, mode: 'insensitive' } }
                    ]
                },
                take: 3,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    excerpt: true
                }
            })
        ]);

        return NextResponse.json({
            products: products.map(p => ({
                ...p,
                image: p.images[0] || '/images/hero.png',
                category: p.category?.name
            })),
            posts
        });

    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
