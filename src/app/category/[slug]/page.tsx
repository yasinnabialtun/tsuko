import { prisma } from '@/lib/prisma';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import Breadcrumbs from '@/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Metadata } from 'next';

// Revalidate every hour
export const revalidate = 3600;

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 1. Dynamic SEO Metadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;

    // Handle "all" case or specific category
    if (slug === 'all') {
        return {
            title: 'Tüm Koleksiyon | Tsuko Design',
            description: 'Tsuko Design\'ın tüm sürdürülebilir 3D baskı dekorasyon ürünlerini keşfedin. Vazolardan aydınlatmaya modern tasarımlar.',
        };
    }

    const category = await prisma.category.findUnique({
        where: { slug },
    });

    if (!category) {
        return {
            title: 'Kategori Bulunamadı | Tsuko Design',
        };
    }

    return {
        title: `${category.name} | Tsuko Design`,
        description: category.description || `${category.name} koleksiyonumuzla evinize modern bir dokunuş katın.`,
        openGraph: {
            title: `${category.name} Koleksiyonu`,
            description: category.description || 'Sürdürülebilir ve estetik tasarımlar.',
        }
    };
}

// 2. Generate Static Paths for faster loading
export async function generateStaticParams() {
    try {
        const categories = await prisma.category.findMany({
            select: { slug: true }
        });
        return categories.map((c: { slug: string }) => ({ slug: c.slug }));
    } catch {
        return [];
    }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const sort = resolvedSearchParams.sort as string || 'newest';

    // 3. Database Fetching Logic
    let categoryName = '';
    let categoryDescription = '';
    let products = [];

    if (slug === 'all') {
        categoryName = 'Tüm Koleksiyon';
        categoryDescription = 'Modern yaşam alanları için tasarlanmış, sürdürülebilir ve estetik parçalar.';
        products = await prisma.product.findMany({
            where: { isActive: true },
            include: { category: true },
            orderBy: sort === 'price-asc' ? { price: 'asc' } :
                sort === 'price-desc' ? { price: 'desc' } :
                    { createdAt: 'desc' }
        });
    } else {
        const category = await prisma.category.findUnique({
            where: { slug },
            include: {
                products: {
                    where: { isActive: true },
                    include: { category: true },
                    orderBy: sort === 'price-asc' ? { price: 'asc' } :
                        sort === 'price-desc' ? { price: 'desc' } :
                            { createdAt: 'desc' }
                }
            }
        });

        if (!category) {
            notFound();
        }

        categoryName = category.name;
        categoryDescription = category.description || 'Bu kategorideki özel tasarım ürünlerimizi keşfedin.';
        products = category.products;
    }

    // Transform for frontend
    const formattedProducts = products.map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.images[0] || '/images/hero.png',
        price: `${p.price.toString()} ₺`,
        category: p.category?.name
    }));

    // Schema.org Structured Data
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Anasayfa',
                item: 'https://tsukodesign.com'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: categoryName,
                item: `https://tsukodesign.com/category/${slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-0">
                <div className="container mx-auto">

                    <Breadcrumbs items={[
                        { label: 'Koleksiyon', href: '/#collection' },
                        { label: categoryName, href: `/category/${slug}` }
                    ]} />

                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-4 capitalize">
                                {categoryName}
                            </h1>
                            <p className="text-charcoal/60 text-lg max-w-2xl">
                                {categoryDescription}
                                <span className="block mt-2 text-sm font-bold text-clay uppercase tracking-widest">
                                    {products.length} Ürün Listeleniyor
                                </span>
                            </p>
                        </div>

                        {/* Sort Actions (Client-side functionality handled via URL params or simple links in SSR) */}
                        <div className="flex gap-4">
                            {/* Simple Sort Links for SSR SEO */}
                            <div className="hidden md:flex bg-alabaster rounded-xl p-1">
                                <a href={`?sort=newest`} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'newest' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/40 hover:text-charcoal'}`}>
                                    Yeniler
                                </a>
                                <a href={`?sort=price-asc`} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'price-asc' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/40 hover:text-charcoal'}`}>
                                    Fiyat Artan
                                </a>
                                <a href={`?sort=price-desc`} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sort === 'price-desc' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/40 hover:text-charcoal'}`}>
                                    Fiyat Azalan
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full">
                        {formattedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {formattedProducts.map((product: any, index: number) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-alabaster rounded-3xl p-16 text-center text-charcoal/50 border border-black/5">
                                <SlidersHorizontal className="mx-auto mb-4 opacity-20" size={48} />
                                <p className="font-bold text-xl mb-2">Bu kategoride henüz ürün yok.</p>
                                <p>Yeni tasarımlarımız fırından çıkmak üzere! Lütfen daha sonra tekrar kontrol edin.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
