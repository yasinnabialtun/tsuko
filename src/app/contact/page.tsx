'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-6 bg-alabaster">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-charcoal mb-4">İletişime Geçin</h1>
                        <p className="text-charcoal/60 text-lg">
                            Özel tasarım projeleriniz, işbirlikleri veya sadece merhaba demek için.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white p-12 rounded-[3rem] shadow-xl border border-black/5">
                        {/* Contact Info */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold text-charcoal mb-6">Stüdyo</h3>
                                <div className="space-y-6 text-charcoal/70">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage flex-shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <p className="pt-2">
                                            Teşvikiye Mah. <br />
                                            Şişli, İstanbul
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center text-clay flex-shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <p>hello@tsukodesign.com</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-rose/20 flex items-center justify-center text-rose flex-shrink-0">
                                            <Phone size={20} />
                                        </div>
                                        <p>+90 (212) 555 01 23</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-alabaster rounded-3xl">
                                <h4 className="font-bold text-charcoal mb-2">Çalışma Saatleri</h4>
                                <div className="flex justify-between text-sm text-charcoal/60 mb-1">
                                    <span>Pazartesi - Cuma</span>
                                    <span>09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between text-sm text-charcoal/60">
                                    <span>Cumartesi</span>
                                    <span>10:00 - 15:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-charcoal/60 mb-2 uppercase tracking-wider">İsim</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-alabaster border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-clay transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-charcoal/60 mb-2 uppercase tracking-wider">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-alabaster border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-clay transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold text-charcoal/60 mb-2 uppercase tracking-wider">Konu</label>
                                    <select
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-alabaster border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-clay transition-all appearance-none"
                                    >
                                        <option value="">Seçiniz...</option>
                                        <option value="special">Özel Tasarım İsteği</option>
                                        <option value="corporate">Kurumsal İşbirliği</option>
                                        <option value="support">Sipariş Destek</option>
                                        <option value="other">Diğer</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-charcoal/60 mb-2 uppercase tracking-wider">Mesajınız</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-alabaster border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-clay transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Gönder
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-xl border border-green-100">
                                        Mesajınız alındı! En kısa sürede döneceğiz.
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
