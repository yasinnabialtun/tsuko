
'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, Check, X, Copy, Download, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch('/api/newsletter');
            if (res.ok) {
                setSubscribers(await res.json());
            }
        } catch (e) {
            toast.error('Aboneler yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const copyEmails = () => {
        const emails = subscribers
            .filter(s => s.isActive)
            .map(s => s.email)
            .join(', ');

        if (!emails) {
            toast.error('Kopyalanacak aktif abone bulunmuyor.');
            return;
        }

        navigator.clipboard.writeText(emails);
        toast.success(`${subscribers.filter(s => s.isActive).length} e-posta kopyalandı.`);
    };

    const toggleStatus = async (id: string, current: boolean) => {
        // Needs API support for update
        toast.error('Bu özellik henüz aktif değil.');
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-clay" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-charcoal">Bülten Aboneleri</h1>
                    <p className="text-charcoal/60">E-posta bültenine kayıt olan kullanıcılar.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={copyEmails}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm font-bold text-charcoal hover:bg-alabaster transition-colors text-sm"
                    >
                        <Copy size={16} />
                        E-postaları Kopyala
                    </button>
                    <div className="bg-charcoal px-4 py-2 rounded-xl shadow-lg border border-white/10 font-bold text-white text-sm">
                        Toplam: {subscribers.length}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden text-sm">
                <table className="w-full">
                    <thead className="bg-[#F9FAFB] border-b border-black/5">
                        <tr>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">E-posta</th>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Kaynak</th>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Durum</th>
                            <th className="text-right py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-charcoal/40">
                                    <Mail className="mx-auto mb-4 opacity-10" size={64} />
                                    <p className="font-medium">Henüz abone bulunmuyor.</p>
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-alabaster/30 transition-colors group">
                                    <td className="py-4 px-8 font-bold text-charcoal">
                                        {sub.email}
                                    </td>
                                    <td className="py-4 px-8">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                            {sub.source || 'Website'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-8">
                                        {sub.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-50 text-green-700 border border-green-100">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-100">
                                                Pasif
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-8 text-right text-gray-400 font-mono text-[11px]">
                                        {new Date(sub.createdAt).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
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
