import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-6 md:px-0">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-4xl font-bold text-charcoal mb-8">Gizlilik Politikası</h1>

                    <div className="prose prose-lg text-charcoal/70">
                        <p className="lead">
                            Tsuko Design ("Şirket") olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.
                        </p>

                        <h3>1. Veri Toplama</h3>
                        <p>
                            Sitemizi ziyaret ettiğinizde, deneyiminizi iyileştirmek adına bazı anonim veriler (çerezler vb.) toplanabilir.
                            İletişim formları aracılığıyla paylaştığınız isim ve e-posta adresleri sadece size geri dönüş yapmak amacıyla saklanır.
                        </p>

                        <h3>2. Üçüncü Taraflar</h3>
                        <p>
                            Ödeme işlemleri için Shopier platformu kullanılmaktadır. Ödeme sayfalarında girdiğiniz kredi kartı bilgileri
                            doğrudan Shopier altyapısında işlenir ve şirketimiz tarafından saklanmaz.
                        </p>

                        <h3>3. Veri Güvenliği</h3>
                        <p>
                            Verileriniz, endüstri standardı güvenlik önlemleriyle (SSL şifreleme vb.) korunmaktadır.
                        </p>

                        <p className="text-sm border-t border-black/10 pt-4 mt-8">
                            Son güncelleme: 27 Aralık 2025
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
