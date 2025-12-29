'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';



export default function LiveSalesNotification() {
    const [sales, setSales] = useState<any[]>([]);
    const [currentSale, setCurrentSale] = useState<number | null>(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const res = await fetch('/api/orders/public/recent');
                if (res.ok) {
                    const data = await res.json();
                    setSales(data); // If empty, it's empty
                }
            } catch (e) {
                setSales([]);
            }
        };

        fetchSales();

        // Initial delay
        const initTimer = setTimeout(() => {
            triggerNotification();
        }, 5000);

        const triggerNotification = () => {
            setSales(currentSales => {
                if (currentSales.length === 0) return currentSales;

                const randomIdx = Math.floor(Math.random() * currentSales.length);
                setCurrentSale(randomIdx);

                // Hide after 6 seconds
                setTimeout(() => {
                    setCurrentSale(null);
                }, 6000);

                return currentSales;
            });

            // Schedule next one (randomly between 20-40 seconds)
            const nextTime = Math.random() * (40000 - 20000) + 20000;
            setTimeout(triggerNotification, nextTime);
        };

        return () => clearTimeout(initTimer);
    }, []);

    const saleData = currentSale !== null ? sales[currentSale] : null;

    return (
        <AnimatePresence>
            {saleData && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="fixed bottom-20 md:bottom-4 left-4 z-[35] bg-white p-3 rounded-xl shadow-2xl border border-black/5 flex items-center gap-3 max-w-[280px] md:max-w-[300px]"
                >
                    <div className="relative w-12 h-12 bg-alabaster rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={saleData.image}
                            alt={saleData.product}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-grow">
                        <h4 className="text-xs font-bold text-charcoal">
                            {saleData.name}, <span className="text-charcoal/60 font-medium">{saleData.location}</span>
                        </h4>
                        <p className="text-xs text-charcoal/80 mt-0.5">
                            <span className="font-bold text-clay">{saleData.product}</span> satın aldı.
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-charcoal/40 font-medium">
                            <CheckCircle size={10} className="text-green-500" />
                            Doğrulanmış Sipariş • {saleData.time}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
