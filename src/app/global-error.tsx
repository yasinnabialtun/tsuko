'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-white min-h-screen flex items-center justify-center p-6 text-center font-sans">
                <div>
                    <h2 className="text-4xl font-black mb-4">Kritik Hata</h2>
                    <p className="mb-6 text-gray-600">Sistem şu an yanıt veremiyor.</p>
                    <button
                        onClick={() => reset()}
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold"
                    >
                        Yenile
                    </button>
                </div>
            </body>
        </html>
    );
}
