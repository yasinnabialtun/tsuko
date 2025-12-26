'use client';

import { motion } from 'framer-motion';
import { Layers, Cpu, Sparkles } from 'lucide-react';

const steps = [
    {
        icon: Cpu,
        title: "Dijital Tasarım",
        desc: "Her obje, parametrik algoritmalarla dijital ortamda sıfırdan tasarlanır.",
        color: "bg-sage"
    },
    {
        icon: Layers,
        title: "Katmanlı Üretim",
        desc: "Mısır nişastasından üretilen biyo-polimerler, 0.2mm hassasiyetle üst üste işlenir.",
        color: "bg-clay"
    },
    {
        icon: Sparkles,
        title: "El İşçiliği & Ruh",
        desc: "Ham baskı, zımparalanır ve doğal yağlarla mühürlenir. Nesne ruhunu burada bulur.",
        color: "bg-rose"
    }
];

export default function Process() {
    return (
        <section className="py-32 px-6 bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 space-y-4"
                >
                    <span className="text-clay font-bold tracking-[0.2em] uppercase text-sm">Süreç</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-charcoal">
                        Dijitalden <span className="italic font-serif text-sage">Fiziksele.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Animated connectors */}
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-black/5 hidden md:block -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="group relative bg-alabaster p-10 rounded-[2.5rem] hover:bg-white border border-transparent hover:border-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon size={32} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl font-bold text-charcoal mb-4">{step.title}</h3>
                            <p className="text-charcoal/60 leading-relaxed">
                                {step.desc}
                            </p>

                            {/* Decorative layer lines */}
                            <div className="absolute bottom-8 right-8 flex flex-col gap-1 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                                <div className={`w-8 h-1 ${step.color} rounded-full`} />
                                <div className={`w-12 h-1 ${step.color} rounded-full`} />
                                <div className={`w-6 h-1 ${step.color} rounded-full`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
