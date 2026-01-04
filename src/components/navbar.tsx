'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Heart, User, ArrowRight, Sparkles } from 'lucide-react';
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
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2",
                isScrolled
                    ? "bg-[var(--color-sand)] border-black py-3 shadow-[0_4px_0_rgba(0,0,0,1)]"
                    : "bg-transparent border-transparent py-6"
            )}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 group">
                        <div className="relative w-32 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                            <Image
                                src="/logo.png"
                                alt="Tsuko Logo"
                                fill
                                className="object-contain object-left md:object-center"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 font-bold tracking-tight text-charcoal">
                        <div className="flex items-center gap-6">
                            <Link href="/collection" className="hover:text-[var(--color-blue)] hover:-translate-y-0.5 transition-all">Koleksiyon</Link>
                            <Link href="/blog" className="hover:text-[var(--color-purple)] hover:-translate-y-0.5 transition-all">Journal</Link>
                            <Link href="/about" className="hover:text-[var(--color-pink)] hover:-translate-y-0.5 transition-all">Atölye</Link>
                        </div>

                        <div className="h-6 w-0.5 bg-black/10 mx-2"></div>

                        <div className="flex items-center gap-4">
                            <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-white hover:text-black rounded-full border-2 border-transparent hover:border-black transition-all">
                                <Search size={20} strokeWidth={2.5} />
                            </button>

                            <Link href="/wishlist" className="relative group p-2 hover:bg-white hover:text-[var(--color-red)] rounded-full border-2 border-transparent hover:border-black transition-all">
                                <Heart size={20} strokeWidth={2.5} className={cn(mounted && wishlistItems.length > 0 && "fill-[var(--color-red)] text-[var(--color-red)]")} />
                            </Link>

                            <div className="flex items-center">
                                <SignedOut>
                                    <Link href="/profile" className="p-2 hover:bg-white hover:text-black rounded-full border-2 border-transparent hover:border-black transition-all">
                                        <User size={20} strokeWidth={2.5} />
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                            </div>

                            <button
                                onClick={toggleCart}
                                className="group flex items-center gap-2 px-5 py-2.5 bg-[var(--color-yellow)] text-black border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ml-2"
                            >
                                <span className="font-extrabold text-sm">Sepet</span>
                                <div className="flex items-center justify-center w-6 h-6 bg-white border-2 border-black rounded-full text-xs font-black">
                                    {mounted ? cartCount : 0}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 bg-[var(--color-yellow)] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            <ShoppingBag size={20} strokeWidth={2.5} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 text-[10px] flex items-center justify-center rounded-full font-black bg-[var(--color-red)] text-white border-2 border-black">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            <Menu size={24} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay - Full Fun Mode */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-sand)]"
                        >
                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                            <div className="relative p-6 flex justify-between items-center border-b-2 border-black bg-white/50 backdrop-blur-sm">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="relative w-28 h-8">
                                        <Image src="/logo.png" alt="Tsuko" fill className="object-contain object-left" />
                                    </div>
                                </Link>
                                <button
                                    className="p-2 bg-[var(--color-red)] text-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <X size={24} strokeWidth={3} />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col p-8 overflow-y-auto relative z-10">
                                <nav className="flex flex-col gap-4">
                                    {[
                                        { href: '/collection', label: 'Koleksiyon', color: 'bg-[var(--color-blue)]' },
                                        { href: '/blog', label: 'Journal', color: 'bg-[var(--color-purple)]' },
                                        { href: '/about', label: 'Atölye', color: 'bg-[var(--color-yellow)]' },
                                        { href: '/wishlist', label: 'Favorilerim', color: 'bg-[var(--color-pink)]' }
                                    ].map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`group flex items-center justify-between p-6 ${item.color} border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
                                        >
                                            <span className="text-xl font-black text-white uppercase tracking-wider mix-blend-hard-light">{item.label}</span>
                                            <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                                                <ArrowRight size={20} className="text-black" strokeWidth={3} />
                                            </div>
                                        </Link>
                                    ))}
                                </nav>

                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" showName />
                                </SignedIn>

                                <SignedOut>
                                    <Link
                                        href="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-4 bg-black text-white border-2 border-black rounded-xl flex items-center justify-center gap-2 font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                                    >
                                        <User size={20} />
                                        Giriş Yap
                                    </Link>
                                </SignedOut>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >
        </>
    );
}
