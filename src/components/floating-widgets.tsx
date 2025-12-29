'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function FloatingWidgets() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showWpTooltip, setShowWpTooltip] = useState(false);
    const pathname = usePathname();

    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);

        // Fetch public settings for WhatsApp number
        fetch('/api/settings/public')
            .then(res => res.json())
            .then(data => setSettings(data))
            .catch(err => console.error("Settings fetch failed", err));

        // Show WP tooltip after 5 seconds, once
        const timer = setTimeout(() => {
            const dismissed = localStorage.getItem('wp_tooltip_dismissed');
            if (!dismissed) setShowWpTooltip(true);
        }, 5000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWhatsAppClick = () => {
        const wpNumber = settings?.whatsapp || '905300000000';
        const message = encodeURIComponent(`Merhaba, ${window.location.host}${pathname} sayfasındaki ürünleriniz hakkında bilgi almak istiyorum.`);
        window.open(`https://wa.me/${wpNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
        setShowWpTooltip(false);
    };

    const dismissTooltip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowWpTooltip(false);
        localStorage.setItem('wp_tooltip_dismissed', 'true');
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 items-end">

            {/* WhatsApp Widget */}
            <div className="relative">
                <AnimatePresence>
                    {showWpTooltip && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            className="absolute bottom-full right-0 mb-4 w-64 bg-white p-4 rounded-2xl shadow-2xl border border-black/5"
                        >
                            <button
                                onClick={dismissTooltip}
                                className="absolute top-2 right-2 text-charcoal/20 hover:text-charcoal transition-colors"
                            >
                                <X size={14} />
                            </button>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                                    <MessageCircle size={16} fill="currentColor" />
                                </div>
                                <span className="font-bold text-sm text-charcoal">Tsuko Destek</span>
                            </div>
                            <p className="text-xs text-charcoal/60 leading-relaxed">
                                Merhaba! Tasarımlarımız hakkında sormak istediğiniz bir şey var mı?
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWhatsAppClick}
                    className="w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors relative"
                    aria-label="WhatsApp Destek"
                >
                    <MessageCircle size={28} fill="currentColor" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-bounce" />
                </motion.button>
            </div>

            {/* Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-white text-charcoal rounded-full shadow-xl border border-black/5 flex items-center justify-center hover:bg-alabaster transition-colors"
                        aria-label="Yukarı Çık"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
