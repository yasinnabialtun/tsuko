'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useCart } from '@/context/cart-context';
import confetti from 'canvas-confetti';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const { clearCart } = useCart();
    const [verifying, setVerifying] = useState(true);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId) {
                setVerifying(false);
                return;
            }

            try {
                const res = await fetch(`/api/orders/check-status?orderId=${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setIsPaid(data.isPaid);
                }
            } catch (error) {
                console.error('Verification failed');
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();

        // Confetti only if paid (or in dev)
        if (orderId) {
            clearCart();
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#EF3118', '#FFB726', '#4FB6FF', '#9358C7'] // TSUKO Colors
            });
        }
    }, [clearCart, orderId]);

    // Handle Loading State
    if (verifying) {
        return (
            <div className="min-h-screen bg-[var(--color-sand)] flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <Loader2 size={48} className="animate-spin mx-auto text-black" />
                    <p className="font-black text-black/40 uppercase tracking-widest text-xs">Ödeme Doğrulanıyor...</p>
                </div>
            </div>
        );
    }

    // Handle Not Paid State
    if (!isPaid && process.env.NODE_ENV === 'production') {
        return (
            <div className="min-h-screen bg-[var(--color-sand)] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle size={48} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-black text-black mb-4 uppercase tracking-tighter">Ödemeniz Henüz Onaylanmadı</h1>
                <p className="text-black/60 max-w-sm mb-8 font-bold">Siparişiniz sistemimizde beklemede görünüyor. Ödeme yaptıysanız birkaç dakika içinde onaylanacaktır. Beklemek istemiyorsanız bizimle iletişime geçebilirsiniz.</p>
                <Link href="/order-tracking" className="px-10 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">SİPARİŞİ TAKİP ET</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-sand)] flex flex-col transition-colors duration-1000">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 pt-40 pb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="max-w-xl w-full bg-white p-12 md:p-16 text-center rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-4 bg-[var(--color-purple)] border-b-4 border-black border-dashed"></div>

                    <div className="w-24 h-24 bg-[var(--color-green)] rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                        <CheckCircle size={48} className="text-black" strokeWidth={3} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter uppercase leading-[0.9]">
                        Harika Bir Seçim!
                    </h1>

                    <p className="text-black/80 mb-8 text-lg font-medium leading-relaxed">
                        Siparişin başarıyla alındı. Atölyemizde senin için bir ruh doğuyor. Sipariş numaranı not etmeyi unutma:
                        <span className="block font-black text-black bg-[var(--color-yellow)] border-2 border-black -rotate-2 w-fit mx-auto px-4 py-2 mt-4 text-2xl tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                            #{orderId || 'TSK-2024-X'}
                        </span>
                    </p>

                    {/* Tsukumogami Philosophy Badge */}
                    <div className="bg-[var(--color-sand)] border-2 border-black rounded-2xl p-6 mb-12 flex items-start gap-4 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 animate-bounce border-2 border-black">
                            <ShoppingBag size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="font-black text-black text-sm uppercase tracking-wide mb-1">Yeni Bir Arkadaş Doğuyor</h4>
                            <p className="text-xs text-black/80 leading-relaxed font-bold">
                                Japon folklorunda 'Tsukumogami', objelerin zamanla ve emekle bir ruh kazandığına inanır. Bu parça, evinize sadece dekor değil, yaşayan bir hikaye katmak için yola çıkıyor.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <div className="bg-white rounded-2xl p-6 text-left border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Package size={20} className="text-black mb-3" strokeWidth={2.5} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Teslimat</p>
                            <p className="text-xs text-black font-black">1-3 iş günü içinde kargoya verilir.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 text-left border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <ShoppingBag size={20} className="text-black mb-3" strokeWidth={2.5} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Takip</p>
                            <p className="text-xs text-black font-black">E-posta ile bilgilendirileceksiniz.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link
                            href={`/order-tracking?orderId=${orderId}`}
                            className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[var(--color-purple)] border-4 border-transparent hover:border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none uppercase"
                        >
                            Siparişi Takip Et
                            <ArrowRight size={16} strokeWidth={3} />
                        </Link>

                        <Link
                            href="/collection"
                            className="w-full py-5 bg-white text-black border-4 border-black rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[var(--color-yellow)] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none uppercase"
                        >
                            Keşfetmeye Devam Et
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
