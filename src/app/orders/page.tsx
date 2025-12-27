
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Package, Truck, CheckCircle, Clock, ChevronRight, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
        return (
            <main className="min-h-screen bg-alabaster">
                <Navbar />
                <div className="pt-32 pb-20 px-6 container mx-auto text-center">
                    <p>E-posta adresi bulunamadı.</p>
                </div>
                <Footer />
            </main>
        );
    }

    // Fetch orders for this user by email
    const orders = await prisma.order.findMany({
        where: {
            customerEmail: email
        },
        orderBy: { createdAt: 'desc' },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'PENDING':
                return { label: 'Hazırlanıyor', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
            case 'PROCESSING':
                return { label: 'İşleniyor', color: 'bg-blue-100 text-blue-700', icon: Package };
            case 'SHIPPED':
                return { label: 'Kargoda', color: 'bg-purple-100 text-purple-700', icon: Truck };
            case 'DELIVERED':
                return { label: 'Teslim Edildi', color: 'bg-green-100 text-green-700', icon: CheckCircle };
            case 'CANCELLED':
                return { label: 'İptal Edildi', color: 'bg-red-100 text-red-700', icon: AlertCircle };
            default:
                return { label: status, color: 'bg-gray-100 text-gray-700', icon: Clock };
        }
    };

    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            <div className="pt-40 pb-24 px-6 container mx-auto max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-charcoal mb-4">Siparişlerim</h1>
                    <p className="text-charcoal/60">Geçmiş siparişlerinizi ve durumlarını buradan takip edebilirsiniz.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-black/5 shadow-sm">
                        <div className="w-16 h-16 bg-alabaster rounded-full flex items-center justify-center mx-auto mb-6 text-charcoal/30">
                            <Package size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal mb-2">Henüz Siparişiniz Yok</h2>
                        <p className="text-charcoal/50 mb-8 max-w-md mx-auto">
                            Henüz bir sipariş vermediniz. Koleksiyonumuza göz atarak alışverişe başlayabilirsiniz.
                        </p>
                        <Link href="/#collection" className="inline-flex bg-charcoal text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors">
                            Alışverişe Başla
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const status = getStatusConfig(order.status);
                            const StatusIcon = status.icon;

                            return (
                                <div key={order.id} className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Order Header */}
                                    <div className="bg-gray-50/50 p-6 flex flex-wrap gap-6 items-center justify-between border-b border-black/5">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Sipariş No</p>
                                                <p className="font-mono font-bold text-charcoal">{order.orderNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Tarih</p>
                                                <p className="text-sm font-medium text-charcoal">
                                                    {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">Tutar</p>
                                                <p className="font-bold text-charcoal">{order.totalAmount.toString()} ₺</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold ${status.color}`}>
                                                <StatusIcon size={14} />
                                                {status.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-alabaster rounded-lg overflow-hidden relative flex-shrink-0">
                                                        {/* Simple image placeholder logic since item doesn't store image directly, rely on product relation */}
                                                        {/* Note: In a real app, OrderItem should probably snapshot the image too, or use product.images[0] */}
                                                        {item.product?.images?.[0] ? (
                                                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                                                                <Package size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h4 className="font-bold text-charcoal">{item.product.name}</h4>
                                                        <p className="text-sm text-charcoal/50">
                                                            {item.quantity} adet x {item.price.toString()} ₺
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <Link
                                                            href={`/product/${item.product.slug}`}
                                                            className="text-xs font-bold text-clay hover:text-charcoal transition-colors"
                                                        >
                                                            Ürünü Gör
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Footer / Tracking */}
                                        {order.trackingNumber && (
                                            <div className="mt-6 pt-6 border-t border-black/5 flex items-center gap-3">
                                                <Truck size={18} className="text-charcoal/40" />
                                                <p className="text-sm text-charcoal/70">
                                                    Kargo Takip No: <span className="font-mono font-bold text-charcoal">{order.trackingNumber}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
