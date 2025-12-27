'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { XCircle, RefreshCw, Home } from 'lucide-react';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-alabaster flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 container mx-auto px-6 flex flex-col items-center justify-center text-center max-w-2xl">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8">
                    <XCircle size={48} />
                </div>

                <h1 className="text-4xl font-black text-charcoal mb-4">Ödeme İptal Edildi</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Ödeme işlemi tamamlanamadı veya tarafınızca iptal edildi. Hesabınızdan herhangi bir ücret tahsil edilmemiştir.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/checkout"
                        className="px-8 py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Tekrar Dene
                    </Link>
                    <Link
                        href="/"
                        className="px-8 py-4 bg-white border-2 border-gray-100 text-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Anasayfa
                    </Link>
                </div>

                <p className="text-sm text-gray-400 mt-12">
                    Bir sorun olduğunu düşünüyorsanız, lütfen bizimle iletişime geçin.
                </p>
            </main>

            <Footer />
        </div>
    );
}
