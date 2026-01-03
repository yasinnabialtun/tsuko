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
        <section id="collection" className="py-28 transition-colors duration-1000" style={{ backgroundColor: 'transparent' }}>
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 border-b border-current/10 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[var(--mood-accent)] text-xs tracking-[0.2em] font-black uppercase mb-4 block opacity-80">Seçkin Parçalar</span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter" style={{ color: 'var(--mood-text)' }}>
                            Koleksiyon
                        </h2>
                        <p className="text-lg opacity-60 max-w-lg font-light leading-relaxed" style={{ color: 'var(--mood-text)' }}>
                            Mekanlarınıza karakter katan, fonksiyonel ve estetik dengesi kusursuz tasarımlar.
                        </p>
                    </motion.div>

                    {/* Filter Button & Navigation */}
                    <div className="relative z-30">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-4 px-6 py-3 rounded-xl border border-current/10 hover:border-current/30 transition-all group w-[220px] justify-between"
                            style={{ backgroundColor: 'rgba(var(--mood-text), 0.02)' }}
                        >
                            <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                Filtrele
                            </span>
                            <ChevronDown size={16} className={cn("opacity-40 group-hover:opacity-100 transition-transform duration-300", isMenuOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <>
                                    {/* Desktop Dropdown */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="hidden md:block absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border border-current/10 p-2 overflow-hidden backdrop-blur-xl"
                                        style={{ backgroundColor: 'var(--mood-card-bg)', color: 'var(--mood-text)' }}
                                    >
                                        {CATEGORIES.map((cat) => {
                                            let slug = 'all';
                                            if (cat === 'DUVAR SAATLERİ') slug = 'duvar-saatleri';
                                            else if (cat === 'AYDINLATMALAR') slug = 'aydinlatmalar';
                                            else if (cat === 'VAZO VE SAKSILAR') slug = 'vazo-ve-saksilar';
                                            else if (cat === 'DÜZENLEYİCİLER') slug = 'duzenleyiciler';

                                            return (
                                                <Link
                                                    key={cat}
                                                    href={`/category/${slug}`}
                                                    className="block w-full text-left px-5 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all opacity-50 hover:opacity-100 hover:bg-current/5"
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
                                        className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
                                        style={{ backgroundColor: 'var(--mood-card-bg)', color: 'var(--mood-text)' }}
                                    >
                                        <div className="w-12 h-1.5 bg-current/10 rounded-full mx-auto mb-8" />

                                        <h3 className="text-2xl font-bold mb-6 px-2">Kategoriler</h3>

                                        <div className="space-y-2">
                                            {CATEGORIES.map((cat) => {
                                                let slug = 'all';
                                                if (cat === 'DUVAR SAATLERİ') slug = 'duvar-saatleri';
                                                else if (cat === 'AYDINLATMALAR') slug = 'aydinlatmalar';
                                                else if (cat === 'VAZO VE SAKSILAR') slug = 'vazo-ve-saksilar';
                                                else if (cat === 'DÜZENLEYİCİLER') slug = 'duzenleyiciler';

                                                return (
                                                    <Link
                                                        key={cat}
                                                        href={`/category/${slug}`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center justify-between w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all hover:bg-current/5 active:scale-[0.98]"
                                                        style={{ backgroundColor: 'rgba(var(--mood-text), 0.03)' }}
                                                    >
                                                        {cat}
                                                        <ArrowRight size={16} className="opacity-30" />
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
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20"
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
                        <div className="col-span-full py-32 text-center rounded-3xl" style={{ backgroundColor: 'rgba(var(--mood-text), 0.02)' }}>
                            <p className="opacity-40 font-black tracking-widest text-xs uppercase">Koleksiyon güncelleniyor...</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-40 text-center">
                    <Link href="/category/all" className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-2xl group hover:scale-[1.05]" style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}>
                        <span>TÜM ÜRÜNLERİ İNCELE</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
