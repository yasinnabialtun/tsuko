
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const product = await prisma.product.findFirst({
            where: { isActive: true }
        });
        if (product) {
            console.log(`PRODUCT_ID=${product.id}`);
            console.log(`PRODUCT_PRICE=${product.price}`);
        } else {
            console.log('No active products found.');
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
