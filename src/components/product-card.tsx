
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';

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
            className="group"
        >
            <div className="relative aspect-[3/4] bg-[#F5F5F0] rounded-[24px] overflow-hidden mb-6 cursor-pointer">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Wishlist Button (Top Right) */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-charcoal hover:bg-white transition-all shadow-sm z-20"
                    aria-label="İstek listesine ekle"
                >
                    <Heart size={18} fill={isWishlisted ? "#C8553D" : "none"} className={isWishlisted ? "text-[#C8553D]" : "text-charcoal"} />
                </button>

                {/* Hover Actions (Bottom) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-charcoal/90 backdrop-blur text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium shadow-lg hover:bg-black transition-colors"
                        >
                            <ShoppingBag size={16} />
                            <span>Koleksiyona Kat</span>
                        </button>
                        <Link href={`/product/${product.slug}`} className="p-3 bg-white text-charcoal rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                            <Eye size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Info */}
            <Link href={`/product/${product.slug}`} className="block px-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-heading text-charcoal mb-1 group-hover:text-clay transition-colors leading-tight">
                            {product.name}
                        </h3>
                        <p className="text-xs font-heading tracking-widest text-charcoal/50 uppercase">
                            {product.category || 'Tasarım Obje'}
                        </p>
                    </div>
                    <div className="text-lg font-medium text-charcoal font-sans">
                        {product.price}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
