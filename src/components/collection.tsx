'use client';

import { useState } from 'react';
import ProductCard from './product-card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { Product } from '@/types';

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
        <section id="collection" className="py-28 transition-colors duration-1000 bg-[var(--color-sand)]">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 border-b-4 border-black pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 bg-[var(--color-purple)] text-white text-xs font-black uppercase tracking-widest border border-black rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            Seçkin Parçalar
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-black">
                            Koleksiyon
                        </h2>
                        <p className="text-lg text-black/70 max-w-lg font-bold leading-relaxed">
                            Evinizin ruhunu canlandıracak, her biri sanat eseri niteliğinde renkli tasarımlar.
                        </p>
                    </motion.div>

                    {/* Filter Button & Navigation */}
                    <div className="relative z-30">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-4 px-6 py-3 rounded-xl border-2 border-black bg-white text-black hover:bg-[var(--color-yellow)] transition-all group w-[220px] justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                        >
                            <span className="text-xs font-black uppercase tracking-widest transition-opacity">
                                KATEGORİ SEÇ
                            </span>
                            <ChevronDown size={20} className={cn("transition-transform duration-300", isMenuOpen && "rotate-180")} strokeWidth={3} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <>
                                    {/* Desktop Dropdown */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="hidden md:block absolute right-0 mt-2 w-64 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black p-2 overflow-hidden bg-white z-50"
                                    >
                                        {CATEGORIES.map((cat, index) => {
                                            let slug = 'all';
                                            if (cat === 'DUVAR SAATLERİ') slug = 'duvar-saatleri';
                                            else if (cat === 'AYDINLATMALAR') slug = 'aydinlatmalar';
                                            else if (cat === 'VAZO VE SAKSILAR') slug = 'vazo-ve-saksilar';
                                            else if (cat === 'DÜZENLEYİCİLER') slug = 'duzenleyiciler';

                                            const colors = ['bg-[var(--color-blue)]', 'bg-[var(--color-pink)]', 'bg-[var(--color-yellow)]', 'bg-[var(--color-green)]', 'bg-[var(--color-purple)]'];
                                            const hoverColor = colors[index % colors.length];

                                            return (
                                                <Link
                                                    key={cat}
                                                    href={`/category/${slug}`}
                                                    className={`block w-full text-left px-5 py-3 rounded-xl text-xs font-black tracking-widest transition-all text-black hover:text-white hover:${hoverColor} border border-transparent hover:border-black mb-1 last:mb-0`}
                                                >
                                                    {cat}
                                                </Link>
                                            );
                                        })}
                                    </motion.div>

                                    {/* Mobile Bottom Sheet Overlay */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                                    />

                                    {/* Mobile Bottom Sheet Content */}
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] bg-[var(--color-sand)] border-t-2 border-black"
                                    >
                                        <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-8" />

                                        <h3 className="text-2xl font-black mb-6 px-2 text-black uppercase tracking-tight">Kategoriler</h3>

                                        <div className="space-y-3">
                                            {CATEGORIES.map((cat, index) => {
                                                let slug = 'all';
                                                if (cat === 'DUVAR SAATLERİ') slug = 'duvar-saatleri';
                                                else if (cat === 'AYDINLATMALAR') slug = 'aydinlatmalar';
                                                else if (cat === 'VAZO VE SAKSILAR') slug = 'vazo-ve-saksilar';
                                                else if (cat === 'DÜZENLEYİCİLER') slug = 'duzenleyiciler';

                                                const colors = ['bg-[var(--color-blue)]', 'bg-[var(--color-pink)]', 'bg-[var(--color-yellow)]', 'bg-[var(--color-green)]', 'bg-[var(--color-purple)]'];
                                                const boxColor = colors[index % colors.length];

                                                return (
                                                    <Link
                                                        key={cat}
                                                        href={`/category/${slug}`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className={`flex items-center justify-between w-full px-6 py-4 rounded-xl text-sm font-black transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none text-white ${boxColor}`}
                                                    >
                                                        {cat}
                                                        <ArrowRight size={20} className="text-white" strokeWidth={3} />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>

                        {/* Desktop Overlay Click to Close */}
                        {isMenuOpen && (
                            <div className="hidden md:block fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                        )}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20"
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
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {products.length === 0 && (
                        <div className="col-span-full py-32 text-center rounded-3xl bg-white border-2 border-dashed border-black/20">
                            <p className="opacity-40 font-black tracking-widest text-xs uppercase">Koleksiyon güncelleniyor...</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-40 text-center">
                    <Link href="/category/all" className="inline-flex items-center gap-4 px-10 py-5 rounded-xl font-black text-xs tracking-[0.2em] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] group border-2 border-black bg-[var(--color-pink)] text-white hover:bg-white hover:text-black">
                        <span>TÜM ÜRÜNLERİ İNCELE</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform stroke-[3]" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
