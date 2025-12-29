'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Truck, Gift, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const MESSAGES = [
    { text: "Tüm siparişlerde Ücretsiz Kargo 📦", icon: Truck },
    { text: "Yeni Koleksiyon: Mitoloji Serisi Yayında! ✨", icon: Sparkles },
    { text: "İlk siparişinize özel %10 indirim kodunuz: HOSGELDIN10 🎁", icon: Gift },
    { text: "Sürdürülebilir Mimari Tasarımlar Tsuko Design'da 🌿", icon: Heart },
];

export default function TopBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('top_banner_dismissed');
        if (dismissed) setIsVisible(false);

        if (isVisible) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [isVisible]);

    const dismissBanner = () => {
        setIsVisible(false);
        sessionStorage.setItem('top_banner_dismissed', 'true');
    };

    if (!isVisible) return null;

    const CurrentIcon = MESSAGES[currentIndex].icon;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="banner-wrapper"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-charcoal text-white py-2.5 px-6 relative z-[110] overflow-hidden"
            >
                <div className="container mx-auto relative flex items-center justify-center h-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "circOut" }}
                            className="flex items-center justify-center gap-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-center w-full"
                        >
                            <CurrentIcon size={12} className="text-clay shrink-0" />
                            <p className="truncate">
                                {MESSAGES[currentIndex].text}
                            </p>
                            <CurrentIcon size={12} className="text-clay shrink-0" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={dismissBanner}
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-clay transition-colors p-1"
                >
                    <X size={14} />
                </button>
            </motion.div>
        </AnimatePresence>
    );
}
