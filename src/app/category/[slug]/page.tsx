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

    const themeClass = getCategoryTheme(categoryName);

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
        <main className={cn("min-h-screen transition-colors duration-1000", themeClass)} style={{ backgroundColor: 'var(--mood-bg)', color: 'var(--mood-text)' }}>
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

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 border-b border-current/10 pb-12">
                        <div className="space-y-4">
                            <span className="text-[var(--mood-accent)] text-xs tracking-[0.2em] font-black uppercase opacity-80 block">
                                {products.length} Eser Listeleniyor
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none capitalize">
                                {categoryName}
                            </h1>
                            <p className="opacity-60 text-lg max-w-2xl font-light leading-relaxed">
                                {categoryDescription}
                            </p>
                        </div>

                        {/* Sort Actions */}
                        <div className="flex gap-2 bg-current/5 p-1.5 rounded-2xl backdrop-blur-sm border border-current/5">
                            <a href={`?sort=newest`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                sort === 'newest' ? "bg-white text-charcoal shadow-xl" : "opacity-40 hover:opacity-100"
                            )}>
                                Yeniler
                            </a>
                            <a href={`?sort=price-asc`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                sort === 'price-asc' ? "bg-white text-charcoal shadow-xl" : "opacity-40 hover:opacity-100"
                            )}>
                                Artan
                            </a>
                            <a href={`?sort=price-desc`} className={cn(
                                "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                sort === 'price-desc' ? "bg-white text-charcoal shadow-xl" : "opacity-40 hover:opacity-100"
                            )}>
                                Azalan
                            </a>
                        </div>
                    </div>

                    {/* Product Grid - Using our Premium Architecture */}
                    <div className="w-full">
                        {formattedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                                {formattedProducts.map((product, index) => (
                                    <div key={product.id} className={cn("transition-all duration-700", index % 2 === 1 && "lg:translate-y-16")}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-current/5 rounded-[3rem] p-24 text-center border border-current/5">
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
