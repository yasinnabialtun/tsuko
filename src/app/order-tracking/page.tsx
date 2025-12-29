'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Search, Package, ArrowRight, Loader2 } from 'lucide-react';

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    // const [result, setResult] = useState(null); 

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber) return;

        setLoading(true);
        // Simulation for now
        setTimeout(() => {
            setLoading(false);
            alert("Sipariş takibi özelliği yakında aktif olacak. Lütfen profil sayfanızdan siparişlerimi kontrol ediniz.");
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Nerede Bu Kargo?</span>
                    <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-6">Sipariş Takibi</h1>
                    <p className="text-charcoal/60 text-lg">
                        Sipariş numaranızı girerek kargonuzun son durumunu öğrenebilirsiniz.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white border border-white shadow-xl shadow-stone/10 focus:ring-2 focus:ring-clay/20 outline-none transition-all text-lg font-mono uppercase placeholder:normal-case placeholder:font-sans"
                            placeholder="Sipariş No (Örn: TS-123...)"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 h-12 w-12 bg-charcoal text-white rounded-xl flex items-center justify-center hover:bg-black transition-all"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                        </button>
                    </form>

                    <div className="mt-12 grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-white/50 flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center text-clay">
                                <Package size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Üye misiniz?</h4>
                                <p className="text-xs text-stone/60 mb-3">Hesabınıza giriş yaparak tüm geçmiş siparişlerinizi görebilirsiniz.</p>
                                <a href="/sign-in" className="text-xs font-bold underline">Giriş Yap</a>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-white/50 flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center text-clay">
                                <Search size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Yardım mı lazım?</h4>
                                <p className="text-xs text-stone/60 mb-3">Sipariş numaranızı hatırlamıyorsanız bize ulaşın.</p>
                                <a href="/contact" className="text-xs font-bold underline">İletişim</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
