'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Tag, Percent, Banknote } from 'lucide-react';
import { createCoupon } from '../actions';

export default function NewCouponPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'PERCENTAGE', // PERCENTAGE or FIXED
        discountValue: '',
        minAmount: '',
        usageLimit: '',
        startDate: '',
        endDate: '',
        isActive: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await createCoupon(formData);

        if (res.success) {
            router.push('/admin/coupons');
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
                    href="/admin/coupons"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-charcoal hover:border-gray-300 transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Yeni Kupon Oluştur</h1>
                    <p className="text-gray-500">Müşterileriniz için özel indirim kodları tanımlayın.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Info */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-charcoal flex items-center gap-2">
                        <Tag size={20} className="text-clay" />
                        Temel Bilgiler
                    </h2>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kupon Kodu <span className="text-red-500">*</span></label>
                        <input
                            required
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Örn: YAZ2024"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none font-mono uppercase placeholder:normal-case text-lg"
                        />
                        <p className="text-xs text-gray-400 mt-2">Müşterilerin sepet sayfasında gireceği kod. Büyük harfe otomatik çevrilir.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">İndirim Tipi</label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl border border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, discountType: 'PERCENTAGE' })}
                                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${formData.discountType === 'PERCENTAGE'
                                            ? 'bg-white shadow-sm text-charcoal'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <Percent size={16} />
                                    Yüzde (%)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, discountType: 'FIXED' })}
                                    className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${formData.discountType === 'FIXED'
                                            ? 'bg-white shadow-sm text-charcoal'
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <Banknote size={16} />
                                    Sabit Tutar
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                {formData.discountType === 'PERCENTAGE' ? 'İndirim Oranı (%)' : 'İndirim Tutarı (TL)'} <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="number"
                                min="0"
                                step="any"
                                name="discountValue"
                                value={formData.discountValue}
                                onChange={handleChange}
                                placeholder={formData.discountType === 'PERCENTAGE' ? '10' : '100'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Constraints */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-charcoal">Kısıtlamalar</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Sepet Tutarı (TL)</label>
                            <input
                                type="number"
                                min="0"
                                name="minAmount"
                                value={formData.minAmount}
                                onChange={handleChange}
                                placeholder="Boş bırakırsanız limit olmaz"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kullanım Limiti</label>
                            <input
                                type="number"
                                min="1"
                                name="usageLimit"
                                value={formData.usageLimit}
                                onChange={handleChange}
                                placeholder="Toplam kaç kez kullanılabilir?"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Başlangıç Tarihi</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Bitiş Tarihi</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                        />
                        <label htmlFor="isActive" className="text-sm font-bold text-charcoal select-none cursor-pointer">
                            Kuponu hemen aktifleştir
                        </label>
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
                        Kuponu Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
}
