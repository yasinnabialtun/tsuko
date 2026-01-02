import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/hero.png"
                    alt="Tsuko Atölye"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/40" />
                <div className="relative z-10 text-center text-white px-6">
                    <span className="block text-xs font-bold tracking-[0.3em] uppercase mb-4 text-stone">Hikayemiz</span>
                    <h1 className="text-5xl md:text-7xl font-light mb-6">Doğadan İlham,<br /><span className="font-serif italic text-mauve">Teknolojiyle</span> Şekillendi.</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
                <section className="text-center space-y-6">
                    <h2 className="text-3xl font-bold text-charcoal">Parametrik Tasarımın Öncüsü</h2>
                    <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                        Tsuko Design, geleneksel el işçiliğini modern algoritmik tasarım yöntemleriyle birleştiren yeni nesil bir tasarım stüdyosudur.
                        İstanbul&apos;daki atölyemizde, doğadaki karmaşık formları analiz ediyor ve parametrik tasarım araçlarıyla ev dekorasyon objelerine dönüştürüyoruz.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-porcelain">
                        <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-bold">Görsel Alanı</div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-charcoal">Sürdürülebilir Üretim</h3>
                        <p className="text-charcoal/70 leading-relaxed">
                            Ürünlerimizin hiçbiri petrol türevi plastik içermez. Tamamen yenilenebilir kaynaklardan (mısır nişastası, şeker kamışı) elde edilen
                            ve doğada çözünebilen biyo-polimerler (PLA+) kullanıyoruz. Sıfır atık prensibiyle, sadece sipariş üzerine üretim yapıyor ve stok fazlası oluşumunun önüne geçiyoruz.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-charcoal">Teknoloji ve Zanaat</h3>
                        <p className="text-charcoal/70 leading-relaxed">
                            Her bir Tsuko ürünü, mikron hassasiyetindeki 3D yazıcılarımızda katman katman işlenir.
                            Ancak son dokunuş her zaman insan elidir. Zımparalama, boyama ve paketleme süreçleri, atölyemizdeki zanaatkarlar tarafından titizlikle gerçekleştirilir.
                        </p>
                    </div>
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-porcelain">
                        <div className="absolute inset-0 flex items-center justify-center text-charcoal/20 font-bold">Görsel Alanı</div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
