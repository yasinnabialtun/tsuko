'use client';

import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COUPONS = {
    'TSUKO10': { discount: 0.10, message: '%10 İndirim Uygulandı!' },
    'MERHABA20': { discount: 0.20, message: '%20 Hoşgeldin İndirimi!' },
    'TSUKO50': { discount: 0.50, message: 'Harika! %50 İndirim Kazandınız.' }
};

export default function CouponValidation() {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedCode = code.toUpperCase().trim();

        if (COUPONS[normalizedCode as keyof typeof COUPONS]) {
            setStatus('success');
            setMessage(COUPONS[normalizedCode as keyof typeof COUPONS].message);
        } else {
            setStatus('error');
            setMessage('Geçersiz veya süresi dolmuş kupon kodu.');
        }
    };

    return (
        <div className="bg-alabaster rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-2 mb-4 text-charcoal/60 text-sm font-bold uppercase tracking-wider">
                <Tag size={16} />
                <span>Kupon Kodu</span>
            </div>

            <form onSubmit={handleCheck} className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        setStatus('idle');
                    }}
                    placeholder="Kupon Kodunuz"
                    className="flex-grow bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-clay transition-colors font-medium uppercase placeholder:normal-case"
                />
                <button
                    type="submit"
                    disabled={!code || status === 'success'}
                    className="bg-charcoal text-white px-6 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
                >
                    Uygula
                </button>
            </form>

            <AnimatePresence>
                {status !== 'idle' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`mt-3 flex items-center gap-2 text-sm font-bold ${status === 'success' ? 'text-green-600' : 'text-rose'
                            }`}
                    >
                        {status === 'success' ? <Check size={16} /> : <X size={16} />}
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
