'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { XCircle, RefreshCw, Home } from 'lucide-react';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />

            <main className="flex-1 pt-40 pb-32 container-custom flex flex-col items-center justify-center text-center">
                <div className="premium-card bg-white p-12 md:p-16 max-w-2xl w-full flex flex-col items-center">
                    <div className="w-24 h-24 bg-rose/5 rounded-full flex items-center justify-center text-rose mb-10 shadow-inner">
                        <XCircle size={48} />
                    </div>

                    <h1 className="text-4xl font-black text-charcoal mb-6 tracking-tighter uppercase">Ödeme Tamamlanamadı</h1>
                    <p className="text-lg text-charcoal/60 mb-12 font-light leading-relaxed max-w-md mx-auto">
                        Bir şeyler yolunda gitmedi. Ödeme işlemi iptal edildi veya bir hata oluştu. Hesabınızdan herhangi bir çekim yapılmadı.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <Link
                            href="/checkout"
                            className="flex-1 py-5 bg-charcoal text-white rounded-[2rem] font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl shadow-charcoal/20"
                        >
                            <RefreshCw size={16} />
                            TEKRAR DENE
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 py-5 bg-white border border-current/10 text-charcoal rounded-[2rem] font-black text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-current/5 transition-all"
                        >
                            <Home size={16} />
                            ANASAYFA
                        </Link>
                    </div>

                    <p className="text-[10px] text-charcoal/30 uppercase tracking-[0.2em] font-black mt-12">
                        Yardıma mı ihtiyacınız var? destek@tsukodesign.com
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
