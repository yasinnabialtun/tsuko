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
        // Preserve current category & sort if not updating them
        if (!updates.hasOwnProperty('category') && selectedCategory !== 'all') params.set('category', selectedCategory);
        if (!updates.hasOwnProperty('sort') && selectedSort !== 'newest') params.set('sort', selectedSort);

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
        <div className="relative z-50">
            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-6 py-3 bg-[var(--color-yellow)] border-2 border-black rounded-xl font-black text-sm text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-wide group"
            >
                <div className="bg-black text-white p-1 rounded group-hover:rotate-180 transition-transform duration-500">
                    <SlidersHorizontal size={14} strokeWidth={3} />
                </div>
                Filtrele & Sırala
                {(selectedMinPrice || selectedMaterial || onlyInStock) && (
                    <span className="w-5 h-5 bg-[var(--color-red)] text-white rounded-full border-2 border-black flex items-center justify-center text-[10px] font-black animate-bounce">
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
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-sand)] z-[100] shadow-2xl flex flex-col border-l-4 border-black"
                        >
                            {/* Header */}
                            <div className="p-6 border-b-4 border-black flex justify-between items-center bg-white relative z-20">
                                <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Filtreleme</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-[var(--color-red)] hover:bg-black text-white border-2 border-black rounded-xl transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <X size={24} strokeWidth={3} />
                                </button>
                            </div>

                            {/* Filters Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat bg-opacity-10">

                                {/* Sort Filter */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-black/60 bg-white border-2 border-black w-fit px-2 py-1 rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Sıralama</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { label: 'En Yeni', value: 'newest' },
                                            { label: 'Fiyat (Artan)', value: 'price_asc' },
                                            { label: 'Fiyat (Azalan)', value: 'price_desc' }
                                        ].map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilter({ sort: opt.value })}
                                                className={cn(
                                                    "flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group",
                                                    selectedSort === opt.value
                                                        ? "bg-[var(--color-purple)] text-white"
                                                        : "bg-white text-black hover:bg-[var(--color-purple)] hover:text-white"
                                                )}
                                            >
                                                {opt.label}
                                                {selectedSort === opt.value && <div className="p-1 bg-white rounded-full border border-black"><Check size={12} className="text-black" strokeWidth={4} /></div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-black/60 bg-white border-2 border-black w-fit px-2 py-1 -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Durum</h3>
                                    <button
                                        onClick={() => updateFilter({ inStock: onlyInStock ? null : 'true' })}
                                        className={cn(
                                            "w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                                            onlyInStock ? "bg-[var(--color-green)] text-black" : "bg-white text-black hover:bg-[var(--color-green)]"
                                        )}
                                    >
                                        Sadece Stoktakiler
                                        <div className={cn(
                                            "w-6 h-6 rounded-md border-2 border-black flex items-center justify-center transition-all bg-white",
                                            onlyInStock ? "bg-black text-white" : ""
                                        )}>
                                            {onlyInStock && <Check size={16} strokeWidth={4} />}
                                        </div>
                                    </button>
                                </div>

                                {/* Price Ranges */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-black/60 bg-white border-2 border-black w-fit px-2 py-1 rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Fiyat Aralığı</h3>
                                    <div className="grid grid-cols-1 gap-3">
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
                                                        "flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                                                        isActive
                                                            ? "bg-[var(--color-blue)] text-white"
                                                            : "bg-white text-black hover:bg-[var(--color-blue)] hover:text-white"
                                                    )}
                                                >
                                                    {range.label}
                                                    {isActive && <div className="p-1 bg-white rounded-full border border-black"><Check size={12} className="text-black" strokeWidth={4} /></div>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 border-t-4 border-black flex gap-4 bg-white relative z-20">
                                <button
                                    onClick={clearFilters}
                                    className="flex-1 py-4 font-black uppercase tracking-wider text-black bg-white hover:bg-[var(--color-red)] hover:text-white transition-all border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    Sıfırla
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-[2] py-4 bg-[var(--color-yellow)] text-black rounded-xl font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
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
