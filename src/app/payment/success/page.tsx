'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CheckCircle2, Home, ShoppingBag, Instagram, Send } from 'lucide-react';
import { motion } from 'framer-motion';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderId');
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-32 h-32 bg-clay/10 rounded-full flex items-center justify-center text-clay mb-12 relative"
            >
                <CheckCircle2 size={64} />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full border-4 border-clay/20"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-5xl md:text-6xl font-black text-charcoal mb-6 tracking-tighter">
                    Mükemmel Seçim!
                </h1>
                <p className="text-xl text-charcoal/60 mb-12 max-w-xl mx-auto leading-relaxed">
                    Siparişiniz alındı ve tasarım ekibimiz tarafından hazırlık sürecine başlandı. Sanatın evinizdeki yolculuğu başlıyor.
                </p>
            </motion.div>

            {orderNumber && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-charcoal/5 border border-charcoal/5 mb-12 w-full relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <p className="text-xs text-charcoal/30 uppercase tracking-[0.3em] font-black mb-4">Sipariş Referansı</p>
                        <p className="text-4xl md:text-5xl font-mono font-black text-charcoal tracking-tight">#{orderNumber}</p>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-clay/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-clay/20 transition-colors" />
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-16"
            >
                <Link
                    href="/"
                    className="px-10 py-6 bg-charcoal text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-charcoal/10"
                >
                    <Home size={20} />
                    Anasayfaya Dön
                </Link>
                <Link
                    href="/#collection"
                    className="px-10 py-6 bg-white text-charcoal border border-charcoal/5 rounded-2xl font-bold hover:bg-alabaster transition-all flex items-center justify-center gap-3 shadow-md"
                >
                    <ShoppingBag size={20} />
                    Koleksiyonu Keşfet
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-12 border-t border-charcoal/5 w-full max-w-md"
            >
                <p className="text-sm font-bold text-charcoal/40 uppercase tracking-widest mb-6">Bizi Takip Edin</p>
                <div className="flex justify-center gap-8">
                    <a href="https://instagram.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="text-charcoal/40 hover:text-clay transition-colors flex flex-col items-center gap-2 group">
                        <Instagram size={24} />
                        <span className="text-[10px] font-black uppercase tracking-tighter group-hover:text-charcoal">Instagram</span>
                    </a>
                    <a href="mailto:info@tsukodesign.com" className="text-charcoal/40 hover:text-clay transition-colors flex flex-col items-center gap-2 group">
                        <Send size={24} />
                        <span className="text-[10px] font-black uppercase tracking-tighter group-hover:text-charcoal">E-Posta</span>
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-alabaster flex flex-col selection:bg-clay selection:text-white">
            <Navbar />

            <main className="flex-1 pt-40 pb-24 container mx-auto px-6 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-40 left-0 w-96 h-96 bg-clay/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-40 right-0 w-64 h-64 bg-charcoal/5 rounded-full blur-[100px] -z-10" />

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center h-96 gap-4">
                        <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin" />
                        <span className="text-charcoal/20 font-black uppercase tracking-[0.2em] text-xs">Sipariş Bilgisi Hazırlanıyor</span>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
