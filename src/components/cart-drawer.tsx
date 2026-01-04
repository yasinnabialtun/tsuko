'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, Truck, ChevronRight, Percent } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
    const {
        items,
        isCartOpen,
        toggleCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        activeCoupon,
        applyCoupon,
        removeCoupon
    } = useCart();

    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                        className="fixed inset-0 bg-black/60 z-[99] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-sand)] z-[100] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border-l-2 border-black"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-2 border-black flex items-center justify-between bg-white">
                            <div>
                                <h2 className="text-3xl font-black text-black flex items-center gap-3 tracking-tighter uppercase">
                                    Sepetim
                                    <span className="text-xs bg-[var(--color-yellow)] text-black px-2 py-1 rounded-md font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {mounted ? items.length : 0}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white border-2 border-transparent hover:border-black rounded-lg transition-all group"
                            >
                                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                            </button>
                        </div>


                        {/* Dynamic Threshold Progress Bar */}
                        {items.length > 0 && mounted && (
                            <div className="px-6 py-6 bg-[var(--color-sand)] border-b-2 border-black">
                                {cartTotal >= 1000 ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-widest bg-[var(--color-green)] text-white p-2 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit mx-auto animate-bounce">
                                            <span className="bg-white text-black p-0.5 rounded-full"><Truck size={12} /></span>
                                            <span>Kargo Bizden! 🚀</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-white border border-black rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                className="h-full bg-[var(--color-green)]"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] uppercase font-black tracking-widest text-black/60">
                                            <span>Hedefe Kalan: {(1000 - cartTotal).toLocaleString('tr-TR')} ₺</span>
                                            <span>1.000 ₺</span>
                                        </div>
                                        <div className="relative h-2.5 w-full bg-white border border-black rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="absolute top-0 left-0 h-full bg-[var(--color-blue)]"
                                            />
                                        </div>
                                        <p className="text-xs font-bold text-center text-black">
                                            Sepetini <span className="font-black text-[var(--color-blue)]">1.000 ₺</span>'ye tamamla, <span className="underline decoration-[var(--color-pink)] decoration-2">Kargoyu Biz Ödeyelim!</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                            <AnimatePresence mode="popLayout">
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center text-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                                            <ShoppingBag size={48} />
                                        </div>
                                        <div>
                                            <p className="font-black text-black text-2xl tracking-tighter">Sepetin Bomboş!</p>
                                            <p className="text-black/60 text-sm mt-2 max-w-[15rem]">Hemen renkli dünyamıza dalış yap ve bir şeyler keşfet!</p>
                                        </div>
                                        <button
                                            onClick={toggleCart}
                                            className="px-8 py-4 bg-[var(--color-yellow)] text-black border-2 border-black rounded-xl font-black text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider"
                                        >
                                            Alışverişe Başla
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
                                            className="flex gap-4 p-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-shadow group"
                                        >
                                            <Link
                                                href={`/product/${item.slug}`}
                                                onClick={toggleCart}
                                                className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-black/10"
                                            >
                                                <Image
                                                    src={item.image || '/images/hero.png'}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </Link>
                                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                                <div>
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className="font-bold text-black leading-tight text-sm line-clamp-2">
                                                            <Link href={`/product/${item.slug}`} onClick={toggleCart} className="hover:text-[var(--color-blue)] transition-colors">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-black/40 hover:text-[var(--color-red)] transition-colors p-1"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-base font-black text-[var(--color-purple)] mt-1">
                                                        {item.price.toLocaleString('tr-TR')} ₺
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-[var(--color-sand)] rounded-lg p-1 border border-black/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all disabled:opacity-30"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={12} strokeWidth={3} />
                                                        </button>
                                                        <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all"
                                                        >
                                                            <Plus size={12} strokeWidth={3} />
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
                            <div className="p-6 border-t-2 border-black bg-white relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">

                                {/* Coupon Code */}
                                <div className="mb-4">
                                    {activeCoupon ? (
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                                                    <Percent size={12} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-green-700">{activeCoupon.code}</p>
                                                    <p className="text-[10px] text-green-600">İndirim uygulandı</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={removeCoupon}
                                                className="p-1 hover:bg-white rounded-lg transition-colors text-green-700"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const form = e.target as HTMLFormElement;
                                                const input = form.elements.namedItem('coupon') as HTMLInputElement;
                                                if (input.value) applyCoupon(input.value);
                                            }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                name="coupon"
                                                type="text"
                                                placeholder="İndirim Kodu"
                                                className="flex-1 bg-[var(--color-sand)] border-2 border-transparent focus:border-black rounded-xl px-4 py-2 text-sm outline-none font-bold placeholder:font-normal transition-all"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold hover:bg-[var(--color-yellow)] hover:text-black transition-colors border-2 border-transparent hover:border-black"
                                            >
                                                UYGULA
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-black/50 font-black uppercase tracking-widest text-[10px]">
                                        <span>Ara Toplam</span>
                                        <span className="text-black text-sm font-bold">{mounted ? cartTotal.toLocaleString('tr-TR') : 0} ₺</span>
                                    </div>
                                    <div className="flex justify-between items-center text-black/50 font-black uppercase tracking-widest text-[10px]">
                                        <span>Kargo</span>
                                        <span className="text-[var(--color-green)] text-sm font-bold">ÜCRETSİZ</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t-2 border-black/5">
                                        <span className="text-xl font-black text-black">TOPLAM</span>
                                        <span className="text-2xl font-black text-[var(--color-blue)] tracking-tighter">
                                            {mounted ? cartTotal.toLocaleString('tr-TR') : 0} ₺
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-5 bg-[var(--color-pink)] text-white rounded-xl font-black text-lg hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-3 uppercase tracking-widest"
                                >
                                    <ShoppingBag size={20} strokeWidth={3} className="mb-1" />
                                    <span>Ödeme Yap</span>
                                </button>

                                <p className="text-[10px] text-center text-black/40 uppercase tracking-[0.2em] font-black mt-4">
                                    ✨ Harika bir seçim yaptın!
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
