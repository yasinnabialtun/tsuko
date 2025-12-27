
import { prisma } from '@/lib/prisma';
import { Mail, Phone, ShoppingBag, Calendar, Search, User } from 'lucide-react';

export const revalidate = 0;

interface CustomerData {
    email: string;
    name: string;
    phone: string;
    orderCount: number;
    totalSpent: number;
    lastOrderDate: Date;
    city: string;
}

async function getCustomers() {
    // Fetch all orders
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
            status: { not: 'CANCELLED' }
        }
    });

    // Group by email
    const customerMap = new Map<string, CustomerData>();

    orders.forEach(order => {
        const email = order.customerEmail.toLowerCase();

        if (!customerMap.has(email)) {
            customerMap.set(email, {
                email: order.customerEmail,
                name: order.customerName,
                phone: order.customerPhone,
                orderCount: 0,
                totalSpent: 0,
                lastOrderDate: order.createdAt,
                city: order.city
            });
        }

        const customer = customerMap.get(email)!;
        customer.orderCount += 1;
        customer.totalSpent += Number(order.totalAmount);
        // Dates are sorted desc, so first encounter is last order
    });

    return Array.from(customerMap.values());
}

export default async function AdminCustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Müşteriler</h2>
                    <p className="text-gray-500">Sipariş veren müşterilerinizi görüntüleyin ve analiz edin.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-charcoal">{customers.length}</p>
                    <p className="text-gray-500 text-sm">Toplam Müşteri</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-clay">
                        {customers.reduce((acc, c) => acc + c.orderCount, 0)}
                    </p>
                    <p className="text-gray-500 text-sm">Toplam Sipariş</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-green-600">
                        ₺{customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-gray-500 text-sm">Toplam Hacim</p>
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Müşteri</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">İletişim</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Lokasyon</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Siparişler</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Harcama</th>
                            <th className="text-right p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Son Sipariş</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-12 text-center text-gray-500">
                                    <User size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="font-bold">Henüz müşteri kaydı yok</p>
                                    <p className="text-sm">Sipariş geldikçe müşteriler burada listelenecek.</p>
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center font-bold text-sm">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-charcoal">{customer.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={14} className="text-gray-400" />
                                                {customer.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={14} className="text-gray-400" />
                                                {customer.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {customer.city}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag size={16} className="text-clay" />
                                            <span className="font-bold text-gray-900">{customer.orderCount}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="font-mono font-bold text-green-600">
                                            ₺{customer.totalSpent.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right text-gray-500 text-sm font-mono">
                                        {new Date(customer.lastOrderDate).toLocaleDateString('tr-TR')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
