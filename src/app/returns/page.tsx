import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { RefreshCcw, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Müşteri Hakkı</span>
                    <h1 className="text-4xl md:text-5xl font-light text-charcoal">İade ve Değişim</h1>
                </div>

                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4 mb-12">
                    <AlertCircle className="text-red-500 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-red-700 mb-1">Önemli Bilgilendirme</h4>
                        <p className="text-sm text-red-600/80">Kişiselleştirilmiş ürünlerde (örneğin üzerine isim yazılmış) iade işlemi yapılamamaktadır.</p>
                    </div>
                </div>

                <div className="prose prose-lg prose-stone max-w-none">
                    <h3>İade Şartları</h3>
                    <p>
                        Ürünlerimizden memnun kalmamanız durumunda, teslim aldığınız tarihten itibaren <strong>14 gün</strong> içinde koşulsuz iade hakkınız bulunmaktadır.
                    </p>
                    <p>İadenin kabul edilmesi için:</p>
                    <ul>
                        <li>Ürünün kullanılmamış olması,</li>
                        <li>Orijinal ambalajının bozulmamış olması,</li>
                        <li>Tüm parçalarının eksiksiz olması gerekmektedir.</li>
                    </ul>

                    <h3>İade Süreci</h3>
                    <ol>
                        <li>İade talebinizi <strong>info@tsukodesign.com</strong> adresine veya WhatsApp hattımıza iletin.</li>
                        <li>Size özel bir <strong>İade Kodu</strong> verilecektir.</li>
                        <li>Ürünü orijinal kutusunda, hasar görmeyecek şekilde paketleyin.</li>
                        <li>Anlaşmalı kargo firmamız (Yurtiçi Kargo) ile İade Kodu'nu belirterek paketi ücretsiz gönderin.</li>
                    </ol>

                    <h3>Geri Ödeme</h3>
                    <p>
                        İade ettiğiniz ürün atölyemize ulaşıp kontrolleri yapıldıktan sonra, ödeme yaptığınız karta <strong>3-7 iş günü</strong> içinde iade işlemi gerçekleştirilir.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
