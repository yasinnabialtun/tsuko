'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, LightbulbOff, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LightingSection() {
    const [roomLight, setRoomLight] = useState(true);
    const [productLight, setProductLight] = useState(false);

    return (
        <section id="lighting-demo" className="py-24 px-6 overflow-hidden transition-colors duration-1000"
            style={{ backgroundColor: roomLight ? 'var(--color-alabaster)' : '#111' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h2 className={cn(
                            "text-4xl md:text-6xl font-bold transition-colors duration-1000",
                            roomLight ? "text-charcoal" : "text-white"
                        )}>
                            Işığın <br /> Mimari Hali
                        </h2>
                        <p className={cn(
                            "text-lg max-w-md transition-colors duration-1000",
                            roomLight ? "text-charcoal/70" : "text-white/70"
                        )}>
                            Aura serisi aydınlatmalarımız, 3D baskı teknolojisinin sağladığı katmanlı dokuyu bir ışık şölenine dönüştürür.
                            Oda ışıklarını kapatın ve ruhunu keşfedin.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => setRoomLight(!roomLight)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300",
                                    roomLight
                                        ? "bg-charcoal text-white border-charcoal hover:bg-black"
                                        : "bg-white text-charcoal border-white hover:bg-alabaster"
                                )}
                            >
                                {roomLight ? <Moon size={20} /> : <Sun size={20} />}
                                {roomLight ? "Oda Işığını Kapat" : "Oda Işığını Aç"}
                            </button>

                            <button
                                onClick={() => setProductLight(!productLight)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300",
                                    productLight
                                        ? (roomLight ? "bg-clay text-white border-clay" : "bg-clay text-white border-clay shadow-[0_0_20px_rgba(214,140,120,0.5)]")
                                        : (roomLight ? "bg-transparent text-charcoal border-charcoal hover:bg-charcoal/5" : "bg-transparent text-white border-white hover:bg-white/10")
                                )}
                            >
                                {productLight ? <Lightbulb size={20} /> : <LightbulbOff size={20} />}
                                {productLight ? "Aydınlatmayı Kapat" : "Aydınlatmayı Aç"}
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto w-full group">
                        <motion.div
                            className="absolute inset-0 bg-clay/20 blur-[100px] rounded-full transition-opacity duration-1000"
                            animate={{ opacity: productLight ? (roomLight ? 0.3 : 1) : 0 }}
                        />

                        <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
                            {/* This represents the lamp image */}
                            <div className="relative w-full h-full p-12">
                                <Image
                                    src="/images/aura.png"
                                    alt="Aura Lighting Demo"
                                    fill
                                    className={cn(
                                        "object-contain transition-all duration-1000",
                                        !productLight && "brightness-[0.2] saturate-[0.1]",
                                        productLight && !roomLight && "brightness-125 saturate-110 shadow-[0_0_50px_rgba(214,140,120,0.3)]",
                                        productLight && roomLight && "brightness-100"
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
