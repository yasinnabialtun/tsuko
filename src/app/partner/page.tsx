'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wallet, TrendingUp, User, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { getAffiliateStats } from './actions';
import Image from 'next/image';

export default function PartnerPage() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState('');

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;

        setLoading(true);
        setError('');
        setStats(null);

        const res = await getAffiliateStats(code);

        if (res.success) {
            setStats(res.data);
        } else {
            setError(res.error || 'Bir hata oluştu.');
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#E6D5C3]/20 to-transparent -z-10" />
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#CCD5AE]/10 rounded-full blur-3xl -z-10" />

            {/* Logo */}
            <div className="mb-12 relative w-40 h-10 opacity-80">
                <Image src="/logo.png" alt="Tsuko" fill className="object-contain" />
            </div>

            <div className="w-full max-w-md">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#2C2C2C] mb-3">İş Ortağı Paneli</h1>
                    <p className="text-[#666] text-sm">Kazançlarınızı takip etmek için size özel tanımlanan kodu giriniz.</p>
                </div>

                {/* Input Card */}
                <motion.div
                    layout
                    className="bg-white rounded-3xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] border border-[#F0F0F0] p-2 overflow-hidden"
                >
                    <form onSubmit={handleCheck} className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] flex items-center justify-center text-[#999]">
                            <Lock size={20} />
                        </div>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="KODUNUZ (ÖRN: BUSE10)"
                            className="flex-1 h-12 outline-none text-[#2C2C2C] font-bold placeholder:text-gray-300 tracking-wider uppercase text-sm"
                        />
                        <button
                            type="submit"
                            disabled={loading || !code}
                            className="w-12 h-12 bg-[#2C2C2C] text-white rounded-2xl flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                        </button>
                    </form>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 p-4 bg-red-50 text-red-500 text-sm font-bold text-center rounded-2xl border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dashboard Stats */}
                <AnimatePresence>
                    {stats && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", bounce: 0.2 }}
                            className="mt-8 space-y-4"
                        >
                            {/* Welcome Card */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#F0F0F0] flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-[#D4A373]">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-[#999] uppercase font-bold tracking-wider mb-1">Hoş Geldin</p>
                                    <h2 className="text-xl font-bold text-[#2C2C2C]">{stats.name}</h2>
                                </div>
                            </div>

                            {/* Main Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Total Sales */}
                                <div className="bg-[#2C2C2C] text-white p-6 rounded-3xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <TrendingUp size={60} />
                                    </div>
                                    <p className="text-xs text-white/60 uppercase font-bold tracking-wider mb-2">Toplam Ciro</p>
                                    <p className="text-2xl font-bold">₺{stats.totalSales.toFixed(2)}</p>
                                    <p className="text-[10px] text-white/40 mt-4">Kupon kullanımıyla gelen siparişler</p>
                                </div>

                                {/* Earnings */}
                                <div className="bg-[#D4A373] text-white p-6 rounded-3xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Wallet size={60} />
                                    </div>
                                    <p className="text-xs text-white/80 uppercase font-bold tracking-wider mb-2">Hakediş</p>
                                    <p className="text-2xl font-bold">₺{stats.totalEarnings.toFixed(2)}</p>
                                    <div className="mt-4 inline-flex px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold">
                                        %{stats.commissionRate} Komisyon
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-xs text-[#999] mt-6">
                                Veriler anlık olarak güncellenmektedir.<br />
                                Son Güncelleme: {new Date().toLocaleTimeString()}
                            </p>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            <div className="absolute bottom-6 text-[#CCC] text-xs font-medium">
                © Tsuko Design Affiliate System
            </div>
        </main>
    );
}
