
import { prisma } from '@/lib/prisma';
import AdminLayout from '../layout';
import { Mail, Calendar, Check, X } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-charcoal">Bülten Aboneleri</h1>
                    <p className="text-charcoal/60">E-posta bültenine kayıt olan kullanıcılar.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm font-bold text-charcoal">
                    Toplam: {subscribers.length}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-alabaster border-b border-black/5">
                        <tr>
                            <th className="text-left py-4 px-6 text-xs font-bold text-charcoal/50 uppercase tracking-widest">E-posta</th>
                            <th className="text-left py-4 px-6 text-xs font-bold text-charcoal/50 uppercase tracking-widest">Kaynak</th>
                            <th className="text-left py-4 px-6 text-xs font-bold text-charcoal/50 uppercase tracking-widest">Durum</th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-charcoal/50 uppercase tracking-widest">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-charcoal/40">
                                    <Mail className="mx-auto mb-2 opacity-50" size={32} />
                                    Henüz abone bulunmuyor.
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-alabaster/50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-charcoal">
                                        {sub.email}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-charcoal/70">
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold text-gray-600">
                                            {sub.source}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {sub.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm text-charcoal/60 font-mono">
                                        {new Date(sub.createdAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
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
