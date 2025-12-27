'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: any) {
    try {
        // Validate
        if (!formData.name || !formData.price) {
            return { error: 'Ürün adı ve fiyat zorunludur.' };
        }

        // Data preparation
        const price = parseFloat(formData.price.toString());
        const stock = parseInt(formData.stock?.toString() || '0');
        const categoryId = formData.categoryId || null;

        await prisma.product.create({
            data: {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                description: formData.description || '',
                price: price,
                stock: stock,
                categoryId: categoryId,
                image: formData.images[0] || '', // Main image
                images: formData.images,
                isActive: formData.isActive,
                isFeatured: formData.isFeatured,
            }
        });

        revalidatePath('/admin/products');
        revalidatePath('/'); // Home page might show products
        return { success: true };
    } catch (error) {
        console.error('Create product error:', error);
        return { error: 'Ürün oluşturulurken bir hata oluştu.' };
    }
}

export async function updateProduct(id: string, formData: any) {
    try {
        if (!id) return { error: 'Ürün ID zorunlu.' };

        // Data preparation
        const price = parseFloat(formData.price.toString());
        const stock = parseInt(formData.stock?.toString() || '0');
        const categoryId = formData.categoryId || null;

        await prisma.product.update({
            where: { id },
            data: {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                description: formData.description || '',
                price: price,
                stock: stock,
                categoryId: categoryId,
                image: formData.images[0] || '',
                images: formData.images,
                isActive: formData.isActive,
                isFeatured: formData.isFeatured,
            }
        });

        revalidatePath('/admin/products');
        revalidatePath(`/product/${formData.slug || id}`);
        return { success: true };
    } catch (error) {
        console.error('Update product error:', error);
        return { error: 'Ürün güncellenirken bir hata oluştu.' };
    }
}

export async function deleteProduct(id: string) {
    try {
        if (!id) return { error: 'Ürün ID zorunlu.' };

        // Soft delete
        await prisma.product.update({
            where: { id },
            data: { isActive: false }
        });

        revalidatePath('/admin/products');
        return { success: true };
    } catch (error) {
        console.error('Delete product error:', error);
        return { error: 'Ürün silinirken bir hata oluştu.' };
    }
}
