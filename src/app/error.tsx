'use client';

import { useEffect } from 'react';
import Navbar from '@/components/navbar';
// Footer removed to prevent server-side leakage in client component
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('App Error:', error);
    }, [error]);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
                <h1 className="text-9xl font-black text-charcoal/5 mb-4 select-none">OOPS</h1>
                <h2 className="text-3xl font-bold text-charcoal mb-4">Bir şeyler ters gitti.</h2>
                <p className="text-charcoal/60 max-w-md mb-8">
                    Sistemimizde beklenmedik bir hata oluştu. Mühendislerimiz durumu inceliyor. Lütfen sayfayı yenilemeyi deneyin.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={reset}
                        className="bg-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-clay transition-colors"
                    >
                        Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="bg-alabaster text-charcoal px-8 py-3 rounded-full font-bold hover:bg-black/5 transition-colors"
                    >
                        Anasayfa
                    </Link>
                </div>
            </div>
            {/* Simple static footer fallback if needed, or nothing */}
            <div className="py-8 text-center text-charcoal/40 text-xs font-bold uppercase tracking-widest border-t border-gray-100 mt-auto">
                Tsuko Design Studio
            </div>
        </main>
    );
}
