import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import RecentlyViewed from '@/components/recently-viewed';
import ProductCard from '@/components/product-card';

// Force dynamic because we read searchParams and query DB
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Koleksiyon | Tsuko Design',
    description: 'Tsuko Design özel tasarım 3D baskı vazo, saksı ve aydınlatma ürünlerini keşfedin.',
};

async function getProducts(categorySlug?: string, sort?: string) {
    const whereClause: any = { isActive: true };

    if (categorySlug && categorySlug !== 'all') {
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) {
            whereClause.categoryId = category.id;
        }
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };

    try {
        const products = await prisma.product.findMany({
            where: whereClause,
            orderBy: orderBy,
            include: { category: true }
        });
        // Transform Decimal to number/string for client component
        return products.map(p => ({
            ...p,
            price: p.price.toString()
        }));
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

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category?: string, sort?: string }> }) {
    const sp = await searchParams;
    const selectedCategory = sp.category || 'all';
    const currentSort = sp.sort || 'newest';
    const products = await getProducts(selectedCategory, currentSort);
    const categories = await getCategories();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="bg-porcelain pt-40 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Mağaza</span>
                    <h1 className="text-5xl font-light text-charcoal mb-6">Tüm Koleksiyon</h1>
                    <p className="text-charcoal/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Doğadan ilham alan parametrik tasarımlar.
                    </p>
                </div>
            </div>

            <section className="py-20 px-6">
                <div className="container mx-auto">
                    {/* Filter & Sort Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Link
                                href={`/collection${currentSort !== 'newest' ? `?sort=${currentSort}` : ''}`}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all ${selectedCategory === 'all' ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                            >
                                Tümü
                            </Link>
                            {categories.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={`/collection?category=${cat.slug}${currentSort !== 'newest' ? `&sort=${currentSort}` : ''}`}
                                    className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all ${selectedCategory === cat.slug ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-4 border-b border-charcoal/10 pb-1">
                            <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Sırala:</span>
                            <div className="flex gap-4">
                                {[
                                    { label: 'En Yeni', value: 'newest' },
                                    { label: 'Fiyat (Artan)', value: 'price_asc' },
                                    { label: 'Fiyat (Azalan)', value: 'price_desc' }
                                ].map((opt) => (
                                    <Link
                                        key={opt.value}
                                        href={`/collection?${selectedCategory !== 'all' ? `category=${selectedCategory}&` : ''}sort=${opt.value}`}
                                        className={`text-xs font-bold transition-colors ${currentSort === opt.value ? 'text-clay' : 'text-charcoal/60 hover:text-charcoal'}`}
                                    >
                                        {opt.label}
                                    </Link>
                                ))}
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
