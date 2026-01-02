
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, slug, excerpt, content, coverImage, category, author, published } = body;

        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                category,
                author,
                published,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ message: 'Success', post: updatedPost });
    } catch (error) {
        console.error('Update blog error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.blogPost.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Delete blog error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
