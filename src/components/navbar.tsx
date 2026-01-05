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

    // Stagger animation variants for menu items
    const menuContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const menuItemVariants = {
        hidden: { y: 100, opacity: 0, rotate: 5 },
        show: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        },
        exit: { y: 50, opacity: 0 }
    };

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
                    {/* Logo - Pop effect on hover */}
                    <Link href="/" className="relative z-50 group">
                        <div className="relative w-32 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                            <Image
                                src="/logo.png"
                                alt="Tsuko Logo"
                                fill
                                className="object-contain object-left md:object-center"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation - Clean & Bold */}
                    <div className="hidden md:flex items-center gap-8 font-bold tracking-tight text-black">
                        <div className="flex items-center gap-6">
                            <Link href="/collection" className="relative hover:text-[var(--color-blue)] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest font-black after:content-[''] after:absolute after:w-full after:h-1 after:bg-[var(--color-blue)] after:bottom-[-4px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">Koleksiyon</Link>
                            <Link href="/blog" className="relative hover:text-[var(--color-purple)] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest font-black after:content-[''] after:absolute after:w-full after:h-1 after:bg-[var(--color-purple)] after:bottom-[-4px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">Journal</Link>
                            <Link href="/about" className="relative hover:text-[var(--color-pink)] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest font-black after:content-[''] after:absolute after:w-full after:h-1 after:bg-[var(--color-pink)] after:bottom-[-4px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">Atölye</Link>
                        </div>

                        <div className="h-6 w-0.5 bg-black/20 mx-2 rotate-12"></div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setSearchOpen(true)} className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white rounded-full border-2 border-transparent hover:border-black transition-all group">
                                <Search size={20} strokeWidth={2.5} className="group-hover:scale-90 transition-transform" />
                            </button>

                            <Link href="/wishlist" className="relative w-10 h-10 flex items-center justify-center hover:bg-black hover:text-[var(--color-red)] rounded-full border-2 border-transparent hover:border-black transition-all group">
                                <Heart size={20} strokeWidth={2.5} className={cn("group-hover:scale-90 transition-transform", mounted && wishlistItems.length > 0 && "fill-[var(--color-red)] text-[var(--color-red)]")} />
                            </Link>

                            <div className="flex items-center">
                                <SignedOut>
                                    <Link href="/profile" className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white rounded-full border-2 border-transparent hover:border-black transition-all group">
                                        <User size={20} strokeWidth={2.5} className="group-hover:scale-90 transition-transform" />
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <UserButton afterSignOutUrl="/" appearance={{
                                        elements: {
                                            avatarBox: "w-10 h-10 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all"
                                        }
                                    }} />
                                </SignedIn>
                            </div>

                            <button
                                onClick={toggleCart}
                                className="group flex items-center gap-2 px-5 py-2.5 bg-[var(--color-yellow)] text-black border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ml-2"
                            >
                                <span className="font-black text-xs uppercase tracking-widest hidden lg:inline">Sepetim</span>
                                <ShoppingBag size={18} strokeWidth={2.5} />
                                <div className="flex items-center justify-center w-6 h-6 bg-black text-white border-2 border-black rounded-full text-[10px] font-black group-hover:bg-white group-hover:text-black transition-colors">
                                    {mounted ? cartCount : 0}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Chunky */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleCart}
                            className="relative w-12 h-12 flex items-center justify-center bg-[var(--color-yellow)] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                        >
                            <ShoppingBag size={24} strokeWidth={2.5} />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 text-[10px] flex items-center justify-center rounded-full font-black bg-[var(--color-red)] text-white border-2 border-black animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="w-12 h-12 flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                        >
                            <Menu size={28} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* AWWWARDS-LEVEL MOBILE MENU OVERLAY */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.8 }}
                            className="fixed inset-0 z-[100] bg-[var(--color-purple)] flex flex-col items-center justify-center overflow-hidden"
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>

                            {/* Close Button - Huge */}
                            <button
                                className="absolute top-6 right-6 w-16 h-16 bg-white text-black border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-all z-20 group"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={40} strokeWidth={4} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Menu Links - Staggered & Giant */}
                            <motion.nav
                                variants={menuContainerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="flex flex-col items-center gap-4 relative z-10 w-full px-6"
                            >
                                {[
                                    { href: '/', label: 'Anasayfa', emoji: '🏠' },
                                    { href: '/collection', label: 'Koleksiyon', emoji: '🛍️' },
                                    { href: '/blog', label: 'Journal', emoji: '📓' },
                                    { href: '/about', label: 'Atölye', emoji: '🎨' },
                                    { href: '/profile', label: 'Profilim', emoji: '👤' },
                                ].map((item, idx) => (
                                    <motion.div key={idx} variants={menuItemVariants} className="w-full">
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full text-center"
                                        >
                                            <span className="block text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter hover:text-[var(--color-yellow)] hover:scale-105 hover:-rotate-2 transition-all duration-300 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '2px black' }}>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.nav>

                            {/* Footer links in menu */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-10 flex gap-6 z-10"
                            >
                                <a href="https://instagram.com" target="_blank" className="p-4 bg-white border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:bg-[var(--color-pink)] transition-all">
                                    <span className="sr-only">Instagram</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                </a>
                                <div className="p-4 bg-white border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:bg-[var(--color-green)] transition-all">
                                    <span className="sr-only">Contact</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav >
        </>
    );
}
