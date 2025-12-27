'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchModal from './search-modal';
import { useWishlist } from '@/context/wishlist-context';
import { useCart } from '@/context/cart-context';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const { items: wishlistItems } = useWishlist();
    const { cartCount, toggleCart } = useCart();

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
                    {/* Logo */}
                    <Link href="/" className="relative z-50">
                        <div className="relative w-32 h-10">
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
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-charcoal/60">
                        <div className="flex items-center gap-8 mr-4">
                            <a href="/#collection" className="hover:text-charcoal transition-colors">Koleksiyon</a>
                            <Link href="/blog" className="hover:text-charcoal transition-colors">Blog</Link>
                            <a href="/#philosophy" className="hover:text-charcoal transition-colors">Felsefe</a>
                        </div>

                        <div className="h-6 w-px bg-charcoal/10 mx-2"></div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="hover:text-charcoal transition-colors"
                            >
                                <Search size={22} />
                            </button>

                            <Link href="/wishlist" className="hover:text-charcoal transition-colors relative">
                                <Heart size={22} className={cn("transition-colors", wishlistItems.length > 0 && "fill-rose text-rose")} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose rounded-full animate-pulse" />
                                )}
                            </Link>

                            <Link href="/admin" className="hover:text-charcoal transition-colors">
                                <User size={22} />
                            </Link>

                            <button
                                onClick={toggleCart}
                                className="flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-full hover:bg-black transition-all relative ml-2 shadow-lg shadow-charcoal/10"
                            >
                                <ShoppingBag size={18} />
                                <span className="hidden lg:inline">Sepet</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-clay text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleCart}
                            className="text-charcoal relative"
                        >
                            <ShoppingBag size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-clay text-white text-[10px] flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="text-charcoal"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
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
                            <div className="relative w-40 h-12 mb-8">
                                <Image src="/logo.png" alt="Tsuko Logo" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col items-center gap-8 text-3xl font-bold text-charcoal uppercase tracking-tighter">
                                <a href="#collection" onClick={() => setMobileMenuOpen(false)}>Koleksiyon</a>
                                <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                                <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Felsefe</a>
                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Yönetim</Link>
                            </div>
                            <button
                                onClick={() => { setMobileMenuOpen(false); toggleCart(); }}
                                className="w-full max-w-xs flex items-center justify-center gap-3 bg-charcoal text-white py-6 rounded-2xl text-xl font-bold"
                            >
                                <ShoppingBag size={24} />
                                Sepeti Görüntüle ({cartCount})
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
