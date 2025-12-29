'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface WishlistItem {
    id: string;
    product: {
        id: string;
        name: string;
        slug: string;
        price: string;
        images: string[];
        stock: number;
    };
}

export default function WishlistPage() {
    const { isSignedIn, isLoaded } = useUser();
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchWishlist();
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            const data = await res.json();
            setItems(data.items || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        // Optimistic update
        setItems(prev => prev.filter(item => item.product.id !== productId));

        try {
            await fetch(`/api/wishlist?productId=${productId}`, { method: 'DELETE' });
        } catch (error) {
            console.error(error);
            fetchWishlist(); // Revert on error
        }
    };

    if (!isLoaded) return <div className="min-h-screen bg-porcelain flex items-center justify-center"><Loader2 className="animate-spin text-charcoal/20" size={32} /></div>;

    if (!isSignedIn) {
        return (
            <main className="min-h-screen bg-porcelain">
                <Navbar />
                <div className="pt-40 pb-24 container mx-auto px-6 text-center">
                    <Heart size={48} className="mx-auto mb-6 text-charcoal/20" />
                    <h1 className="text-3xl font-black text-charcoal mb-4">Favorilerini Kaydet</h1>
                    <p className="text-charcoal/60 mb-8 max-w-md mx-auto">Beğendiğin ürünleri saklamak ve daha sonra kolayca bulmak için giriş yapmalısın.</p>
                    <Link href="/sign-in" className="bg-charcoal text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-all">Giriş Yap</Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />
            <div className="pt-40 pb-24 container mx-auto px-6 max-w-7xl">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-charcoal tracking-tighter mb-2">Favorilerim</h1>
                        <p className="text-charcoal/60 font-medium">Beğendiğiniz ürünler burada saklanır.</p>
                    </div>
                    <p className="text-sm font-bold text-charcoal">{items.length} Ürün</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="animate-spin text-charcoal/20" size={32} />
                    </div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-black/5">
                        <Heart size={64} className="mx-auto mb-6 text-charcoal/10" />
                        <h2 className="text-2xl font-black text-charcoal mb-4">Listeniz Boş</h2>
                        <p className="text-charcoal/60 mb-8">Henüz favorilere eklenmiş bir ürün yok.</p>
                        <Link href="/collection" className="bg-charcoal text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all inline-flex items-center gap-2">
                            Koleksiyonu Keşfet <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map(({ product }) => (
                            <div key={product.id} className="bg-white rounded-[2rem] p-4 border border-black/5 group hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-porcelain">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-all shadow-lg active:scale-95"
                                    >
                                        <Heart size={20} fill="currentColor" />
                                    </button>
                                </div>

                                <div className="px-2 pb-2">
                                    <Link href={`/product/${product.slug}`} className="block mb-2">
                                        <h3 className="font-bold text-lg text-charcoal leading-tight group-hover:underline">{product.name}</h3>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <p className="font-black text-xl text-charcoal">{product.price.toString()} ₺</p>
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="w-10 h-10 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-black transition-all"
                                        >
                                            <ShoppingBag size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
