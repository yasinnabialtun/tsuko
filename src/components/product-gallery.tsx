'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
    const [selected, setSelected] = useState(0);
    const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoom({ x, y, show: true });
    };

    return (
        <div className="space-y-6">
            <div
                className="relative aspect-[4/5] bg-stone-100/50 rounded-[2rem] overflow-hidden group cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoom(prev => ({ ...prev, show: false }))}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selected] || '/images/hero.png'}
                            alt={name}
                            fill
                            className={cn(
                                "object-cover transition-transform duration-700",
                                !zoom.show && "group-hover:scale-105"
                            )}
                            priority
                            style={zoom.show ? {
                                transform: `scale(2)`,
                                transformOrigin: `${zoom.x}% ${zoom.y}%`
                            } : {}}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(index)}
                            className={cn(
                                "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                                selected === index ? 'border-charcoal opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                            )}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
