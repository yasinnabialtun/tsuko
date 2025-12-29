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
                ...p,
                price: p.price.toString(),
                avgRating,
                reviewCount
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
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="bg-porcelain pt-40 pb-20 px-6">
                <div className="container mx-auto text-center flex flex-col items-center">
                    <Breadcrumbs
                        items={[
                            { label: 'Koleksiyon' },
                            ...(selectedCategory !== 'all' ? [{ label: categories.find(c => c.slug === selectedCategory)?.name || selectedCategory }] : [])
                        ]}
                    />
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block mt-4">Mağaza</span>
                    <h1 className="text-5xl font-light text-charcoal mb-6">Tüm Koleksiyon</h1>
                    <p className="text-charcoal/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Doğadan ilham alan parametrik tasarımlar.
                    </p>
                </div>
            </div>

            <section className="py-20 px-6">
                <div className="container mx-auto">
                    {/* Filter & Sort Bar */}
                    <div className="space-y-8 mb-16">
                        {/* Category & Sort Row */}
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-gray-100 pb-8">
                            {/* Filter Tabs */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link
                                    href={`/collection${currentSort !== 'newest' ? `?sort=${currentSort}` : ''}`}
                                    className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${selectedCategory === 'all' ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                                >
                                    Tümü
                                </Link>
                                {categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        href={`/collection?category=${cat.slug}${currentSort !== 'newest' ? `&sort=${currentSort}` : ''}`}
                                        className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${selectedCategory === cat.slug ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-6">
                                <CollectionFilters />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-20 text-charcoal/50">
                            Bu kategoride henüz ürün bulunmuyor.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
