
'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b-4 border-black">
                <Image
                    src="/images/hero.png"
                    alt="Tsuko Atölye"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center text-white px-6 max-w-5xl"
                >
                    <span className="inline-block mb-6 px-4 py-1.5 bg-[var(--color-yellow)] text-black text-xs font-black tracking-[0.3em] uppercase border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        Tsuko Dünyası
                    </span>
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        EVİNE <span className="text-[var(--color-pink)] stroke-black" style={{ WebkitTextStroke: "2px black" }}>ENERJİ</span><br />
                        KATAN TASARIMLAR.
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-bold max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        Geleneksel dekorasyon kalıplarını yıktık! Şimdi sıra evinizi renkli, dinamik ve sizi gülümseten objelerle doldurmakta.
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
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
                                Sadece Dekor Değil,<br /><span className="text-[var(--color-purple)]">Mutluluk Kaynağı</span>
                            </h2>
                            <div className="p-6 bg-[var(--color-sand)] border-2 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                <p className="text-lg text-black font-medium leading-relaxed">
                                    Biz sadece vazo veya biblo üretmiyoruz. Dopamine Decor akımından aldığımız ilhamla, evinizin her köşesinde size göz kırpan, baktıkça modunuzu tavan yaptıran tasarımlar geliştiriyoruz. 🚀
                                </p>
                            </div>
                            <p className="text-lg text-black/70 leading-relaxed font-bold mt-6 pl-4 border-l-4 border-[var(--color-yellow)]">
                                Her bir parçanın bir karakteri olduğuna inanıyoruz. Matematiksel kusursuzluktaki 3D formları, şeker gibi renklerle birleştirip evinize neşe taşıyoruz.
                            </p>
                        </motion.div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden order-1 lg:order-2 group border-4 border-black shadow-[12px_12px_0px_0px_var(--color-green)]">
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
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group border-4 border-black shadow-[-12px_12px_0px_0px_var(--color-blue)]">
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
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
                                Renkli, Dinamik,<br /><span className="text-[var(--color-pink)]">Özgür Ruhlu.</span>
                            </h2>
                            <p className="text-xl text-black font-bold leading-relaxed">
                                Tasarımlarımızda durağanlığa yer yok! Minimal çizgileri, sizi gülümsetecek enerjik tonlarla birleştiriyoruz. Evinizin havasını anında değiştirecek, "buradayım" diyen iddialı parçalarla stili ön plana çıkarıyoruz.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {['Sıkıcılığa İnat Canlı Renkler', 'Pozitif Enerji Yayan Formlar', 'Benzersiz Geometrik Detaylar'].map((item, i) => (
                                    <li key={item} className="flex items-center gap-4 text-lg font-black text-black">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-black ${i === 0 ? 'bg-[var(--color-yellow)]' : i === 1 ? 'bg-[var(--color-green)]' : 'bg-[var(--color-blue)]'}`}>
                                            Include
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Technology & Design */}
                <section className="bg-[var(--color-purple)] -mx-6 md:-mx-24 px-6 md:px-24 py-24 rounded-[3rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-1 bg-white text-black text-xs font-black tracking-[0.3em] uppercase mb-6 border-2 border-black rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Teknoloji & Tasarım
                            </span>
                            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-white">
                                GELECEĞİN FORMLARINI<br />EVİNİZE TAŞIYORUZ.
                            </h2>
                            <p className="text-xl text-white/90 leading-relaxed font-medium">
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
