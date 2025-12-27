
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-alabaster">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-clay/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] left-[-10%] w-[700px] h-[700px] bg-sage/20 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pt-24 lg:pt-0">

                {/* Text Content */}
                <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-clay font-sans text-xs md:text-sm tracking-[0.3em] font-bold mb-6 uppercase">
                            Modern • Minimalist • Mitolojik
                        </h2>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading text-charcoal leading-[0.9] tracking-tighter mb-8">
                            <span className="block italic font-light ml-2 text-sage/80 font-serif">Eşyanın</span>
                            Ruhu
                        </h1>

                        <p className="text-lg md:text-xl text-charcoal/70 font-sans font-light max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                            Geçmişin estetiği, parametrik tasarımın kusursuzluğuyla buluştu.
                            <br className="hidden md:block" />Evinizde dingin bir atmosfer yaratan zamansız objeler.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Link href="/#collection" className="group relative px-10 py-5 bg-charcoal text-white rounded-full font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-2xl shadow-lg ring-1 ring-charcoal/5">
                                <span className="relative z-10 font-heading tracking-wide">KOLEKSİYONU KEŞFET</span>
                                <div className="absolute inset-0 bg-clay transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </Link>
                            <Link href="/about" className="px-10 py-5 text-charcoal border border-charcoal/10 rounded-full hover:bg-white hover:border-transparent transition-all font-medium font-sans hover:shadow-lg">
                                Hikayemiz
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="lg:col-span-5 relative h-[500px] lg:h-[750px] w-full order-1 lg:order-2 flex items-center justify-center"
                >
                    <div className="relative w-full h-[90%] rounded-[2rem] lg:rounded-t-full lg:rounded-b-[10rem] overflow-hidden shadow-2xl lg:mb-20 ring-1 ring-black/5">
                        {/* Placeholder if actual image is missing, but assume /images/hero.png exists */}
                        <Image
                            src="/images/hero.png"
                            alt="Tsuko Design Art Piece"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-[2s]"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Glassmorphism Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-8 right-8 bg-white/30 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl max-w-[220px]"
                        >
                            <p className="text-[10px] font-black text-charcoal/60 uppercase tracking-widest mb-1">Yeni Koleksiyon</p>
                            <p className="font-heading text-xl text-charcoal leading-tight">Athena Serisi</p>
                            <p className="text-xs text-charcoal/80 mt-2 font-sans">Parametrik detayların ışıkla dansı.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal/40 mix-blend-multiply"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Keşfet</span>
                <ArrowDown size={16} className="animate-bounce" strokeWidth={1.5} />
            </motion.div>
        </section>
    );
}
