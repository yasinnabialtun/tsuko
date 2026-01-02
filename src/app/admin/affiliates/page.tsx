import { prisma } from '@/lib/prisma';
import AffiliatesClient from './client';

export const dynamic = 'force-dynamic';

export default async function AffiliatesPage() {
    const affiliates = await (prisma as any).affiliate.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const serialized = affiliates.map(a => ({
        ...a,
        commissionRate: Number(a.commissionRate),
        totalSales: Number(a.totalSales),
        totalEarnings: Number(a.totalEarnings),
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
    }));

    return <AffiliatesClient initialAffiliates={serialized} />;
}
