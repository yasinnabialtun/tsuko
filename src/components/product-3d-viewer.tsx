'use client';

import { useState } from 'react';
import { Box, Maximize2, Rotate3d, Smartphone } from 'lucide-react';
import SafeHydrate from './safe-hydrate';

interface Props {
    modelUrl?: string; // .glb file
    poster?: string;   // Image while loading
    name: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': any;
        }
    }
}

export default function Product3DViewer({ modelUrl, poster, name }: Props) {
    const [loading, setLoading] = useState(true);

    if (!modelUrl) {
        // Fallback or Placeholder for products without a 3D model
        return (
            <div className="aspect-square bg-porcelain rounded-3xl flex flex-col items-center justify-center text-charcoal/20 border border-black/5">
                <Box size={60} strokeWidth={1} className="mb-4" />
                <p className="text-xs font-black uppercase tracking-[0.2em]">3D Model Hazırlanıyor</p>
            </div>
        );
    }

    return (
        <SafeHydrate>
            <div className="relative aspect-square bg-porcelain rounded-[2.5rem] overflow-hidden border border-black/5 group">
                <model-viewer
                    src={modelUrl}
                    poster={poster}
                    alt={name}
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                    onLoading={() => setLoading(false)}
                >
                    {/* AR Button Customization */}
                    <button slot="ar-button" className="absolute bottom-6 right-6 bg-charcoal text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-black transition-all z-10">
                        <Smartphone size={16} />
                        Odanda Gör (AR)
                    </button>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-porcelain">
                            <div className="w-10 h-10 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </model-viewer>

                {/* Interaction Hints */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/80 backdrop-blur-md p-2 rounded-lg border border-black/5 text-charcoal shadow-sm">
                        <Rotate3d size={16} />
                    </div>
                    <div className="bg-white/80 backdrop-blur-md p-2 rounded-lg border border-black/5 text-charcoal shadow-sm">
                        <Maximize2 size={16} />
                    </div>
                </div>
            </div>
        </SafeHydrate>
    );
}
