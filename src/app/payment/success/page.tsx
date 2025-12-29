'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import confetti from 'canvas-confetti';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful payment
        clearCart();

        // Throw confetti!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4A373', '#4A4A4A', '#FAFAFA']
        });
    }, []);

    return (
        <div className="min-h-screen bg-porcelain flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 pt-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-charcoal/5 border border-black/5 text-center"
                >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>

                    <h1 className="text-3xl font-black text-charcoal mb-4 lowercase tracking-tighter">
                        siparişin alındı!
                    </h1>

                    <p className="text-charcoal/60 mb-8 leading-relaxed">
                        Harika seçim. Tasarım yolculuğu başlıyor. Sipariş numaran:
                        <span className="block font-black text-charcoal mt-1 text-lg">#{orderId || 'TSK-1234'}</span>
                    </p>

                    <div className="bg-alabaster rounded-2xl p-6 mb-8 text-left space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center shrink-0">
                                <Package size={16} className="text-charcoal" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-charcoal/40">Süreç</p>
                                <p className="text-xs text-charcoal/70 font-medium">Siparişin 1-3 iş günü içinde titizlikle paketlenip kargoya verilecek.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/collection"
                            className="w-full py-4 bg-charcoal text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-charcoal/10"
                        >
                            Keşfetmeye Devam Et
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/"
                            className="w-full py-4 bg-white text-charcoal border border-black/5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-alabaster transition-all"
                        >
                            Anasayfa
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
