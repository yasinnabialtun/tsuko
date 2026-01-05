'use client';

import { useRecentProducts } from '@/hooks/use-recent-products';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentlyViewed() {
    const { recentProducts } = useRecentProducts();

    if (recentProducts.length < 2) return null;

    return (
        <section className="py-20 bg-[var(--color-sand)] border-t-4 border-black">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter">
                        Gözün Kaldı Galiba? 👀
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {recentProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug || product.id}`}
                            className="group block bg-white border-2 border-black rounded-2xl p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            <div className="relative aspect-square bg-white border-2 border-black rounded-xl overflow-hidden mb-3">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="px-1 pb-1">
                                <h3 className="text-sm font-black text-black truncate mb-1 uppercase tracking-wide">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-black text-black bg-[var(--color-yellow)] px-2 py-0.5 rounded border border-black inline-block">
                                        {product.price.includes('₺') ? product.price : `${product.price} ₺`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
