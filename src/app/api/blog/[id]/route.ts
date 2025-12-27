import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/blog/[id] - Get single post
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const post = await prisma.blogPost.findUnique({
            where: { id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Blog fetch error:', error);
        return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
    }
}

// PUT /api/blog/[id] - Update post
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const existingPost = await prisma.blogPost.findUnique({
            where: { id }
        });

        if (!existingPost) {
            return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
        }

        // If slug is changing, check for duplicates
        if (body.slug && body.slug !== existingPost.slug) {
            const slugExists = await prisma.blogPost.findUnique({
                where: { slug: body.slug }
            });
            if (slugExists) {
                return NextResponse.json({ error: 'Bu slug zaten kullanılıyor.' }, { status: 400 });
            }
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: {
                title: body.title ?? existingPost.title,
                slug: body.slug ?? existingPost.slug,
                excerpt: body.excerpt ?? existingPost.excerpt,
                content: body.content ?? existingPost.content,
                coverImage: body.coverImage ?? existingPost.coverImage,
                category: body.category ?? existingPost.category,
                author: body.author ?? existingPost.author,
                published: body.published ?? existingPost.published
            }
        });

        return NextResponse.json({
            message: 'Yazı başarıyla güncellendi.',
            post: updatedPost
        });
    } catch (error) {
        console.error('Blog update error:', error);
        return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}

// DELETE /api/blog/[id] - Delete post
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const existingPost = await prisma.blogPost.findUnique({
            where: { id }
        });

        if (!existingPost) {
            return NextResponse.json({ error: 'Yazı bulunamadı.' }, { status: 404 });
        }

        await prisma.blogPost.delete({
            where: { id }
        });

        return NextResponse.json({
            message: 'Yazı başarıyla silindi.'
        });
    } catch (error) {
        console.error('Blog delete error:', error);
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}
