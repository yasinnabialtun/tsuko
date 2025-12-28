
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, MoveRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-porcelain">
            {/* Background Texture/Gradient - Muted & Premium */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-clay/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-[-10%] left-[-20%] w-[800px] h-[800px] bg-sage/20 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 pt-28 lg:pt-0">

                {/* Text Content */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone/50 border border-stone mb-10 animate-reveal" style={{ animationDelay: '0.1s' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-clay"></span>
                            <span className="text-[10px] md:text-xs font-semibold tracking-widest text-[#2D2D2D]/70 uppercase">El Yapımı & 3D Baskı</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#2D2D2D] leading-[1.05] tracking-tight mb-8 font-heading">
                            Evinizin <br />
                            <span className="text-purplish-grey relative inline-block">
                                Heykel
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-sage/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                            Hali.
                        </h1>

                        <p className="text-lg text-[#2D2D2D]/60 font-light max-w-md leading-relaxed mb-12 font-body">
                            Parametrik tasarımın estetiği, doğa dostu malzemelerle buluştu. Sıradan objeleri sanat eserine dönüştürüyoruz.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <Link href="/#collection" className="group relative px-10 py-5 bg-[#2D2D2D] text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-xl hover:shadow-clay/20 shadow-lg w-full sm:w-auto text-center">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    KEŞFET
                                    <MoveRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-clay transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </Link>
                            <Link href="/about" className="px-10 py-5 text-[#2D2D2D] border border-stone bg-white/50 backdrop-blur-sm rounded-full hover:bg-white hover:border-sage/50 transition-all font-medium w-full sm:w-auto text-center">
                                Atölye Hikayesi
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image - Elite Composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="lg:col-span-6 relative h-[500px] lg:h-[800px] w-full order-1 lg:order-2"
                >
                    <div className="relative w-full h-full">
                        {/* Main Large Image */}
                        <div className="absolute top-0 right-0 w-[90%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl shadow-stone/50 z-10">
                            <Image
                                src="/images/hero.png"
                                alt="Tsuko Design Vazolar"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-[2s]"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Floating Detail Card */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-[10%] left-0 w-[240px] bg-white p-5 rounded-2xl shadow-xl z-20 border border-stone/30 hidden md:block"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-clay uppercase tracking-widest">Sürdürülebilir</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-charcoal/20"></div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-charcoal font-semibold leading-snug mb-2">PLA+ Biyo-Polimer</p>
                            <p className="text-xs text-charcoal/50 leading-relaxed">Mısır nişastasından üretilen, doğada çözünebilir premium malzeme.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.a
                href="#collection"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-charcoal/30 hover:text-clay transition-colors cursor-pointer"
            >
                <ArrowDown size={24} strokeWidth={1.5} />
            </motion.a>
        </section>
    );
}
