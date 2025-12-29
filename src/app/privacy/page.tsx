import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-charcoal mb-8">Gizlilik Politikası ve KVKK</h1>

                <div className="prose prose-stone max-w-none text-sm">
                    <p><strong>Son Güncelleme:</strong> 28.12.2025</p>

                    <h3>1. Veri Sorumlusu</h3>
                    <p>Tsuko Design olarak, kişisel verilerinizin güvenliğine önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.</p>

                    <h3>2. Toplanan Kişisel Veriler</h3>
                    <p>Sitemiz üzerinden alışveriş yaparken veya üye olurken şu bilgileri toplamaktayız:</p>
                    <ul>
                        <li>Kimlik Bilgileri (Ad, Soyad)</li>
                        <li>İletişim Bilgileri (Adres, Telefon, E-posta)</li>
                        <li>İşlem Güvenliği Bilgileri (IP Adresi, Çerez Kayıtları)</li>
                    </ul>

                    <h3>3. Verilerin Kullanım Amacı</h3>
                    <p>Toplanan verileriniz;</p>
                    <ul>
                        <li>Siparişlerinizin teslim edilmesi,</li>
                        <li>Fatura düzenlenmesi,</li>
                        <li>Müşteri destek hizmetlerinin sağlanması,</li>
                        <li>Yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</li>
                    </ul>

                    <h3>4. Çerezler (Cookies)</h3>
                    <p>Sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman silebilirsiniz.</p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
