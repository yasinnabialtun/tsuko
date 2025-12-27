'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface ProductVariant {
    id?: string; // For editing existing
    title: string; // e.g. "Red / Large"
    sku: string;
    price: number;
    stock: number;
    weight?: number;
    attributes: Record<string, string>; // { color: "Red", size: "L" }
    images: string[];
}

interface VariantManagerProps {
    variants: ProductVariant[];
    onChange: (variants: ProductVariant[]) => void;
}

export default function VariantManager({ variants, onChange }: VariantManagerProps) {
    const addVariant = () => {
        const newVariant: ProductVariant = {
            title: '',
            sku: `SKU-${Date.now()}`,
            price: 0,
            stock: 0,
            weight: 0,
            attributes: {},
            images: []
        };
        onChange([...variants, newVariant]);
    };

    const removeVariant = (index: number) => {
        onChange(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: keyof ProductVariant, value: any) => {
        const updated = variants.map((v, i) =>
            i === index ? { ...v, [field]: value } : v
        );
        onChange(updated);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-charcoal">Ürün Varyantları</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Renk, beden gibi seçenekler ekleyin (opsiyonel)
                    </p>
                </div>
                <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 px-4 py-2 bg-clay text-white rounded-lg hover:bg-clay/90 transition-colors"
                >
                    <Plus size={18} />
                    Varyant Ekle
                </button>
            </div>

            {variants.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p>Henüz varyant eklenmedi.</p>
                    <p className="text-sm mt-1">Varyant eklemezseniz, ana ürün fiyatı ve stoğu kullanılır.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {variants.map((variant, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-charcoal">Varyant #{index + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Varyant Adı *
                                    </label>
                                    <input
                                        type="text"
                                        value={variant.title}
                                        onChange={(e) => updateVariant(index, 'title', e.target.value)}
                                        placeholder="Örn: Kırmızı / Büyük"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        SKU (Stok Kodu) *
                                    </label>
                                    <input
                                        type="text"
                                        value={variant.sku}
                                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                        placeholder="PROD-001-RED"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Fiyat (₺) *
                                    </label>
                                    <input
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Stok *
                                    </label>
                                    <input
                                        type="number"
                                        value={variant.stock}
                                        onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                                        min="0"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Ağırlık (kg)
                                    </label>
                                    <input
                                        type="number"
                                        value={variant.weight || 0}
                                        onChange={(e) => updateVariant(index, 'weight', parseFloat(e.target.value) || 0)}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Özellikler (JSON)
                                </label>
                                <textarea
                                    value={JSON.stringify(variant.attributes, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            const parsed = JSON.parse(e.target.value);
                                            updateVariant(index, 'attributes', parsed);
                                        } catch (err) {
                                            // Invalid JSON, ignore
                                        }
                                    }}
                                    rows={3}
                                    placeholder='{"color": "Red", "size": "L"}'
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none font-mono text-xs resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    JSON formatında özellik ekleyin (renk, beden vb.)
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
