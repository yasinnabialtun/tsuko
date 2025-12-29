'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import {
    MapPin, Plus, Trash2, Edit2, Check, Loader2, Home, User, LogOut, Package, Settings
} from 'lucide-react';

interface Address {
    id: string;
    title: string;
    recipientName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    zipCode: string;
    isDefault: boolean;
}

export default function AddressesPage() {
    const { user, isLoaded } = useUser();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        recipientName: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        zipCode: '',
        isDefault: false
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isLoaded && user) {
            fetchAddresses();
        }
    }, [isLoaded, user]);

    const fetchAddresses = async () => {
        try {
            const res = await fetch('/api/profile/addresses');
            if (res.ok) {
                const data = await res.json();
                setAddresses(data.addresses);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const url = editingId
                ? `/api/profile/addresses/${editingId}`
                : '/api/profile/addresses';

            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                setEditingId(null);
                resetForm();
                fetchAddresses();
            }
        } catch (error) {
            alert('Bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu adresi silmek istediğinize emin misiniz?')) return;
        try {
            await fetch(`/api/profile/addresses/${id}`, { method: 'DELETE' });
            setAddresses(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            recipientName: '',
            phone: '',
            address: '',
            city: '',
            district: '',
            zipCode: '',
            isDefault: false
        });
    };

    const startEdit = (addr: Address) => {
        setEditingId(addr.id);
        setFormData({
            title: addr.title,
            recipientName: addr.recipientName,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            district: addr.district,
            zipCode: addr.zipCode,
            isDefault: addr.isDefault
        });
        setShowModal(true);
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-porcelain flex items-center justify-center">
                <Loader2 className="animate-spin text-charcoal opacity-20" size={40} />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />
            <div className="pt-40 pb-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm text-center">
                            <div className="w-20 h-20 bg-charcoal text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                {user?.firstName?.[0] || 'U'}
                            </div>
                            <h2 className="font-bold text-charcoal">{user?.fullName}</h2>
                            <p className="text-xs text-charcoal/40 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>

                        <nav className="space-y-2">
                            <Link href="/profile" className="flex items-center gap-3 w-full p-4 rounded-xl text-sm font-medium text-charcoal/60 hover:bg-white hover:text-charcoal hover:shadow-sm transition-all">
                                <Package size={18} />
                                Siparişlerim
                            </Link>
                            <Link href="/profile/addresses" className="flex items-center gap-3 w-full p-4 rounded-xl text-sm font-bold bg-charcoal text-white shadow-xl shadow-charcoal/20 transition-all">
                                <MapPin size={18} />
                                Adreslerim
                            </Link>
                            <Link href="/user-profile" className="flex items-center gap-3 w-full p-4 rounded-xl text-sm font-medium text-charcoal/60 hover:bg-white hover:text-charcoal hover:shadow-sm transition-all">
                                <Settings size={18} />
                                Hesap Ayarları
                            </Link>
                            <div className="pt-4 mt-4 border-t border-black/5">
                                <SignOutButton>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                                        <LogOut size={18} />
                                        Çıkış Yap
                                    </button>
                                </SignOutButton>
                            </div>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-black text-charcoal tracking-tight mb-2">Adres Defterim</h1>
                                <p className="text-charcoal/40 font-medium">Teslimat adreslerinizi yönetin.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    resetForm();
                                    setShowModal(true);
                                }}
                                className="bg-charcoal text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
                            >
                                <Plus size={16} />
                                Yeni Adres Ekle
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-20">
                                <Loader2 className="animate-spin mx-auto text-charcoal/20" size={32} />
                            </div>
                        ) : addresses.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border border-black/5">
                                <div className="w-16 h-16 bg-porcelain rounded-full flex items-center justify-center mx-auto mb-4 text-charcoal/40">
                                    <MapPin size={24} />
                                </div>
                                <h3 className="font-bold text-charcoal mb-2">Henüz adresiniz yok</h3>
                                <p className="text-sm text-charcoal/40 mb-6">Siparişleriniz için bir teslimat adresi ekleyin.</p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-clay font-bold text-sm hover:underline"
                                >
                                    Adres Ekle
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {addresses.map(addr => (
                                    <div key={addr.id} className="bg-white p-6 rounded-3xl border border-black/5 hover:shadow-lg transition-all group relative">
                                        {addr.isDefault && (
                                            <div className="absolute top-6 right-6 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                                                <Check size={12} /> Varsayılan
                                            </div>
                                        )}

                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-10 h-10 bg-porcelain rounded-full flex items-center justify-center flex-shrink-0 text-charcoal">
                                                <Home size={18} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-charcoal">{addr.title}</h3>
                                                <p className="text-xs text-charcoal/60">{addr.recipientName}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-charcoal/60 leading-relaxed mb-6 h-12 line-clamp-2">
                                            {addr.address}<br />
                                            {addr.district}, {addr.city} / {addr.zipCode}
                                        </p>

                                        <div className="flex items-center gap-2 border-t border-black/5 pt-4">
                                            <button
                                                onClick={() => startEdit(addr)}
                                                className="flex-1 py-2 text-xs font-bold text-charcoal hover:bg-porcelain rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Edit2 size={14} /> Düzenle
                                            </button>
                                            <button
                                                onClick={() => handleDelete(addr.id)}
                                                className="flex-1 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 size={14} /> Sil
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-charcoal">{editingId ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
                            <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-porcelain hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <span className="text-lg font-bold">×</span>
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">Adres Başlığı</label>
                                    <input
                                        type="text"
                                        placeholder="Ev, İş, Yazlık vb."
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">Alıcı Adı Soyadı</label>
                                    <input
                                        type="text"
                                        value={formData.recipientName}
                                        onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                                        className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">Telefon</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">Adres</label>
                                <textarea
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    rows={3}
                                    className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">İl</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">İlçe</label>
                                    <input
                                        type="text"
                                        value={formData.district}
                                        onChange={e => setFormData({ ...formData, district: e.target.value })}
                                        className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-charcoal/60 mb-2 uppercase tracking-wide">Posta Kodu</label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-full bg-porcelain border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-charcoal/20 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-charcoal focus:ring-charcoal"
                                />
                                <label htmlFor="isDefault" className="text-sm font-medium text-charcoal cursor-pointer select-none">
                                    Varsayılan teslimat adresi olarak ayarla
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-charcoal text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center disabled:opacity-70"
                            >
                                {saving ? <Loader2 className="animate-spin" /> : (editingId ? 'Güncelle' : 'Kaydet')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
