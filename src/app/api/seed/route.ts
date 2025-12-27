import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Check if data already exists
        const productCount = await prisma.product.count();

        if (productCount > 0) {
            return NextResponse.json({ message: 'Database already has data.' });
        }

        // Create Categories
        const catVazo = await prisma.category.create({
            data: { name: 'Vazo', slug: 'vazo', description: 'Modern vazolar' }
        });

        const catAydinlatma = await prisma.category.create({
            data: { name: 'Aydınlatma', slug: 'aydinlatma', description: 'Tasarım aydınlatmalar' }
        });

        // Create Initial Products
        await prisma.product.createMany({
            data: [
                {
                    name: 'Nami Vazo',
                    slug: 'nami-vazo',
                    description: 'Minimalist Japon dalgalarından ilham alan 3D baskı vazo.',
                    price: 1250,
                    stock: 15,
                    images: ['/images/products/nami.png'],
                    categoryId: catVazo.id,
                    isFeatured: true
                },
                {
                    name: 'Mantar Lamba',
                    slug: 'mantar-lamba',
                    description: 'Sıcak bir atmosfer için organik formlu aydınlatma.',
                    price: 850,
                    stock: 10,
                    images: ['/images/products/mantar.png'],
                    categoryId: catAydinlatma.id,
                    isFeatured: true
                },
                {
                    name: 'Kaya Saksı',
                    slug: 'kaya-saksi',
                    description: 'Doğal taş dokusu ile minimalist saksı.',
                    price: 450,
                    stock: 20,
                    images: ['/images/products/kaya.png'],
                    categoryId: catVazo.id,
                    isFeatured: true
                }
            ]
        });

        // Create Initial Blog Posts
        await prisma.blogPost.createMany({
            data: [
                {
                    title: 'Minimalist Salon Dekorasyonu',
                    slug: 'minimalist-salon-dekorasyonu',
                    excerpt: 'Az eşya ile nasıl ferah ve şık bir salon yaratılır? İşte püf noktaları.',
                    content: '<p>Minimalizm sadece bir dekorasyon stili değil, bir yaşam felsefesidir...</p>',
                    coverImage: '/images/hero.png',
                    category: 'Dekorasyon',
                    date: '27 Aralık 2025'
                },
                {
                    title: 'Sürdürülebilir Tasarım Nedir?',
                    slug: 'surdurulebilir-tasarim-nedir',
                    excerpt: 'PLA ve mısır nişastası bazlı üretim evlerimize nasıl giriyor?',
                    content: '<p>Gezegenimizi korumak için tasarımlarımızı değiştirmeliyiz...</p>',
                    coverImage: '/images/products/nami.png',
                    category: 'Ekoloji',
                    date: '25 Aralık 2025'
                }
            ]
        });

        return NextResponse.json({ message: 'Database seeded successfully!' });
    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
