import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Bize Ulaşın</span>
                        <h1 className="text-5xl font-light text-charcoal mb-6">İletişim</h1>
                        <p className="text-charcoal/60 text-lg max-w-xl mx-auto">
                            Sorularınız, iş birlikleri veya sadece merhaba demek için bize her zaman ulaşabilirsiniz.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Info Cards */}
                        <div className="space-y-4">
                            <div className="bg-white p-8 rounded-[2rem] border border-white flex items-start gap-6 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal text-lg mb-1">E-Posta</h3>
                                    <p className="text-charcoal/60 text-sm mb-2">Genel sorular ve sipariş durumu için</p>
                                    <a href="mailto:info@tsukodesign.com" className="text-clay font-bold hover:underline">info@tsukodesign.com</a>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] border border-white flex items-start gap-6 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal text-lg mb-1">WhatsApp Hattı</h3>
                                    <p className="text-charcoal/60 text-sm mb-2">Hızlı yanıt için (09:00 - 18:00)</p>
                                    <a href="https://wa.me/905555555555" className="text-clay font-bold hover:underline">+90 555 555 55 55</a>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] border border-white flex items-start gap-6 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-porcelain flex items-center justify-center text-charcoal shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal text-lg mb-1">Atölye</h3>
                                    <p className="text-charcoal/60 text-sm mb-2">Ziyaret için lütfen randevu alınız.</p>
                                    <p className="text-charcoal">Kadıköy, İstanbul</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-white shadow-xl shadow-stone/10">
                            <h3 className="font-bold text-2xl text-charcoal mb-8">Mesaj Gönderin</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal/70 mb-2">Adınız</label>
                                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-porcelain border-none focus:ring-2 focus:ring-clay/20 outline-none transition-all" placeholder="Ad Soyad" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal/70 mb-2">E-Posta</label>
                                    <input type="email" className="w-full px-6 py-4 rounded-xl bg-porcelain border-none focus:ring-2 focus:ring-clay/20 outline-none transition-all" placeholder="ornek@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal/70 mb-2">Mesajınız</label>
                                    <textarea rows={4} className="w-full px-6 py-4 rounded-xl bg-porcelain border-none focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-charcoal text-white font-bold py-5 rounded-xl hover:bg-black transition-all">Gönder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
