'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, ShoppingBag, FileText, Settings, Users, Package, ExternalLink, User, Tag, Mail, MessageCircle, Bell, LogOut, Activity } from 'lucide-react';
import { Syne } from 'next/font/google';
import { motion } from 'framer-motion';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Panel', href: '/admin' },
    { icon: Activity, label: 'Canlı Yayın', href: '/admin/live' },
    { icon: ShoppingBag, label: 'Ürünler', href: '/admin/products' },
    { icon: Package, label: 'Siparişler', href: '/admin/orders' },
    { icon: Tag, label: 'Kuponlar', href: '/admin/coupons' },
    { icon: Users, label: 'Affiliate', href: '/admin/affiliates' },
    { icon: FileText, label: 'Blog', href: '/admin/blog' },
    { icon: MessageCircle, label: 'Yorumlar', href: '/admin/reviews' },
    { icon: Bell, label: 'Bildirimler', href: '/admin/notifications' },
    { icon: Users, label: 'Müşteriler', href: '/admin/customers' },
    { icon: Mail, label: 'Aboneler', href: '/admin/subscribers' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/settings' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <div className={`min-h-screen bg-[#FDFBF7] flex font-sans ${syne.variable}`}>
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-[#E6E8E6] flex flex-col fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">

                {/* Logo Area */}
                <div className="h-24 flex items-center px-8 border-b border-[#F0F0F0]">
                    <div className="relative w-28 h-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                        <Image src="/logo.png" alt="Tsuko Admin" fill className="object-contain object-left" />
                    </div>
                    <div className="ml-2 px-2 py-0.5 bg-clay/10 text-clay text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Admin
                    </div>
                </div>

                {/* Info */}
                <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center">
                        <User size={20} className="text-clay" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-charcoal text-sm">Yönetici</p>
                        <p className="text-xs text-gray-400">Pannel Şifre Korumalı</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="px-4 pb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Yönetim</div>
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                                    ${isActive
                                        ? 'bg-charcoal text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)] scale-[1.02]'
                                        : 'text-gray-500 hover:bg-alabaster hover:text-charcoal'
                                    }`}
                            >
                                <item.icon size={18} className={`${isActive ? 'text-clay' : 'text-gray-400 group-hover:text-charcoal group-hover:scale-110'} transition-transform duration-300`} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-clay"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-[#F0F0F0] space-y-2">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-charcoal hover:bg-alabaster rounded-xl transition-colors">
                        <ExternalLink size={18} />
                        Siteyi Görüntüle
                    </Link>
                    <button
                        onClick={async () => {
                            await fetch('/api/admin/logout', { method: 'POST' });
                            window.location.href = '/admin/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72 p-8 lg:p-12">
                <div className="max-w-6xl mx-auto animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
}
