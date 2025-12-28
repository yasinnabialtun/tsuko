'use client';

import { useState } from 'react';
import ProductCard from './product-card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    slug: string;
    category?: string;
}

const CATEGORIES = [
    'TÜMÜ',
    'DUVAR SAATLERİ',
    'AYDINLATMALAR',
    'VAZO VE SAKSILAR',
    'DÜZENLEYİCİLER'
];

export default function Collection({ products = [] }: { products?: Product[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section id="collection" className="py-28 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 border-b border-stone/30 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-clay text-xs tracking-[0.2em] font-bold uppercase mb-4 block">Seçkin Parçalar</span>
                        <h2 className="text-5xl md:text-6xl font-light text-charcoal mb-4 tracking-tight">
                            Koleksiyon
                        </h2>
                        <p className="text-lg text-charcoal/60 max-w-lg font-light leading-relaxed">
                            Mekanlarınıza karakter katan, fonksiyonel ve estetik dengesi kusursuz tasarımlar.
                        </p>
                    </motion.div>

                    {/* Category Dropdown Navigation - Minimal */}
                    <div className="relative z-30">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-4 bg-porcelain px-6 py-3 rounded-full border border-stone/50 hover:border-mauve/50 transition-all group w-[220px] justify-between"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60 group-hover:text-charcoal transition-colors">
                                Filtrele
                            </span>
                            <ChevronDown size={16} className={cn("text-charcoal/40 group-hover:text-charcoal transition-transform duration-300", isMenuOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-stone/20 border border-stone/30 p-2 overflow-hidden"
                                >
                                    {CATEGORIES.map((cat) => {
                                        let slug = 'all';
                                        if (cat === 'DUVAR SAATLERİ') slug = 'duvar-saatleri';
                                        else if (cat === 'AYDINLATMALAR') slug = 'aydinlatmalar';
                                        else if (cat === 'VAZO VE SAKSILAR') slug = 'vazo-ve-saksilar';
                                        else if (cat === 'DÜZENLEYİCİLER') slug = 'duzenleyiciler';

                                        return (
                                            <a
                                                key={cat}
                                                href={`/category/${slug}`}
                                                className="block w-full text-left px-5 py-3 rounded-lg text-xs font-bold tracking-wider transition-all text-charcoal/50 hover:bg-porcelain hover:text-mauve"
                                            >
                                                {cat}
                                            </a>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isMenuOpen && (
                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                        )}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20"
                >
                    <AnimatePresence mode="popLayout">
                        {products.map((product, index) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={index % 2 === 1 ? "lg:translate-y-16" : ""} // Enhanced masonry effect
                            >
                                <ProductCard product={product as any} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {products.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-porcelain rounded-2xl">
                            <p className="text-charcoal/40 font-medium tracking-widest">Koleksiyon güncelleniyor...</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-40 text-center">
                    <Link href="/category/all" className="inline-flex items-center gap-3 bg-charcoal text-white px-10 py-5 rounded-xl font-medium hover:bg-clay transition-all shadow-xl shadow-charcoal/10 group">
                        <span>TÜM ÜRÜNLERİ İNCELE</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
