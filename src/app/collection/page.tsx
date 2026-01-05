import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import RecentlyViewed from '@/components/recently-viewed';
import ProductCard from '@/components/product-card';
import Breadcrumbs from '@/components/breadcrumbs';
import CollectionFilters from '@/components/collection-filters';

// Force dynamic because we read searchParams and query DB
export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
    const sp = await searchParams;
    const categorySlug = sp.category;

    if (categorySlug && categorySlug !== 'all') {
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) {
            return {
                title: `${category.name} Koleksiyonu | Tsuko Design`,
                description: `${category.name} kategorisindeki özel tasarım 3D baskı ürünlerimizi keşfedin.`
            };
        }
    }

    return {
        title: 'Tüm Koleksiyon | Tsuko Design',
        description: 'Tsuko Design özel tasarım 3D baskı vazo, saksı ve aydınlatma ürünlerini keşfedin.',
    };
}

async function getProducts(categorySlug?: string, sort?: string, minPrice?: number, maxPrice?: number, material?: string, inStock?: boolean) {
    const whereClause: any = { isActive: true };

    if (categorySlug && categorySlug !== 'all') {
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) {
            whereClause.categoryId = category.id;
        }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        whereClause.price = {};
        if (minPrice !== undefined) whereClause.price.gte = minPrice;
        if (maxPrice !== undefined) whereClause.price.lte = maxPrice;
    }

    if (material) {
        whereClause.attributes = {
            path: ['material'],
            string_contains: material
        };
    }

    if (inStock) {
        whereClause.stock = { gt: 0 };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    try {
        const products = await prisma.product.findMany({
            where: whereClause,
            orderBy: orderBy,
            include: {
                category: true,
                reviews: {
                    select: { rating: true }
                }
            }
        });

        // Transform Decimal and calculate rating stats
        return products.map(p => {
            const reviewCount = p.reviews.length;
            const avgRating = reviewCount > 0
                ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
                : 0;

            return {
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price.toString(),
                images: p.images,
                image: p.images[0] || '/images/hero.png',
                stock: p.stock,
                categoryId: p.categoryId,
                description: p.description,
                isActive: p.isActive,
                isFeatured: p.isFeatured,
                avgRating,
                reviewCount,
                category: p.category ? {
                    id: p.category.id,
                    name: p.category.name,
                    slug: p.category.slug
                } : undefined
            };
        });
    } catch (e) {
        return [];
    }
}

async function getCategories() {
    try {
        return await prisma.category.findMany();
    } catch {
        return [];
    }
}

export default async function CollectionPage({ searchParams }: {
    searchParams: Promise<{
        category?: string,
        sort?: string,
        minPrice?: string,
        maxPrice?: string,
        material?: string,
        inStock?: string
    }>
}) {
    const sp = await searchParams;
    const selectedCategory = sp.category || 'all';
    const currentSort = sp.sort || 'newest';
    const minPrice = sp.minPrice ? parseFloat(sp.minPrice) : undefined;
    const maxPrice = sp.maxPrice ? parseFloat(sp.maxPrice) : undefined;
    const material = sp.material;
    const inStock = sp.inStock === 'true';

    const products = await getProducts(selectedCategory, currentSort, minPrice, maxPrice, material, inStock);
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-[var(--color-sand)] text-black selection:bg-[var(--color-pink)] selection:text-white">
            <Navbar />

            <div className="pt-32 md:pt-48 pb-12 px-6">
                <div className="container mx-auto text-center flex flex-col items-center">
                    <Breadcrumbs
                        items={[
                            { label: 'Koleksiyon' },
                            ...(selectedCategory !== 'all' ? [{ label: categories.find(c => c.slug === selectedCategory)?.name || selectedCategory }] : [])
                        ]}
                    />
                    <div className="inline-flex items-center gap-2 mt-6 mb-2">
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                        <span className="text-black text-xs font-black tracking-[0.3em] uppercase">Mağaza</span>
                        <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-black mb-6 uppercase tracking-tighter leading-[0.9]">
                        Tüm <span className="text-[var(--color-purple)]" style={{ WebkitTextStroke: '2px black' }}>Koleksiyon</span>
                    </h1>
                    <p className="text-black font-bold text-lg max-w-2xl mx-auto leading-relaxed border-2 border-black bg-white p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform">
                        Hayatına renk, enerji ve dopamin katacak tasarımlar burada! 🌈✨
                    </p>
                </div>
            </div>

            <section className="py-12 px-6">
                <div className="container mx-auto">
                    {/* Filter & Sort Bar */}
                    <div className="space-y-8 mb-16">
                        {/* Category & Sort Row */}
                        <div className="flex flex-col xl:flex-row justify-between items-center gap-8 pb-8 relative z-10 w-full">

                            {/* Filter Tabs - Horizontal Scroll on Mobile */}
                            <div className="w-full xl:w-auto overflow-x-auto pb-4 -mb-4 scrollbar-hide">
                                <div className="flex flex-nowrap md:flex-wrap items-center gap-3 px-1">
                                    <Link
                                        href={`/collection${currentSort !== 'newest' ? `?sort=${currentSort}` : ''}`}
                                        className={`flex-shrink-0 px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${selectedCategory === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[var(--color-yellow)]'}`}
                                    >
                                        Tümü
                                    </Link>
                                    {categories.map((cat, index) => {
                                        const colors = ['bg-[var(--color-blue)]', 'bg-[var(--color-pink)]', 'bg-[var(--color-green)]', 'bg-[var(--color-purple)]', 'bg-[var(--color-yellow)]'];
                                        const color = colors[index % colors.length];
                                        const isActive = selectedCategory === cat.slug;

                                        return (
                                            <Link
                                                key={cat.id}
                                                href={`/collection?category=${cat.slug}${currentSort !== 'newest' ? `&sort=${currentSort}` : ''}`}
                                                className={`flex-shrink-0 px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${isActive ? `${color} text-white` : 'bg-white text-black hover:bg-[var(--color-yellow)]'}`}
                                            >
                                                {cat.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Sort Dropdown & Product Count */}
                            <div className="flex items-center gap-6 w-full xl:w-auto justify-between xl:justify-end">
                                <div className="hidden md:block font-black uppercase text-xs tracking-widest opacity-60">
                                    {products.length} Ürün Listeleniyor
                                </div>
                                <CollectionFilters />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-20 bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto">
                            <span className="text-8xl animate-bounce">🙈</span>
                            <div className="font-black text-2xl uppercase mt-4">Bu kategoride henüz ürün yok!</div>
                            <p className="font-bold text-black/60 max-w-sm">Ama atölye harıl harıl çalışıyor... Yakında burası çok çılgın şeylerle dolacak, beklemede kal!</p>
                            <Link href="/collection" className="mt-6 px-8 py-4 bg-black text-white rounded-xl font-black uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                                Tümünü Göster
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        image: product.images[0] || '/images/hero.png',
                                        images: product.images,
                                        category: product.category ? { name: product.category.name } : undefined
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <RecentlyViewed />

            <Footer />
        </main>
    );
}
