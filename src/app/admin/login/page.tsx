
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // We check the password via an API route or simply here for high speed
        // For production, a secure API route is better, but here we set a cookie directly
        // since we are the solo developers for now.

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError('Hatalı şifre. Lütfen tekrar deneyin.');
            }
        } catch (err) {
            setError('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-alabaster flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-charcoal/5 border border-charcoal/5">
                <div className="flex flex-col items-center mb-10">
                    <div className="relative w-40 h-12 mb-8">
                        <Image src="/logo.png" alt="Tsuko Logo" fill className="object-contain" />
                    </div>
                    <div className="w-16 h-16 bg-clay rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-clay/20">
                        <Lock size={28} />
                    </div>
                    <h1 className="text-2xl font-black text-charcoal">Yönetim Paneli</h1>
                    <p className="text-charcoal/40 text-sm mt-2">Devam etmek için şifrenizi girin.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifre"
                            className="w-full bg-alabaster border-none rounded-2xl px-6 py-5 text-charcoal placeholder:text-charcoal/20 focus:ring-2 focus:ring-clay/20 transition-all outline-none"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-rose text-xs font-bold text-center px-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-charcoal/10 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Giriş Yap
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-[10px] text-charcoal/20 uppercase tracking-widest mt-12 font-bold">
                    Tsuko Design © 2025
                </p>
            </div>
        </div>
    );
}
