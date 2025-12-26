'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    const scrollToCollection = () => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-20 px-6 overflow-hidden bg-alabaster">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                <div className="lg:col-span-6 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage text-sm font-bold tracking-widest uppercase mb-4">
                            Tsuko Design
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-charcoal">
                            Yapıya <br /> <span className="text-clay">Ruh</span> Katmak.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-charcoal/70 max-w-lg"
                    >
                        Modern yaşam alanları için mimari 3D dekorasyon.
                        Cansız materyallerin katman katman canlandığı,
                        yaşayan objeler tasarlıyoruz.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={scrollToCollection}
                            className="bg-charcoal text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-black transition-all shadow-lg hover:shadow-charcoal/20"
                        >
                            Koleksiyonu Keşfet
                        </button>
                        <a
                            href="#philosophy"
                            className="bg-transparent text-charcoal border-2 border-charcoal/10 px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-charcoal/5 transition-all"
                        >
                            Hikayemiz
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="lg:col-span-6 relative perspective-1000"
                >
                    <div className="relative aspect-square w-full max-w-xl mx-auto overflow-hidden rounded-[40px] shadow-2xl">
                        <Image
                            src="/images/hero.png"
                            alt="Tsuko Design Signature Vase"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Architectural badge */}
                        <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-xl hidden md:block">
                            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Material</p>
                            <p className="text-sm font-black text-charcoal uppercase">Architectural Polymer</p>
                            <div className="mt-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-sage"></div>
                                <div className="w-3 h-3 rounded-full bg-rose"></div>
                                <div className="w-3 h-3 rounded-full bg-clay"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Floating indicators */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hidden md:flex"
                onClick={scrollToCollection}
            >
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-charcoal/30">Scroll Down</span>
                <ArrowDown size={16} className="text-charcoal/30" />
            </motion.div>
        </section>
    );
}
