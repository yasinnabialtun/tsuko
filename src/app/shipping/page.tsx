import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Truck, Clock, Package, MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kargo & Teslimat | Tsuko Design',
    description: 'Tsuko Design kargo ve teslimat bilgileri. Türkiye genelinde ücretsiz kargo, ortalama 2-4 iş günü teslimat süresi.'
};

export default function ShippingPage() {
    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-6">Kargo & Teslimat</h1>
                    <p className="text-xl text-charcoal/60 mb-12">Siparişinizin size ulaşma süreci hakkında tüm bilgiler.</p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-2xl border border-black/5">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                <Truck size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">Ücretsiz Kargo</h3>
                            <p className="text-charcoal/60">Türkiye genelinde tüm siparişlerde ücretsiz kargo. Minimum sipariş tutarı yok.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-black/5">
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                                <Clock size={28} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">Hızlı Teslimat</h3>
                            <p className="text-charcoal/60">Siparişler 1-3 iş günü içinde kargoya verilir. Ortalama teslimat süresi 2-4 iş günüdür.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-black/5">
                            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                                <Package size={28} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">Özel Paketleme</h3>
                            <p className="text-charcoal/60">Her ürün özel koruyucu ambalajla paketlenir. Kırılma riski minimuma indirilmiştir.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-black/5">
                            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                                <ShieldCheck size={28} className="text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">Kırılma Garantisi</h3>
                            <p className="text-charcoal/60">Kargo kaynaklı hasarlarda %100 garanti. Hasarlı ürün için hemen yenisini gönderiyoruz.</p>
                        </div>
                    </div>

                    <div className="bg-charcoal text-white p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">Kargo Süreci</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold mb-1">Sipariş Onayı</h4>
                                    <p className="text-white/70">Siparişiniz alındığında e-posta ile onay gönderilir.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold mb-1">Hazırlık (1-3 İş Günü)</h4>
                                    <p className="text-white/70">Ürününüz özenle paketlenir ve kargoya teslim edilir.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold mb-1">Kargo Takibi</h4>
                                    <p className="text-white/70">Kargo takip numarası SMS ve e-posta ile paylaşılır.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                                <div>
                                    <h4 className="font-bold mb-1">Teslimat (2-4 İş Günü)</h4>
                                    <p className="text-white/70">Ürününüz kapınıza güvenle teslim edilir.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-sage/10 rounded-2xl border border-sage/20">
                        <div className="flex items-start gap-4">
                            <MapPin size={24} className="text-sage flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-charcoal mb-2">Teslimat Bölgeleri</h3>
                                <p className="text-charcoal/70">Şu anda sadece Türkiye içi teslimat yapılmaktadır. Yurtdışı gönderimler için info@tsukodesign.com adresinden iletişime geçebilirsiniz.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
