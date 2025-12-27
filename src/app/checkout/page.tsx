
'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';

// Force dynamic rendering to prevent SSG build errors with Auth
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
    const { items, cartTotal, cartSubtotal, discountAmount, activeCoupon } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        zipCode: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({ id: item.id, quantity: item.quantity })),
                    customer: formData,
                    couponCode: activeCoupon?.code
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Checkout failed');
            }

            if (result.mock) {
                // GTM DataLayer Event - Purchase
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                        event: 'purchase',
                        ecommerce: {
                            transaction_id: result.orderId,
                            value: cartTotal,
                            currency: 'TRY',
                            items: items.map(item => ({
                                item_id: item.id,
                                item_name: item.name,
                                item_variant: item.variantName || '',
                                price: item.price,
                                quantity: item.quantity
                            }))
                        }
                    });
                }

                // Mock success for development
                alert('Development Mode: Payment Simulated. Order ID: ' + result.orderId);
                router.push('/payment/success?orderId=' + result.orderId);
                return;
            }

            if (result.action === 'post_form') {
                // Create invisible form and submit to Shopier
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = result.url;

                Object.entries(result.formData).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = String(value);
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-alabaster flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-2xl font-bold text-charcoal mb-4">Sepetiniz Boş</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                    >
                        Alışverişe Başla
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-alabaster">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <h1 className="text-3xl font-bold text-charcoal mb-8">Ödeme Bilgileri</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Form */}
                    <div className="lg:col-span-2">
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                            <div className="flex items-center gap-2 mb-4 text-sm text-green-600 font-bold bg-green-50 p-3 rounded-lg">
                                <Lock size={16} />
                                SSL ile Güvenli Ödeme
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ad</label>
                                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Soyad</label>
                                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="5XX XXX XX XX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Adres</label>
                                <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none resize-none" />
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">İl</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">İlçe</label>
                                    <input required type="text" name="district" value={formData.district} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Posta Kodu</label>
                                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none" />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-bold text-charcoal mb-6">Sipariş Özeti</h3>

                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-charcoal line-clamp-2">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.quantity} adet</p>
                                            <p className="text-sm font-bold text-sage">{item.price} ₺</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Ara Toplam</span>
                                    <span className="font-bold text-charcoal">{cartSubtotal.toFixed(2)} ₺</span>
                                </div>
                                {activeCoupon && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>İndirim ({activeCoupon.code})</span>
                                        <span className="font-bold">-{discountAmount.toFixed(2)} ₺</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Kargo</span>
                                    <span className="font-bold text-green-600">Ücretsiz</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-charcoal pt-3 border-t border-gray-100">
                                    <span>Toplam</span>
                                    <span>{cartTotal.toFixed(2)} ₺</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-charcoal text-white rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        İşleniyor...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={20} />
                                        Ödemeyi Tamamla
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                "Ödemeyi Tamamla" butonuna bastığınızda güvenli Shopier ödeme sayfasına yönlendirileceksiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
