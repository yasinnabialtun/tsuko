'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('success');
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <main className="bg-white min-h-screen text-charcoal">
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <div>
                                <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Bize Ulaşın</span>
                                <h1 className="text-5xl font-light text-charcoal mb-6">Merhaba deyin.</h1>
                                <p className="text-lg text-charcoal/60 leading-relaxed font-light">
                                    Özel siparişleriniz, mimari projeleriniz veya sadece tanışmak için...
                                    E-postalarınıza en geç 24 saat içinde dönüş yapıyoruz.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wider mb-1">E-Posta</h3>
                                        <a href="mailto:info@tsukodesign.com" className="text-xl hover:text-mauve transition-colors">info@tsukodesign.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wider mb-1">WhatsApp Destek</h3>
                                        <a href="https://wa.me/905551234567" target="_blank" className="text-xl hover:text-mauve transition-colors">+90 555 123 45 67</a>
                                        <p className="text-sm text-stone mt-1">Hafta içi 09:00 - 18:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Stüdyo</h3>
                                        <p className="text-lg text-charcoal/80">
                                            Kadıköy, İstanbul<br />
                                            <span className="text-sm text-stone">(Ziyaretler randevu ile kabul edilmektedir)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="bg-porcelain p-8 md:p-12 rounded-3xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50">İsim</label>
                                        <input type="text" className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-clay/20 outline-none transition-all placeholder:text-black/10 text-charcoal" placeholder="Adınız" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50">Soyisim</label>
                                        <input type="text" className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-clay/20 outline-none transition-all placeholder:text-black/10 text-charcoal" placeholder="Soyadınız" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50">E-Posta</label>
                                    <input type="email" className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-clay/20 outline-none transition-all placeholder:text-black/10 text-charcoal" placeholder="ornek@email.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50">Konu</label>
                                    <select className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-clay/20 outline-none transition-all text-charcoal/80">
                                        <option>Genel Bilgi</option>
                                        <option>Sipariş Durumu</option>
                                        <option>Özel Tasarım / İş Birliği</option>
                                        <option>İade / Değişim</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-charcoal/50">Mesajınız</label>
                                    <textarea rows={4} className="w-full bg-white border-none rounded-xl p-4 focus:ring-2 focus:ring-clay/20 outline-none transition-all placeholder:text-black/10 text-charcoal" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-charcoal text-white font-bold py-5 rounded-xl hover:bg-black transition-all shadow-lg shadow-charcoal/10 uppercase tracking-widest text-sm">
                                    Gönder
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-600 text-center text-sm font-bold bg-green-50 p-3 rounded-lg animate-pulse">
                                        Mesajınız bize ulaştı. Teşekkürler!
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
