
'use client';
import { useState } from 'react';
import { Bell, Check, Loader2 } from 'lucide-react';

export default function StockNotifyForm({ productId }: { productId: string }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, productId })
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMsg(data.message);
            } else {
                setStatus('error'); // Even if already registered, show as info
                setMsg(data.message || data.error || 'Hata oluştu.');
            }
        } catch {
            setStatus('error');
            setMsg('Bağlantı hatası.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-800">
                <Check size={20} />
                <p className="font-bold text-sm">{msg}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-4 rounded-xl mt-4">
            <h4 className="font-bold text-charcoal mb-2 flex items-center gap-2">
                <Bell size={16} /> Gelince Haber Ver
            </h4>
            <p className="text-xs text-gray-500 mb-3">
                Bu ürün tükendi. Stoğa girdiğinde ilk sizin haberiniz olsun.
            </p>
            <div className="flex gap-2">
                <input
                    type="email"
                    required
                    placeholder="E-posta adresiniz"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:border-charcoal outline-none w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-charcoal text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black disabled:opacity-50 shrink-0"
                >
                    {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Gönder'}
                </button>
            </div>
            {status === 'error' && <p className="text-charcoal/80 text-xs mt-2 font-medium bg-gray-200 p-2 rounded">{msg}</p>}
        </form>
    );
}
