import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl font-bold text-charcoal mb-8">Mesafeli Satış Sözleşmesi</h1>

                <div className="prose prose-stone max-w-none text-sm">
                    <h3>MADDE 1 - TARAFLAR</h3>
                    <p><strong>SATICI:</strong> Tsuko Design</p>
                    <p><strong>ALICI:</strong> Bu sözleşme konusu ürünleri web sitesi üzerinden sipariş eden kişi.</p>

                    <h3>MADDE 2 - KONU</h3>
                    <p>Bu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.tsukodesign.com internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>

                    <h3>MADDE 3 - CAYMA HAKKI</h3>
                    <p>ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 gün içinde cayma hakkına sahiptir.</p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
