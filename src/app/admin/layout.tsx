'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, ShoppingBag, FileText, Settings, Users, Package, ExternalLink, User, Tag, Mail } from 'lucide-react';
import { Syne } from 'next/font/google';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Panel', href: '/admin' },
    { icon: ShoppingBag, label: 'Ürünler', href: '/admin/products' },
    { icon: Package, label: 'Siparişler', href: '/admin/orders' },
    { icon: Tag, label: 'Kuponlar', href: '/admin/coupons' },
    { icon: FileText, label: 'Blog', href: '/admin/blog' },
    { icon: Users, label: 'Müşteriler', href: '/admin/customers' },
    { icon: Mail, label: 'Aboneler', href: '/admin/subscribers' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/settings' },
];

// Dynamic import for Clerk components
let UserButton: any = null;
let useUser: any = null;

// Check if running on client and Clerk is configured
if (typeof window !== 'undefined') {
    try {
        const clerk = require('@clerk/nextjs');
        UserButton = clerk.UserButton;
        useUser = clerk.useUser;
    } catch (e) {
        // Clerk not available
    }
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    // Try to use Clerk if available
    let user = null;
    let isLoaded = true;
    if (useUser) {
        try {
            const clerkUser = useUser();
            user = clerkUser.user;
            isLoaded = clerkUser.isLoaded;
        } catch (e) {
            // Clerk not configured
        }
    }

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

                {/* User Info - Only show if Clerk is configured and user is loaded */}
                {isLoaded && user && UserButton && (
                    <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-3">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: 'w-10 h-10'
                                }
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-charcoal text-sm truncate">
                                {user.firstName || user.emailAddresses[0]?.emailAddress?.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {user.emailAddresses[0]?.emailAddress}
                            </p>
                        </div>
                    </div>
                )}

                {/* Fallback user info when Clerk is not configured */}
                {!user && (
                    <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center">
                            <User size={20} className="text-clay" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-charcoal text-sm">Admin</p>
                            <p className="text-xs text-gray-400">Yönetici Paneli</p>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    <div className="px-4 pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Yönetim</div>
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                     ${isActive
                                        ? 'bg-charcoal text-white shadow-lg shadow-charcoal/20'
                                        : 'text-gray-500 hover:bg-alabaster hover:text-charcoal'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-charcoal'} />
                                <span className="font-medium">{item.label}</span>
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
