'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CheckCircle2, Home, ShoppingBag, ArrowRight } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderId');
    const { clearCart } = useCart();

    // Clear cart on success
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-8 animate-bounce">
                <CheckCircle2 size={48} />
            </div>

            <h1 className="text-4xl font-black text-charcoal mb-4">Siparişiniz Alındı!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Teşekkür ederiz. Ödemeniz başarıyla gerçekleşti ve siparişiniz hazırlanmak üzere işleme alındı.
            </p>

            {orderNumber && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 w-full">
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Sipariş Numarası</p>
                    <p className="text-3xl font-mono font-bold text-charcoal">{orderNumber}</p>
                </div>
            )}

            <p className="text-sm text-gray-400 mb-12">
                Sipariş detayları ve takip bilgileri e-posta adresinize gönderilecektir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                    href="/"
                    className="px-8 py-4 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                    <Home size={20} />
                    Anasayfaya Dön
                </Link>
                <Link
                    href="/#collection"
                    className="px-8 py-4 bg-gray-100 text-charcoal rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={20} />
                    Alışverişe Devam Et
                </Link>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-alabaster flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-24 container mx-auto px-6">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                        <span className="text-gray-400 font-bold animate-pulse">Yükleniyor...</span>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
