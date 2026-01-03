'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Heart } from 'lucide-react';
import QuickViewModal from './quick-view-modal';
import { useWishlist } from '@/context/wishlist-context';
import { getCategoryTheme, cn } from '@/lib/utils';

import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const categoryName = typeof product.category === 'object' ? product.category?.name : (typeof product.category === 'string' ? product.category : undefined);
    const themeClass = getCategoryTheme(categoryName);

    // Ensure price is string
    const displayPrice = String(product.price || '0');
    const formattedPrice = displayPrice.includes('₺') ? displayPrice : `${displayPrice} ₺`;

    return (
        <section className={cn("group transition-all duration-700", themeClass)}>
            <QuickViewModal
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
                product={product}
            />

            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container (Tactile & Unbreakable) */}
                <div className="relative aspect-[3/4] premium-card overflow-hidden mb-3 md:mb-6 cursor-pointer group-hover:scale-[1.02]">
                    <Link href={`/product/${product.slug || product.id}`}>
                        <Image
                            src={isHovered && product.images[1] ? product.images[1] : (product.images[0] || product.image)}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        {/* Overlay Gradient for mood-text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>


                    {/* Quick Interaction Layer */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
                        <div className="flex flex-col gap-2 pointer-events-auto">
                            {product.stock === 0 ? (
                                <span className="bg-charcoal/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest w-fit">
                                    Tükendi
                                </span>
                            ) : (
                                <>
                                    {/* New Badge (Logic: Created within 14 days) */}
                                    {product.createdAt && new Date(product.createdAt) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) && (
                                        <span className="bg-[var(--mood-accent)] text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[var(--mood-accent)]/20 w-fit">
                                            YENİ
                                        </span>
                                    )}

                                    {/* Featured Badge (Simulated logic or from prop) */}
                                    {product.isFeatured && (
                                        <span className="bg-white/90 backdrop-blur text-charcoal px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-black/5 w-fit">
                                            ÖZEL
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
                            }}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto",
                                isWishlisted ? "bg-clay text-white shadow-lg" : "bg-white/80 backdrop-blur-md text-charcoal md:opacity-0 group-hover:opacity-100 hover:bg-white shadow-sm"
                            )}
                        >
                            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                    </div>

                    {/* View Details Hint - Only desktop, mobile goes straight to details on tap */}
                    <div className="absolute inset-x-0 bottom-6 px-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden md:block">
                        <button
                            onClick={() => setQuickViewOpen(true)}
                            className="w-full h-12 bg-white/90 backdrop-blur-xl text-charcoal rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Eye size={14} /> Hızlı Bakış
                        </button>
                    </div>
                </div>

                {/* Information Layer (The Soul) */}
                <div className="text-center space-y-1 md:space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-0.5 md:mb-1">
                        <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] text-[var(--mood-accent)] uppercase opacity-80">
                            {categoryName || 'TSUKO DESIGN'}
                        </span>
                    </div>

                    <h3 className="text-sm md:text-xl font-bold tracking-tighter leading-tight transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-1" style={{ color: 'var(--mood-text)' }}>
                        <Link href={`/product/${product.slug || product.id}`}>
                            {product.name}
                        </Link>
                    </h3>

                    <p className="text-base md:text-lg font-black" style={{ color: 'var(--mood-text)' }}>
                        {formattedPrice}
                    </p>
                </div>
            </div>
        </section>
    );
}
