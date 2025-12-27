'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const SALES_DATA = [
    { name: 'Melis', location: 'Kadıköy, İstanbul', product: 'Nami Vazo', image: '/images/products/nami.png', time: '2 dakika önce' },
    { name: 'Can', location: 'Çankaya, Ankara', product: 'Mantar Lamba', image: '/images/products/mantar.png', time: '12 dakika önce' },
    { name: 'Selin', location: 'Karşıyaka, İzmir', product: 'Kaya Saksı', image: '/images/products/kaya.png', time: 'Az önce' },
    { name: 'Zeynep', location: 'Beşiktaş, İstanbul', product: 'Aura Vazo', image: '/images/hero.png', time: '1 saat önce' },
    { name: 'Mert', location: 'Nilüfer, Bursa', product: 'Nami Vazo - Stone', image: '/images/products/nami.png', time: '45 dakika önce' },
];

export default function LiveSalesNotification() {
    const [currentSale, setCurrentSale] = useState<number | null>(null);

    useEffect(() => {
        // Initial delay
        const initTimer = setTimeout(() => {
            triggerNotification();
        }, 5000);

        const triggerNotification = () => {
            const randomIdx = Math.floor(Math.random() * SALES_DATA.length);
            setCurrentSale(randomIdx);

            // Hide after 5 seconds
            setTimeout(() => {
                setCurrentSale(null);
            }, 5000);

            // Schedule next one (randomly between 15-30 seconds)
            const nextTime = Math.random() * (30000 - 15000) + 15000;
            setTimeout(triggerNotification, nextTime);
        };

        return () => clearTimeout(initTimer);
    }, []);

    return (
        <AnimatePresence>
            {currentSale !== null && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="fixed bottom-20 md:bottom-4 left-4 z-[35] bg-white p-3 rounded-xl shadow-2xl border border-black/5 flex items-center gap-3 max-w-[280px] md:max-w-[300px]"
                >
                    <div className="relative w-12 h-12 bg-alabaster rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={SALES_DATA[currentSale].image}
                            alt={SALES_DATA[currentSale].product}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-xs font-bold text-charcoal">
                            {SALES_DATA[currentSale].name}, <span className="text-charcoal/60 font-medium">{SALES_DATA[currentSale].location}</span>
                        </h4>
                        <p className="text-xs text-charcoal/80 mt-0.5">
                            <span className="font-bold text-clay">{SALES_DATA[currentSale].product}</span> satın aldı.
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-charcoal/40 font-medium">
                            <CheckCircle size={10} className="text-green-500" />
                            Doğrulanmış Sipariş • {SALES_DATA[currentSale].time}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
