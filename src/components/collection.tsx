'use client';

import ProductCard from './product-card';
import { motion } from 'framer-motion';

// Define the Product interface if not already centralized
interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    slug: string;
    // Add other fields as needed
}

export default function Collection({ products = [] }: { products?: Product[] }) {

    // Fallback if no products are passed (for safety)
    const displayProducts = products.length > 0 ? products : [];

    return (
        <section id="collection" className="py-24 bg-alabaster">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-bold text-charcoal border-b-2 border-charcoal/20 pb-1 hover:border-charcoal transition-colors uppercase tracking-widest"
                    >
                        Tümünü Gör
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {displayProducts.map((product, index) => (
                        <div key={product.id} className={index % 2 === 1 ? "md:translate-y-12" : ""}>
                            <ProductCard product={product as any} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
transition = {{ duration: 0.8 }}
                    >
                        <span className="text-sage font-bold tracking-widest uppercase text-sm mb-4 block">
                            Curated Studio
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold text-charcoal">
                            Koleksiyon
                        </h2>
                    </motion.div >
    <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-charcoal/50 max-w-sm text-right"
    >
        Her bir parça limitli sayıda üretilir ve kendine özgü katman izlerini taşır. 3D tasarımın en saf hali.
    </motion.p>
                </div >

    {/* Asymmetric Masonry-style Grid */ }
    < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" >
    {
        products.map((product, index) => (
            <div
                key={product.id}
                className={index % 3 === 1 ? "lg:translate-y-24" : ""}
            >
                <ProductCard product={product} index={index} />
            </div>
        ))
    }
                </div >

    {/* Spacer for the translated item */ }
    < div className = "hidden lg:block h-24" ></div >
            </div >
        </section >
    );
}
