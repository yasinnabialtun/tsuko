'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Search, Package, ArrowRight, Loader2, Check, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch(`/api/orders/track?orderNumber=${orderNumber}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data);
            } else {
                setError(data.error || 'Sipariş bulunamadı.');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const statusSteps = [
        { key: 'PENDING', label: 'Alındı', desc: 'Siparişiniz sistemimize ulaştı.' },
        { key: 'PREPARING', label: 'Hazırlanıyor', desc: 'Ürünleriniz özenle paketleniyor.' },
        { key: 'SHIPPED', label: 'Kargoda', desc: 'Siparişiniz yola çıktı.' },
        { key: 'DELIVERED', label: 'Teslim Edildi', desc: 'Paketiniz size ulaştı.' },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.key === result?.status);

    return (
        <main className="min-h-screen bg-[var(--color-sand)] text-black">
            <Navbar />

            <div className="pt-32 md:pt-40 pb-20 container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <span className="inline-block px-4 py-1.5 mb-6 bg-[var(--color-yellow)] text-black text-xs font-black tracking-[0.2em] uppercase border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        HIZLI TESLİMAT
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tighter">Nerede Bu Kargo? 📦</h1>
                    <p className="text-black/70 text-lg font-bold">
                        Sipariş numaranı gir, anlık durumunu hemen öğren.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="relative group">
                        <input
                            type="text"
                            className="w-full h-20 pl-8 pr-20 rounded-2xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 outline-none transition-all text-xl font-black uppercase placeholder:normal-case placeholder:font-bold placeholder:text-black/30 text-black"
                            placeholder="Sipariş No (Örn: TS-1024)"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-4 h-12 w-12 bg-black text-white border-2 border-black rounded-xl flex items-center justify-center hover:bg-[var(--color-purple)] hover:border-black transition-all group-focus-within:rotate-12"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <ArrowRight strokeWidth={3} />}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-8 p-4 bg-[var(--color-red)] text-white font-black rounded-xl text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                            {error}
                        </div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 bg-white rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 relative overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                                <div>
                                    <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Sipariş Sahibi</p>
                                    <p className="text-2xl font-black text-black">{result.customerName}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Tahmini Teslimat</p>
                                    <p className="text-xl font-black text-[var(--color-purple)] bg-[var(--color-sand)] px-3 py-1 rounded-lg border-2 border-black -rotate-2 inline-block">2-3 İş Günü</p>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="space-y-8 relative z-10 pl-2">
                                <div className="absolute left-[19px] top-2 bottom-4 w-1 bg-black/10 z-0" />
                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;

                                    return (
                                        <div key={step.key} className="flex gap-6 relative z-10">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 border-black shrink-0 ${isCompleted ? 'bg-[var(--color-green)] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black/20'}`}>
                                                {isCompleted ? <Check size={20} strokeWidth={4} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                                            </div>
                                            <div>
                                                <h4 className={`font-black text-lg ${isCompleted ? 'text-black' : 'text-black/30'}`}>{step.label}</h4>
                                                <p className={`text-sm font-bold ${isCompleted ? 'text-black/60' : 'text-black/10'}`}>{step.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {result.trackingNumber && (
                                <div className="mt-12 p-6 bg-[var(--color-sand)] rounded-2xl border-2 border-black flex items-center justify-between relative z-10 group hover:bg-[var(--color-yellow)] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <Truck size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-black/40 uppercase tracking-widest">{result.carrier || 'Kargo Takip No'}</p>
                                            <p className="font-mono font-black text-lg">{result.trackingNumber}</p>
                                        </div>
                                    </div>
                                    {result.carrier && (
                                        <a
                                            href={
                                                result.carrier.includes('Yurtiçi') ? `https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${result.trackingNumber}` :
                                                    result.carrier.includes('Aras') ? `https://www.araskargo.com.tr/kargo-takip/${result.trackingNumber}` :
                                                        result.carrier.includes('MNG') ? `https://www.mngkargo.com.tr/gonderitakibi?gonderino=${result.trackingNumber}` :
                                                            result.carrier.includes('Sürat') ? `https://www.suratkargo.com.tr/kargotakip/?takipno=${result.trackingNumber}` :
                                                                result.carrier.includes('PTT') ? `https://gonderitakip.ptt.gov.tr/Track/Verify?id=${result.trackingNumber}` :
                                                                    '#'
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--color-purple)] transition-all border-2 border-transparent hover:border-black shadow-lg"
                                        >
                                            SORGULA
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t-2 border-black/10 relative z-10">
                                <h4 className="text-xs font-black text-black/40 uppercase tracking-widest mb-4">Sipariş İçeriği</h4>
                                <div className="space-y-4">
                                    {result.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-3 bg-white rounded-xl border border-black/10">
                                            <span className="text-black font-bold">{item.product.name}</span>
                                            <span className="font-black bg-black text-white px-2 py-1 rounded text-xs">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="mt-16 grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-pink)] border-2 border-black flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                                <Package size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase">Üye misiniz?</h4>
                                <p className="text-xs text-black/60 mb-3 font-medium">Geçmiş siparişlerine bak.</p>
                                <a href="/sign-in" className="text-xs font-black underline decoration-2 decoration-[var(--color-pink)]">Giriş Yap</a>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-[var(--color-blue)] border-2 border-black flex items-center justify-center text-white group-hover:-rotate-12 transition-transform">
                                <Search size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase">Yardım mı lazım?</h4>
                                <p className="text-xs text-black/60 mb-3 font-medium">Bize ulaş, halledelim.</p>
                                <a href="/contact" className="text-xs font-black underline decoration-2 decoration-[var(--color-blue)]">İletişim</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

