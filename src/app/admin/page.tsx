import { DollarSign, Package, Eye, TrendingUp, MoreHorizontal } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Genel Bakış</h2>
                    <p className="text-gray-500">Hoşgeldin, Admin. İşte bugünün istatistikleri.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
                        Rapor Al
                    </button>
                    <button className="bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-black font-medium">
                        Yeni Ürün Ekle
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: "Toplam Satış", value: "₺45,231.00", icon: DollarSign, trend: "+20.1%", color: "bg-green-100 text-green-600" },
                    { title: "Aktif Ürünler", value: "24", icon: Package, trend: "+4", color: "bg-blue-100 text-blue-600" },
                    { title: "Site Ziyareti", value: "12,302", icon: Eye, trend: "+12%", color: "bg-purple-100 text-purple-600" },
                    { title: "Dönüşüm Oranı", value: "3.2%", icon: TrendingUp, trend: "+2.4%", color: "bg-orange-100 text-orange-600" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table Mockup */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Son Siparişler (Shopier Entegrasyonu)</h3>
                    <button className="text-sm text-charcoal font-bold hover:underline">Tümünü Gör</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sipariş No</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Müşteri</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ürün</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tutar</th>
                                <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</th>
                                <th className="text-right p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: "#SK204", user: "Ahmet Yılmaz", product: "Tondo Vazo (Sage)", price: "₺750.00", status: "Tamamlandı" },
                                { id: "#SK203", user: "Melis Kara", product: "Aura Aydınlatma", price: "₺1,250.00", status: "Kargoda" },
                                { id: "#SK202", user: "Caner Erkin", product: "Kora Heykel", price: "₺950.00", status: "İşleniyor" },
                                { id: "#SK201", user: "Selin Demir", product: "Tondo Vazo (Clay)", price: "₺750.00", status: "Tamamlandı" },
                            ].map((order, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="p-4 text-gray-600">{order.user}</td>
                                    <td className="p-4 text-gray-600">{order.product}</td>
                                    <td className="p-4 font-bold text-gray-900">{order.price}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Tamamlandı' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Kargoda' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-orange-100 text-orange-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-charcoal transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
