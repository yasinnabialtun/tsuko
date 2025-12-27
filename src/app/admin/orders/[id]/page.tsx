'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle,
    User, Mail, Phone, MapPin, CreditCard, Save, Loader2, Check
} from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'Bekliyor', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { value: 'PREPARING', label: 'Hazırlanıyor', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'SHIPPED', label: 'Kargoda', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'DELIVERED', label: 'Teslim Edildi', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'CANCELLED', label: 'İptal', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' }
];

const PAYMENT_OPTIONS = [
    { value: 'UNPAID', label: 'Ödenmedi', color: 'text-red-600' },
    { value: 'PAID', label: 'Ödendi', color: 'text-green-600' },
    { value: 'REFUNDED', label: 'İade Edildi', color: 'text-orange-600' }
];

interface OrderItem {
    id: string;
    quantity: number;
    price: string;
    product: {
        id: string;
        name: string;
        images: string[];
        slug: string;
    };
}

interface Order {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    trackingNumber: string | null;
    totalAmount: string;
    createdAt: string;
    items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string>('');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        status: '',
        paymentStatus: '',
        trackingNumber: ''
    });

    useEffect(() => {
        params.then(p => setOrderId(p.id));
    }, [params]);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${orderId}`);
                const data = await response.json();

                if (response.ok && data.order) {
                    setOrder(data.order);
                    setFormData({
                        status: data.order.status,
                        paymentStatus: data.order.paymentStatus,
                        trackingNumber: data.order.trackingNumber || ''
                    });
                } else {
                    setError('Sipariş bulunamadı.');
                }
            } catch (err) {
                setError('Bağlantı hatası.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Sipariş güncellendi!');
                setOrder(prev => prev ? { ...prev, ...formData } : null);
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Güncelleme başarısız.');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setSaving(false);
        }
    };

    const currentStatus = STATUS_OPTIONS.find(s => s.value === formData.status);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 size={32} className="animate-spin text-clay" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Sipariş bulunamadı.</p>
                <Link href="/admin/orders" className="text-clay hover:underline mt-4 inline-block">
                    ← Siparişlere Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-charcoal">Sipariş Detayı</h1>
                        <p className="text-gray-500 font-mono">{order.orderNumber}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStatus?.bg} ${currentStatus?.color} font-bold`}>
                    {currentStatus && <currentStatus.icon size={18} />}
                    {currentStatus?.label}
                </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3">
                    <Check size={20} />
                    <span>{success}</span>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <XCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-3 gap-8">
                {/* Left Column - Order Info */}
                <div className="col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-charcoal mb-4">Sipariş Kalemleri</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-16 h-16 bg-white rounded-lg relative overflow-hidden border border-gray-200">
                                        <Image
                                            src={item.product?.images?.[0] || '/images/hero.png'}
                                            alt={item.product?.name || 'Ürün'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-charcoal">{item.product?.name || 'Ürün'}</p>
                                        <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-charcoal">₺{item.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                            <span className="font-bold text-gray-600">Toplam</span>
                            <span className="text-2xl font-black text-charcoal">₺{order.totalAmount}</span>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-charcoal mb-4">Müşteri Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <User size={18} className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">İsim</p>
                                    <p className="font-medium text-charcoal">{order.customerName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Mail size={18} className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">E-posta</p>
                                    <p className="font-medium text-charcoal">{order.customerEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <Phone size={18} className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Telefon</p>
                                    <p className="font-medium text-charcoal">{order.customerPhone || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <MapPin size={18} className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Şehir</p>
                                    <p className="font-medium text-charcoal">{order.city || '-'}</p>
                                </div>
                            </div>
                        </div>
                        {order.shippingAddress && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400 mb-1">Adres</p>
                                <p className="font-medium text-charcoal">{order.shippingAddress}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                    {/* Status Update */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-charcoal mb-4">Durum Güncelle</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Sipariş Durumu</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                                >
                                    {STATUS_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ödeme Durumu</label>
                                <select
                                    value={formData.paymentStatus}
                                    onChange={(e) => setFormData(prev => ({ ...prev, paymentStatus: e.target.value }))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                                >
                                    {PAYMENT_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kargo Takip No</label>
                                <input
                                    type="text"
                                    value={formData.trackingNumber}
                                    onChange={(e) => setFormData(prev => ({ ...prev, trackingNumber: e.target.value }))}
                                    placeholder="Kargo takip numarası..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all font-mono"
                                />
                                <p className="text-xs text-gray-400 mt-1">Kargoda durumuna geçince müşteriye email gönderilir.</p>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full bg-charcoal text-white py-3 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Kaydediliyor...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Kaydet
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Order Meta */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-charcoal mb-4">Sipariş Bilgileri</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sipariş No</span>
                                <span className="font-mono font-bold">{order.orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tarih</span>
                                <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Saat</span>
                                <span className="font-medium">{new Date(order.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
