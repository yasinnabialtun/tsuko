'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';

import { Product } from '@/types';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    const { addToCart } = useCart();

    const categoryName = typeof product.category === 'object' ? product.category?.name : (typeof product.category === 'string' ? product.category : undefined);

    const handleAddToCart = () => {
        addToCart(product);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 m-auto w-[90vw] md:w-[800px] h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full z-10 hover:bg-black hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Side */}
                        <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-alabaster">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-xs font-bold text-clay tracking-widest uppercase mb-2">
                                {categoryName || 'Tasarım'}
                            </span>
                            <h2 className="text-3xl font-bold text-charcoal mb-4">{product.name}</h2>
                            <p className="text-charcoal/60 mb-6 line-clamp-3 md:line-clamp-5">
                                {product.description || 'Bu ürün doğadan ilham alınarak, sürdürülebilir malzemelerle üretilmiştir.'}
                            </p>

                            <div className="text-2xl font-medium text-charcoal mb-8">
                                {String(product.price)} ₺
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="w-full py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-clay transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={20} />
                                    {product.stock === 0 ? 'Tükendi' : 'Sepete Ekle'}
                                </button>
                                <Link
                                    href={`/product/${product.slug}`}
                                    className="w-full py-4 border border-black/10 text-charcoal rounded-xl font-bold hover:bg-black/5 transition-colors text-center"
                                >
                                    Detaylı İncele
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
