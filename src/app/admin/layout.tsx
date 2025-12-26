import { LayoutDashboard, ShoppingBag, FileText, Settings, Users, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal text-white fixed h-full hidden md:flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-2xl font-bold tracking-tighter">
                        TSUKO<span className="text-clay">.</span> <span className="text-xs font-normal opacity-50 block mt-1">ADMIN PANEL</span>
                    </h1>
                </div>

                <nav className="flex-grow p-6 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-white font-medium hover:bg-white/20 transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-xl transition-colors hover:text-white">
                        <ShoppingBag size={20} />
                        Ürün Yönetimi
                    </Link>
                    <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-xl transition-colors hover:text-white">
                        <FileText size={20} />
                        Blog Yazıları
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-xl transition-colors hover:text-white">
                        <Users size={20} />
                        Kullanıcılar
                    </Link>
                    <div className="pt-8 mt-8 border-t border-white/10">
                        <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 rounded-xl transition-colors hover:text-white">
                            <Settings size={20} />
                            Ayarlar
                        </Link>
                    </div>
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 text-rose hover:bg-rose/10 w-full rounded-xl transition-colors">
                        <LogOut size={20} />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 flex-grow p-8">
                {children}
            </main>
        </div>
    );
}
