'use client';

import { useState } from 'react';
import { Save, Loader2, Check, Globe, Mail, Phone, Palette, Bell, Shield, AlertTriangle, Package, RefreshCcw } from 'lucide-react';

export default function AdminSettingsPage() {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [seeding, setSeeding] = useState(false);
    const [seedSuccess, setSeedSuccess] = useState('');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const [settings, setSettings] = useState({
        // Site Info
        siteName: 'Tsuko Design',
        siteDescription: 'Mimari Estetik, Evinize Taşındı',
        siteUrl: 'https://tsukodesign.com',

        // Contact
        email: 'info@tsukodesign.com',
        phone: '',
        whatsapp: '905xxxxxxxxx',
        address: 'İstanbul, Türkiye',

        // Social
        instagram: 'tsukodesign',
        pinterest: '',

        // E-commerce
        shopierUrl: 'https://shopier.com/tsukodesign',
        freeShippingThreshold: '500',

        // Notifications
        orderNotifications: true,
        stockAlerts: true,
        newsletterNotifications: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setSettings(prev => ({ ...prev, [name]: checked }));
        } else {
            setSettings(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleSeed = async () => {
        if (!confirm('Tüm kategoriler ve örnek blog yazıları oluşturulacak. Devam etmek istiyor musunuz?')) return;

        setSeeding(true);
        setSeedSuccess('');

        try {
            const res = await fetch('/api/admin/seed', { method: 'POST' });
            if (res.ok) {
                setSeedSuccess('Veritabanı başarıyla başlatıldı!');
                setTimeout(() => setSeedSuccess(''), 5000);
            } else {
                alert('Seed işlemi başarısız oldu.');
            }
        } catch (error) {
            console.error(error);
            alert('Bağlantı hatası.');
        } finally {
            setSeeding(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Site Ayarları</h1>
                    <p className="text-gray-500">Genel site ayarlarını yönetin.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Kaydediliyor...
                        </>
                    ) : saved ? (
                        <>
                            <Check size={18} />
                            Kaydedildi!
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Kaydet
                        </>
                    )}
                </button>
            </div>

            {/* Site Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-clay/10 rounded-xl">
                        <Globe size={24} className="text-clay" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">Site Bilgileri</h2>
                        <p className="text-sm text-gray-500">Temel site ayarları</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site Adı</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Site URL</label>
                            <input
                                type="text"
                                name="siteUrl"
                                value={settings.siteUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Site Açıklaması (SEO)</label>
                        <textarea
                            name="siteDescription"
                            value={settings.siteDescription}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <Mail size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">İletişim Bilgileri</h2>
                        <p className="text-sm text-gray-500">Müşterilerin ulaşabileceği bilgiler</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={settings.phone}
                                onChange={handleChange}
                                placeholder="+90 5XX XXX XX XX"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Numarası</label>
                            <input
                                type="text"
                                name="whatsapp"
                                value={settings.whatsapp}
                                onChange={handleChange}
                                placeholder="905XXXXXXXXX"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                            <p className="text-xs text-gray-400 mt-1">WhatsApp butonunda kullanılır</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Adres</label>
                            <input
                                type="text"
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-50 rounded-xl">
                        <Palette size={24} className="text-pink-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">Sosyal Medya</h2>
                        <p className="text-sm text-gray-500">Sosyal medya hesapları</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Instagram</label>
                        <div className="flex">
                            <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">@</span>
                            <input
                                type="text"
                                name="instagram"
                                value={settings.instagram}
                                onChange={handleChange}
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:border-clay outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Pinterest</label>
                        <div className="flex">
                            <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">@</span>
                            <input
                                type="text"
                                name="pinterest"
                                value={settings.pinterest}
                                onChange={handleChange}
                                placeholder="kullanici_adi"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:border-clay outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* E-commerce */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <Package size={24} className="text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">E-Ticaret Ayarları</h2>
                        <p className="text-sm text-gray-500">Satış ve kargo ayarları</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Shopier Mağaza URL</label>
                        <input
                            type="text"
                            name="shopierUrl"
                            value={settings.shopierUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Ücretsiz Kargo Limiti (₺)</label>
                        <input
                            type="number"
                            name="freeShippingThreshold"
                            value={settings.freeShippingThreshold}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-yellow-50 rounded-xl">
                        <Bell size={24} className="text-yellow-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">Bildirimler</h2>
                        <p className="text-sm text-gray-500">E-posta bildirimi ayarları</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                            <span className="font-medium text-charcoal">Yeni Sipariş Bildirimleri</span>
                            <p className="text-sm text-gray-500">Yeni sipariş geldiğinde e-posta al</p>
                        </div>
                        <input
                            type="checkbox"
                            name="orderNotifications"
                            checked={settings.orderNotifications}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                        />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                            <span className="font-medium text-charcoal">Stok Uyarıları</span>
                            <p className="text-sm text-gray-500">Ürün stoğu azaldığında uyarı al</p>
                        </div>
                        <input
                            type="checkbox"
                            name="stockAlerts"
                            checked={settings.stockAlerts}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                        />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <div>
                            <span className="font-medium text-charcoal">Newsletter Abonelikleri</span>
                            <p className="text-sm text-gray-500">Yeni abone olduğunda bildirim al</p>
                        </div>
                        <input
                            type="checkbox"
                            name="newsletterNotifications"
                            checked={settings.newsletterNotifications}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                        />
                    </label>
                </div>
            </div>

            {/* Maintenance Mode & Data Seed */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 rounded-xl">
                        <AlertTriangle size={24} className="text-orange-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-charcoal">Geliştirici & Sistem</h2>
                        <p className="text-sm text-gray-500">Kritik sistem ayarları</p>
                    </div>
                </div>

                {/* Maintenance Toggle */}
                <div className="flex items-center justify-between p-6 bg-orange-50 rounded-xl border border-orange-100">
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

                {/* Database Seed */}
                <div className="flex items-center justify-between p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                        <h4 className="font-bold text-blue-900">Veritabanını Başlat (Seed)</h4>
                        <p className="text-sm text-blue-700">Varsayılan kategorileri ve örnek blog yazılarını yükler.</p>
                        {seedSuccess && <p className="text-green-600 font-bold mt-2 text-sm">✓ {seedSuccess}</p>}
                    </div>
                    <button
                        onClick={handleSeed}
                        disabled={seeding}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                        {seeding ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <RefreshCcw size={16} />
                        )}
                        Başlat
                    </button>
                </div>
            </div>

            {/* API Keys Info */}
            <div className="bg-gradient-to-br from-charcoal to-black text-white rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-xl">
                        <Shield size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">API Anahtarları</h2>
                        <p className="text-sm text-white/60">Vercel ortam değişkenlerinde yönetilir</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                        <span className="text-xs text-white/50 uppercase tracking-wider">Supabase</span>
                        <p className="font-mono text-sm mt-1">DATABASE_URL</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <span className="text-xs text-white/50 uppercase tracking-wider">Resend</span>
                        <p className="font-mono text-sm mt-1">RESEND_API_KEY</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <span className="text-xs text-white/50 uppercase tracking-wider">Shopier</span>
                        <p className="font-mono text-sm mt-1">SHOPIER_API_KEY</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <span className="text-xs text-white/50 uppercase tracking-wider">Storage</span>
                        <p className="font-mono text-sm mt-1">SUPABASE_ANON_KEY</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
