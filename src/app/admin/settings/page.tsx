'use client';

import { useState } from 'react';
import { Save, Globe, AlertTriangle } from 'lucide-react';

export default function AdminSettingsPage() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Genel Ayarlar</h2>
                <p className="text-gray-500">Site kimliğini ve genel yapılandırmayı yönetin.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                {/* Site Identity */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Globe size={20} className="text-blue-500" />
                        Site Kimliği
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Başlığı</label>
                            <input
                                type="text"
                                defaultValue="Tsuko Design | Mimari 3D Baskı Dekorasyon"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Footer Metni</label>
                            <input
                                type="text"
                                defaultValue="© 2025 Tsuko Design Studio. Tüm hakları saklıdır."
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                    <label className="block text-sm font-bold text-gray-700 mb-2">SEO Açıklaması (Meta Description)</label>
                    <textarea
                        rows={3}
                        defaultValue="Modern ev dekor ve ev ürünleri koleksiyonumuzla yaşam alanlarınıza ruh katın. 3D baskı teknolojisiyle üretilen eşsiz vazo ve aydınlatma modelleri."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors resize-none"
                    />
                </div>

                {/* Maintenance Mode */}
                <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-orange-500" />
                        Acil Durum Bölgesi
                    </h3>

                    <div className="flex items-center justify-between bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <div>
                            <h4 className="font-bold text-orange-900">Bakım Modu</h4>
                            <p className="text-sm text-orange-700">Aktif edildiğinde site ziyaretçilere kapatılır.</p>
                        </div>
                        <button
                            onClick={() => setMaintenanceMode(!maintenanceMode)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-orange-500' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2">
                    <Save size={20} />
                    Değişiklikleri Kaydet
                </button>
            </div>
        </div>
    );
}
