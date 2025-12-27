import { Users, Mail, Calendar, Download, UserPlus } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

async function getSubscribers() {
    return await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100
    }).catch(() => []);
}

async function getCustomerStats() {
    const [totalSubscribers, thisMonth, thisWeek] = await Promise.all([
        prisma.subscriber.count(),
        prisma.subscriber.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }
        }),
        prisma.subscriber.count({
            where: {
                createdAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            }
        })
    ]).catch(() => [0, 0, 0]);

    return { totalSubscribers, thisMonth, thisWeek };
}

export default async function AdminCustomersPage() {
    const subscribers = await getSubscribers();
    const stats = await getCustomerStats();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Müşteriler & Aboneler</h2>
                    <p className="text-gray-500">Bülten aboneleri ve müşteri listesi.</p>
                </div>
                <button className="bg-charcoal text-white px-6 py-3 rounded-xl hover:bg-black font-medium flex items-center gap-2 transition-colors shadow-lg shadow-charcoal/20">
                    <Download size={20} />
                    CSV İndir
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                            <Users size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-charcoal">{stats.totalSubscribers}</p>
                            <p className="text-gray-500 text-sm">Toplam Abone</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                            <UserPlus size={24} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-green-600">{stats.thisMonth}</p>
                            <p className="text-gray-500 text-sm">Bu Ay</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Calendar size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-black text-blue-600">{stats.thisWeek}</p>
                            <p className="text-gray-500 text-sm">Bu Hafta</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Bülten Aboneleri</h3>
                    <span className="text-sm text-gray-500">{subscribers.length} kayıt</span>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">E-posta</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Kaynak</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Kayıt Tarihi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-12 text-center text-gray-500">
                                    <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="font-bold">Henüz abone yok</p>
                                    <p className="text-sm">Bülten aboneleri burada görünecek.</p>
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((subscriber: any) => (
                                <tr key={subscriber.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clay to-sage flex items-center justify-center text-white font-bold text-sm">
                                                {subscriber.email.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                            {subscriber.source || 'Web'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-gray-600 text-sm">
                                        {new Date(subscriber.createdAt).toLocaleDateString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
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
