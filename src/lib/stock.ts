
import { prisma } from '@/lib/prisma';

/**
 * Restores stock for a failed/cancelled order.
 * This is crucial to prevent "overselling" when payment fails but stock was reserved.
 */
export async function restoreStock(orderId: string) {
    console.log(`Restoring stock for Order: ${orderId}`);

    const order = await prisma.order.findUnique({
        where: { orderNumber: orderId },
        include: { items: true }
    });

    if (!order) {
        console.error(`Order ${orderId} not found for stock restoration.`);
        return;
    }

    if (order.paymentStatus === 'PAID') {
        console.warn(`Order ${orderId} is PAID. Cannot restore stock.`);
        return;
    }

    // Transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
            if (item.variantId) {
                await tx.productVariant.update({
                    where: { id: item.variantId },
                    data: { stock: { increment: item.quantity } }
                });
            } else {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } }
                });
            }
        }

        // Mark order as CANCELLED to prevent double restoration
        await tx.order.update({
            where: { id: order.id },
            data: { status: 'CANCELLED', paymentStatus: 'UNPAID' }
        });
    });

    console.log(`Stock restored for Order: ${orderId}`);
}
