import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/blog - List all posts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const limit = parseInt(searchParams.get('limit') || '50');

        const whereClause = published !== null
            ? { published: published === 'true' }
            : {};

        const posts = await prisma.blogPost.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            take: limit
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Blog fetch error:', error);
        return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
    }
}

// POST /api/blog - Create new post
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, coverImage, category, author, published } = body;

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Başlık, slug ve içerik zorunludur.' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (existingPost) {
            return NextResponse.json(
                { error: 'Bu slug zaten kullanılıyor.' },
                { status: 400 }
            );
        }

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                coverImage: coverImage || '/images/hero.png',
                category: category || 'Genel',
                author: author || 'Tsuko Design',
                published: published ?? false,
                date: new Date().toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }
        });

        return NextResponse.json({
            message: 'Blog yazısı başarıyla oluşturuldu.',
            post
        }, { status: 201 });
    } catch (error) {
        console.error('Blog creation error:', error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}
