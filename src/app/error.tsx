'use client';

import { useEffect } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-alabaster px-6 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle size={40} />
            </div>

            <h2 className="text-3xl font-black text-charcoal mb-4">
                Oops! Bir şeyler ters gitti.
            </h2>

            <p className="text-charcoal/60 max-w-md mb-8">
                Merak etmeyin, bu sizin hatanız değil. Mühendislerimiz durumu inceliyor. Lütfen sayfayı yenilemeyi deneyin.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="flex items-center gap-2 bg-charcoal text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-charcoal/20"
                >
                    <RefreshCcw size={18} />
                    Tekrar Dene
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 rounded-xl font-bold text-charcoal border border-black/10 hover:bg-white transition-colors"
                >
                    Ana Sayfa
                </button>
            </div>

            {/* Dev Info (Only visible in dev or if needed) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-12 p-4 bg-red-100/50 text-red-800 rounded-lg text-xs font-mono max-w-2xl text-left overflow-auto">
                    {error.message}
                    {error.digest && <div className="mt-2 text-red-600">Digest: {error.digest}</div>}
                </div>
            )}
        </div>
    );
}
