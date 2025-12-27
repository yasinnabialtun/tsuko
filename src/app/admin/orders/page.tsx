import { Package, Clock, Truck, CheckCircle, XCircle, Eye, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

async function getOrders() {
    return await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
            items: {
                include: {
                    product: {
                        select: { name: true }
                    }
                }
            }
        }
    }).catch(() => []);
}

async function getStats() {
    const [total, pending, preparing, shipped, delivered, cancelled] = await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.order.count({ where: { status: 'PREPARING' } }),
        prisma.order.count({ where: { status: 'SHIPPED' } }),
        prisma.order.count({ where: { status: 'DELIVERED' } }),
        prisma.order.count({ where: { status: 'CANCELLED' } })
    ]).catch(() => [0, 0, 0, 0, 0, 0]);

    return { total, pending, preparing, shipped, delivered, cancelled };
}

const STATUS_CONFIG = {
    PENDING: { label: 'Bekliyor', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    PREPARING: { label: 'Hazırlanıyor', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    SHIPPED: { label: 'Kargoda', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    DELIVERED: { label: 'Teslim Edildi', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    CANCELLED: { label: 'İptal', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' }
};

export default async function AdminOrdersPage() {
    const orders = await getOrders();
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Sipariş Yönetimi</h2>
                <p className="text-gray-500">Tüm siparişleri görüntüleyin ve yönetin.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-charcoal">{stats.total}</p>
                    <p className="text-gray-500 text-sm">Toplam</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                    <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
                    <p className="text-yellow-700 text-sm">Bekliyor</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <p className="text-3xl font-black text-blue-600">{stats.preparing}</p>
                    <p className="text-blue-700 text-sm">Hazırlanıyor</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                    <p className="text-3xl font-black text-purple-600">{stats.shipped}</p>
                    <p className="text-purple-700 text-sm">Kargoda</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                    <p className="text-3xl font-black text-green-600">{stats.delivered}</p>
                    <p className="text-green-700 text-sm">Teslim</p>
                </div>
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                    <p className="text-3xl font-black text-red-600">{stats.cancelled}</p>
                    <p className="text-red-700 text-sm">İptal</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Sipariş No</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Müşteri</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Ürünler</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tutar</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="text-right p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-gray-500">
                                    <Package size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="font-bold">Henüz sipariş yok</p>
                                    <p className="text-sm">Siparişler burada görünecek.</p>
                                </td>
                            </tr>
                        ) : (
                            orders.map((order: any) => {
                                const statusInfo = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.PENDING;
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <span className="font-mono font-bold text-charcoal">{order.orderNumber}</span>
                                        </td>
                                        <td className="p-6">
                                            <div>
                                                <p className="font-bold text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-500">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="text-sm text-gray-600">
                                                {order.items?.map((item: any) => item.product?.name || 'Ürün').join(', ') || '-'}
                                            </p>
                                            <p className="text-xs text-gray-400">{order.items?.length || 0} ürün</p>
                                        </td>
                                        <td className="p-6">
                                            <span className="font-bold text-charcoal">₺{order.totalAmount?.toString()}</span>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.color}`}>
                                                <StatusIcon size={14} />
                                                {statusInfo.label}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                    title="Detay"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                                                    title="Durumu Güncelle"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
