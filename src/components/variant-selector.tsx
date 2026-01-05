'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface Variant {
    id: string;
    title: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
    images: string[];
}

interface VariantSelectorProps {
    variants: Variant[];
    onSelect: (variant: Variant | null) => void;
}

export default function VariantSelector({ variants, onSelect }: VariantSelectorProps) {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    if (!variants || variants.length === 0) {
        return null;
    }

    const handleSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onSelect(variant);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-black text-black uppercase tracking-widest bg-[var(--color-yellow)] w-fit px-2 py-1 border border-black rounded shadow-[2px_2px_0px_black]">
                Seçenekler
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const isOutOfStock = variant.stock === 0;

                    return (
                        <button
                            key={variant.id}
                            onClick={() => !isOutOfStock && handleSelect(variant)}
                            disabled={isOutOfStock}
                            className={`
                                relative p-4 rounded-xl border-2 transition-all text-left flex flex-col gap-1 overflow-hidden group
                                ${isSelected
                                    ? 'border-black bg-black text-white shadow-[4px_4px_0px_var(--color-purple)] -translate-y-1'
                                    : 'border-black bg-white hover:bg-[var(--color-sand)] hover:shadow-[4px_4px_0px_black] hover:-translate-y-1'
                                }
                                ${isOutOfStock
                                    ? 'opacity-50 grayscale cursor-not-allowed border-dashed'
                                    : 'cursor-pointer'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start w-full">
                                <span className={`font-black uppercase tracking-tight text-sm ${isSelected ? 'text-[var(--color-yellow)]' : 'text-black'}`}>
                                    {variant.title}
                                </span>
                                {isSelected && (
                                    <div className="bg-[var(--color-green)] text-black rounded-full p-0.5 border border-black">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                )}
                            </div>

                            <div className={`text-xs font-bold ${isSelected ? 'text-white/80' : 'text-black/60'}`}>
                                {variant.price.toFixed(2)} ₺
                            </div>

                            {isOutOfStock ? (
                                <div className="text-[10px] font-black uppercase text-red-500 bg-red-100 px-2 py-0.5 rounded w-fit mt-1">
                                    Tükendi
                                </div>
                            ) : variant.stock < 5 && (
                                <div className="text-[10px] font-black uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded w-fit mt-1 animate-pulse">
                                    Son {variant.stock}!
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
