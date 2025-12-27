'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-[95vh] flex items-center bg-alabaster overflow-hidden pt-20">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-clay/5 to-transparent -z-10" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-sage/10 to-transparent -z-10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT: High-Converting Copy */}
                <div className="max-w-2xl z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Category Badge - SEO + Trust */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-clay/10 text-clay px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                                #1 3D Baskı Dekorasyon
                            </span>
                            <span className="flex items-center gap-1 text-xs font-bold text-sage">
                                <Leaf size={14} />
                                Çevre Dostu
                            </span>
                        </div>

                        {/* MAIN HEADLINE - Conversion Optimized */}
                        <h1 className="text-5xl md:text-7xl font-black text-charcoal leading-[1.05] mb-6 tracking-tight">
                            Mimari Estetik,<br />
                            <span className="text-clay italic font-serif">Evinize Taşındı.</span>
                        </h1>

                        {/* SUBHEADLINE - Benefit Focused */}
                        <p className="text-xl text-charcoal/70 mb-8 leading-relaxed max-w-lg">
                            <strong className="text-charcoal">Seri üretimden uzak, sadece sizin için.</strong> 3D baskı teknolojisi ve biyo-polimer ile üretilen, doğa dostu vazo ve aydınlatma koleksiyonu.
                        </p>

                        {/* CTA BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href="/#collection"
                                className="group bg-charcoal text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-black hover:scale-[1.02] transition-all shadow-2xl shadow-charcoal/30"
                            >
                                <Sparkles size={20} className="text-clay" />
                                Koleksiyonu Keşfet
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>

                            <Link
                                href="/#process"
                                className="group bg-white/80 backdrop-blur-md text-charcoal border border-charcoal/10 px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white hover:border-charcoal/20 transition-all"
                            >
                                Nasıl Üretiyoruz?
                            </Link>
                        </div>

                        {/* TRUST BADGES - Immediate Trust */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-charcoal/5">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                    <ShieldCheck size={18} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal text-xs">Kırılma Garantisi</p>
                                    <p className="text-[10px] text-charcoal/50">%100 Koruma</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Truck size={18} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal text-xs">Ücretsiz Kargo</p>
                                    <p className="text-[10px] text-charcoal/50">Türkiye Geneli</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                                    <Leaf size={18} className="text-sage" />
                                </div>
                                <div>
                                    <p className="font-bold text-charcoal text-xs">Biyo-Polimer</p>
                                    <p className="text-[10px] text-charcoal/50">Geri Dönüştürülebilir</p>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL PROOF */}
                        <div className="mt-6 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-clay to-sage border-2 border-white" />
                                ))}
                            </div>
                            <p className="text-sm text-charcoal/60">
                                <strong className="text-charcoal">500+</strong> mutlu ev sahibi bu ay Tsuko&apos;yu tercih etti
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="relative h-[500px] lg:h-[700px] w-full"
                >
                    {/* Decorative Blur */}
                    <div className="absolute inset-0 bg-clay/10 rounded-full blur-[100px] transform translate-y-20 scale-75" />

                    <Image
                        src="/images/hero.png"
                        alt="Tsuko 3D Baskı Mimari Vazo Koleksiyonu - Modern Ev Dekorasyonu"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />

                    {/* Floating Product Badge - Urgency */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute bottom-24 left-6 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/30 max-w-[220px]"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                            <span className="text-[10px] font-bold text-rose uppercase tracking-wider">Sınırlı Stok</span>
                        </div>
                        <p className="font-bold text-charcoal">Aura Koleksiyonu</p>
                        <p className="text-xs text-charcoal/60 mt-1">Son 3 adet kaldı</p>
                    </motion.div>

                    {/* Top Badge - New */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                        className="absolute top-20 right-10 bg-charcoal text-white px-4 py-2 rounded-full shadow-xl"
                    >
                        <span className="text-xs font-bold">✨ YENİ SERİ</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
