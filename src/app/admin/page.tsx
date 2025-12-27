'use client';

import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const STATS = [
    {
        label: 'Toplam Ciro',
        value: '₺124,500',
        change: '+%12.5',
        trend: 'up',
        icon: DollarSign,
        desc: 'Geçen aya göre'
    },
    {
        label: 'Toplam Sipariş',
        value: '1,240',
        change: '+%8.2',
        trend: 'up',
        icon: ShoppingBag,
        desc: 'Aktif sepet oranı yüksek'
    },
    {
        label: 'Aktif Müşteriler',
        value: '845',
        change: '+%24',
        trend: 'up',
        icon: Users,
        desc: 'Yeni üye kazanımı'
    },
    {
        label: 'Dönüşüm Oranı',
        value: '%2.4',
        change: '-%0.1',
        trend: 'down',
        icon: TrendingUp,
        desc: 'Sektör ortalamasının üstünde'
    }
];

const RECENT_ORDERS = [
    { id: '#TR-8842', customer: 'Melis Yılmaz', product: 'Nami Vazo', amount: '₺1.250', status: 'Hazırlanıyor', date: 'Az önce' },
    { id: '#TR-8841', customer: 'Can Berk', product: 'Mantar Lamba', amount: '₺850', status: 'Kargolandı', date: '2 saat önce' },
    { id: '#TR-8840', customer: 'Selin Demir', product: 'Kaya Saksı', amount: '₺450', status: 'Teslim Edildi', date: 'Dün' },
    { id: '#TR-8839', customer: 'Mert Yılman', product: 'Aura Vazo', amount: '₺1.450', status: 'İptal', date: 'Dün' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-charcoal mb-2">Genel Bakış</h1>
                    <p className="text-charcoal/60">İşletmenizin anlık performans metrikleri.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-[#E6E8E6] px-4 py-2 rounded-xl text-sm font-bold text-charcoal hover:bg-alabaster transition-colors">
                        Rapor İndir
                    </button>
                    <button className="bg-charcoal text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-charcoal/20 hover:bg-black transition-colors">
                        + Yeni Ürün
                    </button>
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

            {/* Charts & Recent Orders Area */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Live Orders Panel */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E6E8E6] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-charcoal">Son Siparişler</h3>
                        <button className="text-sm font-bold text-clay hover:underline">Tümünü Gör</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-xs font-bold text-charcoal/40 uppercase tracking-wider border-b border-[#F0F0F0]">
                                    <th className="pb-4">Sipariş No</th>
                                    <th className="pb-4">Müşteri</th>
                                    <th className="pb-4">Ürün</th>
                                    <th className="pb-4">Tutar</th>
                                    <th className="pb-4">Durum</th>
                                    <th className="pb-4 text-right">Zaman</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id} className="border-b border-[#F0F0F0] last:border-0 hover:bg-alabaster transition-colors">
                                        <td className="py-4 font-bold text-charcoal">{order.id}</td>
                                        <td className="py-4 text-charcoal/80">{order.customer}</td>
                                        <td className="py-4 text-charcoal/60">{order.product}</td>
                                        <td className="py-4 font-bold text-charcoal">{order.amount}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                ${order.status === 'Hazırlanıyor' ? 'bg-yellow-100 text-yellow-700' :
                                                    order.status === 'Kargolandı' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700' :
                                                            'bg-red-100 text-red-700'}`
                                            }>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right text-charcoal/40">{order.date}</td>
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
                            <div className="p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-xs font-bold text-clay block mb-1">KEYWORD FIRSATI</span>
                                <div className="font-bold">"Sürdürülebilir Vazo" +%40 Aranıyor</div>
                            </div>
                            <div className="p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                <span className="text-xs font-bold text-green-400 block mb-1">STOK UYARISI</span>
                                <div className="font-bold">Nami Vazo (Stone) Tükenmek Üzere</div>
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
