import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';

export const metadata = {
    title: 'Hakkımızda | Tsuko Design',
    description: 'Tsuko Design, parametrik tasarım ve 3D baskı teknolojisini birleştirerek modern ev dekorasyon ürünleri üreten İstanbul merkezli bir tasarım stüdyosudur.',
};

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen text-charcoal">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-6 block">Biz Kimiz?</span>
                    <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight leading-[1.1] mb-8 text-charcoal">
                        Teknolojinin <span className="italic font-serif text-mauve">Şiirsel</span> Hali.
                    </h1>
                    <p className="text-xl text-charcoal/60 font-light leading-relaxed max-w-2xl mx-auto">
                        Tsuko Design, kodlarla yazılan formların, doğa dostu materyallerle hayata geçtiği yerdir.
                    </p>
                </div>
            </section>

            {/* Visual Break */}
            <section className="w-full h-[60vh] relative bg-stone/20 overflow-hidden">
                <Image
                    src="/images/hero.png"
                    alt="Tsuko Design Atölye"
                    fill
                    className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-24 px-6 bg-porcelain">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <span className="text-6xl font-serif text-stone/40 block">01</span>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-charcoal">Parametrik</h3>
                            <p className="text-charcoal/60 leading-relaxed">
                                Tasarımlarımız elle çizilmez; algoritmalarla hesaplanır. Doğadaki formların matematiksel kusursuzluğunu evlerinize taşıyoruz.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="text-6xl font-serif text-stone/40 block">02</span>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-charcoal">Sürdürülebilir</h3>
                            <p className="text-charcoal/60 leading-relaxed">
                                Petrol türevi plastikleri reddediyoruz. Ürünlerimizde kullandığımız PLA, mısır nişastası ve şeker kamışından elde edilen %100 biyo-bozunur bir polimerdir.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <span className="text-6xl font-serif text-stone/40 block">03</span>
                            <h3 className="text-xl font-bold uppercase tracking-widest text-charcoal">Butik</h3>
                            <p className="text-charcoal/60 leading-relaxed">
                                Stok yığınları yok. Her sipariş, sizin için özel olarak, katman katman üretilir ve elle sonlandırılır. Bu yüzden her parça eşsizdir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Note */}
            <section className="py-32 px-6 bg-white">
                <div className="container mx-auto max-w-3xl text-center">
                    <p className="text-2xl md:text-3xl font-light italic text-charcoal/80 leading-normal mb-8">
                        "Amacımız sadece vazo veya lamba satmak değil; mekanın enerjisini değiştiren, ışıkla etkileşime giren ve sohbet başlatan objeler tasarlamak."
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <cite className="not-italic font-bold tracking-widest uppercase text-sm">Tsuko Studio Ekibi</cite>
                        <span className="text-xs text-stone">İstanbul, 2024</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
