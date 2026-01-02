
'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-charcoal">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/hero.png"
                    alt="Tsuko Atölye"
                    fill
                    className="object-cover brightness-[0.7]"
                    priority
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6 max-w-4xl"
                >
                    <span className="block text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/70">Atölye Hikayesi</span>
                    <h1 className="text-5xl md:text-8xl font-light mb-8 tracking-tight leading-none">
                        Doğadan İlham,<br />
                        <span className="font-serif italic text-[var(--mood-accent)]">Teknolojiyle</span> Şekillendi.
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Modern zanaatın sınırlarını zorluyor, sürdürülebilir malzemeyi sanata dönüştürüyoruz.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">

                {/* Section 1: Introduction */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Parametrik Tasarımın <br />Öncüsü</h2>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                                Tsuko Design, geleneksel el işçiliğini modern algoritmik tasarım yöntemleriyle birleştiren yeni nesil bir tasarım stüdyosudur.
                            </p>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light mt-6">
                                İstanbul&apos;daki atölyemizde, doğadaki karmaşık formları (bir deniz kabuğunun kıvrımı veya rüzgarın kumda bıraktığı izler) analiz ediyor ve parametrik tasarım araçlarıyla ev dekorasyon objelerine dönüştürüyoruz.
                            </p>
                        </motion.div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden order-1 lg:order-2 group">
                        <Image
                            src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1500&auto=format&fit=crop"
                            alt="3D Yazıcı Detay"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </section>

                {/* Section 2: Sustainability */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1500&auto=format&fit=crop"
                            alt="Sürdürülebilir Materyal"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Petrol Değil,<br />Bitki Bazlı.</h2>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                                Ürünlerimizin hiçbiri petrol türevi plastik içermez. Tamamen yenilenebilir kaynaklardan (mısır nişastası, şeker kamışı) elde edilen ve doğada çözünebilen <strong>biyo-polimerler (PLA+)</strong> kullanıyoruz.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {['Atıksız Üretim (Zero Waste)', 'Doğada Çözünebilir', 'Gıda ile Temasa Uygun'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-lg font-medium text-charcoal">
                                        <span className="w-2 h-2 rounded-full bg-[var(--mood-accent)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Craftsmanship */}
                <section className="bg-stone/5 -mx-6 md:-mx-24 px-6 md:px-24 py-24 rounded-[3rem]">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone mb-4 block">Süreç</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Teknoloji ve Zanaatın<br />Dansı.</h2>
                            <p className="text-xl text-charcoal/70 leading-relaxed font-light">
                                Her bir Tsuko ürünü, mikron hassasiyetindeki 3D yazıcılarımızda 20 ile 50 saat arasında katman katman işlenir.
                                Ancak makine durduğunda, insan başlar. Zımparalama, boyama ve paketleme süreçleri, atölyemizdeki zanaatkarlar tarafından titizlikle, elle gerçekleştirilir.
                            </p>
                        </motion.div>
                    </div>
                </section>

            </div>

            <Footer />
        </main>
    );
}
