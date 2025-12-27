'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Create Coupon
export async function createCoupon(formData: any) {
    try {
        const { code, discountValue, discountType } = formData;

        if (!code || !discountValue) {
            return { error: 'Kupon kodu ve indirim tutarı zorunludur.' };
        }

        // Check if exists
        const existing = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (existing) {
            return { error: 'Bu kupon kodu zaten mevcut.' };
        }

        await prisma.coupon.create({
            data: {
                code: code.toUpperCase(),
                discountType: discountType || 'PERCENTAGE',
                discountValue: parseFloat(discountValue),
                minAmount: formData.minAmount ? parseFloat(formData.minAmount) : null,
                usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
                startDate: formData.startDate ? new Date(formData.startDate) : null,
                endDate: formData.endDate ? new Date(formData.endDate) : null,
                isActive: formData.isActive !== undefined ? formData.isActive : true
            }
        });

        revalidatePath('/admin/coupons');
        return { success: true };
    } catch (error) {
        console.error('Create coupon error:', error);
        return { error: 'Kupon oluşturulurken hata oluştu.' };
    }
}

// Delete Coupon (Hard Delete or deactivate?)
// Let's do Hard Delete for coupons as they are transient.
export async function deleteCoupon(id: string) {
    try {
        await prisma.coupon.delete({ where: { id } });
        revalidatePath('/admin/coupons');
        return { success: true };
    } catch (error) {
        console.error('Delete coupon error:', error);
        return { error: 'Silme işlemi başarısız.' };
    }
}

// Toggle Active Status
export async function toggleCouponStatus(id: string, isActive: boolean) {
    try {
        await prisma.coupon.update({
            where: { id },
            data: { isActive }
        });
        revalidatePath('/admin/coupons');
        return { success: true };
    } catch (error) {
        return { error: 'Güncelleme başarısız.' };
    }
}
