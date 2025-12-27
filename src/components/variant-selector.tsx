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
        return null; // No variants, show base product
    }

    const handleSelect = (variant: Variant) => {
        setSelectedVariant(variant);
        onSelect(variant);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider">
                Seçenekler
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    const isOutOfStock = variant.stock === 0;

                    return (
                        <button
                            key={variant.id}
                            onClick={() => !isOutOfStock && handleSelect(variant)}
                            disabled={isOutOfStock}
                            className={`
                                relative p-4 rounded-xl border-2 transition-all text-left
                                ${isSelected
                                    ? 'border-clay bg-clay/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }
                                ${isOutOfStock
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'cursor-pointer'
                                }
                            `}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-clay rounded-full flex items-center justify-center">
                                    <Check size={14} className="text-white" />
                                </div>
                            )}

                            <div className="font-heading text-sm font-medium text-charcoal mb-1">
                                {variant.title}
                            </div>

                            <div className="text-xs text-charcoal/60">
                                {variant.price.toFixed(2)} ₺
                            </div>

                            {isOutOfStock && (
                                <div className="text-xs text-red-500 mt-1 font-medium">
                                    Stokta Yok
                                </div>
                            )}

                            {!isOutOfStock && variant.stock < 5 && (
                                <div className="text-xs text-orange-500 mt-1">
                                    Son {variant.stock} adet
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedVariant && (
                <div className="p-4 bg-sage/10 rounded-xl border border-sage/20">
                    <p className="text-sm text-charcoal/80">
                        <span className="font-bold">Seçilen:</span> {selectedVariant.title}
                    </p>
                    {selectedVariant.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(selectedVariant.attributes).map(([key, value]) => (
                                <span key={key} className="text-xs px-2 py-1 bg-white rounded-full border border-sage/30">
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
