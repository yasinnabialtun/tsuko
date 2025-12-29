import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Truck, Clock, Globe } from 'lucide-react';

export default function ShippingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-12 text-center">Teslimat Bilgileri</h1>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-porcelain p-8 rounded-2xl text-center">
                        <Truck className="mx-auto mb-4 text-clay" size={32} />
                        <h3 className="font-bold mb-2">Ücretsiz Kargo</h3>
                        <p className="text-sm text-charcoal/60">Tüm Türkiye'ye ücretsiz gönderim.</p>
                    </div>
                    <div className="bg-porcelain p-8 rounded-2xl text-center">
                        <Clock className="mx-auto mb-4 text-clay" size={32} />
                        <h3 className="font-bold mb-2">Hazırlanma Süresi</h3>
                        <p className="text-sm text-charcoal/60">1-3 iş günü içinde kargoda.</p>
                    </div>
                    <div className="bg-porcelain p-8 rounded-2xl text-center">
                        <Globe className="mx-auto mb-4 text-clay" size={32} />
                        <h3 className="font-bold mb-2">Kargo Firmaları</h3>
                        <p className="text-sm text-charcoal/60">Yurtiçi Kargo güvencesiyle.</p>
                    </div>
                </div>

                <div className="prose prose-lg prose-stone max-w-none">
                    <h3>Sipariş ve Teslimat Süreci</h3>
                    <p>
                        Tsuko Design olarak, "sipariş üzerine üretim" modelini benimsiyoruz. Bu sayede stok fazlası atık oluşturmuyor ve her ürünü sizin için özel olarak üretiyoruz.
                    </p>
                    <p>
                        Siparişiniz bize ulaştıktan sonra üretim sırasına alınır. 3D baskı süreci, zımparalama ve son kontroller dahil olmak üzere ürününüzün hazırlanması ortalama <strong>1-3 iş günü</strong> sürer.
                    </p>

                    <h3>Kargo Takibi</h3>
                    <p>
                        Siparişiniz kargoya verildiğinde size SMS ve E-posta yoluyla bir <strong>Kargo Takip Numarası</strong> iletilir. Bu numara ile kargonuzun durumunu anlık olarak takip edebilirsiniz.
                    </p>

                    <h3>Hasarlı Teslimat</h3>
                    <p>
                        Kargolarımızı darbelere dayanıklı özel ambalajlarla paketliyoruz. Ancak yine de taşıma sırasında oluşabilecek hasarlara karşı %100 güvence veriyoruz.
                        Eğer ürününüz hasarlı ulaşırsa, lütfen paketi açarken fotoğraf çekin ve bizimle iletişime geçin. <strong>Ücretsiz olarak yenisini gönderiyoruz.</strong>
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
