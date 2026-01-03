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
        <main className="min-h-screen bg-porcelain">
            <Navbar />

            <div className="pt-24 md:pt-40 pb-20 container mx-auto px-6">
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
                            placeholder="Sipariş No (Örn: TS-1024)"
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

                    {error && (
                        <div className="mt-6 p-4 bg-rose/10 text-rose text-sm font-bold rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 bg-white rounded-3xl border border-white shadow-2xl p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                                <div>
                                    <p className="text-[10px] font-black text-charcoal/20 uppercase tracking-widest mb-1">Sipariş Sahibi</p>
                                    <p className="text-xl font-bold text-charcoal">{result.customerName}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-[10px] font-black text-charcoal/20 uppercase tracking-widest mb-1">Tahmini Teslimat</p>
                                    <p className="text-xl font-bold text-clay">2-3 İş Günü</p>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="space-y-8 relative">
                                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-alabaster z-0" />
                                {statusSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;

                                    return (
                                        <div key={step.key} className="flex gap-6 relative z-10">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-clay text-white shadow-lg shadow-clay/20' : 'bg-alabaster text-charcoal/20'}`}>
                                                {isCompleted ? <Check size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold ${isCompleted ? 'text-charcoal' : 'text-charcoal/20'}`}>{step.label}</h4>
                                                <p className={`text-xs ${isCompleted ? 'text-charcoal/60' : 'text-charcoal/10'}`}>{step.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {result.trackingNumber && (
                                <div className="mt-12 p-6 bg-alabaster rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal">
                                            <Truck size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-charcoal/20 uppercase tracking-widest">{result.carrier || 'Kargo Takip No'}</p>
                                            <p className="font-mono font-bold">{result.trackingNumber}</p>
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
                                            className="px-6 py-3 bg-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                                        >
                                            SORGULA
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="mt-12 pt-8 border-t border-alabaster">
                                <h4 className="text-xs font-black text-charcoal/20 uppercase tracking-widest mb-4">Sipariş İçeriği</h4>
                                <div className="space-y-4">
                                    {result.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center text-sm">
                                            <span className="text-charcoal/60 font-medium">{item.product.name}</span>
                                            <span className="font-bold">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

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

