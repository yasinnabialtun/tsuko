'use client';

import { motion } from 'framer-motion';
import { Hammer, Clock, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';

export default function MaintenanceMode() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full space-y-8"
            >
                {/* Logo */}
                <div className="relative w-48 h-12 mx-auto mb-12">
                    <Image
                        src="/logo.png"
                        alt="Tsuko Design"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <div className="inline-flex p-4 bg-clay/10 rounded-3xl text-clay mb-2">
                        <Hammer size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-charcoal leading-tight">
                        Şu anda <span className="text-clay italic">güncelleniyoruz.</span>
                    </h1>
                    <p className="text-charcoal/60 text-lg max-w-md mx-auto">
                        Deneyiminizi geliştirmek için sitemizi kısa süreliğine bakıma aldık. Çok yakında yeni ürünlerimizle buradayız!
                    </p>
                </div>

                {/* Info Card */}
                <div className="bg-alabaster p-8 rounded-[2.5rem] border border-black/5 flex flex-col md:flex-row items-center justify-center gap-12">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-clay mb-1"><Clock size={24} /></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40">Geri Dönüş</span>
                        <span className="font-bold text-charcoal">Yakında</span>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-black/10" />
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-clay mb-1"><Instagram size={24} /></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40">Bizi Takip Edin</span>
                        <a href="https://instagram.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="font-bold text-charcoal hover:text-clay transition-colors">@tsukodesign</a>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-12">
                    <p className="text-xs text-charcoal/40 font-medium tracking-widest uppercase flex items-center justify-center gap-2">
                        <Mail size={12} /> info@tsukodesign.com
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
