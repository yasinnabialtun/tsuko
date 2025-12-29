'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart, Star } from 'lucide-react';
import QuickViewModal from './quick-view-modal';
import { useWishlist } from '@/context/wishlist-context';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: any;
        image: string;
        images: string[];
        category?: { name: string };
        description?: string;
        stock: number;
        avgRating?: number;
        reviewCount?: number;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    // Ensure price is string
    const displayPrice = typeof product.price === 'object' ? product.price.toString() : String(product.price);
    const formattedPrice = displayPrice.includes('₺') ? displayPrice : `${displayPrice} ₺`;

    return (
        <>
            <QuickViewModal
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
                product={product}
            />

            <div
                className="group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Quick Add Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            // Cart logic here
                        }}
                        className="w-full bg-white/95 backdrop-blur-md text-charcoal py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-charcoal hover:text-white transition-all active:scale-95"
                    >
                        Sepete Ekle
                    </button>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-alabaster rounded-[2.5rem] overflow-hidden mb-6 cursor-pointer group-hover:shadow-2xl group-hover:shadow-charcoal/10 transition-all duration-700">
                    <Link href={`/product/${product.slug || product.id}`}>
                        <Image
                            src={isHovered && product.images[1] ? product.images[1] : (product.images[0] || product.image)}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                    </Link>

                    {/* Badge */}
                    {product.stock === 0 ? (
                        <div className="absolute top-6 right-6 bg-charcoal text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest z-10">
                            Tükendi
                        </div>
                    ) : product.stock > 0 && product.stock <= 5 ? (
                        <div className="absolute top-6 right-6 bg-clay text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest z-10 shadow-lg shadow-clay/20 animate-pulse">
                            Son {product.stock}
                        </div>
                    ) : null}

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
                        }}
                        className={`absolute top-6 left-6 p-3 rounded-full shadow-xl transition-all z-10 ${isWishlisted ? 'bg-clay text-white' : 'bg-white/90 text-charcoal hover:bg-white opacity-0 group-hover:opacity-100'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Eye / Quick View Icon overlay */}
                    <button
                        onClick={() => setQuickViewOpen(true)}
                        className="absolute bottom-6 right-6 p-3 rounded-full bg-white/50 backdrop-blur-md text-charcoal opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                    >
                        <Eye size={18} />
                    </button>
                </div>

                {/* Info Container */}
                <div className="text-center space-y-2 px-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-charcoal/20 uppercase">
                            {product.category?.name || 'TSUKO DESIGN'}
                        </span>
                        {product.reviewCount !== undefined && product.reviewCount > 0 && (
                            <div className="flex items-center gap-1">
                                <Star size={10} className="text-orange-400 fill-orange-400" />
                                <span className="text-[10px] font-black text-charcoal/30">{product.avgRating?.toFixed(1)}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-charcoal tracking-tighter group-hover:text-clay transition-colors duration-300">
                        <Link href={`/product/${product.slug || product.id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-lg font-black text-charcoal">
                        {formattedPrice}
                    </p>
                </div>
            </div>
        </>
    );
}
