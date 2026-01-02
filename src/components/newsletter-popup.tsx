'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    useEffect(() => {
        // Check if user has already seen/closed the popup
        const hasSeen = localStorage.getItem('tsuko_newsletter_seen');
        if (!hasSeen) {
            const timer = setTimeout(() => setIsOpen(true), 5000); // Show after 5 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('tsuko_newsletter_seen', 'true');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');



        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => handleClose(), 2000);
            } else {
                setStatus('idle');
            }
        } catch {
            setStatus('idle');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 relative min-h-[200px] md:min-h-[400px]">
                            <Image
                                src="/images/hero.png" // Fallback to hero image
                                alt="Newsletter"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                                <p className="text-white text-lg font-serif italic">
                                    &quot;Evinizin ruhunu yansıtan tasarımlar.&quot;
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#FAFAFA]">
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-charcoal/40 hover:text-charcoal hover:bg-black/5 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>

                            {status === 'success' ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-charcoal mb-2">Teşekkürler!</h3>
                                    <p className="text-charcoal/60">Aramıza hoş geldiniz.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <span className="text-clay font-bold text-xs uppercase tracking-widest mb-2 block">
                                            Tsuko Club
                                        </span>
                                        <h2 className="text-3xl font-black text-charcoal mb-4">
                                            %10 İndirim Kazan
                                        </h2>
                                        <p className="text-charcoal/60 leading-relaxed">
                                            İlk siparişine özel indirim kodu ve yeni koleksiyonlardan haberdar olmak için bültenimize katıl.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
                                            <input
                                                type="email"
                                                placeholder="E-posta adresiniz"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-white border border-black/5 rounded-xl focus:border-clay focus:ring-2 focus:ring-clay/10 outline-none transition-all"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-charcoal text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg shadow-charcoal/10 disabled:opacity-70"
                                        >
                                            {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
                                            {!status && <ArrowRight size={18} />}
                                        </button>
                                        <p className="text-[10px] text-center text-charcoal/40 mt-4">
                                            Spam yok, sadece ilham. İstediğiniz zaman ayrılabilirsiniz.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
