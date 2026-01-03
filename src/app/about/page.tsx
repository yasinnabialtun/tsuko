
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
                    <span className="block text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/70">Tsuko Dünyası</span>
                    <h1 className="text-5xl md:text-8xl font-light mb-8 tracking-tight leading-none">
                        Evinize Enerji katan,<br />
                        <span className="font-serif italic text-[var(--mood-accent)]">Modern</span> Dokunuşlar.
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                        Geleneksel dekorasyon kalıplarını, günümüzün dinamik, renkli ve özgür estetiğiyle yeniden yorumluyoruz.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">

                {/* Section 1: Modern Spirit */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Sadece Dekor Değil,<br />Bir Yaşam Tarzı</h2>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                                Biz sadece vazo veya biblo üretmiyoruz. Tsukumogami felsefesinden aldığımız ilhamla, evinizin her köşesinde size eşlik eden, baktıkça modunuzu yükselten tasarımlar geliştiriyoruz.
                            </p>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light mt-6">
                                Her bir parçanın bir karakteri olduğuna ve yaşam alanınıza neşe kattığına inanıyoruz. Matematiksel kusursuzluktaki formları, pastel ve canlı renklerle birleştirerek evinize taşımayı seviyoruz.
                            </p>
                        </motion.div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden order-1 lg:order-2 group">
                        <Image
                            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1500&auto=format&fit=crop"
                            alt="Renkli ve Modern Tasarım"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </section>

                {/* Section 2: Aesthetics */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        <Image
                            src="https://images.unsplash.com/photo-1513519247481-8df33b13e1bb?q=80&w=1500&auto=format&fit=crop"
                            alt="Minimal ve Renkli"
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Renkli, Dinamik,<br />Özgür.</h2>
                            <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                                Tasarımlarımızda durağanlığa yer yok. Minimal çizgileri, sizi gülümsetecek enerjik tonlarla birleştiriyoruz. Evinizin havasını anında değiştirecek, modern ve iddialı parçalarla stili ön plana çıkarıyoruz.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {['Yeni Nesil Minimalizm', 'Pozitif Enerji Veren Tonlar', 'Özgün Geometrik Detaylar'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-lg font-medium text-charcoal">
                                        <span className="w-2 h-2 rounded-full bg-[var(--mood-accent)]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Technology & Design */}
                <section className="bg-stone/5 -mx-6 md:-mx-24 px-6 md:px-24 py-24 rounded-[3rem]">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone mb-4 block">Teknoloji & Tasarım</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Geleceğin Formlarını<br />Evinize Taşıyoruz.</h2>
                            <p className="text-xl text-charcoal/70 leading-relaxed font-light">
                                3D baskı teknolojisini, imkansız görünen formları en yüksek hassasiyetle gerçeğe dönüştürmek için kullanıyoruz. Sürdürülebilir üretim anlayışıyla, modern dekorasyon dünyasına yenilikçi ve heyecan verici bir bakış açısı getiriyoruz.
                            </p>
                        </motion.div>
                    </div>
                </section>

            </div>

            <Footer />
        </main>
    );
}
