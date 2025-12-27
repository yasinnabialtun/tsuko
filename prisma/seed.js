
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    const categories = [
        {
            name: 'Duvar Saatleri',
            slug: 'duvar-saatleri',
            description: 'Zamanın en estetik hali. Minimalist ve modern duvar saatleri.'
        },
        {
            name: 'Aydınlatmalar',
            slug: 'aydinlatmalar',
            description: 'Mekanınıza sıcaklık katan parametrik aydınlatma tasarımları.'
        },
        {
            name: 'Vazo ve Saksılar',
            slug: 'vazo-ve-saksilar',
            description: 'Doğayı sanatla buluşturan özgün vazo ve saksı koleksiyonu.'
        },
        {
            name: 'Düzenleyiciler',
            slug: 'duzenleyiciler',
            description: 'Masaüstü ve yaşam alanlarınız için şık düzenleme çözümleri.'
        }
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    console.log('✅ Categories seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
