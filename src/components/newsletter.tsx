'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        setStatus('success');
        setEmail('');

        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section className="py-24 px-6 bg-charcoal text-white overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-clay rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sage rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Tsuko'nun Dünyasına Katılın</h2>
                    <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
                        Yeni tasarımlarımızdan, özel indirimlerden ve dekorasyon ipuçlarından ilk sizin haberiniz olsun.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 outline-none focus:border-white transition-colors text-white placeholder:text-white/40"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-clay text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-charcoal transition-all flex items-center justify-center gap-2"
                        >
                            <span>Abone Ol</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sage mt-4 font-medium"
                        >
                            Teşekkürler! Aramıza hoş geldiniz.
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
