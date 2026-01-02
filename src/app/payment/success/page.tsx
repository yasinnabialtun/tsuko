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
    const orderId = searchParams.get('orderId');
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4A373', '#4A4A4A', '#FAFAFA']
        });
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col transition-colors duration-1000">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 pt-40 pb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="max-w-xl w-full premium-card bg-white p-12 md:p-16 text-center"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-6 tracking-tighter">
                        HARİKA BİR SEÇİM!
                    </h1>


                    <p className="text-charcoal/60 mb-8 text-lg font-light leading-relaxed">
                        Siparişin başarıyla alındı. Atölyemizde senin için hazırlıklar başlıyor. Sipariş numaranı not etmeyi unutma:
                        <span className="block font-black text-charcoal mt-3 text-2xl tracking-tight">#{orderId || 'TSK-2024-X'}</span>
                    </p>

                    {/* Sustainability Impact Badge */}
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-12 flex items-start gap-4 text-left">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-green-800 text-sm uppercase tracking-wide mb-1">Doğa Sana Teşekkür Ediyor</h4>
                            <p className="text-xs text-green-700 leading-relaxed font-medium">
                                Bu siparişle, petrol türevi plastikler yerine %100 doğada çözünebilen biyo-materyal tercih ettin. Karbon ayak izini azalttığın için teşekkürler.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <div className="bg-current/5 rounded-2xl p-6 text-left border border-current/5">
                            <Package size={20} className="text-charcoal opacity-20 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-1">Teslimat</p>
                            <p className="text-xs text-charcoal/70 font-bold">1-3 iş günü içinde kargoya verilir.</p>
                        </div>
                        <div className="bg-current/5 rounded-2xl p-6 text-left border border-current/5">
                            <ShoppingBag size={20} className="text-charcoal opacity-20 mb-3" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-1">Takip</p>
                            <p className="text-xs text-charcoal/70 font-bold">E-posta ile bilgilendirileceksiniz.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href={`/order-tracking?orderId=${orderId}`}
                            className="w-full py-5 bg-charcoal text-white rounded-[2rem] font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl shadow-charcoal/20"
                        >
                            SİPARİŞİ TAKİP ET
                            <ArrowRight size={16} />
                        </Link>

                        <Link
                            href="/collection"
                            className="w-full py-5 bg-white text-charcoal border border-current/10 rounded-[2rem] font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-current/5 transition-all"
                        >
                            KEŞFETMEYE DEVAM ET
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
        <Suspense fallback={null}>
            <SuccessContent />
        </Suspense>
    );
}
