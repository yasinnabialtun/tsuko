'use client';

import { useState, useEffect } from 'react';
import { Tag, Check, X, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/cart-context';

export default function CouponValidation() {
    const { applyCoupon, removeCoupon, activeCoupon } = useCart();
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Sync local state with context
    useEffect(() => {
        if (activeCoupon) {
            setCode(activeCoupon.code);
            setStatus('success');
            setMessage(activeCoupon.message);
        } else {
            setCode('');
            setStatus('idle');
            setMessage('');
        }
    }, [activeCoupon]);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;

        setLoading(true);
        const result = await applyCoupon(code.trim());
        setLoading(false);

        if (result.success) {
            setStatus('success');
            setMessage(result.message);
        } else {
            setStatus('error');
            setMessage(result.message);
        }
    };

    const handleRemove = () => {
        removeCoupon();
        setCode('');
        setStatus('idle');
        setMessage('');
    };

    return (
        <div className="bg-alabaster rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-2 mb-4 text-charcoal/60 text-sm font-bold uppercase tracking-wider">
                <Tag size={16} />
                <span>Kupon Kodu</span>
            </div>

            {activeCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <Tag size={16} />
                        </div>
                        <div>
                            <p className="font-bold text-green-800 uppercase">{activeCoupon.code}</p>
                            <p className="text-sm text-green-600">{activeCoupon.message}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Kuponu Kaldır"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ) : (
                <form onSubmit={handleCheck} className="flex gap-2">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Kupon Kodunuz"
                        className={`flex-grow bg-white border rounded-xl px-4 py-3 outline-none transition-colors font-medium uppercase placeholder:normal-case ${status === 'error' ? 'border-rose-300 focus:border-rose-500' : 'border-black/10 focus:border-clay'
                            }`}
                    />
                    <button
                        type="submit"
                        disabled={!code || loading}
                        className="bg-charcoal text-white px-6 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Uygula'}
                    </button>
                </form>
            )}

            <AnimatePresence>
                {!activeCoupon && status === 'error' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 flex items-center gap-2 text-sm font-bold text-rose-600"
                    >
                        <X size={16} />
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
