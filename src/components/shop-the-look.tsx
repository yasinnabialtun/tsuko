'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOOKS = [
    {
        id: 1,
        title: "Zen Köşesi",
        image: "/images/hero.png",
        description: "Sakinlik ve denge arayanlar için minimalist bir kurgu.",
        products: [
            { id: "nami-vazo", name: "Nami Vazo", price: "₺1.250", x: 40, y: 60, image: "/images/products/nami.png" },
            { id: "mantar-lamba", name: "Mantar Lamba", price: "₺850", x: 70, y: 40, image: "/images/products/mantar.png" }
        ]
    }
];

export default function ShopTheLook() {
    const [activePin, setActivePin] = useState<string | null>(null);

    return (
        <section className="py-40 bg-[var(--background)] overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col xl:flex-row gap-24 xl:gap-32 items-center">

                    {/* Content Section */}
                    <div className="xl:w-1/3 space-y-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-current/5 border border-current/10 mb-6 shadow-sm">
                                <Sparkles size={14} className="text-clay animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.3em] text-charcoal/40 uppercase">Yaşam Alanınız</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold text-charcoal tracking-tighter leading-[0.9] uppercase">
                                Görünümü <br />
                                <span className="text-clay italic opacity-80">Evinize Taşıyın.</span>
                            </h2>
                        </div>

                        <p className="text-xl text-charcoal/60 font-light leading-relaxed max-w-md">
                            Küratörlerimiz tarafından tasarlanan bu özel kurgularla, dekorasyon dergilerinden fırlamış gibi görünen köşeleri tek tıkla evinize taşıyın.
                        </p>

                        <Link
                            href="/#collection"
                            className="group flex items-center gap-6 font-black text-xs tracking-[0.3em] text-charcoal hover:text-clay transition-all group"
                        >
                            TÜM KOMBİNLERİ İNCELE
                            <div className="w-12 h-px bg-current group-hover:w-16 transition-all" />
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {/* Interactive Visual Section */}
                    <div className="xl:w-2/3 w-full relative">
                        <div className="relative aspect-[16/10] md:aspect-[16/9] bg-current/5 rounded-[4rem] overflow-hidden border border-current/5 shadow-2xl group">
                            <Image
                                src={LOOKS[0].image}
                                alt={LOOKS[0].title}
                                fill
                                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[3s] ease-out opacity-90 group-hover:opacity-100"
                                sizes="(max-width: 1200px) 100vw, 66vw"
                            />

                            {/* Pins */}
                            {LOOKS[0].products.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="absolute z-20"
                                    style={{ top: `${prod.y}%`, left: `${prod.x}%` }}
                                >
                                    <button
                                        onClick={() => setActivePin(activePin === prod.id ? null : prod.id)}
                                        className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/pin"
                                    >
                                        <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-40 group-hover/pin:animate-none scale-150" />
                                        <div className={cn(
                                            "relative w-full h-full rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 backdrop-blur-md border border-white/40",
                                            activePin === prod.id ? 'bg-clay text-white scale-125 rotate-45' : 'bg-white/80 text-charcoal hover:scale-110'
                                        )}>
                                            <Plus size={24} />
                                        </div>
                                    </button>

                                    {/* Elevated Popup Card */}
                                    <AnimatePresence>
                                        {activePin === prod.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-64 premium-card bg-white p-4 z-30"
                                            >
                                                <div className="relative w-full aspect-square bg-current/5 rounded-2xl mb-4 overflow-hidden">
                                                    <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                                </div>
                                                <div className="space-y-1 mb-4 px-1">
                                                    <h4 className="font-bold text-charcoal">{prod.name}</h4>
                                                    <p className="text-xs font-black text-clay uppercase tracking-widest">{prod.price}</p>
                                                </div>
                                                <Link
                                                    href={`/product/${prod.id}`}
                                                    className="w-full py-4 bg-charcoal text-white rounded-xl font-black text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
                                                >
                                                    ÜRÜNÜ İNCELE
                                                    <ArrowRight size={14} />
                                                </Link>

                                                {/* Pointer Arrow */}
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 z-[-1] shadow-xl border-b border-r border-current/5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {/* Instruction Hint */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 hidden md:block"
                            >
                                Noktalara dokunarak keşfet
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
