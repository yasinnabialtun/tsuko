'use client';

import { products } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';

interface BundleSuggesterProps {
    currentProductId: string;
}

export default function BundleSuggester({ currentProductId }: BundleSuggesterProps) {
    // Simple logic: suggest 2 random products that are NOT the current one
    const suggestions = products
        .filter(p => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-12 pt-12 border-t border-black/5">
            <h3 className="text-xl font-bold text-charcoal mb-6">Birlikte Harika Durur (Bundle)</h3>

            <div className="flex flex-col gap-4">
                {suggestions.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="group flex items-center gap-4 bg-alabaster p-4 rounded-2xl hover:bg-white border border-transparent hover:border-black/5 transition-all"
                    >
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-white">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>

                        <div className="flex-grow">
                            <h4 className="font-bold text-charcoal group-hover:text-clay transition-colors">{product.name}</h4>
                            <p className="text-sm text-charcoal/50">{product.price}</p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-charcoal/40 group-hover:text-clay transition-colors">
                            <Plus size={20} />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-6 bg-sage/10 p-4 rounded-xl text-sage text-sm font-bold text-center">
                💡 İpucu: 2 ürün alımında sepette %10 indirim uygulanır.
            </div>
        </div>
    );
}
