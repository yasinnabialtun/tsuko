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

            <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Aramıza Katılın.
                    </h2>
                    <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto">
                        Yeni koleksiyonlardan ilk sizin haberiniz olsun. Ayrıca bülten abonelerimize özel <span className="text-clay font-bold">%10 Tanışma İndirimi</span> kazanın.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="E-posta adresiniz..."
                            className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 outline-none focus:border-clay transition-colors text-white placeholder:text-white/40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-clay text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-charcoal transition-colors shadow-lg hover:shadow-xl"
                        >
                            Abone Ol
                        </button>
                    </form>

                    <p className="mt-4 text-xs text-white/30">
                        Spam yok. Sadece ilham. İstediğiniz zaman ayrılabilirsiniz.
                    </p>

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
