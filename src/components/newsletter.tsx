'use client';

import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

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
                    setMessage('Teşekkürler! %10 indirim kodunuz e-postanıza gönderildi.');
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

        // Reset after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
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
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-clay/20 flex items-center justify-center mx-auto mb-6">
                        <Mail size={32} className="text-clay" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        İlham Kutunuza Gelsin
                    </h2>
                    <p className="text-xl text-white/60 mb-8 max-w-xl mx-auto">
                        Yeni koleksiyonlar, dekorasyon fikirleri ve özel kampanyalar... <br />
                        <span className="text-clay font-bold">%10 Hoş Geldin İndirimi</span> ile başlayalım mı?
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <div className="relative flex-grow">
                            <input
                                type="email"
                                placeholder="eposta@adresiniz.com"
                                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all text-white placeholder:text-white/40"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-clay text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-charcoal transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Gönderiliyor</span>
                                </>
                            ) : (
                                'Abone Ol'
                            )}
                        </button>
                    </form>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 text-green-400 mt-4 font-medium"
                        >
                            <CheckCircle size={18} />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    {status === 'already' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 text-yellow-400 mt-4 font-medium"
                        >
                            <AlertCircle size={18} />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 text-red-400 mt-4 font-medium"
                        >
                            <AlertCircle size={18} />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    <p className="mt-6 text-xs text-white/30">
                        Spam yok. Sadece ilham. İstediğiniz zaman ayrılabilirsiniz.
                    </p>

                    {/* Trust Elements */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
                        <span>🔒 Verileriniz güvende</span>
                        <span>📧 Ayda max 4 e-posta</span>
                        <span>🎁 Özel indirimler</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
