'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function Philosophy() {
    return (
        <section id="philosophy" className="py-32 bg-[var(--background)] overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">

                    {/* Visual Side */}
                    <div className="lg:col-span-12 xl:col-span-6 relative order-2 xl:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-square md:aspect-[1.2/1] xl:aspect-[4/5] overflow-hidden rounded-[4rem] group"
                        >
                            <Image
                                src="/images/kora.png"
                                alt="3D Printing Process"
                                fill
                                className="object-cover scale-150 grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-[2s]"
                                sizes="(max-width: 1200px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-16 left-16 space-y-2">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="flex items-center gap-3 text-white/40 uppercase tracking-[0.5em] text-[10px] font-black"
                                >
                                    <div className="w-12 h-px bg-current" />
                                    <span>Zanaat</span>
                                </motion.div>
                                <h3 className="text-5xl font-black text-white tracking-tighter">KATMANLARIN <br />RUHU.</h3>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-12 right-12 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <Sparkles size={24} className="text-white/40 animate-pulse" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-12 xl:col-span-6 space-y-12 order-1 xl:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="space-y-4 mb-10">
                                <span className="text-[var(--mood-accent)] text-xs font-black tracking-[0.3em] uppercase opacity-60">Manifesto</span>
                                <h2 className="text-5xl md:text-7xl font-bold text-charcoal tracking-tighter leading-[0.9]">
                                    Sadece Sizin İçin <br />
                                    <span className="text-[var(--mood-accent)] italic opacity-80">&quot;Dijital Zanaat&quot;</span>
                                </h2>
                            </div>

                            <div className="space-y-10 text-xl text-charcoal/60 font-light leading-relaxed tracking-tight">
                                <p>
                                    Tsuko&apos;da &quot;Stokta ne varsa onu gönder&quot; mantığı yoktur. Siparişiniz bize ulaştığında, o ürün sadece sizin için <span className="text-charcoal font-bold">atölyemizde yolculuğuna başlar.</span>
                                </p>
                                <p className="relative pl-10">
                                    <span className="absolute left-0 top-0 text-4xl text-[var(--mood-accent)] opacity-20 font-serif">&quot;</span>
                                    İleri teknoloji 3D yazıcılarımız, mısır nişastasından elde edilen doğal polimerleri milim milim işler. Bu süreç, el yapımı seramiklerin sıcaklığını dijital dünyanın hassasiyetiyle buluşturur.
                                </p>
                                <p>
                                    Japon folklorendeki <span className="text-charcoal font-bold">Tsukumogami</span> inancından ilham alıyoruz: Objelerin zamanla bir ruh kazandığına inanıyoruz. Bizim her katmanımız, o ruhun birer yıllık halkasıdır.
                                </p>
                            </div>

                            <div className="pt-8 flex items-center gap-12">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-charcoal tracking-tighter">0%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-1">Plastik Atık</p>
                                </div>
                                <div className="w-px h-10 bg-current opacity-10" />
                                <div className="text-center">
                                    <p className="text-3xl font-black text-charcoal tracking-tighter">100%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-1">Biyo-Polimer</p>
                                </div>
                                <div className="w-px h-10 bg-current opacity-10" />
                                <div className="text-center">
                                    <p className="text-3xl font-black text-charcoal tracking-tighter">~48h</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mt-1">Üretim Süresi</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
