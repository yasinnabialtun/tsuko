import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/categories - List all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        return NextResponse.json({
            categories: categories.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                productCount: cat._count.products
            }))
        });
    } catch (error) {
        console.error('Categories fetch error:', error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}

// POST /api/categories - Create new category
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, slug, description } = body;

        if (!name) {
            return NextResponse.json({ error: 'Kategori adı gereklidir.' }, { status: 400 });
        }

        const categorySlug = slug || name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

        // Check if slug exists
        const existingCategory = await prisma.category.findUnique({
            where: { slug: categorySlug }
        });

        if (existingCategory) {
            return NextResponse.json({ error: 'Bu slug zaten kullanılıyor.' }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug: categorySlug,
                description: description || null
            }
        });

        return NextResponse.json({
            message: 'Kategori başarıyla oluşturuldu.',
            category
        }, { status: 201 });
    } catch (error) {
        console.error('Category creation error:', error);
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}
