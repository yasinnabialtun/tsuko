'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Copy, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';

interface ExitIntentPopupProps {
    settings?: any;
}

export default function ExitIntentPopup({ settings }: ExitIntentPopupProps) {
    const { cartCount } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [copied, setCopied] = useState(false);

    const title = settings?.exitIntentTitle || "GİTMEDEN ÖNCE...";
    const desc = settings?.exitIntentDesc || "Sepetindeki ürünleri kaçırma! Şimdi tamamla, ücretsiz kargo fırsatını yakala.";

    useEffect(() => {
        // Check if already shown in this session
        const sessionShown = sessionStorage.getItem('tsuko-exit-shown');
        if (sessionShown) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('tsuko-exit-shown', 'true');
            }
        };

        // Fallback for mobile (timer based mostly, hard to detect exit intent on touch)
        const timer = setTimeout(() => {
            if (!hasShown) {
                // Only show on timer if user hasn't scrolled much? 
                // Let's keep it simple: Show on mouse leave on desktop is the gold standard.
            }
        }, 10000);

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timer);
        };
    }, [hasShown]);

    const copyCode = () => {
        navigator.clipboard.writeText('MERHABA10');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:w-[500px] md:mx-auto bg-white rounded-3xl overflow-hidden z-[101] shadow-2xl"
                    >
                        <div className="relative p-8 text-center bg-white">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X size={20} className="text-charcoal/50" />
                            </button>

                            <div className="w-16 h-16 bg-clay/10 rounded-full flex items-center justify-center mx-auto mb-6 text-clay">
                                {cartCount > 0 ? <ShoppingBag size={32} /> : <Gift size={32} />}
                            </div>

                            <h2 className="text-3xl font-black text-charcoal mb-2 leading-none uppercase tracking-tighter">
                                {cartCount > 0 ? 'Sepetini Unutma!' : title}
                            </h2>
                            <p className="text-charcoal/60 mb-8 max-w-sm mx-auto text-sm font-medium">
                                {cartCount > 0
                                    ? `Sepetinde ${cartCount} adet ürün seni bekliyor. Hemen sipariş ver, ilk alışverişine özel %10 indirimi kaçırma.`
                                    : desc}
                            </p>

                            <div className="bg-alabaster border border-dashed border-charcoal/20 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
                                <span className="font-mono text-xl font-bold text-charcoal tracking-widest">MERHABA10</span>
                                <button
                                    onClick={copyCode}
                                    className="flex items-center gap-2 text-sm font-bold text-clay hover:text-charcoal transition-colors uppercase tracking-wider"
                                >
                                    {copied ? <><Check size={16} /> Kopyalandı</> : <><Copy size={16} /> Kopyala</>}
                                </button>
                            </div>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black transition-colors"
                            >
                                İndirimimi Kullan
                            </button>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="mt-4 text-xs font-bold text-charcoal/30 hover:text-charcoal/60 transition-colors uppercase tracking-wider"
                            >
                                İstemiyorum, indirim hakkımı yak
                            </button>
                        </div>

                        <div className="bg-clay p-3 text-center text-white text-xs font-bold">
                            ⚠️ Bu teklif sayfayı kapattığında kaybolacak.
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
