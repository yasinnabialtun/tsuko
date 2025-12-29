import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import { Package, MapPin, User, Settings, LogOut, ChevronRight, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { Prisma } from '@prisma/client';

type OrderWithItems = Prisma.OrderGetPayload<{
    include: { items: { include: { product: true } } }
}>;

async function getUserOrders(userId: string): Promise<OrderWithItems[]> {
    return await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    }) as unknown as OrderWithItems[];
}

async function getUserAddresses(userId: string) {
    return await prisma.userAddress.findMany({
        where: { userId },
        orderBy: { isDefault: 'desc' }
    });
}

export default async function ProfilePage() {
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in?redirect_url=/profile');
    }

    const user = await currentUser();
    const orders = await getUserOrders(userId);
    const addresses = await getUserAddresses(userId);

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            PENDING: "bg-orange-50 text-orange-600 border-orange-100",
            PREPARING: "bg-blue-50 text-blue-600 border-blue-100",
            SHIPPED: "bg-purple-50 text-purple-600 border-purple-100",
            DELIVERED: "bg-green-50 text-green-600 border-green-100",
            CANCELLED: "bg-red-50 text-red-600 border-red-100",
        };
        const labels: Record<string, string> = {
            PENDING: "Bekleniyor",
            PREPARING: "Hazırlanıyor",
            SHIPPED: "Kargoda",
            DELIVERED: "Teslim Edildi",
            CANCELLED: "İptal Edildi",
        };
        return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>{labels[status]}</span>;
    };

    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-0">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Sidebar */}
                        <aside className="w-full md:w-80 space-y-4">
                            <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-clay/10 flex items-center justify-center overflow-hidden">
                                        {user?.imageUrl ? (
                                            <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-clay" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-black text-charcoal leading-none mb-1">{user?.firstName} {user?.lastName}</h2>
                                        <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest">{user?.emailAddresses[0].emailAddress}</p>
                                    </div>
                                </div>

                                <nav className="space-y-1">
                                    {[
                                        { icon: Package, label: "Siparişlerim", href: "/profile", active: true },
                                        { icon: MapPin, label: "Adreslerim", href: "/profile/addresses", active: false },
                                        { icon: Settings, label: "Hesap Ayarları", href: "/user-profile", active: false },
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${item.active ? 'bg-charcoal text-white shadow-xl shadow-charcoal/20' : 'text-charcoal/60 hover:bg-black/5'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} />
                                                {item.label}
                                            </div>
                                            <ChevronRight size={16} className={item.active ? 'opacity-100' : 'opacity-0'} />
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="bg-clay p-6 rounded-[2rem] text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="font-black text-lg mb-2">Elite Üye</h3>
                                    <p className="text-xs text-white/80 font-medium leading-relaxed mb-4">Size özel %10 indirim kodunuz: <span className="font-black">ELITE10</span></p>
                                    <Link href="/collection" className="text-[10px] font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-all inline-block">Alışverişe Başla</Link>
                                </div>
                                <ShieldCheck size={120} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 space-y-8">

                            {/* Stats Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-3xl border border-black/5">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">Toplam Sipariş</p>
                                    <p className="text-2xl font-black text-charcoal">{orders.length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-black/5">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">Teslim Edilen</p>
                                    <p className="text-2xl font-black text-clay">{orders.filter(o => o.status === 'DELIVERED').length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-black/5 hidden md:block">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">Aktif Sipariş</p>
                                    <p className="text-2xl font-black text-mauve">{orders.filter(o => ['PENDING', 'PREPARING', 'SHIPPED'].includes(o.status)).length}</p>
                                </div>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-xl font-black text-charcoal uppercase tracking-tighter">Sipariş Geçmişi</h2>
                                </div>

                                {orders.length === 0 ? (
                                    <div className="bg-white p-20 rounded-[3rem] text-center border border-black/5">
                                        <div className="w-20 h-20 bg-porcelain rounded-full flex items-center justify-center mx-auto mb-6 text-charcoal/20">
                                            <Package size={40} />
                                        </div>
                                        <h3 className="text-xl font-black text-charcoal mb-2">Henüz siparişin yok.</h3>
                                        <p className="text-charcoal/40 text-sm mb-8">Koleksiyonumuza göz atıp ilk siparişini vermeye ne dersin?</p>
                                        <Link href="/collection" className="bg-charcoal text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all inline-block shadow-lg">Mağazayı Gez</Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-[2rem] border border-black/5 overflow-hidden group hover:shadow-xl hover:shadow-black/[0.02] transition-all">
                                                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <h4 className="font-black text-lg text-charcoal tracking-tight">#{order.orderNumber}</h4>
                                                            {getStatusBadge(order.status)}
                                                        </div>
                                                        <p className="text-xs font-bold text-charcoal/30 flex items-center gap-2">
                                                            <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                                        </p>
                                                    </div>

                                                    <div className="flex -space-x-3">
                                                        {order.items.slice(0, 3).map((item, i) => (
                                                            <div key={i} className="w-12 h-12 rounded-xl border-2 border-white overflow-hidden bg-porcelain relative shadow-sm">
                                                                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                        {order.items.length > 3 && (
                                                            <div className="w-12 h-12 rounded-xl border-2 border-white bg-alabaster flex items-center justify-center text-[10px] font-black text-charcoal shadow-sm">
                                                                +{order.items.length - 3}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="text-left md:text-right">
                                                        <p className="text-[10px] font-black text-charcoal/30 uppercase tracking-widest mb-1">Toplam Tutar</p>
                                                        <p className="text-xl font-black text-charcoal">{order.totalAmount.toString()} ₺</p>
                                                    </div>

                                                    <Link
                                                        href={`/order-tracking?orderId=${order.orderNumber}`}
                                                        className="w-full md:w-auto px-6 py-3 bg-porcelain text-charcoal text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all text-center"
                                                    >
                                                        Detaylar
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
