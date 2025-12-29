import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Box } from 'lucide-react';
import Product3DViewer from './product-3d-viewer';

export default function ProductGallery({ images, name, modelUrl }: { images: string[], name: string, modelUrl?: string | null }) {
    const [selected, setSelected] = useState(0);
    const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });

    // Logical list of items: [...images, (optional) model]
    const hasModel = !!modelUrl;
    const totalItems = images.length + (hasModel ? 1 : 0);
    const modelIndex = images.length; // The index of the model, if it exists

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
                        {selected === modelIndex && hasModel ? (
                            <div className="w-full h-full bg-porcelain">
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
                                    "object-cover transition-transform duration-700",
                                    !zoom.show && "group-hover:scale-105"
                                )}
                                priority
                                style={zoom.show ? {
                                    transform: `scale(2)`,
                                    transformOrigin: `${zoom.x}% ${zoom.y}%`
                                } : {}}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {totalItems > 1 && (
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

                    {hasModel && (
                        <button
                            onClick={() => setSelected(modelIndex)}
                            className={cn(
                                "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 flex items-center justify-center bg-porcelain",
                                selected === modelIndex ? 'border-charcoal opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                            )}
                        >
                            <Box size={24} className="text-charcoal" />
                            <span className="absolute bottom-2 text-[8px] font-black uppercase tracking-widest text-charcoal">3D Gör</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
