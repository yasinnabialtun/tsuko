'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';


export default function Philosophy({ settings }: { settings?: any }) {
    // Fallback content in new Dopamine Theme
    const content = {
        title: settings?.philosophyTitle || "DOPAMİN DEKOR",
        text: settings?.philosophyContent || "Sıradanlığa karşı başlattığımız renkli bir isyan! Tsuko Design, evinizin enerjisini yükseltmek ve size her baktığınızda mutluluk verecek objeler tasarlamak için var. Japon sadeliğini, çılgın renklerle ve 3D teknolojisiyle buluşturuyoruz."
    };

    return (
        <section id="philosophy" className="py-32 bg-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">

                    {/* Visual Side */}
                    <div className="lg:col-span-12 xl:col-span-6 relative order-2 xl:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
                            className="relative aspect-square md:aspect-[1.2/1] xl:aspect-[4/5] overflow-hidden rounded-[4rem] group border-4 border-black shadow-[12px_12px_0px_0px_var(--color-purple)]"
                        >
                            <Image
                                src="/images/kora.png"
                                alt="3D Printing Process"
                                fill
                                className="object-cover scale-150 group-hover:scale-125 transition-all duration-[2s]"
                                sizes="(max-width: 1200px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue)]/40 via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-12 left-12 space-y-2">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="flex items-center gap-3 text-white uppercase tracking-[0.3em] text-xs font-black bg-black px-3 py-1 w-fit rounded-lg rotate-2"
                                >
                                    <span>Zanaat & Teknoloji</span>
                                </motion.div>
                                <h3 className="text-6xl font-black text-white tracking-tighter drop-shadow-lg leading-none">
                                    RENKLERİN <br /><span className="text-[var(--color-yellow)]">DANSI.</span>
                                </h3>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-12 right-12 w-24 h-24 bg-[var(--color-yellow)] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform cursor-pointer">
                                <Sparkles size={32} className="text-black animate-spin-slow stroke-[3]" />
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
                                <span className="inline-block px-4 py-1.5 bg-[var(--color-pink)] text-white text-xs font-black tracking-widest uppercase border-2 border-black rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    Manifesto
                                </span>
                                <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.9] mt-6">
                                    {content.title}
                                </h2>
                            </div>

                            <div className="space-y-10 text-xl text-black font-medium leading-relaxed tracking-tight whitespace-pre-line border-l-4 border-[var(--color-green)] pl-8">
                                {content.text}
                            </div>


                            <div className="pt-8 flex flex-wrap items-center gap-8 md:gap-12">
                                <div className="text-center group cursor-pointer hover:-translate-y-2 transition-transform">
                                    <div className="bg-[var(--color-sand)] w-16 h-16 rounded-full flex items-center justify-center border-2 border-black mb-2 mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[var(--color-purple)] group-hover:text-white transition-colors">
                                        <p className="text-xl font-black text-black group-hover:text-white">♻️</p>
                                    </div>
                                    <p className="text-xl font-black text-black tracking-tighter">0%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-0.5">Atık</p>
                                </div>

                                <div className="text-center group cursor-pointer hover:-translate-y-2 transition-transform">
                                    <div className="bg-[var(--color-sand)] w-16 h-16 rounded-full flex items-center justify-center border-2 border-black mb-2 mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[var(--color-green)] group-hover:text-white transition-colors">
                                        <p className="text-2xl font-black text-black group-hover:text-white">🌽</p>
                                    </div>
                                    <p className="text-xl font-black text-black tracking-tighter">100%</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-0.5">Doğal</p>
                                </div>

                                <div className="text-center group cursor-pointer hover:-translate-y-2 transition-transform">
                                    <div className="bg-[var(--color-sand)] w-16 h-16 rounded-full flex items-center justify-center border-2 border-black mb-2 mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[var(--color-blue)] group-hover:text-white transition-colors">
                                        <p className="text-2xl font-black text-black group-hover:text-white">🚀</p>
                                    </div>
                                    <p className="text-xl font-black text-black tracking-tighter">~48h</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-0.5">Hız</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
