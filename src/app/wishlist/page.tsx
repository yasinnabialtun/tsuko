'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useWishlist } from '@/context/wishlist-context';
import { products } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();

    // Find product details for items in wishlist
    const wishlistProducts = products.filter(p => items.includes(p.id));

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-6 md:px-0">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-charcoal mb-4">Favorilerim</h1>
                        <p className="text-charcoal/60 text-lg">
                            {wishlistProducts.length > 0
                                ? `${wishlistProducts.length} adet favori parça.`
                                : "Henüz favoriye eklenmiş bir ürün yok."}
                        </p>
                    </div>

                    {wishlistProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <Link
                                href="/#collection"
                                className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-all"
                            >
                                Koleksiyonu Keşfet <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {wishlistProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group bg-alabaster rounded-[2rem] overflow-hidden border border-black/5 flex flex-col"
                                    >
                                        <div className="relative aspect-square">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-rose hover:bg-white transition-all shadow-sm"
                                                title="Favorilerden Çıkar"
                                            >
                                                <Heart size={20} fill="currentColor" />
                                            </button>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-charcoal">{product.name}</h3>
                                                <p className="text-xl font-medium text-charcoal/60">{product.price}</p>
                                            </div>
                                            <p className="text-charcoal/50 text-sm mb-6 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="mt-auto flex gap-4">
                                                <Link
                                                    href={`/product/${product.id}`}
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-charcoal/10 font-bold text-charcoal hover:bg-white transition-colors"
                                                >
                                                    İncele
                                                </Link>
                                                <a
                                                    href={product.shopierUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-charcoal text-white font-bold hover:bg-black transition-colors"
                                                >
                                                    Satın Al
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
