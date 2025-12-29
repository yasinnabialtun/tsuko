
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Kategoriler
    const categories = [
        { name: 'Vazolar', slug: 'vazolar', description: 'Modern ve parametrik vazo tasarımları.' },
        { name: 'Saksılar', slug: 'saksilar', description: 'Bitkileriniz için minimalist saksılar.' },
        { name: 'Aydınlatma', slug: 'aydinlatma', description: 'Atmosfer yaratan gölge oyunları.' },
        { name: 'Dekoratif Objeler', slug: 'dekoratif', description: 'Evinize şıklık katan detaylar.' },
        { name: 'Ofis & Düzen', slug: 'ofis', description: 'Çalışma alanınızı düzenleyen estetik çözümler.' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
    }

    console.log('Kategoriler oluşturuldu!');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
