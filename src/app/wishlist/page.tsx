'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useWishlist } from '@/context/wishlist-context';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
    const { items: wishlistIds, removeItem } = useWishlist();
    const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlistProducts() {
            if (wishlistIds.length === 0) {
                setWishlistProducts([]);
                setLoading(false);
                return;
            }

            try {
                // In a real app, you would send IDs to backend: /api/products?ids=1,2,3
                // Here we fetch all and filter client-side for simplicity (MVP)
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const allProducts = await res.json();

                // Filter matching products
                const filtered = allProducts.filter((p: any) => wishlistIds.includes(p.id));
                setWishlistProducts(filtered);
            } catch (error) {
                console.error("Wishlist data error", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlistProducts();
    }, [wishlistIds]);

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

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 size={40} className="animate-spin text-clay" />
                        </div>
                    ) : wishlistProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-charcoal/40 mb-8">Listeniz boş görünüyor.</p>
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
                                                src={product.images?.[0] || '/images/hero.png'}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="absolute top-4 right-4 bg-white/90 p-3 rounded-full text-rose hover:bg-white transition-all shadow-sm"
                                                title="Favorilerden Çıkar"
                                            >
                                                <Heart size={20} fill="currentColor" className="text-red-500" />
                                            </button>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-bold text-charcoal">{product.name}</h3>
                                                <div className="text-xl font-medium text-charcoal/60">
                                                    {product.price} ₺
                                                </div>
                                            </div>
                                            <p className="text-charcoal/50 text-sm mb-6 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="mt-auto flex gap-4">
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-charcoal/10 font-bold text-charcoal hover:bg-white transition-colors"
                                                >
                                                    İncele
                                                </Link>
                                                {/* Add to chart logic could be here, but linking to product page is safer for variant selection */}
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-charcoal text-white font-bold hover:bg-black transition-colors"
                                                >
                                                    <ShoppingBag size={18} />
                                                    Sepete Ekle
                                                </Link>
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
