import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

// GET /api/products -> Tüm ürünleri getir
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            include: { category: true } // Kategori adını da getir
        });

        const safeProducts = products.map(p => ({
            ...p,
            price: Number(p.price)
        }));

        return NextResponse.json(safeProducts);
    } catch (error) {
        console.error('Products API Error:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}

// POST /api/products -> Yeni ürün ekle
export async function POST(request: Request) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const body = await request.json();

        // Basit doğrulama (Validation)
        if (!body.name || !body.price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
                description: body.description || '',
                price: body.price,
                stock: body.stock || 0,
                images: body.images || [],
                categoryId: body.categoryId, // Kategori ID'si zorunlu olacak
                seoTitle: body.seoTitle,
                seoDescription: body.seoDescription
            }
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Create Product Error:', error);
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}
