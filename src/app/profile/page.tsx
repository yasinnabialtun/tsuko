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
        // Updated to use Dopamine Decor Colors
        const styles: Record<string, string> = {
            PENDING: "bg-[var(--color-yellow)] text-black border-2 border-black",
            PREPARING: "bg-[var(--color-blue)] text-black border-2 border-black",
            SHIPPED: "bg-[var(--color-purple)] text-white border-2 border-black",
            DELIVERED: "bg-[var(--color-green)] text-black border-2 border-black",
            CANCELLED: "bg-[var(--color-red)] text-white border-2 border-black",
        };
        const labels: Record<string, string> = {
            PENDING: "Bekleniyor",
            PREPARING: "Hazırlanıyor",
            SHIPPED: "Kargoda",
            DELIVERED: "Teslim Edildi",
            CANCELLED: "İptal Edildi",
        };
        return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[status] || styles.PENDING} shadow-[2px_2px_0px_black]`}>{labels[status] || status}</span>;
    };

    return (
        <main className="min-h-screen bg-[var(--color-sand)]">
            <Navbar />

            <section className="pt-32 pb-24 px-6 md:px-0">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Sidebar */}
                        <aside className="w-full md:w-80 space-y-4">
                            <div className="bg-white p-8 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_black]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-[var(--color-purple)] border-2 border-black flex items-center justify-center overflow-hidden shrink-0">
                                        {user?.imageUrl ? (
                                            <img src={user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={32} className="text-white" />
                                        )}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h2 className="font-black text-charcoal leading-none mb-1 truncate">{user?.firstName} {user?.lastName}</h2>
                                        <p className="text-xs text-charcoal/40 font-bold uppercase tracking-widest truncate">{user?.emailAddresses[0].emailAddress}</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    {[
                                        { icon: Package, label: "Siparişlerim", href: "/profile", active: true },
                                        { icon: MapPin, label: "Adreslerim", href: "/profile/addresses", active: false },
                                        { icon: Settings, label: "Hesap Ayarları", href: "/user-profile", active: false },
                                    ].map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-black uppercase tracking-wide border-2 border-black transition-all ${item.active
                                                ? 'bg-black text-white shadow-[4px_4px_0px_var(--color-yellow)] -translate-y-1'
                                                : 'bg-white text-black hover:bg-[var(--color-yellow)] hover:shadow-[4px_4px_0px_black] hover:-translate-y-1'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={18} strokeWidth={2.5} />
                                                {item.label}
                                            </div>
                                            <ChevronRight size={16} strokeWidth={3} className={item.active ? 'opacity-100' : 'opacity-0'} />
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="bg-[var(--color-pink)] p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_black] text-black overflow-hidden relative group">
                                <div className="relative z-10">
                                    <h3 className="font-black text-xl mb-2 uppercase tracking-tight">Elite Üye</h3>
                                    <p className="text-xs font-bold leading-relaxed mb-4">Size özel %10 indirim kodunuz: <span className="font-black bg-white px-2 py-0.5 border border-black rounded">ELITE10</span></p>
                                    <Link href="/collection" className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-4 py-3 rounded-xl border-2 border-black hover:bg-white hover:text-black transition-all inline-block shadow-[2px_2px_0px_white]">Alışverişe Başla</Link>
                                </div>
                                <ShieldCheck size={120} className="absolute -right-4 -bottom-4 text-black/10 rotate-12 group-hover:rotate-6 transition-transform" />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 space-y-8">

                            {/* Stats Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_black] hover:-translate-y-1 transition-transform">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-2">Toplam Sipariş</p>
                                    <p className="text-4xl font-black text-black">{orders.length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_black] hover:-translate-y-1 transition-transform">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-2">Teslim Edilen</p>
                                    <p className="text-4xl font-black text-[var(--color-green)]">{orders.filter(o => o.status === 'DELIVERED').length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_black] hover:-translate-y-1 transition-transform hidden md:block">
                                    <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-2">Aktif Sipariş</p>
                                    <p className="text-4xl font-black text-[var(--color-purple)]">{orders.filter(o => ['PENDING', 'PREPARING', 'SHIPPED'].includes(o.status)).length}</p>
                                </div>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Sipariş Geçmişi</h2>
                                </div>

                                {orders.length === 0 ? (
                                    <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-black shadow-[6px_6px_0px_black]">
                                        <div className="w-24 h-24 bg-[var(--color-yellow)] rounded-full border-2 border-black flex items-center justify-center mx-auto mb-6 text-black shadow-[4px_4px_0px_black]">
                                            <Package size={40} strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Henüz siparişin yok.</h3>
                                        <p className="text-charcoal/60 text-sm mb-8 font-medium">Koleksiyonumuza göz atıp ilk siparişini vermeye ne dersin?</p>
                                        <Link href="/collection" className="bg-black text-white px-8 py-4 rounded-xl border-2 border-black font-black uppercase tracking-widest hover:bg-[var(--color-purple)] hover:shadow-[4px_4px_0px_black] hover:-translate-y-1 transition-all inline-block">Mağazayı Gez</Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-[2rem] border-2 border-black overflow-hidden group shadow-[4px_4px_0px_black] hover:shadow-[6px_6px_0px_black] hover:-translate-y-1 transition-all">
                                                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h4 className="font-black text-xl text-black tracking-tight">#{order.orderNumber}</h4>
                                                            {getStatusBadge(order.status)}
                                                        </div>
                                                        <p className="text-xs font-bold text-charcoal/40 flex items-center gap-2 uppercase tracking-wider">
                                                            <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                                        </p>
                                                    </div>

                                                    <div className="flex -space-x-4 pl-2">
                                                        {order.items.slice(0, 3).map((item, i) => (
                                                            <div key={i} className="w-14 h-14 rounded-full border-2 border-black overflow-hidden bg-white relative shadow-sm hover:scale-110 transition-transform z-0 hover:z-10">
                                                                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                        {order.items.length > 3 && (
                                                            <div className="w-14 h-14 rounded-full border-2 border-black bg-[var(--color-yellow)] flex items-center justify-center text-xs font-black text-black z-0">
                                                                +{order.items.length - 3}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="text-left md:text-right">
                                                        <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-widest mb-1">Toplam Tutar</p>
                                                        <p className="text-2xl font-black text-black">{order.totalAmount.toString()} ₺</p>
                                                    </div>

                                                    <Link
                                                        href={`/order-tracking?orderId=${order.orderNumber}`}
                                                        className="w-full md:w-auto px-6 py-3 bg-white text-black border-2 border-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all text-center shadow-[2px_2px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
