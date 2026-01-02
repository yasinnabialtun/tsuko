'use server';

import { prisma } from '@/lib/prisma';

export async function getAffiliateStats(code: string) {
    if (!code) return { error: 'Lütfen kodunuzu girin.' };

    try {
        // Cast prisma to any to bypass type errors for now
        const affiliate = await (prisma as any).affiliate.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!affiliate) {
            return { error: 'Bu kod ile bir iş ortağı bulunamadı.' };
        }

        // Return only safe data (no IBAN or contact info if not needed)
        return {
            success: true,
            data: {
                name: affiliate.name,
                code: affiliate.code,
                commissionRate: Number(affiliate.commissionRate),
                totalSales: Number(affiliate.totalSales),
                totalEarnings: Number(affiliate.totalEarnings),
                lastUpdated: new Date().toISOString() // Simulation of live data
            }
        };

    } catch (error) {
        console.error('Partner stats error:', error);
        return { error: 'Sorgulama sırasında bir hata oluştu.' };
    }
}
