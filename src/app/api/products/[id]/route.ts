import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/admin-auth';
import { sendStockNotificationEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/products/[id] - Get single product
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!product) {
            return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
        }

        return NextResponse.json({
            product: {
                ...product,
                price: product.price.toString()
            }
        });
    } catch (error) {
        console.error('Product fetch error:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}


// PUT /api/products/[id] - Update product
export async function PUT(request: Request, { params }: RouteParams) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const { id } = await params;
        const body = await request.json();

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
        }

        // Check for stock transition
        const stockBecameAvailable = existingProduct.stock === 0 && (body.stock > 0);

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: body.name ?? existingProduct.name,
                slug: body.slug ?? existingProduct.slug,
                description: body.description ?? existingProduct.description,
                price: body.price ?? existingProduct.price,
                stock: body.stock ?? existingProduct.stock,
                images: body.images ?? existingProduct.images,
                categoryId: body.categoryId ?? existingProduct.categoryId,
                seoTitle: body.seoTitle ?? existingProduct.seoTitle,
                seoDescription: body.seoDescription ?? existingProduct.seoDescription,
                isActive: body.isActive ?? existingProduct.isActive,
                isFeatured: body.isFeatured ?? existingProduct.isFeatured
            },
            include: { category: true }
        });

        // Trigger notifications if stock became available
        if (stockBecameAvailable) {
            const notifications = await prisma.stockNotification.findMany({
                where: { productId: id, isNotified: false }
            });

            if (notifications.length > 0) {
                // Send emails in a loop (better in background but this works for few)
                for (const notify of notifications) {
                    await sendStockNotificationEmail(notify.email, {
                        name: updatedProduct.name,
                        image: updatedProduct.images[0] || '/images/hero.png',
                        slug: updatedProduct.slug
                    });

                    // Mark as notified
                    await prisma.stockNotification.update({
                        where: { id: notify.id },
                        data: { isNotified: true }
                    });
                }
            }
        }

        return NextResponse.json({
            message: 'Ürün başarıyla güncellendi.',
            product: {
                ...updatedProduct,
                price: updatedProduct.price.toString()
            }
        });
    } catch (error) {
        console.error('Product update error:', error);
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

// DELETE /api/products/[id] - Delete product (soft delete - set isActive to false)
export async function DELETE(request: Request, { params }: RouteParams) {
    // 🔒 Admin Check
    const authError = await validateAdminRequest(request);
    if (authError) return authError;

    try {
        const { id } = await params;

        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct) {
            return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 });
        }

        // Soft delete - just deactivate
        await prisma.product.update({
            where: { id },
            data: { isActive: false }
        });

        return NextResponse.json({
            message: 'Ürün başarıyla arşivlendi.'
        });
    } catch (error) {
        console.error('Product delete error:', error);
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
