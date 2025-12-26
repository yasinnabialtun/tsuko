'use client';

import { motion } from 'framer-motion';
import ProductCard from './product-card';
import { products } from '@/lib/data';

export default function Collection() {
    return (
        <section id="collection" className="py-24 px-6 bg-alabaster">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-sage font-bold tracking-widest uppercase text-sm mb-4 block">
                            Curated Studio
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold text-charcoal">
                            Koleksiyon
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-charcoal/50 max-w-sm text-right"
                    >
                        Her bir parça limitli sayıda üretilir ve kendine özgü katman izlerini taşır. 3D tasarımın en saf hali.
                    </motion.p>
                </div>

                {/* Asymmetric Masonry-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={index % 3 === 1 ? "lg:translate-y-24" : ""}
                        >
                            <ProductCard product={product} index={index} />
                        </div>
                    ))}
                </div>

                {/* Spacer for the translated item */}
                <div className="hidden lg:block h-24"></div>
            </div>
        </section>
    );
}
