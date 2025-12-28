'use client';

import { useRecentProducts } from '@/hooks/use-recent-products';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentlyViewed() {
    const { recentProducts } = useRecentProducts();

    if (recentProducts.length < 2) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-charcoal mb-8">Son Baktıklarınız</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {recentProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.slug || product.id}`} className="group block">
                            <div className="relative aspect-square bg-alabaster rounded-2xl overflow-hidden mb-3">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-sm font-bold text-charcoal truncate">{product.name}</h3>
                            <p className="text-xs text-charcoal/60">{product.price.includes('₺') ? product.price : `${product.price} ₺`}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
