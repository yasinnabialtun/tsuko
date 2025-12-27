'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 5000; // Örnek eşik değeri

export default function CartDrawer() {
    const {
        items,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    const router = useRouter();

    // Calculate progress for free shipping
    const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const neededAmount = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleCart();
        };
        if (isCartOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, toggleCart]);

    const handleCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    return (
        <AnimatePresence mode="wait">
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-charcoal/40 z-[99] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-charcoal/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-charcoal flex items-center gap-3">
                                    Sepetim
                                    <span className="text-xs bg-clay/10 text-clay px-2 py-0.5 rounded-full font-black">
                                        {items.length}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="w-10 h-10 flex items-center justify-center hover:bg-alabaster rounded-full transition-colors group"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        {items.length > 0 && (
                            <div className="px-8 py-6 bg-alabaster/50 border-b border-charcoal/5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                        progress >= 100 ? "bg-green-500 text-white" : "bg-clay/10 text-clay"
                                    )}>
                                        <Truck size={16} />
                                    </div>
                                    <p className="text-sm font-bold text-charcoal">
                                        {progress >= 100
                                            ? "🎉 Ücretsiz Kargo Kazandınız!"
                                            : `Ücretsiz kargo için ${neededAmount.toLocaleString('tr-TR')} ₺ kaldı.`
                                        }
                                    </p>
                                </div>
                                <div className="h-1.5 bg-charcoal/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            progress >= 100 ? "bg-green-500" : "bg-clay"
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                            <AnimatePresence mode="popLayout">
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-alabaster rounded-full flex items-center justify-center text-charcoal/20">
                                            <ShoppingBag size={48} />
                                        </div>
                                        <div>
                                            <p className="font-black text-charcoal text-xl">Sepetiniz Boş</p>
                                            <p className="text-charcoal/40 text-sm mt-1 max-w-[15rem]">Mitolojik tasarımlarımızı keşfetmeye ne dersiniz?</p>
                                        </div>
                                        <button
                                            onClick={toggleCart}
                                            className="px-8 py-4 bg-charcoal text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-charcoal/10"
                                        >
                                            Koleksiyonu Gör
                                        </button>
                                    </motion.div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            layout
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex gap-6 group"
                                        >
                                            <Link
                                                href={`/product/${item.slug}`}
                                                onClick={toggleCart}
                                                className="relative w-28 h-32 bg-alabaster rounded-2xl overflow-hidden shrink-0 border border-charcoal/5 group-hover:shadow-lg transition-all"
                                            >
                                                <Image
                                                    src={item.image || '/images/hero.png'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </Link>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className="font-bold text-charcoal leading-tight">
                                                            <Link href={`/product/${item.slug}`} onClick={toggleCart} className="hover:text-clay transition-colors">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-charcoal/20 hover:text-rose transition-colors p-1"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-black text-charcoal mt-1">
                                                        {item.price.toLocaleString('tr-TR')} ₺
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-alabaster rounded-xl p-1 border border-charcoal/5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all disabled:opacity-20"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-sm font-black w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 border-t border-charcoal/5 bg-white relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">
                                        <span>Ara Toplam</span>
                                        <span className="text-charcoal text-sm">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                    <div className="flex justify-between items-center text-charcoal/40 font-bold uppercase tracking-widest text-[10px]">
                                        <span>Kargo</span>
                                        <span className="text-green-500 text-sm">ÜCRETSİZ</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-charcoal/5">
                                        <span className="text-xl font-black text-charcoal">Toplam</span>
                                        <span className="text-2xl font-black text-charcoal tracking-tighter">
                                            {cartTotal.toLocaleString('tr-TR')} ₺
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-6 bg-charcoal text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-2xl shadow-charcoal/20 flex items-center justify-center gap-3 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <ShoppingBag size={24} className="relative z-10" />
                                    <span className="relative z-10">Ödeme Yap</span>
                                    <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[10px] text-center text-charcoal/20 uppercase tracking-[0.2em] font-black mt-6">
                                    📦 1-3 iş günü içinde kargolanır
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
