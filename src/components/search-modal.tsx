'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ products: any[], posts: any[] }>({ products: [], posts: [] });
    const [loading, setLoading] = useState(false);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus input logic can be handled by autoFocus prop
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults({ products: [], posts: [] });
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setResults(data);
                    }
                } catch (error) {
                    console.error("Search error", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults({ products: [], posts: [] });
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [query]);

    const hasResults = results.products.length > 0 || results.posts.length > 0;

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
                                placeholder="Ürün veya yazı ara..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-grow text-xl font-medium text-charcoal outline-none placeholder:text-charcoal/20 bg-transparent"
                                autoFocus
                            />
                            {loading ? (
                                <Loader2 className="animate-spin text-clay" size={24} />
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                >
                                    <X className="text-charcoal/60" size={24} />
                                </button>
                            )}
                        </div>

                        {/* Results Area */}
                        <div className="flex-grow overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                            {!query && (
                                <div className="h-full flex flex-col items-center justify-center text-charcoal/30">
                                    <Search size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm font-medium uppercase tracking-widest">Aramaya Başla</p>
                                </div>
                            )}

                            {query && !loading && !hasResults && query.length >= 2 && (
                                <div className="p-8 text-center text-charcoal/50">
                                    Sonuç bulunamadı.
                                </div>
                            )}

                            {hasResults && (
                                <div className="p-4 space-y-6">
                                    {results.products.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-4 px-2">Ürünler</h3>
                                            <div className="space-y-2">
                                                {results.products.map((product: any) => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/product/${product.slug || product.id}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-4 p-2 hover:bg-alabaster rounded-xl group transition-colors"
                                                    >
                                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                            />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="font-bold text-charcoal group-hover:text-clay transition-colors">{product.name}</h4>
                                                            <p className="text-xs text-charcoal/50">{product.category}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-sm font-bold text-charcoal">{product.price} ₺</span>
                                                        </div>
                                                        <ArrowRight size={16} className="text-charcoal/20 group-hover:text-clay opacity-0 group-hover:opacity-100 transition-all ml-2" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {results.posts.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-4 px-2">Blog</h3>
                                            <div className="space-y-2">
                                                {results.posts.map((post: any) => (
                                                    <Link
                                                        key={post.id}
                                                        href={`/blog/${post.slug}`}
                                                        onClick={onClose}
                                                        className="flex items-center gap-4 p-3 hover:bg-alabaster rounded-xl group transition-colors"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sage flex-shrink-0">
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
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-alabaster border-t border-black/5 flex justify-between items-center text-xs text-charcoal/40 font-medium">
                            <span>2 karakter ve üzeri</span>
                            <span className="flex items-center gap-1">Live Search <div className="w-2 h-2 bg-clay rounded-full animate-pulse" /></span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
