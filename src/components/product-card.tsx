'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';
import QuickViewModal from './quick-view-modal';

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
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [quickViewOpen, setQuickViewOpen] = useState(false);

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
                <div className="relative aspect-[4/5] bg-alabaster rounded-[2rem] overflow-hidden mb-6 cursor-pointer">
                    <Link href={`/product/${product.slug || product.id}`}>
                        <Image
                            src={isHovered && product.images[1] ? product.images[1] : (product.images[0] || product.image)}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>

                    {product.stock === 0 && (
                        <div className="absolute top-4 right-4 bg-charcoal text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                            Tükendi
                        </div>
                    )}

                    {/* Quick View Button */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                            <button
                                onClick={() => setQuickViewOpen(true)}
                                className="bg-white text-charcoal p-3.5 rounded-full shadow-xl hover:bg-charcoal hover:text-white transition-colors tooltip tooltip-top"
                                aria-label="Hızlı Bakış"
                            >
                                <Eye size={20} />
                            </button>
                            <Link
                                href={`/product/${product.slug || product.id}`}
                                className="bg-white text-charcoal p-3.5 rounded-full shadow-xl hover:bg-charcoal hover:text-white transition-colors"
                                aria-label="Detay"
                            >
                                <ShoppingBag size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <span className="text-[10px] font-bold tracking-widest text-clay uppercase">
                        {product.category?.name || 'DKOR'}
                    </span>
                    <h3 className="text-xl font-bold text-charcoal group-hover:text-mauve transition-colors">
                        <Link href={`/product/${product.slug || product.id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-lg font-medium text-charcoal/60">
                        {formattedPrice}
                    </p>
                </div>
            </div>
        </>
    );
}
