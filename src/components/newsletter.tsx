'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.alreadySubscribed) {
                    setStatus('already');
                    setMessage('Zaten bizdensin! 😎');
                } else {
                    setStatus('success');
                    setMessage('Harika! İndirim kodun yola çıktı. 🚀');
                    setEmail('');
                }
            } else {
                setStatus('error');
                setMessage(data.error || 'Bir hata oluştu.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
        }

        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    return (
        <section className="py-40 bg-[var(--color-pink)] relative overflow-hidden border-t-8 border-black">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/confetti-doodles.png')]" />

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-xl bg-white border-2 border-black rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10">
                        <Sparkles size={18} className="text-black" />
                        <span className="text-xs font-black tracking-[0.2em] text-black uppercase">Süprizlere Hazır Ol</span>
                    </div>

                    <h2 className="text-4xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] selection:bg-black selection:text-white">
                        İLHAM KUTUNA GELSİN
                    </h2>
                    <p className="text-xl md:text-2xl text-black mb-16 max-w-2xl mx-auto font-bold leading-relaxed bg-white/30 backdrop-blur-sm p-4 rounded-xl border-2 border-black/10 inline-block">
                        Yeni koleksiyonlar, çılgın dekorasyon fikirleri ve sadece üyelere özel lansmanlar... <br />
                        <span className="text-[var(--color-purple)] font-black">%10 Hoş Geldin İndirimi</span> cepte! 🎁
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                        <div className="relative flex-grow group">
                            <input
                                type="email"
                                placeholder="E-posta adresin..."
                                className="w-full bg-white border-4 border-black rounded-2xl px-8 py-5 outline-none focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all text-black placeholder:text-black/30 font-bold text-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-[var(--color-yellow)] text-black px-12 py-5 rounded-2xl border-4 border-black font-black text-sm tracking-[0.2em] hover:bg-[var(--color-purple)] hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 min-w-[180px] active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            {status === 'loading' ? (
                                <Loader2 size={24} className="animate-spin" />
                            ) : (
                                'ABONE OL'
                            )}
                        </button>
                    </form>

                    {/* Status Feedback */}
                    <div className="h-10 mt-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {message && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className={cn(
                                        "flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest px-6 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] w-fit mx-auto",
                                        status === 'success' ? "bg-[var(--color-green)] text-black" :
                                            status === 'already' ? "bg-[var(--color-blue)] text-white" : "bg-[var(--color-red)] text-white"
                                    )}
                                >
                                    {status === 'success' ? <CheckCircle size={18} strokeWidth={3} /> : <AlertCircle size={18} strokeWidth={3} />}
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 pt-16 border-t-2 border-black/10 flex flex-wrap items-center justify-center gap-12 text-black/60 font-bold">
                        {[
                            { label: 'Veriler Güvende', value: '256-Bit SSL 🔒' },
                            { label: 'Sıklık', value: 'Bunalmak Yok 🙅‍♂️' },
                            { label: 'Ayrıcalık', value: 'Özel İndirimler 💸' }
                        ].map((stat, i) => (
                            <div key={i} className="text-left group cursor-pointer hover:scale-110 transition-transform">
                                <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">{stat.label}</p>
                                <p className="text-sm font-black text-black group-hover:text-[var(--color-purple)] transition-colors">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
