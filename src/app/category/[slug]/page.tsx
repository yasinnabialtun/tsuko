import { prisma } from '@/lib/prisma';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import Breadcrumbs from '@/components/breadcrumbs';
import { notFound } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Metadata } from 'next';
import { getCategoryTheme, cn } from '@/lib/utils';
import { Product } from '@/types';

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
    const formattedProducts: Product[] = products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.images[0] || '/images/hero.png',
        images: p.images,
        price: p.price.toString(),
        category: p.category,
        stock: p.stock
    }));

    // Removed legacy theme class
    const themeClass = "";

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
        <main className="min-h-screen bg-[var(--color-sand)] text-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Navbar />

            <section className="pt-40 pb-32">
                <div className="container-custom">

                    <Breadcrumbs items={[
                        { label: 'Koleksiyon', href: '/#collection' },
                        { label: categoryName, href: `/category/${slug}` }
                    ]} />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 border-b-4 border-black pb-12">
                        <div className="space-y-4">
                            <span className="inline-block px-3 py-1 bg-[var(--color-purple)] text-white text-xs tracking-[0.2em] font-black uppercase border border-black rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {products.length} Eser Listeleniyor
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none capitalize text-black">
                                {categoryName}
                            </h1>
                            <p className="text-black/70 text-lg max-w-2xl font-bold leading-relaxed border-l-4 border-[var(--color-yellow)] pl-4">
                                {categoryDescription}
                            </p>
                        </div>

                        {/* Sort Actions */}
                        <div className="flex gap-2 bg-white p-2 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <a href={`?sort=newest`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-transparent",
                                sort === 'newest' ? "bg-[var(--color-blue)] text-white border-black" : "text-black/50 hover:text-black hover:bg-gray-100"
                            )}>
                                Yeniler
                            </a>
                            <a href={`?sort=price-asc`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-transparent",
                                sort === 'price-asc' ? "bg-[var(--color-blue)] text-white border-black" : "text-black/50 hover:text-black hover:bg-gray-100"
                            )}>
                                Artan
                            </a>
                            <a href={`?sort=price-desc`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-transparent",
                                sort === 'price-desc' ? "bg-[var(--color-blue)] text-white border-black" : "text-black/50 hover:text-black hover:bg-gray-100"
                            )}>
                                Azalan
                            </a>
                        </div>
                    </div>

                    {/* Product Grid - Using our Premium Architecture */}
                    <div className="w-full">
                        {formattedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                                {formattedProducts.map((product, index) => (
                                    <div key={product.id} className={cn("transition-all duration-700", index % 2 === 1 && "lg:translate-y-16")}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-black/20">
                                <SlidersHorizontal className="mx-auto mb-6 opacity-20" size={64} />
                                <h3 className="font-bold text-2xl mb-4 tracking-tight">Koleksiyon Hazırlanıyor</h3>
                                <p className="opacity-50 max-w-md mx-auto">Yeni tasarımlarımız atölyede şekilleniyor. Lütfen daha sonra tekrar kontrol edin.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
