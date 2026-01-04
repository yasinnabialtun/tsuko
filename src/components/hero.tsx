'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, MoveRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Hero({ settings }: { settings?: any }) {
    // Fallback values if settings are missing
    const content = {
        title: settings?.heroTitle || "EVİNİZİN MODUNU YÜKSELTİN ✨",
        subtitle: settings?.heroSubtitle || "Sıkıcı duvarlara ve boş köşelere veda edin. Tsuko'nun renkli dünyasıyla yaşam alanınıza enerji, neşe ve karakter katın.",
        buttonText: settings?.heroButtonText || "RENKLERİ KEŞFET",
        buttonLink: settings?.heroButtonLink || "/#collection",
        image: settings?.heroImage || "/images/hero.png"
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
            {/* Background Architecture - More Playful */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[var(--color-yellow)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-[var(--color-purple)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[20%] left-[30%] w-80 h-80 bg-[var(--color-pink)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.05]" />
            </div>

            <div className="container-custom relative z-10 pt-32 lg:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 outline-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-red)] animate-pulse" />
                                <span className="text-xs font-black tracking-wider text-black uppercase">Yeni Koleksiyon Yayında!</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-black leading-[0.9] tracking-tight mb-8 drop-shadow-sm">
                                {content.title}
                            </h1>

                            <p className="text-lg md:text-xl text-black/70 font-medium max-w-lg leading-relaxed mb-10">
                                {content.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href={content.buttonLink}
                                    className="group relative px-8 py-4 bg-[var(--color-blue)] border-2 border-black text-white rounded-xl font-bold text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto text-center"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {content.buttonText}
                                        <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                                <Link
                                    href="/about"
                                    className="px-8 py-4 bg-white border-2 border-black text-black rounded-xl font-bold text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full sm:w-auto text-center"
                                >
                                    ATÖLYE HİKAYESİ
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Image / Visual Element */}
                    <div className="lg:col-span-6 relative order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-square w-full max-w-lg mx-auto"
                        >
                            <div className="absolute inset-0 bg-[var(--color-yellow)] rounded-[2rem] transform rotate-3 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

                            <div className="absolute inset-0 bg-white rounded-[2rem] overflow-hidden border-2 border-black transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                <Image
                                    src={content.image}
                                    alt="Tsuko Design"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-4 bg-[var(--color-pink)] text-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hidden md:block rotate-[-6deg]"
                            >
                                <div className="text-center">
                                    <span className="text-3xl">✨</span>
                                    <p className="text-sm font-black mt-1 uppercase">El Yapımı<br />Mutluluk</p>
                                </div>
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
