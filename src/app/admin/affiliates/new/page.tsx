'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Users, Receipt, Percent } from 'lucide-react';
import { createAffiliate } from '../actions';

export default function NewAffiliatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        commissionRate: '10',
        discountValue: '10', // Customer gets 10% discount
        contact: '',
        iban: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await createAffiliate(formData);

        if (res.success) {
            router.push('/admin/affiliates');
            router.refresh();
        } else {
            setError(res.error || 'Bir hata oluştu.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/affiliates"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-charcoal hover:border-gray-300 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Yeni İş Ortağı</h1>
                    <p className="text-gray-500">Influencer veya satış ortağı tanımlayın.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Info */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                        <Users size={20} className="text-clay" />
                        Temel Bilgiler
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Örn: Buse Yılmaz"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Özel Kod <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="Örn: BUSE10"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none font-mono uppercase"
                            />
                            <p className="text-xs text-gray-400 mt-1">Takipçilerin kullanacağı indirim kodu.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Komisyon Oranı (%)</label>
                            <div className="relative">
                                <Percent size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    name="commissionRate"
                                    value={formData.commissionRate}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">İş ortağının kazanacağı oran.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Müşteri İndirimi (%)</label>
                            <div className="relative">
                                <Percent size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    name="discountValue"
                                    value={formData.discountValue}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Kodu kullanan müşteriye uygulanacak indirim.</p>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                        <Receipt size={20} className="text-clay" />
                        Ödeme Bilgileri
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">İletişim (Tel/E-mail)</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="05XX... / email@..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">IBAN</label>
                            <input
                                type="text"
                                name="iban"
                                value={formData.iban}
                                onChange={handleChange}
                                placeholder="TR..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none font-mono"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200">
                        {error}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-charcoal text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                        Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
}
