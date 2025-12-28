
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, rating, comment, userName } = body;

        if (!productId || !rating || !userName) {
            return NextResponse.json({ error: 'Eksik bilgi: Puan, İsim ve Ürün ID zorunludur.' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                productId,
                rating: parseInt(rating),
                comment,
                userName,
                isApproved: true // Auto approve reviews for MVP
            }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error('Review error:', error);
        return NextResponse.json({ error: 'Yorum kaydedilemedi.' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');
        const all = searchParams.get('all') === 'true'; // For admin panel

        if (all) {
            const reviews = await prisma.review.findMany({
                include: {
                    product: {
                        select: { name: true, images: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return NextResponse.json(reviews);
        }

        if (!productId) {
            return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
        }

        const reviews = await prisma.review.findMany({
            where: {
                productId,
                isApproved: true
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Fetch reviews error:', error);
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.review.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete review error:', error);
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, isApproved } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const review = await prisma.review.update({
            where: { id },
            data: { isApproved }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error('Update review error:', error);
        return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
    }
}
