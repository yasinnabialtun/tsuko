'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchModal from './search-modal';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            <nav className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6",
                isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent"
            )}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-charcoal">
                        TSUKO<span className="text-clay">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-charcoal/60">
                        <a href="/#collection" className="hover:text-charcoal transition-colors">Koleksiyon</a>
                        <Link href="/blog" className="hover:text-charcoal transition-colors">Blog</Link>
                        <a href="/#philosophy" className="hover:text-charcoal transition-colors">Felsefe</a>

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hover:text-charcoal transition-colors"
                        >
                            <Search size={22} />
                        </button>
                        <a href="#lighting-demo" className="hover:text-charcoal transition-colors">Aydınlatma</a>
                        <a
                            href="#"
                            className="flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full hover:bg-black transition-all"
                        >
                            <ShoppingBag size={18} />
                            Shopier
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-charcoal"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col items-center justify-center gap-12"
                        >
                            <button
                                className="absolute top-8 right-8 text-charcoal"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={32} />
                            </button>
                            <div className="flex flex-col items-center gap-8 text-3xl font-bold text-charcoal uppercase tracking-tighter">
                                <a href="#collection" onClick={() => setMobileMenuOpen(false)}>Koleksiyon</a>
                                <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Felsefe</a>
                                <a href="#lighting-demo" onClick={() => setMobileMenuOpen(false)}>Aydınlatma</a>
                            </div>
                            <a
                                href="#"
                                className="w-full max-w-xs flex items-center justify-center gap-3 bg-charcoal text-white py-6 rounded-2xl text-xl font-bold"
                            >
                                <ShoppingBag size={24} />
                                Mağaza (Shopier)
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
