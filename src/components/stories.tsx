'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORIES = [
    {
        id: 1,
        title: 'Atölye',
        thumbnail: '/images/products/nami.png', // Placeholder
        mediaUrl: '/images/hero.png', // Placeholder for "video/image"
        type: 'image',
        caption: 'Her katmanda hassas işçilik. 🛠️'
    },
    {
        id: 2,
        title: 'Paketleme',
        thumbnail: '/images/products/mantar.png',
        mediaUrl: '/images/products/mantar.png',
        type: 'image',
        caption: 'Kırılmaz, doğa dostu paketleme. 📦'
    },
    {
        id: 3,
        title: 'Sizden Gelenler',
        thumbnail: '/images/products/kaya.png',
        mediaUrl: '/images/products/kaya.png',
        type: 'image',
        caption: '@ahmetin_evi teşekkürler! Harika durmuş. ✨'
    }
];

export default function Stories() {
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

    // Auto-advance logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (activeStoryIndex !== null) {
            setProgress(0);
            const duration = 5000; // 5 seconds per story
            const interval = 50; // update often for smooth bar

            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        handleNext();
                        return 0;
                    }
                    return prev + (100 / (duration / interval));
                });
            }, interval);
        }
        return () => clearInterval(timer);
    }, [activeStoryIndex]);

    const handleNext = () => {
        if (activeStoryIndex !== null && activeStoryIndex < STORIES.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
        } else {
            closeStory();
        }
    };

    const handlePrev = () => {
        if (activeStoryIndex !== null && activeStoryIndex > 0) {
            setActiveStoryIndex(activeStoryIndex - 1);
        }
    };

    const closeStory = () => {
        setActiveStoryIndex(null);
        setProgress(0);
    };

    return (
        <section className="py-8 bg-white border-b border-black/5 overflow-x-auto no-scrollbar md:justify-center flex">
            <div className="flex gap-6 px-6 min-w-max mx-auto">
                {STORIES.map((story, index) => (
                    <button
                        key={story.id}
                        onClick={() => setActiveStoryIndex(index)}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                        <div className={`w-20 h-20 rounded-full p-[3px] ${index === activeStoryIndex ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600 group-hover:scale-105 transition-transform'}`}>
                            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                                <Image src={story.thumbnail} alt={story.title} fill className="object-cover" />
                            </div>
                        </div>
                        <span className="text-xs font-bold text-charcoal truncate max-w-[80px]">{story.title}</span>
                    </button>
                ))}
            </div>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {activeStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
                    >
                        <button
                            onClick={closeStory}
                            className="absolute top-6 right-6 text-white/50 hover:text-white z-50"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md h-full md:h-[80vh] bg-black rounded-none md:rounded-3xl overflow-hidden flex flex-col"
                        >
                            {/* Progress Bar Container */}
                            <div className="absolute top-0 left-0 right-0 p-2 z-20 flex gap-1">
                                {STORIES.map((_, idx) => (
                                    <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white transition-all duration-100 ease-linear"
                                            style={{
                                                width: activeStoryIndex === idx ? `${progress}%` : (idx < (activeStoryIndex || 0) ? '100%' : '0%')
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Header Info */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-3 mt-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                                    <Image src="/images/products/nami.png" alt="Avatar" width={32} height={32} />
                                </div>
                                <span className="text-white font-bold text-sm shadow-black drop-shadow-md">Tsuko Design</span>
                                <span className="text-white/60 text-xs">• {activeStory.title}</span>
                            </div>

                            {/* Main Content */}
                            <div className="flex-grow relative" onClick={handleNext}> {/* Click Image to Next */}
                                <Image
                                    src={activeStory.mediaUrl}
                                    alt={activeStory.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                                {/* Caption */}
                                <div className="absolute bottom-10 left-6 right-6 z-20 text-center">
                                    <p className="text-white font-medium text-lg drop-shadow-md">{activeStory.caption}</p>
                                </div>
                            </div>

                            {/* Navigation Zones (Invisible) */}
                            <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                            <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={(e) => { e.stopPropagation(); handleNext(); }} />

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
