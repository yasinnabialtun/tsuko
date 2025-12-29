'use client';

import { Activity, Database, Mail, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemPulse() {
    const services = [
        { name: 'Veri Tabanı', status: 'Healthy', icon: Database, latency: '4ms', color: 'bg-green-500' },
        { name: 'Shopier API', status: 'Active', icon: Globe, latency: '112ms', color: 'bg-green-500' },
        { name: 'Email Servisi', status: 'Active', icon: Mail, latency: '45ms', color: 'bg-green-500' },
        { name: 'Sistem Yükü', status: '%12', icon: Cpu, latency: 'Normal', color: 'bg-clay' }
    ];

    return (
        <div className="bg-charcoal text-white rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <h3 className="text-xl font-bold">Sistem Sağlığı</h3>
                </div>
                <Activity size={20} className="text-white/20 group-hover:text-green-500 transition-colors" />
            </div>

            <div className="space-y-6 relative z-10">
                {services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-lg text-white/40 group-hover/item:text-white transition-colors">
                                <service.icon size={18} />
                            </div>
                            <div>
                                <div className="text-sm font-bold">{service.name}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-widest">{service.status}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-mono text-white/60">{service.latency}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-clay rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            </div>
        </div>
    );
}
