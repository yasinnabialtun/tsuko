'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Mail, MapPin, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Mesajınız başarıyla gönderildi! 🎉');
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[var(--color-sand)] selection:bg-[var(--color-green)] selection:text-black">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6 relative overflow-hidden">
                {/* Decor elements */}
                <div className="absolute top-20 right-0 w-64 h-64 bg-[var(--color-pink)] rounded-full blur-[80px] opacity-30 pointer-events-none" />
                <div className="absolute bottom-20 left-0 w-64 h-64 bg-[var(--color-blue)] rounded-full blur-[80px] opacity-30 pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-6 bg-[var(--color-purple)] text-white text-xs font-black tracking-[0.2em] uppercase border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            7/24 Yanınızdayız
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-black mb-6 uppercase tracking-tighter drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
                            İletişim
                        </h1>
                        <p className="text-black/70 text-xl max-w-xl mx-auto font-bold">
                            Sorularınız, iş birlikleri veya sadece "Selam!" demek için. Biz buradayız ve çok heyecanlıyız! ✌️
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Info Cards */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6 group hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--color-yellow)] border-2 border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-transform">
                                    <Mail size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-black text-black text-xl mb-1 uppercase tracking-tight">E-Posta</h3>
                                    <p className="text-black/60 text-sm mb-2 font-medium">Genel sorular ve sipariş durumu</p>
                                    <a href="mailto:info@tsukodesign.com" className="text-black font-black underline decoration-4 decoration-[var(--color-purple)] hover:decoration-[var(--color-pink)] transition-all text-lg">info@tsukodesign.com</a>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6 group hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--color-green)] border-2 border-black flex items-center justify-center text-black shrink-0 group-hover:-rotate-12 transition-transform">
                                    <MessageCircle size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-black text-black text-xl mb-1 uppercase tracking-tight">WhatsApp</h3>
                                    <p className="text-black/60 text-sm mb-2 font-medium">Hızlı yanıt için (09:00 - 18:00)</p>
                                    <a href="https://wa.me/905555555555" className="text-black font-black underline decoration-4 decoration-[var(--color-blue)] hover:decoration-[var(--color-yellow)] transition-all text-lg">+90 555 555 55 55</a>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-6 group hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--color-pink)] border-2 border-black flex items-center justify-center text-black shrink-0 group-hover:rotate-12 transition-transform">
                                    <MapPin size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-black text-black text-xl mb-1 uppercase tracking-tight">Atölye</h3>
                                    <p className="text-black/60 text-sm mb-2 font-medium">Kahveye bekleriz! ☕</p>
                                    <p className="text-black font-bold">Kadıköy, İstanbul</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="bg-[var(--color-blue)] p-8 md:p-10 rounded-3xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                            <div className="absolute -top-6 -right-6 bg-[var(--color-yellow)] text-black px-4 py-2 rounded-xl border-4 border-black font-black text-sm uppercase rotate-12 shadow-lg z-10">
                                Size Dönelim! 👋
                            </div>

                            <h3 className="font-black text-3xl text-white mb-8 uppercase tracking-tighter drop-shadow-md">Mesaj Gönder</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-white mb-2 uppercase tracking-wide">Adınız</label>
                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full px-6 py-4 rounded-xl bg-white border-4 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 outline-none transition-all font-bold placeholder:text-black/30 text-black"
                                        placeholder="Ad Soyad"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-white mb-2 uppercase tracking-wide">E-Posta</label>
                                    <input
                                        required
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        className="w-full px-6 py-4 rounded-xl bg-white border-4 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 outline-none transition-all font-bold placeholder:text-black/30 text-black"
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-white mb-2 uppercase tracking-wide">Mesajınız</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-6 py-4 rounded-xl bg-white border-4 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 outline-none transition-all resize-none font-bold placeholder:text-black/30 text-black"
                                        placeholder="Size nasıl yardımcı olabiliriz?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white font-black py-5 rounded-xl hover:bg-[var(--color-pink)] hover:text-black hover:border-black border-4 border-transparent transition-all uppercase tracking-widest shadow-lg active:translate-y-1 active:shadow-none text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            <span>Gönderiliyor...</span>
                                        </>
                                    ) : (
                                        <span>Gönder Gitsin 🚀</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
