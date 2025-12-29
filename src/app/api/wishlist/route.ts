import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ items: [] });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        price: true,
                        images: true,
                        stock: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ items: wishlist });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId } = await request.json();

        // Check if exists
        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });

        if (existing) {
            return NextResponse.json({ status: 'exists' });
        }

        await prisma.wishlist.create({
            data: {
                userId,
                productId
            }
        });

        return NextResponse.json({ status: 'added' }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to add' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        await prisma.wishlist.deleteMany({
            where: {
                userId,
                productId
            }
        });

        return NextResponse.json({ status: 'removed' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove' }, { status: 500 });
    }
}
