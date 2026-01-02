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
    const [mounted, setMounted] = useState(false);

    const { items: wishlistItems } = useWishlist();
    const { cartCount, toggleCart } = useCart();

    useEffect(() => {
        setMounted(true);
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
                "fixed top-0 left-0 w-full z-50 transition-all duration-700 border-b",
                isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-4 backdrop-blur-md" : "bg-transparent py-6 border-transparent"
            )} style={{
                backgroundColor: isScrolled ? 'var(--mood-bg)' : 'transparent',
                borderColor: isScrolled ? 'rgba(0,0,0,0.05)' : 'transparent',
                color: 'var(--mood-text)'
            }}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 group">
                        <div className="relative w-36 h-10 transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Tsuko Logo"
                                fill
                                className="object-contain object-left md:object-center"
                                priority
                                style={{ filter: isScrolled ? 'none' : 'invert(0)' }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide" style={{ color: 'var(--mood-text)' }}>
                        <div className="flex items-center gap-8">
                            <Link href="/collection" className="opacity-70 hover:opacity-100 transition-opacity">Koleksiyon</Link>
                            <Link href="/blog" className="opacity-70 hover:opacity-100 transition-opacity">Journal</Link>
                            <Link href="/about" className="opacity-70 hover:opacity-100 transition-opacity">Atölye</Link>
                        </div>

                        <div className="h-4 w-px bg-current opacity-10 mx-2"></div>

                        <div className="flex items-center gap-6">
                            <button onClick={() => setSearchOpen(true)} className="opacity-70 hover:opacity-100">
                                <Search size={20} strokeWidth={1.5} />
                            </button>

                            <Link href="/wishlist" className="relative group opacity-70 hover:opacity-100">
                                <Heart size={20} strokeWidth={1.5} className={cn(mounted && wishlistItems.length > 0 && "fill-current")} />
                                {mounted && wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[var(--mood-accent)] rounded-full animate-pulse" />
                                )}
                            </Link>

                            <div className="flex items-center gap-4">
                                <SignedOut>
                                    <Link href="/profile" className="opacity-70 hover:opacity-100">
                                        <User size={20} strokeWidth={1.5} />
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>

                                <Link href="/admin" className="opacity-30 hover:opacity-100 transition-opacity ml-2">
                                    <LayoutDashboard size={18} strokeWidth={1.5} />
                                </Link>
                            </div>

                            <button
                                onClick={toggleCart}
                                className="group flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 relative ml-2 shadow-lg"
                                style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}
                            >
                                <span className="font-bold tracking-tight">Sepet</span>
                                <div className="border-l border-current/20 pl-2 ml-1 flex items-center gap-1">
                                    <ShoppingBag size={16} />
                                    <span className="text-xs font-black">{mounted ? cartCount : 0}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden" style={{ color: 'var(--mood-text)' }}>
                        <button onClick={toggleCart} className="relative">
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={28} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="fixed inset-0 z-[60] flex flex-col"
                            style={{ backgroundColor: 'var(--mood-bg)', color: 'var(--mood-text)' }}
                        >
                            <div className="p-6 flex justify-between items-center border-b border-current/10">
                                <div className="relative w-32 h-10">
                                    <Image src="/logo.png" alt="Tsuko" fill className="object-contain object-left" />
                                </div>
                                <button className="p-2 rounded-full hover:bg-current/10" onClick={() => setMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-center gap-10 p-8">
                                <nav className="flex flex-col items-center gap-8 text-3xl font-light">
                                    <Link href="/collection" onClick={() => setMobileMenuOpen(false)}>Koleksiyon</Link>
                                    <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
                                    <Link href="/about" onClick={() => setMobileMenuOpen(false)}>Atölye</Link>
                                </nav>
                                <div className="w-16 h-px bg-current/20"></div>
                            </div>

                            <div className="p-8 border-t border-current/10" style={{ backgroundColor: 'var(--mood-card-bg)' }}>
                                <button
                                    onClick={() => { setMobileMenuOpen(false); toggleCart(); }}
                                    className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-bold shadow-2xl"
                                    style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}
                                >
                                    <ShoppingBag size={20} />
                                    Sepetim ({mounted ? cartCount : 0})
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
