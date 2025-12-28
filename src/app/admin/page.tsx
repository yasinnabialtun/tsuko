
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SalesChart from '@/components/admin/sales-chart';

async function getStats() {
    try {
        const productCount = await prisma.product.count();
        const orderCount = await prisma.order.count();
        const totalRevenue = await prisma.order.aggregate({
            _sum: { totalAmount: true }
        });
        const subscriberCount = await prisma.subscriber.count();

        // Calculate growth (mocked for now as we don't have historical snapshots easily, 
        // but we can compare this month vs last if we wanted more complexity)

        return [
            {
                label: 'Toplam Ciro',
                value: `₺${Number(totalRevenue._sum.totalAmount || 0).toLocaleString('tr-TR')}`,
                change: '+%12',
                trend: 'up',
                icon: DollarSign,
                desc: 'Gerçek zamanlı veri'
            },
            {
                label: 'Toplam Sipariş',
                value: orderCount.toString(),
                change: '+%5',
                trend: 'up',
                icon: ShoppingBag,
                desc: 'Sistemdeki tüm siparişler'
            },
            {
                label: 'Toplam Ürün',
                value: productCount.toString(),
                change: '+%2',
                trend: 'up',
                icon: TrendingUp,
                desc: 'Envanter büyüklüğü'
            },
            {
                label: 'Aboneler',
                value: subscriberCount.toString(),
                change: '+%18',
                trend: 'up',
                icon: Users,
                desc: 'Newsletter kitlesi'
            }
        ];
    } catch (e) {
        return [];
    }
}

export default async function AdminDashboard() {
    const STATS = await getStats();

    // Recent orders fetch
    const RECENT_ORDERS = await prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' }
    }).catch(() => []);

    // Get real sales data for the last 7 days
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const salesByDay = await Promise.all(last7Days.map(async (date) => {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        const dailyTotal = await prisma.order.aggregate({
            where: {
                createdAt: {
                    gte: start,
                    lt: end
                }
            },
            _sum: { totalAmount: true }
        });

        return {
            name: new Date(date).toLocaleDateString('tr-TR', { weekday: 'short' }),
            total: Number(dailyTotal._sum.totalAmount || 0)
        };
    }));

    const chartData = salesByDay;

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-charcoal mb-2">Genel Bakış</h1>
                    <p className="text-charcoal/60">İşletmenizin anlık performans metrikleri.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/orders" className="bg-white border border-[#E6E8E6] px-4 py-2 rounded-xl text-sm font-bold text-charcoal hover:bg-alabaster transition-colors">
                        Siparişler
                    </Link>
                    <Link href="/admin/products/new" className="bg-charcoal text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-charcoal/20 hover:bg-black transition-colors">
                        + Yeni Ürün
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-[#E6E8E6] shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-alabaster rounded-xl text-charcoal group-hover:bg-clay group-hover:text-white transition-colors">
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-3xl font-black text-charcoal mb-1">{stat.value}</div>
                        <div className="text-sm text-charcoal/50 font-medium">{stat.label}</div>
                        <p className="text-xs text-charcoal/40 mt-2">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <SalesChart data={chartData} />

            {/* Charts & Recent Orders Area */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Live Orders Panel */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E6E8E6] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-charcoal">Son Siparişler</h3>
                        <Link href="/admin/orders" className="text-sm font-bold text-clay hover:underline">Tümünü Gör</Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-bold text-charcoal/40 uppercase tracking-wider border-b border-[#F0F0F0]">
                                    <th className="pb-4">Sipariş No</th>
                                    <th className="pb-4">Müşteri</th>
                                    <th className="pb-4">Tutar</th>
                                    <th className="pb-4">Durum</th>
                                    <th className="pb-4 text-right">Zaman</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {RECENT_ORDERS.map((order: any) => (
                                    <tr key={order.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-alabaster transition-colors">
                                        <td className="py-4 font-bold text-charcoal">{order.orderNumber}</td>
                                        <td className="py-4 text-charcoal/80">{order.customerName}</td>
                                        <td className="py-4 font-bold text-charcoal">₺{order.totalAmount?.toString()}</td>
                                        <td className="py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                    'bg-clay/10 text-clay'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-charcoal/40 font-medium">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Marketing Side */}
                <div className="bg-charcoal text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Growth İpuçları 🚀</h3>
                        <p className="text-white/60 mb-8 text-sm leading-relaxed">
                            Sepet terk oranı %4 arttı. Exit-Intent pop-up teklifini güncellemeyi düşünün.
                        </p>

                        <div className="space-y-3">
                            <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                                <span className="text-xs font-bold text-clay block mb-1">BİLGİ</span>
                                <div className="font-bold text-sm">Satış yapıldıkça burada otomatik analizler görünecek.</div>
                            </div>
                        </div>
                    </div>

                    {/* Background Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-clay rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2" />
                </div>

            </div>
        </div>
    );
}

