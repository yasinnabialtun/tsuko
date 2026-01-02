
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SalesChart from '@/components/admin/sales-chart';
import LiveVisitorGlobe from '@/components/admin/live-visitor-globe';
import SystemPulse from '@/components/admin/system-pulse';

export const dynamic = 'force-dynamic';

async function getStats() {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        const [
            productCount,
            orderCount,
            prevOrderCount,
            revenueData,
            prevRevenueData,
            subscriberCount,
            prevSubscriberCount
        ] = await Promise.all([
            prisma.product.count(),
            prisma.order.count(),
            prisma.order.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
            prisma.order.aggregate({ _sum: { totalAmount: true } }),
            prisma.order.aggregate({
                where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
                _sum: { totalAmount: true }
            }),
            prisma.subscriber.count(),
            prisma.subscriber.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } })
        ]);

        const currentRevenue = Number(revenueData._sum.totalAmount || 0);
        const prevRevenue = Number(prevRevenueData._sum.totalAmount || 0);

        const calculateGrowth = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        };

        const revGrowth = calculateGrowth(currentRevenue, prevRevenue);
        const orderGrowth = calculateGrowth(orderCount, prevOrderCount);
        const subGrowth = calculateGrowth(subscriberCount, prevSubscriberCount);

        return [
            {
                label: 'Toplam Ciro',
                value: `₺${currentRevenue.toLocaleString('tr-TR')}`,
                change: `${revGrowth >= 0 ? '+' : ''}%${revGrowth.toFixed(1)}`,
                trend: revGrowth >= 0 ? 'up' : 'down',
                icon: DollarSign,
                desc: 'Tüm zamanlar'
            },
            {
                label: 'Toplam Sipariş',
                value: orderCount.toString(),
                change: `${orderGrowth >= 0 ? '+' : ''}%${orderGrowth.toFixed(1)}`,
                trend: orderGrowth >= 0 ? 'up' : 'down',
                icon: ShoppingBag,
                desc: 'Sistemdeki tüm siparişler'
            },
            {
                label: 'Toplam Ürün',
                value: productCount.toString(),
                change: '+%0',
                trend: 'up',
                icon: TrendingUp,
                desc: 'Envanter büyüklüğü'
            },
            {
                label: 'Aboneler',
                value: subscriberCount.toString(),
                change: `${subGrowth >= 0 ? '+' : ''}%${subGrowth.toFixed(1)}`,
                trend: subGrowth >= 0 ? 'up' : 'down',
                icon: Users,
                desc: 'Newsletter kitlesi'
            }
        ];
    } catch (e) {
        console.error('Stats error:', e);
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl font-black text-charcoal mb-3 tracking-tighter">Panel</h1>
                    <p className="text-charcoal/40 font-medium">Hoş geldiniz, her şey yolunda görünüyor. ✨</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/live" className="flex items-center gap-2 bg-red-500 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-105 transition-all">
                        <Activity size={16} />
                        CANLI YAYIN
                    </Link>
                    <Link href="/admin/products/new" className="bg-charcoal text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-charcoal/20 hover:bg-black transition-all">
                        + YENİ ÜRÜN
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

                {/* Sidebar Widgets */}
                <div className="space-y-8">
                    <SystemPulse />
                    <LiveVisitorGlobe />
                </div>

            </div>
        </div>
    );
}

