'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ORDER_STATUSES = {
    PENDING: { label: 'Sipariş Alındı', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', step: 1 },
    PREPARING: { label: 'Hazırlanıyor', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', step: 2 },
    SHIPPED: { label: 'Kargoya Verildi', icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', step: 3 },
    DELIVERED: { label: 'Teslim Edildi', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', step: 4 },
    CANCELLED: { label: 'İptal Edildi', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', step: 0 }
};

interface OrderData {
    orderNumber: string;
    status: keyof typeof ORDER_STATUSES;
    customerName: string;
    createdAt: string;
    totalAmount: string;
    trackingNumber?: string;
    items: Array<{ name: string; quantity: number; price: string }>;
}

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const response = await fetch(`/api/orders/track?orderNumber=${orderNumber}`);
            const data = await response.json();

            if (response.ok && data.order) {
                setOrder(data.order);
            } else {
                setError(data.error || 'Sipariş bulunamadı.');
            }
        } catch (err) {
            setError('Bağlantı hatası. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const statusInfo = order ? ORDER_STATUSES[order.status] : null;

    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-2xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-6">
                            <Package size={32} className="text-clay" />
                        </div>
                        <h1 className="text-4xl font-black text-charcoal mb-4">Sipariş Takibi</h1>
                        <p className="text-charcoal/60">Sipariş numaranızı girerek durumunu öğrenin.</p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="mb-12">
                        <div className="flex gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={20} />
                                <input
                                    type="text"
                                    placeholder="Örn: TSK-ABC123"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-black/10 focus:border-clay focus:ring-2 focus:ring-clay/20 transition-all outline-none font-mono text-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-charcoal text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Aranıyor...' : 'Sorgula'}
                            </button>
                        </div>
                    </form>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 mb-8"
                        >
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    {/* Order Result */}
                    {order && statusInfo && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-black/5 overflow-hidden"
                        >
                            {/* Header */}
                            <div className={`p-6 ${statusInfo.bg} border-b border-black/5`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-charcoal/60 mb-1">Sipariş No</p>
                                        <p className="font-mono font-bold text-charcoal">{order.orderNumber}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bg} ${statusInfo.color} font-bold text-sm`}>
                                        <statusInfo.icon size={18} />
                                        {statusInfo.label}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Steps */}
                            {order.status !== 'CANCELLED' && (
                                <div className="p-6 border-b border-black/5">
                                    <div className="flex justify-between relative">
                                        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-clay rounded-full transition-all duration-500"
                                                style={{ width: `${(statusInfo.step / 4) * 100}%` }}
                                            />
                                        </div>
                                        {[
                                            { step: 1, label: 'Alındı', icon: Clock },
                                            { step: 2, label: 'Hazırlanıyor', icon: Package },
                                            { step: 3, label: 'Kargoda', icon: Truck },
                                            { step: 4, label: 'Teslim', icon: CheckCircle }
                                        ].map((s) => (
                                            <div key={s.step} className="relative z-10 flex flex-col items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.step >= s.step ? 'bg-clay text-white' : 'bg-gray-200 text-gray-400'
                                                    }`}>
                                                    <s.icon size={16} />
                                                </div>
                                                <span className="text-xs font-medium text-charcoal/60 mt-2">{s.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Order Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm text-charcoal/50">Müşteri</p>
                                        <p className="font-bold text-charcoal">{order.customerName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-charcoal/50">Sipariş Tarihi</p>
                                        <p className="font-bold text-charcoal">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-charcoal/50">Toplam Tutar</p>
                                        <p className="font-bold text-charcoal">₺{order.totalAmount}</p>
                                    </div>
                                    {order.trackingNumber && (
                                        <div>
                                            <p className="text-sm text-charcoal/50">Kargo Takip No</p>
                                            <p className="font-mono font-bold text-clay">{order.trackingNumber}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Items */}
                                {order.items && order.items.length > 0 && (
                                    <div className="border-t border-black/5 pt-6">
                                        <p className="text-sm font-bold text-charcoal/50 mb-4">Ürünler</p>
                                        <div className="space-y-3">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center p-3 bg-alabaster rounded-xl">
                                                    <div>
                                                        <p className="font-bold text-charcoal">{item.name}</p>
                                                        <p className="text-sm text-charcoal/50">Adet: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-bold text-charcoal">₺{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Help Box */}
                    <div className="mt-12 p-6 bg-white rounded-2xl border border-black/5 text-center">
                        <p className="text-charcoal/60 mb-4">Siparişinizle ilgili sorunuz mu var?</p>
                        <a
                            href="mailto:info@tsukodesign.com"
                            className="inline-flex items-center gap-2 text-clay font-bold hover:underline"
                        >
                            Bize yazın →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
