
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, rating, comment, userName } = body;

        // Clerk auth is optional for reviews, but good to have
        const { userId } = await auth();

        if (!productId || !rating || !userName) {
            return NextResponse.json({ error: 'Eksik bilgi: Puan, İsim ve Ürün ID zorunludur.' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                productId,
                rating: parseInt(rating),
                comment,
                userName,
                userId: userId || null, // Capture user ID if logged in
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
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}
