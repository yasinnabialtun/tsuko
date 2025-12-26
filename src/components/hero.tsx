'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-alabaster overflow-hidden pt-20">
            {/* Background Abstract */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#E6E8E6] to-transparent -z-10" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT: Copywriting & CTA */}
                <div className="max-w-2xl z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Trust Signal - Top */}
                        <div className="flex items-center gap-2 mb-6 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-black/5 animate-fade-in-up">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-orange-400 text-orange-400" />)}
                            </div>
                            <span className="text-xs font-bold text-charcoal/70">Tasarım Tutkunlarının Tercihi</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-charcoal leading-[1.1] mb-6">
                            Sıradan Olanı <br />
                            <span className="text-clay italic">Evinizden Atın.</span>
                        </h1>

                        <p className="text-xl text-charcoal/70 mb-8 leading-relaxed">
                            Herkesin evinde olan seri üretim plastiklerden sıkılmadınız mı? <br />
                            Tsuko, antik Japon felsefesini modern <strong>biyo-tasarım</strong> ile birleştirerek, ruhu olan nesneler üretir.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/#collection"
                                className="group bg-charcoal text-white px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-black hover:scale-105 transition-all shadow-xl shadow-charcoal/20"
                            >
                                Koleksiyonu İncele
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/#philosophy"
                                className="group bg-white text-charcoal border border-charcoal/10 px-8 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                            >
                                Hikayemiz
                            </Link>
                        </div>

                        {/* Risk Reversal */}
                        <div className="mt-8 flex items-center gap-6 text-sm font-medium text-charcoal/60">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-green-600" />
                                <span>%100 Kırılma Garantisi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={18} className="text-green-600" />
                                <span>Ücretsiz Kargo</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Visual High Impact */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[500px] lg:h-[700px] w-full"
                >
                    <div className="absolute inset-0 bg-clay/10 rounded-full blur-3xl transform translate-y-20 scale-75" />
                    <Image
                        src="/images/hero.png"
                        alt="Tsuko Mimari Vazo Koleksiyonu"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />

                    {/* Floating Product Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute bottom-20 left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 max-w-[200px]"
                    >
                        <p className="font-bold text-charcoal">Aura Koleksiyonu</p>
                        <p className="text-xs text-charcoal/60 mt-1">Stoklar tükeniyor 🔥</p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
