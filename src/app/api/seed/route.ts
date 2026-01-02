import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    // Basic security: only allow in development or with a secret key
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');
    if (process.env.NODE_ENV === 'production' && secret !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Check if data already exists
        const productCount = await prisma.product.count();
        if (productCount > 0 && !searchParams.get('force')) {
            return NextResponse.json({ message: 'Database already has data. Use ?force=true to ignore.' });
        }

        console.log('Starting seed...');

        // 1. Categories
        const catVazo = await prisma.category.upsert({
            where: { slug: 'vazo' },
            update: {},
            create: { name: 'Vazo & Saksı', slug: 'vazo', description: 'Modern formlar, organik dokular.' }
        });

        const catLight = await prisma.category.upsert({
            where: { slug: 'aydinlatma' },
            update: {},
            create: { name: 'Aydınlatma', slug: 'aydinlatma', description: 'Mekana ruh katan ışık oyunları.' }
        });

        const catDecor = await prisma.category.upsert({
            where: { slug: 'obje' },
            update: {},
            create: { name: 'Dekoratif Obje', slug: 'obje', description: 'Duvar sanatı ve masaüstü aksesuarları.' }
        });

        // 2. Products with Rich Content
        const products = [
            {
                name: 'Kıvrım Vazo - Fildişi',
                slug: 'kivrim-vazo-fildisi',
                description: 'Japon wab-sabi felsefesinden ilham alan, kusurlu güzelliği yücelten minimalist bir tasarım. %100 biyolojik olarak parçalanabilen PLA malzeme ile üretilmiştir. Su sızdırmazlık işlemi uygulanmıştır.',
                price: 1450,
                stock: 12,
                images: ['/images/hero.png'], // Placeholder
                categoryId: catVazo.id,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'Mantar Masa Lambası',
                slug: 'mantar-masa-lambasi',
                description: 'Gece okumaları için tasarlanmış, göz yormayan yumuşak ışık. Organik formuyla hem lamba hem heykel.',
                price: 2200,
                stock: 8,
                images: ['/images/hero.png'],
                categoryId: catLight.id,
                isFeatured: true,
                isActive: true
            },
            {
                name: 'Parametrik Duvar Panosu',
                slug: 'parametrik-duvar-panosu',
                description: 'Ses akustiğini düzenleyen ve duvara derinlik katan 3D baskı paneller. Modüler yapısı sayesinde istediğiniz boyutta kurulum yapabilirsiniz.',
                price: 850,
                stock: 45,
                images: ['/images/hero.png'],
                categoryId: catDecor.id,
                isFeatured: false,
                isActive: true
            },
            {
                name: 'Origami Saksı Seti',
                slug: 'origami-saksi-seti',
                description: 'Geometrik keskin hatların bitkilerin organik formlarıyla buluşması. 3 farklı boyutta set halinde gönderilir.',
                price: 650,
                stock: 20,
                images: ['/images/hero.png'],
                categoryId: catVazo.id,
                isFeatured: true,
                isActive: true
            }
        ];

        for (const p of products) {
            await prisma.product.upsert({
                where: { slug: p.slug },
                update: {},
                create: p
            });
        }

        // 3. Coupons
        await prisma.coupon.upsert({
            where: { code: 'MERHABA10' },
            update: {},
            create: {
                code: 'MERHABA10',
                discountType: 'PERCENTAGE',
                discountValue: 10,
                usageLimit: 100,
                usedCount: 0,
                isActive: true
            }
        });

        // 4. Blog Posts
        await prisma.blogPost.createMany({
            skipDuplicates: true,
            data: [
                {
                    title: '2025 Ev Dekorasyon Trendleri: Soft Minimalizm',
                    slug: '2025-dekorasyon-trendleri',
                    excerpt: 'Gelecek yıl evlerimizde daha fazla kavisli form, doğal doku ve pastel tonlar göreceğiz.',
                    content: '<p>Minimalizm artık soğuk ve boş mekanlar demek değil...</p>',
                    coverImage: '/images/hero.png',
                    category: 'Trendler',
                    date: '28 Aralık 2025',
                    published: true
                }
            ]
        });

        console.log('Seed completed successfully.');
        return NextResponse.json({ message: 'Database seeded successfully with rich content!' });
    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Failed to seed database', details: error }, { status: 500 });
    }
}
