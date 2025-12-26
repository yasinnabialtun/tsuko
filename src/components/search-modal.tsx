'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, FileText, ShoppingBag } from 'lucide-react';
import { products } from '@/lib/data';
import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Filter items
    const filteredProducts = query
        ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
        : [];

    const filteredPosts = query
        ? blogPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
        : [];

    const hasResults = filteredProducts.length > 0 || filteredPosts.length > 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-white/60 backdrop-blur-xl z-[90]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-24 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] h-[70vh] bg-white shadow-2xl rounded-3xl z-[100] border border-black/5 flex flex-col overflow-hidden"
                    >
                        {/* Search Header */}
                        <div className="p-6 border-b border-black/5 flex items-center gap-4">
                            <Search className="text-charcoal/40" size={24} />
                            <input
                                type="text"
                                placeholder="Vazo, aydınlatma veya blog yazısı ara..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-grow text-xl font-medium text-charcoal outline-none placeholder:text-charcoal/20"
                                autoFocus
                            />
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X className="text-charcoal/60" size={24} />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="flex-grow overflow-y-auto p-2">
                            {!query && (
                                <div className="h-full flex flex-col items-center justify-center text-charcoal/30">
                                    <Search size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm font-medium uppercase tracking-widest">Aramaya Başla</p>
                                </div>
                            )}

                            {query && !hasResults && (
                                <div className="p-8 text-center text-charcoal/50">
                                    Sonuç bulunamadı. Başka bir terim deneyin.
                                </div>
                            )}

                            {(filteredProducts.length > 0) && (
                                <div className="p-4">
                                    <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-4 px-2">Ürünler</h3>
                                    <div className="space-y-2">
                                        {filteredProducts.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-2 hover:bg-alabaster rounded-xl group transition-colors"
                                            >
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-charcoal group-hover:text-clay transition-colors">{product.name}</h4>
                                                    <p className="text-xs text-charcoal/50">{product.category}</p>
                                                </div>
                                                <ArrowRight size={16} className="text-charcoal/20 group-hover:text-clay opacity-0 group-hover:opacity-100 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(filteredPosts.length > 0) && (
                                <div className="p-4 pt-2">
                                    <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-4 px-2">Blog Yazıları</h3>
                                    <div className="space-y-2">
                                        {filteredPosts.map(post => (
                                            <Link
                                                key={post.id}
                                                href={`/blog/${post.slug}`}
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 hover:bg-alabaster rounded-xl group transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage flex-shrink-0">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-charcoal group-hover:text-clay transition-colors">{post.title}</h4>
                                                    <p className="text-xs text-charcoal/50 line-clamp-1">{post.excerpt}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-alabaster border-t border-black/5 flex justify-between items-center text-xs text-charcoal/40 font-medium">
                            <span>Enter tuşu seçer</span>
                            <span className="flex items-center gap-1">Tsuko Search <div className="w-2 h-2 bg-clay rounded-full animate-pulse" /></span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
