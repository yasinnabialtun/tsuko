
'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, Loader2, Trash2, Package, CheckCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notify');
            if (res.ok) {
                setNotifications(await res.json());
            }
        } catch (e) {
            toast.error('Bildirimler yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu bildirimi silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/notify?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Bildirim silindi.');
                setNotifications(notifications.filter(n => n.id !== id));
            }
        } catch (e) {
            toast.error('İşlem başarısız.');
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-clay" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-charcoal mb-2 font-syne">Stok Bildirimleri</h1>
                    <p className="text-charcoal/60">Tükenen ürünler için stok bekleyen müşterilerin listesi.</p>
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-[#E6E8E6]">
                    <Bell className="mx-auto text-gray-200 mb-6" size={64} />
                    <h3 className="text-xl font-bold text-charcoal mb-2">Bekleyen Bildirim Yok</h3>
                    <p className="text-gray-400">Tükenen ürünleriniz için henüz bir talep gelmedi.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam Talep</p>
                            <p className="text-3xl font-black text-charcoal">{notifications.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Benzersiz Ürün</p>
                            <p className="text-3xl font-black text-charcoal">{new Set(notifications.map(n => n.productId)).size}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-[#E6E8E6] overflow-hidden shadow-sm">
                        <table className="w-full">
                            <thead className="bg-[#F9FAFB] border-b border-[#E6E8E6]">
                                <tr>
                                    <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Ürün</th>
                                    <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Müşteri Email</th>
                                    <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Durum</th>
                                    <th className="text-right py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {notifications.map((notif) => (
                                    <tr key={notif.id} className="hover:bg-alabaster/30 transition-colors group">
                                        <td className="py-4 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                                    <Image
                                                        src={notif.product?.images?.[0] || '/images/hero.png'}
                                                        alt={notif.product?.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-charcoal text-sm">{notif.product?.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-mono">ID: {notif.productId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-8">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400" />
                                                <span className="font-medium text-charcoal text-sm">{notif.email}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-tighter">
                                                {new Date(notif.createdAt).toLocaleDateString('tr-TR')} {new Date(notif.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </td>
                                        <td className="py-4 px-8">
                                            {notif.product?.stock > 0 ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-50 text-green-700 border border-green-100">
                                                    Stok Geldi ({notif.product.stock})
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-100">
                                                    Hala Stok Yok
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-8 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleDelete(notif.id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
