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
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-sand)] z-[100] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border-l-4 border-[var(--color-charcoal)]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-4 border-[var(--color-charcoal)] flex items-center justify-between bg-white relative z-20">
                            <div>
                                <h2 className="text-3xl font-bold text-[var(--color-charcoal)] flex items-center gap-3 tracking-tighter uppercase">
                                    Sepetim
                                    <span className="text-xs bg-[var(--color-yellow)] text-[var(--color-charcoal)] px-3 py-1 rounded-lg font-bold border-2 border-[var(--color-charcoal)] shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] rotate-3">
                                        {mounted ? items.length : 0}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[var(--color-charcoal)] hover:text-white border-2 border-[var(--color-charcoal)] rounded-xl transition-all group shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] active:translate-y-1 active:shadow-none"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
                            </button>
                        </div>


                        {/* Dynamic Threshold Progress Bar */}
                        {items.length > 0 && mounted && (
                            <div className="px-6 py-4 bg-[var(--color-sand)] border-b-4 border-[var(--color-charcoal)]">
                                {cartTotal >= 1000 ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest bg-[var(--color-green)] text-white p-2 rounded-lg border-2 border-[var(--color-charcoal)] shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] w-fit mx-auto animate-bounce">
                                            <span className="bg-white text-black p-0.5 rounded-full"><Truck size={14} /></span>
                                            <span>Kargo Bizden! 🚀</span>
                                        </div>
                                        <div className="h-4 w-full bg-white border-2 border-[var(--color-charcoal)] rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                className="h-full bg-[var(--color-green)]"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest text-[var(--color-charcoal)]/60 px-1">
                                            <span>Hedefe Kalan: {(1000 - cartTotal).toLocaleString('tr-TR')} ₺</span>
                                            <span>1.000 ₺</span>
                                        </div>
                                        <div className="relative h-4 w-full bg-white border-2 border-[var(--color-charcoal)] rounded-full overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min((cartTotal / 1000) * 100, 100)}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="absolute top-0 left-0 h-full bg-[var(--color-blue)] border-r-2 border-[var(--color-charcoal)]"
                                            />
                                        </div>
                                        <p className="text-xs font-medium text-[var(--color-charcoal)]">
                                            Sepetini <span className="font-extrabold text-[var(--color-blue)]">1.000 ₺</span>'ye tamamla, <span className="underline decoration-[var(--color-pink)] decoration-4">Kargoyu Biz Ödeyelim!</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Items */}
                        <div
                            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-repeat"
                            style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: 'var(--color-sand)' }}
                        >
                            <AnimatePresence mode="popLayout">
                                {items.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-white border-4 border-[var(--color-charcoal)] rounded-full flex items-center justify-center text-[var(--color-charcoal)] shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]">
                                            <ShoppingBag size={48} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <p className="font-black text-black text-2xl tracking-tighter uppercase">Sepetin Bomboş!</p>
                                            <p className="text-black/60 text-sm mt-2 max-w-[15rem] font-bold">Hemen renkli dünyamıza dalış yap ve bir şeyler keşfet!</p>
                                        </div>
                                        <button
                                            onClick={toggleCart}
                                            className="px-8 py-4 bg-[var(--color-yellow)] text-black border-2 border-[var(--color-charcoal)] rounded-xl font-bold text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] uppercase tracking-wider active:translate-y-1 active:shadow-none"
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
                                            className="flex gap-4 p-3 bg-white border-2 border-[var(--color-charcoal)] rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:shadow-[6px_6px_0px_0px_rgba(45,45,45,1)] hover:-translate-y-0.5 transition-all group"
                                        >
                                            <Link
                                                href={`/product/${item.slug}`}
                                                onClick={toggleCart}
                                                className="relative w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0 border-2 border-[var(--color-charcoal)]"
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
                                                        <h3 className="font-bold text-black leading-tight text-sm line-clamp-2 uppercase tracking-wide">
                                                            <Link href={`/product/${item.slug}`} onClick={toggleCart} className="hover:text-[var(--color-blue)] transition-colors">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-black hover:text-[var(--color-red)] transition-colors p-1"
                                                        >
                                                            <Trash2 size={18} strokeWidth={2.5} />
                                                        </button>
                                                    </div>
                                                    <p className="text-base font-bold text-[var(--color-purple)] mt-1">
                                                        {item.price.toLocaleString('tr-TR')} ₺
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-[var(--color-sand)] rounded-lg border-2 border-[var(--color-charcoal)] h-8 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-full flex items-center justify-center hover:bg-white rounded-l-md transition-all disabled:opacity-30 border-r-2 border-[var(--color-charcoal)]"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus size={12} strokeWidth={3} />
                                                        </button>
                                                        <span className="text-xs font-bold w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-full flex items-center justify-center hover:bg-white rounded-r-md transition-all border-l-2 border-[var(--color-charcoal)]"
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
                            <div className="p-6 border-t-4 border-[var(--color-charcoal)] bg-white relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">

                                {/* Coupon Code */}
                                <div className="mb-4">
                                    {activeCoupon ? (
                                        <div className="flex items-center justify-between p-3 bg-[var(--color-green)] bg-opacity-10 rounded-xl border-2 border-[var(--color-green)]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[var(--color-green)] text-white flex items-center justify-center border-2 border-[var(--color-charcoal)]">
                                                    <Percent size={14} strokeWidth={3} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-[var(--color-green)]">{activeCoupon.code}</p>
                                                    <p className="text-[10px] text-green-700 font-bold uppercase">İndirim uygulandı</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={removeCoupon}
                                                className="p-1 hover:bg-white rounded-lg transition-colors text-black border-2 border-transparent hover:border-black"
                                            >
                                                <X size={16} strokeWidth={2.5} />
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
                                                className="flex-1 bg-[var(--color-sand)] border-2 border-[var(--color-charcoal)] rounded-xl px-4 py-3 text-sm outline-none font-bold placeholder:font-bold placeholder:text-[var(--color-charcoal)]/30 transition-all focus:shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] focus:-translate-y-1"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[var(--color-charcoal)] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[var(--color-yellow)] hover:text-[var(--color-charcoal)] transition-colors border-2 border-[var(--color-charcoal)] shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] active:translate-y-1 active:shadow-none"
                                            >
                                                UYGULA
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-black/50 font-black uppercase tracking-widest text-[10px]">
                                        <span>Ara Toplam</span>
                                        <span className="text-black text-sm font-black">{mounted ? cartTotal.toLocaleString('tr-TR') : 0} ₺</span>
                                    </div>
                                    <div className="flex justify-between items-center text-black/50 font-black uppercase tracking-widest text-[10px]">
                                        <span>Kargo</span>
                                        <span className="text-[var(--color-green)] text-sm font-black bg-[var(--color-green)]/10 px-2 py-0.5 rounded border border-[var(--color-green)]/30">ÜCRETSİZ</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-3 border-t-2 border-black/10 border-dashed">
                                        <span className="text-xl font-black text-black">TOPLAM</span>
                                        <span className="text-2xl font-extrabold text-[var(--color-blue)] tracking-tighter" style={{ WebkitTextStroke: '0.5px var(--color-charcoal)' }}>
                                            {mounted ? cartTotal.toLocaleString('tr-TR') : 0} ₺
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-5 bg-[var(--color-pink)] text-white rounded-2xl font-bold text-lg hover:bg-[var(--color-yellow)] hover:text-black border-4 border-[var(--color-charcoal)] transition-all shadow-[6px_6px_0px_0px_rgba(45,45,45,1)] hover:shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] hover:translate-x-[3px] hover:translate-y-[3px] flex items-center justify-center gap-3 uppercase tracking-widest group active:shadow-none active:translate-y-[6px]"
                                >
                                    <ShoppingBag size={24} strokeWidth={3} className="mb-1 group-hover:animate-bounce" />
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
