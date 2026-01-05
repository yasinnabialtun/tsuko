'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Maximize2, Rotate3d, Smartphone } from 'lucide-react';
import SafeHydrate from './safe-hydrate';

interface Props {
    modelUrl?: string; // .glb file
    poster?: string;   // Image while loading
    name: string;
}

export default function Product3DViewer({ modelUrl, poster, name }: Props) {
    const [loading, setLoading] = useState(true);
    const viewerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const viewer = viewerRef.current;
        if (!viewer) return;

        const handleLoad = () => setLoading(false);
        viewer.addEventListener('load', handleLoad);
        return () => viewer.removeEventListener('load', handleLoad);
    }, [modelUrl]);

    if (!modelUrl) {
        return (
            <div className="aspect-square bg-[var(--color-sand)] rounded-3xl flex flex-col items-center justify-center text-black/20 border-4 border-black border-dashed">
                <Box size={60} strokeWidth={1.5} className="mb-4" />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40">3D Model Hazırlanıyor</p>
            </div>
        );
    }

    const ModelViewer = 'model-viewer' as any;

    return (
        <SafeHydrate>
            <div className="relative aspect-square bg-[var(--color-sand)] rounded-[2rem] overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
                <ModelViewer
                    ref={viewerRef as any}
                    src={modelUrl}
                    poster={poster}
                    alt={name}
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' } as any}
                >
                    {/* AR Button Customization */}
                    <button slot="ar-button" className="absolute bottom-6 right-6 bg-[var(--color-green)] text-black border-2 border-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[var(--color-pink)] hover:text-white transition-all z-10 active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <Smartphone size={20} />
                        Odanda Gör (AR)
                    </button>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-sand)] z-20">
                            <div className="w-12 h-12 border-4 border-black border-t-[var(--color-yellow)] rounded-full animate-spin"></div>
                        </div>
                    )}
                </ModelViewer>

                {/* Interaction Hints */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white p-3 rounded-xl border-2 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-3">
                        <Rotate3d size={20} strokeWidth={2.5} />
                    </div>
                    <div className="bg-white p-3 rounded-xl border-2 border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                        <Maximize2 size={20} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Decoration */}
                <div className="absolute top-4 right-4 bg-[var(--color-purple)] text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black -rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pointer-events-none">
                    3D
                </div>
            </div>
        </SafeHydrate>
    );
}
