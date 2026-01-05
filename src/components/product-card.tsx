'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import QuickViewModal from './quick-view-modal';
import { useWishlist } from '@/context/wishlist-context';
import { getCategoryTheme, cn } from '@/lib/utils';

import { Product } from '@/types';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addToCart, toggleCart } = useCart();
    const isWishlisted = isInWishlist(product.id);

    const categoryName = typeof product.category === 'object' ? product.category?.name : (typeof product.category === 'string' ? product.category : undefined);

    // Ensure price is string
    const displayPrice = String(product.price || '0');
    const formattedPrice = displayPrice.includes('₺') ? displayPrice : `${displayPrice} ₺`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <section className="group h-full">
            <QuickViewModal
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
                product={product}
            />

            <div
                className="relative flex flex-col h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container - POP ART FRAME */}
                <div className="relative aspect-[3/4] bg-white border-2 border-[var(--color-charcoal)] rounded-2xl overflow-hidden mb-4 shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
                    <Link href={`/product/${product.slug || product.id}`} className="block w-full h-full">
                        <Image
                            src={isHovered && product.images[1] ? product.images[1] : (product.images[0] || product.image)}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </Link>

                    {/* Fun Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
                        {product.stock === 0 ? (
                            <span className="bg-charcoal text-white border border-[var(--color-charcoal)] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider rotate-2 shadow-[2px_2px_0px_0px_rgba(45,45,45,0.2)]">
                                Tükendi
                            </span>
                        ) : (
                            <>
                                {product.createdAt && new Date(product.createdAt) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && (
                                    <span className="bg-[var(--color-yellow)] text-[var(--color-charcoal)] border border-[var(--color-charcoal)] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider -rotate-2 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                                        YENİ! ✨
                                    </span>
                                )}
                                {product.isFeatured && (
                                    <span className="bg-[var(--color-pink)] text-white border border-[var(--color-charcoal)] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider rotate-2 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                                        Favori 💖
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
                            }}
                            className={cn(
                                "w-9 h-9 border-2 border-[var(--color-charcoal)] rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]",
                                isWishlisted ? "bg-[var(--color-red)] text-white" : "bg-white text-[var(--color-charcoal)] hover:bg-[var(--color-red)] hover:text-white"
                            )}
                        >
                            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Mobile Cart/Quick View Trigger */}
                    <Link
                        href={`/product/${product.slug || product.id}`}
                        className="absolute bottom-3 right-3 md:hidden w-10 h-10 bg-white border-2 border-[var(--color-charcoal)] rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        <Eye size={18} strokeWidth={2.5} />
                    </Link>

                    {/* Desktop Add to Cart Overlay */}
                    <div className="absolute inset-x-3 bottom-3 hidden md:block translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full py-3 bg-white border-2 border-[var(--color-charcoal)] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[var(--color-blue)] hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(45,45,45,1)] hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,1)] hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[var(--color-charcoal)]"
                        >
                            <ShoppingBag size={14} strokeWidth={3} />
                            Sepete Ekle
                        </button>
                    </div>
                </div>

                {/* Info Section */}
                <div className="px-1 flex flex-col gap-1">
                    {categoryName && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-charcoal)]/40">
                            {categoryName}
                        </span>
                    )}

                    <Link href={`/product/${product.slug || product.id}`} className="group-hover:underline decoration-2 underline-offset-2 decoration-[var(--color-blue)]">
                        <h3 className="text-lg font-bold leading-tight text-[var(--color-charcoal)] line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-start gap-2 mt-1">
                        <div className="px-3 py-1 bg-[var(--color-purple)] text-white text-sm font-bold -rotate-1 border border-[var(--color-charcoal)] rounded-lg shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                            {formattedPrice}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
