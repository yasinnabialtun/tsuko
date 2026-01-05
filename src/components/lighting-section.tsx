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
        <section id="lighting-demo" className="py-24 px-6 overflow-hidden transition-colors duration-1000 border-b-4 border-black"
            style={{ backgroundColor: roomLight ? 'var(--color-sand)' : '#1a1a1a' }}>

            {/* Background Pattern for Light Mode */}
            {roomLight && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className={cn(
                            "inline-block px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500",
                            roomLight ? "bg-[var(--color-purple)] text-white" : "bg-white text-black"
                        )}>
                            <span>Atmosfer Yaratıcı</span>
                        </div>

                        <h2 className={cn(
                            "text-4xl md:text-7xl font-black transition-colors duration-1000 uppercase leading-[0.9] tracking-tighter",
                            roomLight ? "text-black" : "text-white"
                        )}>
                            IŞIĞIN <br />
                            <span className={cn(
                                "transition-colors duration-500",
                                roomLight ? "text-[var(--color-yellow)] stroke-black" : "text-[var(--color-purple)]"
                            )} style={{ WebkitTextStroke: roomLight ? "2px black" : "0" }}>
                                OYUNCAKLI
                            </span> HALİ
                        </h2>
                        <p className={cn(
                            "text-xl font-bold max-w-md transition-colors duration-1000 border-l-4 pl-6",
                            roomLight ? "text-black/70 border-black" : "text-white/70 border-white"
                        )}>
                            Aura serisi aydınlatmalarımız sadece bir lamba değil, odanızın modunu değiştiren bir sanat objesi. Işıkları kapatın ve renklerin dansını izleyin!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => setRoomLight(!roomLight)}
                                className={cn(
                                    "flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 transition-all duration-200 w-full sm:w-auto font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                                    roomLight
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-white"
                                )}
                            >
                                {roomLight ? <Moon size={20} fill="#fff" /> : <Sun size={20} fill="#000" />}
                                {roomLight ? "Mod: Gece 🌚" : "Mod: Gündüz ☀️"}
                            </button>

                            <button
                                onClick={() => setProductLight(!productLight)}
                                className={cn(
                                    "flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 transition-all duration-200 w-full sm:w-auto font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                                    productLight
                                        ? "bg-[var(--color-yellow)] text-black border-black"
                                        : (roomLight ? "bg-white text-black border-black" : "bg-transparent text-white border-white")
                                )}
                            >
                                {productLight ? <Lightbulb size={20} fill="black" /> : <LightbulbOff size={20} />}
                                {productLight ? "Işığı Söndür" : "Işığı Yak"}
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative aspect-square max-w-lg mx-auto lg:ml-auto w-full group">
                        <motion.div
                            className="absolute inset-0 blur-[100px] rounded-full transition-opacity duration-1000 bg-[var(--color-yellow)]"
                            animate={{ opacity: productLight ? (roomLight ? 0.4 : 0.8) : 0 }}
                        />

                        <div className={cn(
                            "relative z-10 w-full h-full rounded-[3rem] overflow-hidden flex items-center justify-center border-4 transition-colors duration-1000",
                            roomLight ? "bg-white border-black shadow-[12px_12px_0px_0px_var(--color-green)]" : "bg-white/5 border-white/20"
                        )}>
                            {/* This represents the lamp image */}
                            <div className="relative w-full h-full p-12">
                                <Image
                                    src="/images/aura.png"
                                    alt="Aura Lighting Demo"
                                    fill
                                    className={cn(
                                        "object-contain transition-all duration-1000",
                                        !productLight && "brightness-[0.4] saturate-[0.1]",
                                        productLight && !roomLight && "brightness-125 saturate-150 drop-shadow-[0_0_30px_rgba(255,183,38,0.6)]",
                                        productLight && roomLight && "brightness-110 saturate-110"
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
