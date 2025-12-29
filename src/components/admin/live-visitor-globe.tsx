'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center bg-charcoal rounded-3xl">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Dünya Yükleniyor...</p>
            </div>
        </div>
    )
});

export default function LiveVisitorGlobe() {
    const [points, setPoints] = useState<any[]>([]);
    const [liveCount, setLiveCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const globeRef = useRef<any>(null);

    const fetchLiveSessions = async () => {
        try {
            const res = await fetch('/api/analytics/live');
            if (res.ok) {
                const data = await res.json();
                setPoints(data.map((p: any) => ({
                    ...p,
                    size: 0.5,
                    color: '#FF6B35' // Clay color
                })));
                setLiveCount(data.length);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchLiveSessions();
        const interval = setInterval(fetchLiveSessions, 15000); // 15s updates
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            // Auto-rotate
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.5;
            // Set initial camera
            globeRef.current.pointOfView({ lat: 39, lng: 35, altitude: 2 });
        }
    }, [points.length]);

    return (
        <div className="bg-charcoal rounded-3xl p-8 shadow-2xl overflow-hidden relative border border-white/5">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <h3 className="text-white font-bold text-lg">Canlı Ziyaretçiler</h3>
                    </div>
                    <p className="text-white/40 text-sm">Şu anda sitede olan kullanıcılar</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black text-white">{liveCount}</div>
                    <div className="text-[10px] font-bold text-clay uppercase tracking-widest">Aktif Seans</div>
                </div>
            </div>

            <div className="h-[400px] -mx-8 -mb-8 relative grayscale-[0.2]">
                {isMounted && (
                    <Globe
                        ref={globeRef}
                        backgroundColor="rgba(0,0,0,0)"
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        pointsData={points}
                        pointColor="color"
                        pointAltitude={0.05}
                        pointRadius="size"
                        pointsMerge={true}
                        pointLabel={(d: any) => `${d.city}, ${d.country}`}
                        atmosphereColor="#FF6B35"
                        atmosphereAltitude={0.15}
                    />
                )}
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-8 z-10 hidden md:block">
                <div className="space-y-4">
                    {points.slice(0, 3).map((p, i) => (
                        <div key={i} className="flex items-center gap-3 animate-fade-in">
                            <div className="w-1.5 h-1.5 bg-clay rounded-full" />
                            <p className="text-xs text-white/60 font-medium">
                                <span className="text-white">{p.city}</span> bölgesinden bir ziyaretçi katıldı.
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Grain/Fog Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.05)_0%,rgba(0,0,0,0)_70%)]" />
        </div>
    );
}
