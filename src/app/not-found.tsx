'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { MoveLeft, Ghost } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[500px] font-black text-charcoal/[0.02] select-none z-0">
                    404
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 space-y-8"
                >
                    <div className="inline-flex p-6 bg-alabaster rounded-full text-charcoal/20 mb-4">
                        <Ghost size={64} />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black text-charcoal tracking-tighter">
                            Kayıp mı <span className="text-clay italic">oldunuz?</span>
                        </h2>
                        <p className="text-charcoal/50 max-w-lg mx-auto text-lg md:text-xl font-medium">
                            Aradığınız sayfa başka bir boyuta taşınmış veya hiç var olmamış olabilir.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 bg-charcoal text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-2xl shadow-charcoal/20"
                        >
                            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Anasayfaya Dön
                        </Link>
                        <Link
                            href="/collection"
                            className="text-charcoal/40 hover:text-charcoal font-bold uppercase tracking-widest text-xs transition-colors"
                        >
                            Koleksiyonu Keşfet
                        </Link>
                    </div>
                </motion.div>

                {/* Decorative floating elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-[10%] w-24 h-24 bg-clay/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/4 left-[10%] w-32 h-32 bg-charcoal/5 rounded-full blur-3xl"
                />
            </div>
            <Footer />
        </main>
    );
}
