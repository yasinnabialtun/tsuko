'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

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
    const overlayRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleCart();
        };
        if (isCartOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, toggleCart]);

    // Close on overlay click
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (overlayRef.current === e.target) {
            toggleCart();
        }
    };

    const handleCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart} // Simplified overlay click
                        className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                            <h2 className="text-xl font-bold text-charcoal flex items-center gap-2">
                                <ShoppingBag size={20} />
                                Sepetim ({items.length})
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">Sepetiniz boş</p>
                                        <p className="text-gray-500">Henüz ürün eklemediniz.</p>
                                    </div>
                                    <button
                                        onClick={toggleCart}
                                        className="px-6 py-3 bg-charcoal text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
                                    >
                                        Alışverişe Başla
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                            <Image
                                                src={item.image || '/images/hero.png'}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-charcoal line-clamp-2 leading-tight">
                                                        <Link href={`/product/${item.slug}`} onClick={toggleCart}>
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-sm font-bold text-sage mt-1">
                                                    {item.price.toLocaleString('tr-TR')} ₺
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 px-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 px-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                                        disabled={item.quantity >= item.maxStock}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                {item.quantity >= item.maxStock && (
                                                    <span className="text-[10px] text-orange-600 font-bold">Max Stok</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-charcoal/60">
                                        <span>Ara Toplam</span>
                                        <span>{cartTotal.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal/60">
                                        <span>Kargo</span>
                                        <span className="text-green-600 font-bold">Ücretsiz</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-charcoal pt-2 border-t border-gray-200">
                                        <span>Toplam</span>
                                        <span>{cartTotal.toLocaleString('tr-TR')} ₺</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-charcoal text-white rounded-xl font-bold text-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-charcoal/10 flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={20} />
                                    Ödemeye Geç
                                </button>
                                <p className="text-[10px] text-center text-gray-400">
                                    Güvenli ödeme altyapısı ve 14 gün iade garantisi
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
