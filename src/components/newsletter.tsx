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
                    setMessage('Bu e-posta zaten kayıtlı!');
                } else {
                    setStatus('success');
                    setMessage('Harika! İndirim kodun yola çıktı.');
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
        <section className="py-40 bg-charcoal relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-clay rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-mauve rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.05]" />
            </div>

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-10">
                        <Sparkles size={14} className="text-white opacity-40 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">Ayrıcalıklı Dünya</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">İlham Kutunuza Gelsin</h2>
                    <p className="text-xl md:text-2xl text-white/40 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                        Yeni koleksiyonlar, dekorasyon fikirleri ve sadece üyelere özel lansmanlar... <br />
                        <span className="text-white font-bold">%10 Hoş Geldin İndirimi</span> ile başlayalım mı?
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                        <div className="relative flex-grow group">
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 outline-none focus:bg-white focus:text-charcoal focus:placeholder:text-charcoal/20 transition-all text-white placeholder:text-white/20 font-medium text-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-white text-charcoal px-12 py-6 rounded-[2rem] font-black text-xs tracking-[0.2em] hover:bg-clay hover:text-white transition-all shadow-2xl disabled:opacity-50 min-w-[180px] active:scale-95"
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
                                        "flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest leading-none",
                                        status === 'success' ? "text-green-400" :
                                            status === 'already' ? "text-yellow-400" : "text-rose"
                                    )}
                                >
                                    {status === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 pt-16 border-t border-white/5 flex flex-wrap items-center justify-center gap-12">
                        {[
                            { label: 'Verileriniz güvende', value: '256-Bit SSL' },
                            { label: 'Gönderim Sıklığı', value: 'Ayda max 4 e-posta' },
                            { label: 'Sınırlı Erişim', value: 'Özel indirimler' }
                        ].map((stat, i) => (
                            <div key={i} className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                                <p className="text-sm font-bold text-white/60">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
