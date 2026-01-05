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
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default w-fit">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-red)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-red)]"></span>
                                </span>
                                <span className="text-xs font-black tracking-wider text-black uppercase">Yeni Koleksiyon Yayında!</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-black leading-[0.9] tracking-tight mb-8 drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)] uppercase">
                                {content.title}
                            </h1>

                            <p className="text-lg md:text-xl text-black/80 font-medium max-w-lg leading-relaxed mb-10">
                                {content.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href={content.buttonLink}
                                    className="group relative px-8 py-5 bg-[var(--color-blue)] border-4 border-black text-white rounded-2xl font-black text-sm tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all w-full sm:w-auto text-center"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase">
                                        {content.buttonText}
                                        <MoveRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                                <Link
                                    href="/about"
                                    className="px-8 py-5 bg-white border-4 border-black text-black rounded-2xl font-black text-sm tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all w-full sm:w-auto text-center uppercase"
                                >
                                    Atölye Hikayesi
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
                            {/* Decorative Background Shape */}
                            <div className="absolute inset-0 bg-[var(--color-yellow)] rounded-[2.5rem] transform rotate-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" />

                            {/* Main Image Container */}
                            <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden border-4 border-black transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-sm">
                                <Image
                                    src={content.image}
                                    alt="Tsuko Design"
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {/* Sticker Badge */}
                                <div className="absolute top-6 right-6 bg-[var(--color-purple)] text-white w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-spin-slow hidden md:flex">
                                    <svg viewBox="0 0 100 100" width="100" height="100" className="animate-spin-slow">
                                        <defs>
                                            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                        </defs>
                                        <text fontSize="11" fontWeight="bold" fill="white">
                                            <textPath xlinkHref="#circle">
                                                YENİ SEZON • YENİ SEZON •
                                            </textPath>
                                        </text>
                                    </svg>
                                    <Sparkles size={24} className="absolute text-[var(--color-yellow)]" strokeWidth={3} />
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-[var(--color-pink)] text-white p-6 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden md:block rotate-[-6deg] hover:rotate-0 transition-transform"
                            >
                                <div className="text-center">
                                    <span className="text-4xl block mb-2 filter drop-shadow-md">✨</span>
                                    <p className="text-sm font-black uppercase tracking-tight leading-tight">El Yapımı<br />Mutluluk</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Playful */}
            <motion.a
                href="#collection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
            >
                <div className="w-6 h-10 border-4 border-black rounded-full flex justify-center p-1 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 bg-black rounded-full"
                    />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white px-2 py-0.5 border-2 border-black rounded">Kaydır</span>
            </motion.a>
        </section>
    );
}
