'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Create Affiliate
export async function createAffiliate(formData: any) {
    try {
        const { name, code, commissionRate, contact, iban, discountValue } = formData;

        if (!name || !code) {
            return { error: 'İsim ve kod zorunludur.' };
        }

        // Check if code exists (in Affiliate or Coupon)
        const existingAffiliate = await (prisma as any).affiliate.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (existingAffiliate) {
            return { error: 'Bu kod zaten bir iş ortağına tanımlı.' };
        }

        const existingCoupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (existingCoupon) {
            return { error: 'Bu kod zaten bir kupon olarak mevcut.' };
        }

        // 1. Create the Coupon first (so it works on checkout)
        // Defaulting to 10% discount for the customer if not specified, or whatever logic you want.
        // Let's say user can specify customer discount too.
        await prisma.coupon.create({
            data: {
                code: code.toUpperCase(),
                discountType: 'PERCENTAGE',
                discountValue: parseFloat(discountValue || '10'), // Default 10% discount for customer
                isActive: true
            }
        });

        // 2. Create the Affiliate
        await (prisma as any).affiliate.create({
            data: {
                name,
                code: code.toUpperCase(),
                commissionRate: parseFloat(commissionRate || '10'), // Default 10% commission
                contact,
                iban,
                totalSales: 0,
                totalEarnings: 0
            }
        });

        revalidatePath('/admin/affiliates');
        return { success: true };
    } catch (error) {
        console.error('Create affiliate error:', error);
        return { error: 'İş ortağı oluşturulurken hata oluştu.' };
    }
}

// Delete Affiliate
export async function deleteAffiliate(id: string) {
    try {
        const affiliate = await (prisma as any).affiliate.findUnique({ where: { id } });

        if (affiliate) {
            // Delete associated coupon too? Maybe better to deactivate it.
            // Let's delete it to free up the code.
            await prisma.coupon.delete({ where: { code: affiliate.code } }).catch(() => { });
            await (prisma as any).affiliate.delete({ where: { id } });
        }

        revalidatePath('/admin/affiliates');
        return { success: true };
    } catch (error) {
        console.error('Delete affiliate error:', error);
        return { error: 'Silme işlemi başarısız.' };
    }
}
