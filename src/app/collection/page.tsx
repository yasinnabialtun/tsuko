import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Metadata } from 'next';

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Koleksiyon | Tsuko Design',
    description: 'Tsuko Design özel tasarım 3D baskı vazo, saksı ve aydınlatma ürünlerini keşfedin.',
};

async function getProducts(categorySlug?: string) {
    const whereClause: any = { isActive: true };

    if (categorySlug && categorySlug !== 'all') {
        const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
        if (category) {
            whereClause.categoryId = category.id;
        }
    }

    try {
        const products = await prisma.product.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });
        return products;
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

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const sp = await searchParams; // Await the searchParams promise
    const selectedCategory = sp.category || 'all';
    const products = await getProducts(selectedCategory);
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
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link
                            href="/collection"
                            className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all ${selectedCategory === 'all' ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                        >
                            Tümü
                        </Link>
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                href={`/collection?category=${cat.slug}`}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all ${selectedCategory === cat.slug ? 'bg-charcoal text-white' : 'bg-gray-100 text-charcoal/60 hover:bg-gray-200'}`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-20 text-charcoal/50">
                            Bu kategoride henüz ürün bulunmuyor.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer">
                                    <div className="relative aspect-[4/5] bg-alabaster rounded-[2rem] overflow-hidden mb-6">
                                        <Image
                                            src={product.images[0] || '/images/hero.png'}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {product.stock === 0 && (
                                            <div className="absolute top-4 right-4 bg-charcoal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                                                Tükendi
                                            </div>
                                        )}
                                        {/* Quick Add Overlay (Desktop) */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white text-charcoal px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                                <ShoppingBag size={18} />
                                                İncele
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center space-y-2">
                                        <span className="text-[10px] font-bold tracking-widest text-clay uppercase">
                                            {(product as any).category?.name || 'DKOR'}
                                        </span>
                                        <h3 className="text-xl font-bold text-charcoal group-hover:text-mauve transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-lg font-medium text-charcoal/60">
                                            {String(product.price)} ₺
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
