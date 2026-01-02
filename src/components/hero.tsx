'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, MoveRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Hero({ settings }: { settings?: any }) {
    // Fallback values if settings are missing
    const content = {
        title: settings?.heroTitle || "EVİNİZİN HEYKEL HALİ.",
        subtitle: settings?.heroSubtitle || "Parametrik tasarımın matematiksel kusursuzluğu, doğa dostu materyallerin sıcaklığıyla buluştu. Yaşam alanınıza karakter katan dijital zanaat eserleri.",
        buttonText: settings?.heroButtonText || "KOLEKSİYONU KEŞFET",
        buttonLink: settings?.heroButtonLink || "/#collection",
        image: settings?.heroImage || "/images/hero.png"
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
            {/* Background Architecture */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[var(--mood-accent)]/5 rounded-full blur-[200px] animate-pulse" />
                <div className="absolute bottom-10 left-[-10%] w-[800px] h-[800px] bg-charcoal/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03] contrast-150" />
            </div>

            <div className="container-custom relative z-10 pt-40 lg:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 outline-none">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-current/10 mb-12 shadow-sm">
                                <Sparkles size={14} className="text-[var(--mood-accent)] animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-charcoal/40 uppercase">Limitli Üretim • Parametrik Sanat</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-charcoal leading-[0.9] tracking-tighter mb-10 whitespace-pre-line uppercase">
                                {content.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-charcoal/50 font-light max-w-xl leading-relaxed mb-16 tracking-tight">
                                {content.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link
                                    href={content.buttonLink}
                                    className="group relative px-12 py-6 bg-charcoal text-white rounded-full font-black text-xs tracking-[0.2em] overflow-hidden transition-all shadow-2xl shadow-charcoal/20 w-full sm:w-auto text-center active:scale-95"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        {content.buttonText}
                                        <MoveRight size={18} className="transition-transform group-hover:translate-x-2" />
                                    </span>
                                    <div className="absolute inset-0 bg-mauve transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                                </Link>
                                <Link
                                    href="/about"
                                    className="px-12 py-6 text-charcoal/40 font-black text-xs tracking-[0.2em] border border-current/10 rounded-full hover:bg-white hover:text-charcoal hover:border-charcoal/20 transition-all w-full sm:w-auto text-center"
                                >
                                    ATÖLYE HİKAYESİ
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Image / Visual Element */}
                    <div className="lg:col-span-12 xl:col-span-5 relative order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-square w-full"
                        >
                            <div className="absolute inset-0 bg-charcoal/5 rounded-[4rem] group overflow-hidden border border-current/5 shadow-2xl">
                                <Image
                                    src={content.image}
                                    alt="Tsuko Design"
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] border border-current/5 shadow-2xl hidden md:block"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--mood-accent)] flex items-center justify-center text-white">
                                        <Sparkles size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Materyal Bilgisi</span>
                                </div>
                                <h4 className="text-lg font-black tracking-tight mb-2">PLA+ Biyo-Polimer</h4>
                                <p className="text-xs text-charcoal/50 leading-relaxed font-medium">Doğa dostu, dayanıklı ve <br />sıfır atık prensibiyle üretildi.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#collection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity cursor-pointer group"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
                <div className="w-px h-12 bg-charcoal group-hover:h-16 transition-all duration-500" />
            </motion.a>
        </section>
    );
}
