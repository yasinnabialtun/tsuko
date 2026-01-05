
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('--- SEEDING START ---');

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
    console.log('Categories created.');

    const vazolar = await prisma.category.findUnique({ where: { slug: 'vazolar' } });
    const saksilar = await prisma.category.findUnique({ where: { slug: 'saksilar' } });
    const dekoratif = await prisma.category.findUnique({ where: { slug: 'dekoratif' } });

    // 2. Ürünler
    const products = [
        {
            name: 'Flow Parametrik Vazo',
            slug: 'flow-parametrik-vazo',
            description: 'Modern mimarinin akışkan formlarından esinlenen Flow Vazo, 3D baskı teknolojisi ile üretilmiştir. Mat dokusu ve katmanlı yapısı ile yaşam alanınıza dinamik bir hava katar.',
            price: 450,
            stock: 12,
            images: [
                'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=1000&auto=format&fit=crop'
            ],
            categoryId: vazolar!.id,
            isActive: true,
            isFeatured: true,
            seoTitle: 'Flow Parametrik Vazo | Tsuko Design',
            seoDescription: 'Modern 3D baskı vazo tasarımı.'
        },
        {
            name: 'Keklik Minimalist Saksı',
            slug: 'keklik-minimalist-saksi',
            description: 'Minimalist geometrik formların sıcak renklerle buluşması. Bitkileriniz için hem şık hem de sürdürülebilir bir yuva.',
            price: 280,
            stock: 25,
            images: [
                'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599933333454-e9104e767e9b?q=80&w=1000&auto=format&fit=crop'
            ],
            categoryId: saksilar!.id,
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Origami Kağıt Ağırlığı',
            slug: 'origami-kagit-agirligi',
            description: 'Origami sanatından ilham alan bu dekoratif obje, çalışma masanıza sanatsal bir dokunuş getirir.',
            price: 150,
            stock: 50,
            images: [
                'https://images.unsplash.com/photo-1544413647-b510493cf8e7?q=80&w=1000&auto=format&fit=crop'
            ],
            categoryId: dekoratif!.id,
            isActive: true,
            isFeatured: false,
        }
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        })
    }

    // 3. Ayarlar (Singleton)
    const settingsData = {
        siteName: 'Tsuko Design',
        siteDescription: 'Mimari Estetik, Evinize Taşındı.',
        siteUrl: 'https://tsukodesign.com',
        heroTitle: 'ZAMANIN ÖTESİNDE TASARIMLAR',
        heroSubtitle: 'Evinizin ruhunu yansıtan, sürdürülebilir ve estetik parçalar.',
        maintenanceMode: false
    };

    await prisma.settings.upsert({
        where: { id: 'singleton' },
        update: settingsData,
        create: {
            id: 'singleton',
            ...settingsData
        }
    });

    console.log('Products and Settings created.');
    console.log('--- SEEDING COMPLETE ---');
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
