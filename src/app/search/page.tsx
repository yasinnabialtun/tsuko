import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function searchData(query: string) {
    if (!query) return { products: [], posts: [] };

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { description: { contains: query } }
            ],
            isActive: true
        },
        include: { category: true },
        take: 20
    });

    const posts = await prisma.blogPost.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { excerpt: { contains: query } },
                { content: { contains: query } }
            ]
        },
        take: 10
    });

    return {
        products: products.map(p => ({
            ...p,
            price: p.price.toString(),
            image: p.images[0] || '/images/hero.png'
        })),
        posts: posts
    };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const sp = await searchParams;
    const query = sp.q || '';
    const { products, posts } = await searchData(query);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-20 px-6 bg-porcelain">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <SearchIcon size={24} className="text-clay" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-4">
                        {query ? `"${query}" için sonuçlar` : 'Arama yapın'}
                    </h1>
                    <p className="text-charcoal/40 font-bold uppercase tracking-widest text-xs">
                        {products.length + posts.length} sonuç bulundu
                    </p>
                </div>
            </div>

            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    {query && products.length === 0 && posts.length === 0 ? (
                        <div className="text-center py-20 bg-alabaster rounded-3xl border border-dashed border-charcoal/10">
                            <p className="text-charcoal/60 text-lg mb-6">Aradığınız kriterlere uygun sonuç bulunamadı.</p>
                            <Link href="/collection" className="bg-charcoal text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors uppercase tracking-widest text-xs">
                                Koleksiyonu İncele
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {/* Products */}
                            {products.length > 0 && (
                                <div>
                                    <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
                                        <h2 className="text-2xl font-bold text-charcoal uppercase tracking-tighter">Ürünler</h2>
                                        <span className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">{products.length} Ürün</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {products.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product as any}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Posts */}
                            {posts.length > 0 && (
                                <div>
                                    <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
                                        <h2 className="text-2xl font-bold text-charcoal uppercase tracking-tighter">Yazılar & Journal</h2>
                                        <span className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">{posts.length} Yazı</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {posts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/blog/${post.slug}`}
                                                className="group bg-alabaster rounded-3xl p-6 flex gap-6 hover:bg-porcelain transition-all border border-transparent hover:border-charcoal/5"
                                            >
                                                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                                                    <Image
                                                        src={post.coverImage || '/images/hero.png'}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-clay mb-2">{post.category}</span>
                                                    <h3 className="text-lg font-bold text-charcoal group-hover:text-mauve transition-colors line-clamp-2 leading-tight">
                                                        {post.title}
                                                    </h3>
                                                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-charcoal/40 group-hover:text-charcoal transition-colors">
                                                        Devamını Oku <ArrowRight size={14} />
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
