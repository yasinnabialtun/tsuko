
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { code, cartTotal } = await request.json();

        if (!code) {
            return NextResponse.json({ valid: false, error: 'Kupon kodu boş olamaz.' }, { status: 400 });
        }

        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon) {
            return NextResponse.json({ valid: false, error: 'Kupon bulunamadı.' }, { status: 404 });
        }

        // Checks
        if (!coupon.isActive) {
            return NextResponse.json({ valid: false, error: 'Bu kupon aktif değil.' }, { status: 400 });
        }

        const now = new Date();
        if (coupon.startDate && coupon.startDate > now) {
            return NextResponse.json({ valid: false, error: 'Kupon henüz başlamadı.' }, { status: 400 });
        }

        if (coupon.endDate && coupon.endDate < now) {
            return NextResponse.json({ valid: false, error: 'Kupon süresi dolmuş.' }, { status: 400 });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return NextResponse.json({ valid: false, error: 'Kupon kullanım limitine ulaşmış.' }, { status: 400 });
        }

        if (coupon.minAmount && cartTotal < Number(coupon.minAmount)) {
            return NextResponse.json({
                valid: false,
                error: `Bu kuponu kullanmak için sepet tutarı en az ${coupon.minAmount}₺ olmalıdır.`
            }, { status: 400 });
        }

        // Calculate Discount
        let discountAmount = 0;
        const value = Number(coupon.discountValue);

        if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = (cartTotal * value) / 100;
        } else {
            discountAmount = value;
        }

        // Cap discount at total amount (can't go below 0)
        discountAmount = Math.min(discountAmount, cartTotal);

        return NextResponse.json({
            valid: true,
            discountAmount: discountAmount,
            message: coupon.discountType === 'PERCENTAGE'
                ? `%${value} İndirim Uygulandı!`
                : `${value}₺ İndirim Uygulandı!`
        });

    } catch (error) {
        console.error('Coupon validation error:', error);
        return NextResponse.json({ valid: false, error: 'Sunucu hatası.' }, { status: 500 });
    }
}
