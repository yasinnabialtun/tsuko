'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopBanner() {
    const [isVisible, setIsVisible] = useState(true);

    // Don't show if user dismissed it in this session
    useEffect(() => {
        const dismissed = sessionStorage.getItem('top_banner_dismissed');
        if (dismissed) setIsVisible(false);
    }, []);

    const dismissBanner = () => {
        setIsVisible(false);
        sessionStorage.setItem('top_banner_dismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-charcoal text-white py-2 px-6 relative z-[110] overflow-hidden"
                >
                    <div className="container mx-auto flex items-center justify-center gap-4 text-[11px] font-bold tracking-widest uppercase">
                        <Sparkles size={12} className="text-clay animate-pulse" />
                        <p className="text-center">
                            Yeni Koleksiyon: <span className="text-clay">Mitoloji Serisi</span> Yayında! Tüm siparişlerde Ücretsiz Kargo.
                        </p>
                        <Sparkles size={12} className="text-clay animate-pulse" />
                    </div>

                    <button
                        onClick={dismissBanner}
                        className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-clay transition-colors"
                    >
                        <X size={14} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
