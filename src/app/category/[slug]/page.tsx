'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import Breadcrumbs from '@/components/breadcrumbs';
import { products } from '@/lib/data';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const [localParams, setLocalParams] = useState<{ slug: string } | null>(null);

    // Unwrap params
    useState(() => {
        params.then(setLocalParams);
    });

    const slug = localParams?.slug;
    const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';

    // State for filters
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

    // Mock data filtering (In a real app, this would be more robust)
    // Mapping slug to category names in data.ts usually requires exact match or normalization
    const categoryProducts = products.filter(p =>
        slug === 'all' ? true : p.category.toLowerCase().includes(slug?.toLowerCase() || '')
    );

    // Sorting Logic
    const sortedProducts = [...categoryProducts].sort((a, b) => {
        if (sortBy === 'price-asc') {
            return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
        }
        if (sortBy === 'price-desc') {
            return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        }
        return 0; // Default (id based or newest)
    });

    if (!slug) return <div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-0">
                <div className="container mx-auto">

                    <Breadcrumbs items={[
                        { label: 'Koleksiyon', href: '/#collection' },
                        { label: categoryName, href: `/category/${slug}` }
                    ]} />

                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h1 className="text-5xl font-black text-charcoal mb-4 capitalize">{categoryName === 'All' ? 'Tüm Koleksiyon' : `${categoryName} Koleksiyonu`}</h1>
                            <p className="text-charcoal/60 text-lg max-w-2xl">
                                Yaşam alanınıza mimari bir dokunuş katacak, sürdürülebilir materyallerle üretilmiş eşsiz parçalar.
                                Toplam {categoryProducts.length} parça listeleniyor.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            {/* Filter Toggle (Mobile/Desktop) */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${showFilters ? 'bg-charcoal text-white' : 'bg-alabaster text-charcoal hover:bg-black/5'}`}
                            >
                                <SlidersHorizontal size={18} />
                                Filtrele
                            </button>

                            {/* Sort Dropdown */}
                            <div className="relative group z-20">
                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-alabaster text-charcoal font-bold hover:bg-black/5 transition-all">
                                    <ArrowUpDown size={18} />
                                    Sırala: {sortBy === 'newest' ? 'En Yeniler' : sortBy === 'price-asc' ? 'Fiyat: Artan' : 'Fiyat: Azalan'}
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-black/5 shadow-xl rounded-2xl overflow-hidden hidden group-hover:block p-2">
                                    <button onClick={() => setSortBy('newest')} className="w-full text-left px-4 py-2 hover:bg-alabaster rounded-lg text-sm font-medium transition-colors">En Yeniler</button>
                                    <button onClick={() => setSortBy('price-asc')} className="w-full text-left px-4 py-2 hover:bg-alabaster rounded-lg text-sm font-medium transition-colors">Fiyat (Düşükten Yükseğe)</button>
                                    <button onClick={() => setSortBy('price-desc')} className="w-full text-left px-4 py-2 hover:bg-alabaster rounded-lg text-sm font-medium transition-colors">Fiyat (Yüksekten Düşüğe)</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Dynamic Sidebar Filters */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.aside
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 300, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="flex-shrink-0 overflow-hidden"
                                >
                                    <div className="w-[300px] bg-alabaster p-8 rounded-3xl border border-black/5 space-y-8 sticky top-32">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-lg">Filtreler</h3>
                                            <button onClick={() => setShowFilters(false)}><X size={20} className="text-charcoal/40" /></button>
                                        </div>

                                        {/* Price Range Mock */}
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-charcoal/50 mb-4">Fiyat Aralığı</h4>
                                            <div className="flex gap-4 items-center">
                                                <input type="number" placeholder="Min" className="w-full bg-white p-3 rounded-xl text-sm border border-transparent focus:border-clay outline-none" />
                                                <span className="text-charcoal/40">-</span>
                                                <input type="number" placeholder="Max" className="w-full bg-white p-3 rounded-xl text-sm border border-transparent focus:border-clay outline-none" />
                                            </div>
                                        </div>

                                        {/* Material Mock */}
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-charcoal/50 mb-4">Materyal</h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="w-5 h-5 rounded border border-black/10 flex items-center justify-center group-hover:border-clay">
                                                        <div className="w-3 h-3 bg-clay rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-sm font-medium text-charcoal/80">Recycled PLA</span>
                                                </label>
                                                <label className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="w-5 h-5 rounded border border-black/10 flex items-center justify-center group-hover:border-clay"></div>
                                                    <span className="text-sm font-medium text-charcoal/80">Wood Blend</span>
                                                </label>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors">
                                            Sonuçları Göster
                                        </button>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Product Grid */}
                        <div className="flex-grow w-full">
                            {sortedProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {sortedProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-alabaster rounded-3xl p-12 text-center text-charcoal/50">
                                    <p className="font-bold text-xl mb-2">Ürün Bulunamadı 😔</p>
                                    <p>Seçtiğiniz kriterlere uygun ürünümüz kalmamış olabilir.</p>
                                    <button onClick={() => window.location.href = '/#collection'} className="mt-6 text-clay font-bold underline">Tüm Koleksiyonu Gör</button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
