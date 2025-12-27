'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tag, Trash2, Plus, Calendar, Check, X, Loader2, Power } from 'lucide-react';
import Link from 'next/link';
import { deleteCoupon, toggleCouponStatus } from './actions';

interface Coupon {
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    usageLimit: number | null;
    usedCount: number;
    startDate: Date | null;
    endDate: Date | null;
    isActive: boolean;
}

export default function CouponsClient({ initialCoupons }: { initialCoupons: any[] }) {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;
        setLoadingId(id);
        const res = await deleteCoupon(id);
        if (res.success) {
            setCoupons(prev => prev.filter(c => c.id !== id));
            router.refresh();
        } else {
            alert(res.error);
        }
        setLoadingId(null);
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        setLoadingId(id);
        const res = await toggleCouponStatus(id, !currentStatus);
        if (res.success) {
            setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
            router.refresh();
        }
        setLoadingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Kupon Yönetimi</h1>
                    <p className="text-gray-500">Aktif kampanyaları ve indirim kuponlarını yönetin.</p>
                </div>
                <Link
                    href="/admin/coupons/new"
                    className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors"
                >
                    <Plus size={20} />
                    Yeni Kupon
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Kod</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">İndirim</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Kullanım</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Tarih Aralığı</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Durum</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {coupons.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                    <Tag size={48} className="mx-auto mb-4 opacity-20" />
                                    Henüz kupon oluşturulmamış.
                                </td>
                            </tr>
                        ) : (
                            coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-clay/10 flex items-center justify-center text-clay">
                                                <Tag size={18} />
                                            </div>
                                            <span className="font-bold font-mono text-charcoal">{coupon.code}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-charcoal">
                                            {coupon.discountType === 'PERCENTAGE'
                                                ? `%${Number(coupon.discountValue)}`
                                                : `${Number(coupon.discountValue)}₺`}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {coupon.usedCount} / {coupon.usageLimit ? coupon.usageLimit : '∞'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-xs text-gray-500 gap-1">
                                            <div className="flex items-center gap-1">
                                                <span className="w-12">Başlangıç:</span>
                                                <span className="font-medium text-charcoal">
                                                    {coupon.startDate ? new Date(coupon.startDate).toLocaleDateString('tr-TR') : '-'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="w-12">Bitiş:</span>
                                                <span className="font-medium text-charcoal">
                                                    {coupon.endDate ? new Date(coupon.endDate).toLocaleDateString('tr-TR') : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleToggle(coupon.id, coupon.isActive)}
                                            disabled={loadingId === coupon.id}
                                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${coupon.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            {loadingId === coupon.id ? (
                                                <Loader2 size={12} className="animate-spin" />
                                            ) : (
                                                coupon.isActive ? <Check size={12} /> : <X size={12} />
                                            )}
                                            {coupon.isActive ? 'Aktif' : 'Pasif'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(coupon.id)}
                                            disabled={loadingId === coupon.id}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            {loadingId === coupon.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                        </button>
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
