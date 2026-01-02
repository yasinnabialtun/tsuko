
import { prisma } from '@/lib/prisma';
import CouponsClient from './client';

export const dynamic = 'force-dynamic';

export default async function CouponsPage() {
    const coupons = await prisma.coupon.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // Serialize Decimal to Number for Client Component
    const serializedCoupons = coupons.map(c => ({
        ...c,
        discountValue: Number(c.discountValue),
        minAmount: c.minAmount ? Number(c.minAmount) : null,
        startDate: c.startDate,
        endDate: c.endDate,
        createdAt: c.createdAt
    }));

    return <CouponsClient initialCoupons={serializedCoupons} />;
}
