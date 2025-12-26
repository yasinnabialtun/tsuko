'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

const LOOKS = [
    {
        id: 1,
        title: "Zen Köşesi",
        image: "/images/hero.png", // Using hero image as placeholder for room scene
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
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Text Side */}
                    <div className="md:w-1/3 space-y-6">
                        <div className="inline-block bg-clay/10 text-clay px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                            Tsuko Studio
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-charcoal leading-tight">
                            Görünümü <br />
                            <span className="text-clay italic">Evinize Taşıyın.</span>
                        </h2>
                        <p className="text-charcoal/60 text-lg">
                            Dekorasyon dergilerinden fırlamış gibi görünen köşeleri sizin için tasarladık. İlham alın ve tek tıkla uygulayın.
                        </p>
                        <Link
                            href="/#collection"
                            className="inline-flex items-center gap-2 font-bold text-charcoal border-b-2 border-charcoal hover:text-clay hover:border-clay transition-colors pt-4"
                        >
                            Tüm Kombinleri Gör <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Interactive Image Side */}
                    <div className="md:w-2/3 w-full relative group">
                        <div className="relative aspect-video md:aspect-[16/9] bg-alabaster rounded-[3rem] overflow-hidden shadow-2xl border border-black/5">
                            <Image
                                src={LOOKS[0].image}
                                alt={LOOKS[0].title}
                                fill
                                className="object-cover md:object-contain opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
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
                                        className="relative w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                                    >
                                        {/* Pulse Ring */}
                                        <span className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                                        {/* Core Pin */}
                                        <span className={`relative w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${activePin === prod.id ? 'scale-110 text-clay' : 'text-charcoal'}`}>
                                            <Plus size={20} className={`transition-transform duration-300 ${activePin === prod.id ? 'rotate-45' : ''}`} />
                                        </span>
                                    </button>

                                    {/* Product Popup Card */}
                                    <AnimatePresence>
                                        {activePin === prod.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white p-3 rounded-2xl shadow-xl border border-black/5 z-30"
                                            >
                                                <div className="relative w-full aspect-square bg-alabaster rounded-xl mb-3 overflow-hidden">
                                                    <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                                                </div>
                                                <h4 className="font-bold text-charcoal text-sm">{prod.name}</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-clay font-bold text-sm">{prod.price}</span>
                                                    <Link href={`/product/${prod.id}`} className="bg-charcoal text-white p-1.5 rounded-lg hover:bg-black transition-colors">
                                                        <ArrowRight size={14} />
                                                    </Link>
                                                </div>

                                                {/* Little arrow pointing up */}
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-black/5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Hint Overlay */}
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/20">
                            👆 Ürünleri keşfetmek için noktalara dokunun
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
