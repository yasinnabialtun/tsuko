
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart, Plus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, index }: { product: any; index: number }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent link click
        e.preventDefault();
        addToCart(product);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group block"
        >
            <div className="relative aspect-[3/4] bg-stone/20 rounded-[1.5rem] overflow-hidden mb-6 cursor-pointer">
                {/* Main Image */}
                <Link href={`/product/${product.slug}`} className="block w-full h-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Tags / Badge */}
                {index === 0 && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest uppercase text-charcoal border border-stone/50 z-20">
                        Yeni
                    </div>
                )}

                {/* Wishlist Button (Top Right) */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-mauve transition-all z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    aria-label="İstek listesine ekle"
                >
                    <Heart size={18} fill={isWishlisted ? "#C7A4E0" : "none"} className={isWishlisted ? "text-mauve" : "text-white"} />
                </button>

                {/* Hover Actions (Center) - Elite Style */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <Link
                        href={`/product/${product.slug}`}
                        className="px-6 py-3 bg-white/90 backdrop-blur text-charcoal rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-mauve transition-colors pointer-events-auto transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                        İncele
                    </Link>
                </div>

                {/* Quick Add Button (Bottom Right) */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 p-3 bg-white text-charcoal rounded-full shadow-lg hover:bg-clay hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 z-20"
                    aria-label="Sepete Ekle"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Info - Minimal */}
            <Link href={`/product/${product.slug}`} className="block px-1">
                <div className="flex justify-between items-baseline gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-charcoal mb-1 group-hover:text-mauve transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-xs font-semibold tracking-widest text-charcoal/40 uppercase">
                            {product.category || 'Tasarım Obje'}
                        </p>
                    </div>
                    <div className="text-lg font-light text-charcoal tabular-nums">
                        {product.price}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
