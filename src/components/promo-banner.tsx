'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function PromoBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-charcoal text-white relative z-[60] overflow-hidden"
            >
                <div className="container mx-auto px-6 h-12 flex items-center justify-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2 animate-pulse">
                        <Truck size={14} className="text-clay" />
                        <span>TÜM TÜRKİYE'YE ÜCRETSİZ KARGO</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <Sparkles size={14} className="text-clay" />
                        <span>İLK SİPARİŞİNE ÖZEL: TSUKO10</span>
                    </div>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </motion.div>
        </AnimatePresence>
    );
}
