import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Terms() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-24 px-6 md:px-0">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-4xl font-bold text-charcoal mb-8">Kullanım Koşulları</h1>

                    <div className="prose prose-lg text-charcoal/70 max-w-none">
                        <h3>1. Taraflar</h3>
                        <p>
                            İşbu sözleşme, Tsuko Design (bundan böyle "Satıcı" olarak anılacaktır) ile bu web sitesi üzerinden alışveriş yapan kişi ("Alıcı") arasında düzenlenmiştir.
                        </p>

                        <h3>2. Konu</h3>
                        <p>
                            İşbu sözleşmenin konusu, Alıcının Satıcıya ait internet sitesinden elektronik ortamda siparişini yaptığı, nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                        </p>

                        <h3>3. Ürünler ve İade Politikası</h3>
                        <p>
                            Tsuko Design ürünleri, sipariş üzerine 3D baskı teknolojisi ve biyo-bozunur polimerler kullanılarak üretilmektedir. 
                        </p>
                        <ul>
                            <li><strong>Ayıplı Mal:</strong> Kargo sırasında hasar gören veya üretim hatası olan ürünler, teslimattan itibaren 14 gün içinde ücretsiz değiştirilir.</li>
                            <li><strong>Cayma Hakkı:</strong> Kişiye özel üretilen, renk veya boyut özelleştirmesi yapılan ürünlerde cayma hakkı kullanılamaz. Standart ürünlerde iade kargo ücreti alıcıya aittir.</li>
                        </ul>

                        <h3>4. Teslimat</h3>
                        <p>
                            Ürünler, sipariş onayından itibaren en geç 3-5 iş günü içinde kargoya verilir. Kargo şirketi kaynaklı gecikmelerden Satıcı sorumlu değildir.
                        </p>

                        <h3>5. Gizlilik</h3>
                        <p>
                            Alıcının kişisel bilgileri, siparişin işlenmesi ve yasal zorunluluklar dışında üçüncü şahıslarla paylaşılmaz. Ödeme bilgileri (kredi kartı vb.) Satıcı tarafından saklanmaz, ödeme altyapısı sağlayıcısı (Shopier) tarafından işlenir.
                        </p>
                    </div>

                        <p className="text-sm border-t border-black/10 pt-4 mt-8">
                            Son güncelleme: 27 Aralık 2025
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main >
    );
}
