'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const MATERIALS = [
    { label: 'Organik PLA+', value: 'pla' },
    { label: 'Reçine', value: 'resine' },
    { label: 'Ahşap Dolgulu', value: 'wood' },
    { label: 'Mat Dokulu', value: 'matte' }
];

const PRICE_RANGES = [
    { label: '0₺ - 500₺', min: 0, max: 500 },
    { label: '500₺ - 1000₺', min: 500, max: 1000 },
    { label: '1000₺ - 2500₺', min: 1000, max: 2500 },
    { label: '2500₺+', min: 2500, max: 100000 }
];

export default function CollectionFilters() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get current filters from URL
    const selectedCategory = searchParams.get('category') || 'all';
    const selectedSort = searchParams.get('sort') || 'newest';
    const selectedMinPrice = searchParams.get('minPrice');
    const selectedMaxPrice = searchParams.get('maxPrice');
    const selectedMaterial = searchParams.get('material');
    const onlyInStock = searchParams.get('inStock') === 'true';

    const updateFilter = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, value);
        });
        router.push(`/collection?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/collection');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-charcoal/10 rounded-full font-bold text-sm text-charcoal hover:border-clay hover:text-clay transition-all shadow-sm"
            >
                <SlidersHorizontal size={18} />
                Filtrele & Sırala
                {(selectedMinPrice || selectedMaterial || onlyInStock) && (
                    <span className="w-5 h-5 bg-clay text-white rounded-full flex items-center justify-center text-[10px]">
                        {[selectedMinPrice, selectedMaterial, onlyInStock ? 't' : null].filter(Boolean).length}
                    </span>
                )}
            </button>

            {/* Side Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[90]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-2xl font-black text-charcoal">Filtreleme</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-alabaster rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Filters Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-10">

                                {/* Category Filter (Quick access) */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-charcoal/40">Sıralama</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { label: 'En Yeni', value: 'newest' },
                                            { label: 'Fiyat (Artan)', value: 'price_asc' },
                                            { label: 'Fiyat (Azalan)', value: 'price_desc' }
                                        ].map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilter({ sort: opt.value })}
                                                className={cn(
                                                    "flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all",
                                                    selectedSort === opt.value ? "bg-charcoal text-white" : "bg-alabaster text-charcoal hover:bg-gray-200"
                                                )}
                                            >
                                                {opt.label}
                                                {selectedSort === opt.value && <Check size={16} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-charcoal/40">Durum</h3>
                                    <button
                                        onClick={() => updateFilter({ inStock: onlyInStock ? null : 'true' })}
                                        className={cn(
                                            "w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2",
                                            onlyInStock ? "border-clay bg-clay/5 text-clay" : "border-transparent bg-alabaster text-charcoal"
                                        )}
                                    >
                                        Sadece Stoktakiler
                                        <div className={cn(
                                            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                                            onlyInStock ? "bg-clay border-clay text-white" : "border-gray-300"
                                        )}>
                                            {onlyInStock && <Check size={14} />}
                                        </div>
                                    </button>
                                </div>

                                {/* Price Ranges */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-charcoal/40">Fiyat Aralığı</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {PRICE_RANGES.map(range => {
                                            const isActive = selectedMinPrice === range.min.toString() && selectedMaxPrice === range.max.toString();
                                            return (
                                                <button
                                                    key={range.label}
                                                    onClick={() => updateFilter({
                                                        minPrice: isActive ? null : range.min.toString(),
                                                        maxPrice: isActive ? null : range.max.toString()
                                                    })}
                                                    className={cn(
                                                        "flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all",
                                                        isActive ? "bg-clay text-white" : "bg-alabaster text-charcoal hover:bg-gray-200"
                                                    )}
                                                >
                                                    {range.label}
                                                    {isActive && <Check size={16} />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Material */}
                                <div className="space-y-4 pb-8">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-charcoal/40">Malzeme</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {MATERIALS.map(mat => (
                                            <button
                                                key={mat.value}
                                                onClick={() => updateFilter({ material: selectedMaterial === mat.value ? null : mat.value })}
                                                className={cn(
                                                    "px-6 py-3 rounded-full font-bold text-sm transition-all border-2",
                                                    selectedMaterial === mat.value ? "border-clay bg-clay text-white" : "border-charcoal/5 bg-white text-charcoal/60 hover:border-charcoal/20"
                                                )}
                                            >
                                                {mat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 border-t border-gray-100 flex gap-4 bg-alabaster/30">
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 py-4 font-bold text-charcoal hover:text-red-500 transition-colors"
                                >
                                    Sıfırla
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-[2] py-4 bg-charcoal text-white rounded-2xl font-black shadow-xl shadow-charcoal/20 hover:bg-black transition-all"
                                >
                                    Uygula
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
