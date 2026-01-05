'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LookProduct {
    id: string;
    product: {
        id: string;
        name: string;
        price: any;
        images: string[];
    };
    x: number;
    y: number;
}

interface Look {
    id: string;
    title: string;
    description: string | null;
    image: string;
    pins: LookProduct[];
}

interface ShopTheLookProps {
    looks?: Look[];
}

export default function ShopTheLook({ looks: customLooks }: ShopTheLookProps) {
    const [activePin, setActivePin] = useState<string | null>(null);

    const looks = customLooks && customLooks.length > 0 ? customLooks : [
        {
            id: '1',
            title: "Dopamin Köşesi",
            image: "/images/hero.png",
            description: "Enerji ve mutluluk arayanlar için renkli bir kurgu.",
            pins: [
                {
                    id: "p1",
                    x: 40,
                    y: 60,
                    product: { id: "nami-vazo", name: "Nami Vazo", price: "1250", images: ["/images/products/nami.png"] }
                },
                {
                    id: "p2",
                    x: 70,
                    y: 40,
                    product: { id: "mantar-lamba", name: "Mantar Lamba", price: "850", images: ["/images/products/mantar.png"] }
                }
            ]
        }
    ];

    const currentLook = looks[0];

    return (
        <section className="py-20 md:py-40 bg-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] opacity-10 pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="flex flex-col xl:flex-row gap-24 xl:gap-32 items-center">

                    {/* Content Section */}
                    <div className="xl:w-1/3 space-y-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--color-yellow)] border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform">
                                <Sparkles size={18} className="text-black animate-spin-slow" />
                                <span className="text-xs font-black tracking-[0.2em] text-black uppercase">Mutluluk Alanı</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-[0.9] uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                {currentLook.title.split(' ')[0]} <br />
                                <span className="text-[var(--color-pink)] stroke-black" style={{ WebkitTextStroke: "1px black" }}>
                                    {currentLook.title.split(' ').slice(1).join(' ')}
                                </span>
                            </h2>
                        </div>

                        <p className="text-xl text-black/70 font-bold leading-relaxed max-w-md border-l-4 border-[var(--color-blue)] pl-4">
                            {currentLook.description || "Küratörlerimiz tarafından tasarlanan bu özel kurgularla, dekorasyon dergilerinden fırlamış gibi görünen köşeleri tek tıkla evinize taşıyın."}
                        </p>

                        <Link
                            href="/#collection"
                            className="group flex items-center gap-6 font-black text-xs tracking-[0.3em] text-black hover:text-[var(--color-purple)] transition-all bg-white px-6 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit active:translate-y-1 active:shadow-none"
                        >
                            TÜM KOLEKSİYONU İNCELE
                            <div className="w-12 h-px bg-black group-hover:w-16 transition-all" />
                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    {/* Interactive Visual Section */}
                    <div className="xl:w-2/3 w-full relative">
                        <div className="relative aspect-[16/10] md:aspect-[16/9] bg-white rounded-[3rem] overflow-hidden border-4 border-black shadow-[12px_12px_0px_0px_var(--color-green)] group">
                            <Image
                                src={currentLook.image}
                                alt={currentLook.title}
                                fill
                                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[3s] ease-out"
                                sizes="(max-width: 1200px) 100vw, 66vw"
                            />

                            {/* Pins */}
                            {currentLook.pins.map((pin) => (
                                <div
                                    key={pin.id}
                                    className="absolute z-20"
                                    style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                                >
                                    <button
                                        onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                                        className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/pin"
                                    >
                                        <span className="absolute inset-0 bg-[var(--color-yellow)] rounded-full animate-ping opacity-70 group-hover/pin:animate-none scale-150" />
                                        <div className={cn(
                                            "relative w-full h-full rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all duration-300 border-2 border-black",
                                            activePin === pin.id ? 'bg-[var(--color-pink)] text-white scale-125 rotate-45' : 'bg-white text-black hover:scale-110 hover:bg-[var(--color-yellow)]'
                                        )}>
                                            <Plus size={24} strokeWidth={3} />
                                        </div>
                                    </button>

                                    {/* Elevated Popup Card */}
                                    <AnimatePresence>
                                        {activePin === pin.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-64 bg-white p-4 z-30 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl"
                                            >
                                                <div className="relative w-full aspect-square bg-[var(--color-sand)] rounded-xl mb-4 overflow-hidden border-2 border-black">
                                                    <Image src={pin.product.images[0]} alt={pin.product.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex justify-between items-start mb-4 px-1">
                                                    <h4 className="font-black text-black text-lg leading-tight">{pin.product.name}</h4>
                                                    <span className="inline-block bg-[var(--color-yellow)] text-black text-xs font-black px-2 py-1 border border-black rounded rotate-3">
                                                        {pin.product.price} ₺
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/product/${pin.product.id}`}
                                                    className="w-full py-3 bg-black text-white rounded-xl font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-[var(--color-purple)] hover:text-white transition-all border-2 border-transparent hover:border-black"
                                                >
                                                    ÜRÜNÜ İNCELE
                                                    <ArrowRight size={14} />
                                                </Link>

                                                {/* Pointer Arrow */}
                                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 z-[-1] border-b-2 border-r-2 border-black" />
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
                                className="absolute bottom-8 right-8 bg-black px-6 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] border-2 border-white shadow-xl hidden md:block"
                            >
                                Noktalara dokunarak keşfet ✨
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
