'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { Box, PlayCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('./product-3d-viewer'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-current/5 rounded-[3rem]">
            <div className="w-10 h-10 border-4 border-clay border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-20">3D Deneyimi Yükleniyor...</p>
        </div>
    )
});

export default function ProductGallery({ images, name, modelUrl }: { images: string[], name: string, modelUrl?: string | null }) {
    const [selected, setSelected] = useState(0);
    const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });

    const hasModel = !!modelUrl;
    const modelIndex = images.length;
    const totalItems = images.length + (hasModel ? 1 : 0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoom({ x, y, show: true });
    };

    return (
        <div className="space-y-8">
            {/* Main Stage */}
            <div
                className="relative aspect-[3/4] bg-current/5 rounded-[3rem] overflow-hidden group border border-current/5 cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoom(prev => ({ ...prev, show: false }))}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full"
                    >
                        {selected === modelIndex && hasModel ? (
                            <div className="w-full h-full bg-transparent">
                                <Product3DViewer modelUrl={modelUrl!} name={name} poster={images[0]} />
                            </div>
                        ) : images[selected]?.match(/\.(mp4|webm|ogg)$/) ? (
                            <video
                                src={images[selected]}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={images[selected] || '/images/hero.png'}
                                alt={name}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-[1.2s] ease-out",
                                    !zoom.show && "group-hover:scale-105"
                                )}
                                priority
                                style={zoom.show ? {
                                    transform: `scale(2.5)`,
                                    transformOrigin: `${zoom.x}% ${zoom.y}%`
                                } : {}}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Video/3D Overlays */}
                {selected !== modelIndex && images[selected]?.match(/\.(mp4|webm|ogg)$/) && (
                    <div className="absolute top-8 right-8 p-4 bg-white/20 backdrop-blur-xl rounded-full text-white pointer-events-none">
                        <PlayCircle size={24} />
                    </div>
                )}
            </div>

            {/* Thumbnails - Architectural Layout */}
            {totalItems > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(index)}
                            className={cn(
                                "relative w-24 h-28 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 active:scale-95",
                                selected === index ? 'border-[var(--mood-accent)] shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'
                            )}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                            {img.match(/\.(mp4|webm|ogg)$/) && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <PlayCircle size={20} className="text-white" />
                                </div>
                            )}
                        </button>
                    ))}

                    {hasModel && (
                        <button
                            onClick={() => setSelected(modelIndex)}
                            className={cn(
                                "relative w-24 h-28 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 flex flex-col items-center justify-center bg-current/5",
                                selected === modelIndex ? 'border-[var(--mood-accent)] shadow-xl' : 'border-transparent opacity-40 hover:opacity-100 text-current/50'
                            )}
                        >
                            <Box size={24} />
                            <span className="mt-2 text-[8px] font-black uppercase tracking-widest">3D MODEL</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
