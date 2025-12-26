'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { products } from '@/lib/data';
import { ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';
import { motion, AnimatePresence } from 'framer-motion';

// Mock function to simulate "people viewing"
const getRandomViewers = () => Math.floor(Math.random() * (12 - 4 + 1)) + 4;

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [product, setProduct] = useState<typeof products[0] | null>(null);
    const [viewers, setViewers] = useState(0);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        // Unwrap params and find product
        params.then((resolvedParams) => {
            const found = products.find((p) => p.id === resolvedParams.id);
            setProduct(found || null);
        });

        // Set viewer count
        setViewers(getRandomViewers());

        // Scroll listener for sticky button
        const handleScroll = () => {
            setShowSticky(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [params]);

    if (!product) return <div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Sticky Mobile/Desktop CTA Bar */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full bg-white border-t border-black/10 p-4 z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4 md:px-12"
                    >
                        <div className="hidden md:flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal">{product.name}</h4>
                                <p className="text-sm text-charcoal/60">{product.price}</p>
                            </div>
                        </div>
                        <div className="flex-grow md:flex-grow-0 md:w-auto w-full">
                            <a
                                href={product.shopierUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto bg-charcoal text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={18} />
                                Satın Al
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-32 pb-24 px-6 container mx-auto">
                <Link
                    href="/#collection"
                    className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal font-bold uppercase tracking-widest text-xs mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> Koleksiyona Dön
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Gallery */}
                    <div className="relative aspect-[4/5] bg-alabaster rounded-[2rem] overflow-hidden shadow-sm group">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-charcoal shadow-sm">
                            %100 Orijinal Tasarım
                        </div>
                    </div>

                    {/* Product Info - The Conversion Engine */}
                    <div className="space-y-8 sticky top-32">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-orange-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <span className="text-xs font-bold text-charcoal/60">(24 Değerlendirme)</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <p className="text-3xl font-bold text-sage">{product.price}</p>
                                <span className="bg-rose/10 text-rose px-2 py-1 rounded-md text-xs font-bold">Ücretsiz Kargo</span>
                            </div>

                            {/* Urgency Trigger */}
                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-center gap-3 animate-pulse">
                                <Clock size={18} className="text-orange-600" />
                                <p className="text-sm font-bold text-orange-800">
                                    Şu an <span className="font-black">{viewers} kişi</span> bu ürünü inceliyor. Stoklar sınırlı.
                                </p>
                            </div>
                        </div>

                        <div className="prose prose-lg text-charcoal/70">
                            <p>{product.description}</p>
                        </div>

                        {/* Trust Signals Grid */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-black/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-alabaster flex items-center justify-center text-clay">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Kırılmazlık</p>
                                    <p className="text-xs text-charcoal/50">Garantili Kargo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-alabaster flex items-center justify-center text-clay">
                                    <Check size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Doğa Dostu</p>
                                    <p className="text-xs text-charcoal/50">PLA Materyal</p>
                                </div>
                            </div>
                        </div>

                        {/* Components */}
                        <div className="space-y-6">
                            <CouponValidation />

                            <a
                                href={product.shopierUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-6 rounded-2xl text-xl font-bold hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl shadow-charcoal/10"
                            >
                                <ShoppingBag size={24} />
                                Shopier ile Satın Al
                            </a>

                            <p className="text-[10px] text-center text-charcoal/40 flex items-center justify-center gap-2">
                                <ShieldCheck size={12} />
                                Güvenli Ödeme Altyapısı ve 14 Gün İade Garantisi
                            </p>

                            <BundleSuggester currentProductId={product.id} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
