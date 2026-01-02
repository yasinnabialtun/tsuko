'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Users, Trash2, TrendingUp, Search } from 'lucide-react';
import { deleteAffiliate } from './actions';
import toast from 'react-hot-toast';

export default function AffiliatesClient({ initialAffiliates }: { initialAffiliates: any[] }) {
    const [affiliates, setAffiliates] = useState(initialAffiliates);
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);

    const filtered = affiliates.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.code.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('Bu iş ortağını silmek istediğinize emin misiniz? İlgili kupon kodu da silinecektir.')) return;

        setDeleting(id);
        const res = await deleteAffiliate(id);

        if (res.success) {
            setAffiliates(affiliates.filter(a => a.id !== id));
            toast.success('İş ortağı silindi.');
        } else {
            toast.error('Silinemedi.');
        }
        setDeleting(null);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">İş Ortakları (Affiliate)</h1>
                    <p className="text-gray-500">Satış ortaklarını ve influencer performanslarını yönetin.</p>
                </div>
                <Link
                    href="/admin/affiliates/new"
                    className="bg-charcoal text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Yeni İş Ortağı
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="İsim veya kod ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none text-charcoal placeholder:text-gray-300"
                />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Henüz iş ortağı bulunmuyor.</p>
                    </div>
                ) : (
                    filtered.map((affiliate) => (
                        <div key={affiliate.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-sm transition-shadow">

                            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-full bg-clay/10 flex items-center justify-center text-clay font-bold text-lg">
                                    {affiliate.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-charcoal text-lg">{affiliate.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono font-bold text-gray-600">
                                            {affiliate.code}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            %{affiliate.commissionRate} Komisyon
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Toplam Ciro</p>
                                    <p className="text-lg font-bold text-charcoal">₺{affiliate.totalSales.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-clay font-bold uppercase tracking-wider">Hakediş</p>
                                    <p className="text-xl font-bold text-clay">₺{affiliate.totalEarnings.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                                <button
                                    onClick={() => handleDelete(affiliate.id)}
                                    disabled={deleting === affiliate.id}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    title="Sil"
                                >
                                    {deleting === affiliate.id ? <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full" /> : <Trash2 size={20} />}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
