'use client';

import { useState } from 'react';
import ProductCard from './product-card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    const [selectedCategory, setSelectedCategory] = useState('TÜMÜ');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const filteredProducts = selectedCategory === 'TÜMÜ'
        ? products
        : products.filter(p => p.category?.toUpperCase() === selectedCategory);

    return (
        <section id="collection" className="py-24 bg-alabaster">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
                            Koleksiyon
                        </h2>
                        <p className="text-xl text-charcoal/60 max-w-md">
                            Modern yaşam alanları için tasarlanmış, sürdürülebilir ve estetik parçalar.
                        </p>
                    </motion.div>

                    {/* Category Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 bg-white px-8 py-4 rounded-2xl border border-charcoal/5 shadow-sm hover:shadow-md transition-all group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest text-charcoal/40 group-hover:text-charcoal transition-colors">
                                Kategori: <span className="text-charcoal ml-1">{selectedCategory}</span>
                            </span>
                            <ChevronDown size={16} className={cn("text-charcoal/40 group-hover:text-charcoal transition-transform duration-300", isMenuOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-charcoal/5 p-2 z-20 overflow-hidden"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setIsMenuOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-6 py-4 rounded-xl text-sm font-bold transition-all",
                                                selectedCategory === cat
                                                    ? "bg-clay text-white"
                                                    : "text-charcoal/60 hover:bg-alabaster hover:text-charcoal"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Overlay to close menu */}
                        {isMenuOpen && (
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsMenuOpen(false)}
                            />
                        )}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className={index % 2 === 1 ? "md:translate-y-12" : ""}
                            >
                                <ProductCard product={product as any} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-charcoal/40 font-bold uppercase tracking-widest">Bu kategoride henüz ürün bulunmuyor.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
