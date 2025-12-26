import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Terms() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-6 md:px-0">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-4xl font-bold text-charcoal mb-8">Kullanım Koşulları</h1>

                    <div className="prose prose-lg text-charcoal/70">
                        <h3>1. Giriş</h3>
                        <p>
                            Tsuko Design web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.
                        </p>

                        <h3>2. Fikri Mülkiyet</h3>
                        <p>
                            Sitede yer alan tüm tasarımlar, 3D modeller, görseller ve metinler Tsuko Design'a aittir.
                            Kaynak gösterilmeden veya izinsiz kullanılması, kopyalanması yasaktır.
                        </p>

                        <h3>3. Ürünler</h3>
                        <p>
                            Ürünlerimiz 3D baskı teknolojisi ile sipariş üzerine üretilir. El işçiliği ve üretim tekniği doğası gereği,
                            görseller ile nihai ürün arasında mikro düzeyde farklılıklar olabilir. Bu bir hata değil, ürünün biricikliğidir.
                        </p>

                        <h3>4. İade ve Değişim</h3>
                        <p>
                            Kişiye özel üretilen ürünlerde (özel renk/boyut) iade kabul edilmemektedir.
                            Kargoda hasar gören ürünler için "Kırılma Garantisi" kapsamında ücretsiz değişim yapılır.
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
