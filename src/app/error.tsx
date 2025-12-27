
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-alabaster text-charcoal px-6 text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
                <AlertTriangle size={48} className="text-red-500" />
            </div>

            <h1 className="text-3xl font-black text-charcoal mb-4">Küçük Bir Aksaklık Oluştu</h1>
            <p className="text-charcoal/60 max-w-md mb-8">
                Sistemlerimizde beklenmedik bir hata meydana geldi. Ekibimiz şu an üzerinde çalışıyor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={reset}
                    className="flex items-center justify-center gap-2 bg-charcoal text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors"
                >
                    <RefreshCw size={20} />
                    Tekrar Dene
                </button>
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-white border border-black/10 text-charcoal px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>

            {/* Dev Info (Only distinct in visual, hidden or technical look for user) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-12 p-4 bg-gray-100 rounded-lg text-left text-xs font-mono text-red-600 max-w-2xl overflow-auto w-full">
                    {error.message}
                </div>
            )}
        </div>
    );
}
