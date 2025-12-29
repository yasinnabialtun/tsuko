'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Users, Activity, ShoppingBag, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Dynamically import globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-clay border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 font-mono uppercase tracking-widest">Başlatılıyor...</p>
            </div>
        </div>
    )
});

export default function LiveViewPage() {
    const [points, setPoints] = useState<any[]>([]);
    const [stats, setStats] = useState({ active: 0, orders: 0, revenue: 0 });
    const [activities, setActivities] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const globeRef = useRef<any>(null);

    // Initial camera position centered on Turkey/Europe region
    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.6;
            globeRef.current.pointOfView({ lat: 39, lng: 35, altitude: 2.5 });
        }
    }, [points]); // Re-adjust if needed, or just once

    // Simulate/Fetch Data
    const fetchData = async () => {
        try {
            const res = await fetch('/api/analytics/live');
            if (res.ok) {
                const data = await res.json();

                setPoints((data.sessions || []).map((p: any) => ({
                    ...p,
                    alt: 0.1 + Math.random() * 0.1, // Random altitude for "pulse" effect
                    radius: 0.5
                })));

                setStats(data.stats || { active: 0, orders: 0, revenue: 0 });
                setActivities(data.activities || []);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
            {/* Header / Nav */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-start pointer-events-none">
                <Link
                    href="/admin"
                    className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-sm font-bold hover:bg-white/20 transition-all border border-white/5"
                >
                    <ArrowLeft size={16} />
                    Panele Dön
                </Link>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase">CANLI YAYIN</span>
                </div>
            </div>

            {/* Stats Overlay - Left */}
            <div className="absolute top-24 left-6 z-20 space-y-4 pointer-events-none max-w-sm">
                <div className="bg-black/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2 text-white/50">
                        <Users size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Aktif Ziyaretçi</span>
                    </div>
                    <div className="text-6xl font-black text-white tracking-tighter">
                        {stats.active}
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-clay w-[20%] animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 backdrop-blur-xl p-5 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1 text-white/50">
                            <ShoppingBag size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Sipariş (Bugün)</span>
                        </div>
                        <div className="text-2xl font-bold">{stats.orders}</div>
                    </div>
                    <div className="bg-black/50 backdrop-blur-xl p-5 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1 text-white/50">
                            <DollarSign size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Ciro (Bugün)</span>
                        </div>
                        <div className="text-2xl font-bold">₺{stats.revenue}</div>
                    </div>
                </div>
            </div>

            {/* Events Overlay - Right */}
            <div className="absolute bottom-12 right-6 z-20 pointer-events-none w-80">
                <div className="space-y-2">
                    {activities.map((act, i) => (
                        <div key={`act-${i}`} className="bg-clay/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 animate-slide-in-right">
                            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                            <div>
                                <p className="text-sm font-bold">{act.city || 'Müşteri'}</p>
                                <p className="text-xs text-white/90">
                                    {act.type === 'CART_ADD' ? (
                                        <>Sepete ekledi: <span className="font-bold">{act.productName}</span></>
                                    ) : (
                                        'Harekete geçti'
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                    {points.map((p, i) => (
                        <div key={`ses-${i}`} className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/5 flex items-center gap-4 animate-slide-in-right">
                            <div className="w-2 h-2 rounded-full bg-clay shadow-[0_0_10px_#FF6B35]" />
                            <div>
                                <p className="text-sm font-bold">{p.city || 'Ziyaretçi'}, {p.country || 'Turkey'}</p>
                                <p className="text-xs text-white/40">Şu an koleksiyonu inceliyor.</p>
                            </div>
                        </div>
                    )).slice(0, 3)}
                </div>
            </div>

            {/* The Globe */}
            <div className="absolute inset-0 z-10">
                {isMounted && (
                    <Globe
                        ref={globeRef}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                        atmosphereColor="#7caeea"
                        atmosphereAltitude={0.2}
                        pointsData={points}
                        pointColor={() => "#FF6B35"}
                        pointAltitude="alt"
                        pointRadius="radius"
                        pointsMerge={true}
                        pointResolution={2} // quality
                    />
                )}
            </div>

            {/* Gradient Overlay for Cinematic Look */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
}
