'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Heart, User, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchModal from './search-modal';
import { useWishlist } from '@/context/wishlist-context';
import { useCart } from '@/context/cart-context';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const { items: wishlistItems } = useWishlist();
    const { cartCount, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            <nav className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent",
                isScrolled ? "bg-porcelain shadow-[0_2px_20px_rgba(0,0,0,0.02)] py-4" : "bg-transparent py-6"
            )}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo - Minimal text fallback if image fails, but prioritizing image */}
                    <Link href="/" className="relative z-50 group">
                        <div className="relative w-36 h-10 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Tsuko Logo"
                                fill
                                className="object-contain object-left md:object-center"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Elite & Minimal */}
                    <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-charcoal/80">
                        <div className="flex items-center gap-8">
                            <Link href="/collection" className="hover:text-mauve transition-colors duration-300">Koleksiyon</Link>
                            <Link href="/blog" className="hover:text-mauve transition-colors duration-300">Journal</Link>
                            <Link href="/about" className="hover:text-mauve transition-colors duration-300">Atölye</Link>
                        </div>

                        <div className="h-4 w-px bg-stone mx-2"></div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hover:text-mauve transition-colors duration-300"
                                aria-label="Ara"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>

                            <Link href="/wishlist" className="hover:text-mauve transition-colors duration-300 relative group">
                                <Heart size={20} strokeWidth={1.5} className={cn("transition-colors", wishlistItems.length > 0 && "fill-mauve text-mauve")} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-mauve rounded-full animate-pulse" />
                                )}
                            </Link>

                            <div className="flex items-center gap-4">
                                <SignedOut>
                                    <Link href="/profile" className="hover:text-mauve transition-colors duration-300">
                                        <User size={20} strokeWidth={1.5} />
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <div className="flex items-center gap-4">
                                        <UserButton afterSignOutUrl="/" userProfileMode="navigation" userProfileUrl="/profile" />
                                    </div>
                                </SignedIn>

                                <Link href="/admin" className="text-charcoal/40 hover:text-mauve transition-colors duration-300 ml-2" title="Panel">
                                    <LayoutDashboard size={18} strokeWidth={1.5} />
                                </Link>
                            </div>

                            <button
                                onClick={toggleCart}
                                className="group flex items-center gap-2 bg-charcoal text-white px-6 py-2.5 rounded-full hover:bg-clay transition-all duration-300 relative ml-2"
                            >
                                <span className="font-medium tracking-wide">Sepet</span>
                                <div className="border-l border-white/20 pl-2 ml-1 flex items-center gap-1">
                                    <ShoppingBag size={16} />
                                    <span className="text-xs font-bold">{cartCount}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleCart}
                            className="text-charcoal relative"
                        >
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-clay text-white text-[10px] flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="text-charcoal hover:text-mauve transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={28} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay - Full Screen Elite */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-porcelain z-[60] flex flex-col"
                        >
                            <div className="p-6 flex justify-between items-center border-b border-stone/50">
                                <div className="relative w-32 h-10">
                                    <Image src="/logo.png" alt="Tsuko" fill className="object-contain object-left" />
                                </div>
                                <button
                                    className="p-2 bg-stone/20 rounded-full text-charcoal hover:bg-stone/40"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center gap-10 p-8">
                                <nav className="flex flex-col items-center gap-8 text-3xl font-light text-charcoal">
                                    <Link href="/collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-mauve transition-colors">Koleksiyon</Link>
                                    <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-mauve transition-colors">Journal</Link>
                                    <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-mauve transition-colors">Atölye</Link>
                                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-mauve transition-colors">İletişim</Link>
                                </nav>

                                <div className="w-16 h-px bg-stone"></div>

                                <div className="flex gap-10">
                                    <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2 text-charcoal/60 hover:text-mauve">
                                        <Heart size={24} />
                                        <span className="text-xs uppercase tracking-widest font-bold">Favoriler</span>
                                    </Link>
                                    <SignedIn>
                                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2 text-charcoal/60 hover:text-mauve">
                                            <User size={24} />
                                            <span className="text-xs uppercase tracking-widest font-bold">Hesabım</span>
                                        </Link>
                                    </SignedIn>
                                    <SignedOut>
                                        <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2 text-charcoal/60 hover:text-mauve">
                                            <User size={24} />
                                            <span className="text-xs uppercase tracking-widest font-bold">Giriş Yap</span>
                                        </Link>
                                    </SignedOut>
                                </div>
                            </div>

                            <div className="p-8 border-t border-stone/50 bg-white">
                                <button
                                    onClick={() => { setMobileMenuOpen(false); toggleCart(); }}
                                    className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-5 rounded-2xl text-lg font-medium hover:bg-clay transition-colors"
                                >
                                    <ShoppingBag size={20} />
                                    Sepetim ({cartCount})
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
