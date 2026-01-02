'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Loader2, Lock, ShieldCheck, ArrowLeft, Truck, HelpCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
    const { items, cartTotal, cartSubtotal, discountAmount, activeCoupon } = useCart();
    const router = useRouter();
    const { user, isLoaded: isUserLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);

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

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isUserLoaded && user) {
            setFormData(prev => ({
                ...prev,
                firstName: prev.firstName || user.firstName || '',
                lastName: prev.lastName || user.lastName || '',
                email: prev.email || user.primaryEmailAddress?.emailAddress || ''
            }));

            fetch('/api/profile/addresses')
                .then(res => res.json())
                .then(data => {
                    if (data.addresses && data.addresses.length > 0) {
                        const defaultAddress = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
                        setFormData(prev => ({
                            ...prev,
                            phone: prev.phone || defaultAddress.phone || '',
                            address: prev.address || defaultAddress.address || '',
                            city: prev.city || defaultAddress.city || '',
                            district: prev.district || defaultAddress.district || '',
                            zipCode: prev.zipCode || defaultAddress.zipCode || ''
                        }));
                    }
                })
                .catch(err => console.error('Failed to fetch addresses', err));
        }
    }, [isUserLoaded, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

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

            if (!response.ok) throw new Error(result.error || 'Checkout failed');

            if (result.mock) {
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
                router.push('/payment/success?orderId=' + result.orderId);
                return;
            }

            if (result.action === 'post_form') {
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
            setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            setLoading(false);
        }
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 bg-current/5 rounded-full flex items-center justify-center mb-8 opacity-20">
                        <Lock size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-charcoal mb-4 tracking-tighter">Sepetiniz Boş</h1>
                    <p className="text-charcoal/40 mb-8 max-w-xs">Ödeme adımına geçebilmek için sepetinize en az bir tasarım eklemelisiniz.</p>
                    <button onClick={() => router.push('/')} className="px-10 py-4 bg-charcoal text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all">
                        KOLEKSİYONU KEŞFET
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="container-custom pt-40 pb-32">
                <div className="flex items-center gap-4 mb-12">
                    <button onClick={() => router.back()} className="w-12 h-12 rounded-full border border-current/10 flex items-center justify-center hover:bg-current/5 transition-all">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-charcoal tracking-tighter">Güvenli Ödeme</h1>
                        <p className="text-charcoal/40 text-sm font-medium">Siparişinizi tamamlamak için bilgilerinizi girin.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side: Forms */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">

                            {/* Contact Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center text-xs font-black">1</div>
                                    <h2 className="text-xl font-bold tracking-tight">İletişim Bilgileri</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">E-Posta</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Telefon</label>
                                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="5XX XXX XX XX" className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center text-xs font-black">2</div>
                                    <h2 className="text-xl font-bold tracking-tight">Teslimat Adresi</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Ad</label>
                                            <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Soyad</label>
                                            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Tam Adres</label>
                                        <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} placeholder="Mahalle, Sokak, No/Daire..." className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium resize-none" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">İl</label>
                                            <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">İlçe</label>
                                            <input required type="text" name="district" value={formData.district} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Posta Kodu</label>
                                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border border-current/10 bg-white/50 focus:bg-white focus:border-clay outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Terms */}
                            <section className="bg-white/30 backdrop-blur-md p-8 rounded-[2rem] border border-current/5 space-y-4">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input required type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-current/10 text-clay focus:ring-clay transition-all" />
                                    <span className="text-xs text-charcoal/60 leading-relaxed group-hover:text-charcoal transition-colors font-medium">
                                        <Link href="/terms" className="underline font-bold">Mesafeli Satış Sözleşmesi</Link> ve <Link href="/privacy" className="underline font-bold">KVKK Aydınlatma Metni</Link>'ni okudum, onaylıyorum.
                                    </span>
                                </label>
                            </section>

                            {error && (
                                <div className="bg-rose/10 text-rose p-6 rounded-2xl text-sm font-bold border border-rose/10">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">

                            <div className="premium-card p-10 bg-white space-y-8">
                                <div className="flex items-center justify-between border-b border-current/5 pb-6">
                                    <h3 className="text-2xl font-bold tracking-tight">Sipariş Özeti</h3>
                                    <span className="text-xs font-black uppercase opacity-20 tracking-widest">{items.length} Ürün</span>
                                </div>

                                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-6 group">
                                            <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-current/5 flex-shrink-0 border border-current/5">
                                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 py-1 flex flex-col justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-charcoal leading-tight line-clamp-2">{item.name}</p>
                                                    <p className="text-[10px] font-black uppercase opacity-30 mt-1 tracking-widest">{item.quantity} ADET • {item.variantName || 'Standart'}</p>
                                                </div>
                                                <p className="font-bold text-charcoal">{item.price.toLocaleString('tr-TR')} ₺</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-current/5">
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-40 font-medium">Ara Toplam</span>
                                        <span className="font-bold">{cartSubtotal.toFixed(2)} ₺</span>
                                    </div>
                                    {activeCoupon && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span className="font-medium">İndirim ({activeCoupon.code})</span>
                                            <span className="font-bold">-{discountAmount.toFixed(2)} ₺</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-40 font-medium">Kargo</span>
                                        <span className="font-bold text-green-600 uppercase tracking-widest text-[10px]">Ücretsiz</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-black text-charcoal pt-6 mt-2 border-t border-current/5 tracking-tighter">
                                        <span>Toplam</span>
                                        <span>{cartTotal.toFixed(2)} ₺</span>
                                    </div>
                                </div>

                                <button
                                    form="checkout-form"
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 bg-charcoal text-white rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 group overflow-hidden relative active:scale-95"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            <span>SİPARİŞ İŞLENİYOR</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock size={20} />
                                            <span>ÖDEMEYE GEÇ</span>
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-40 justify-center">
                                        <ShieldCheck size={16} />
                                        <span>256-Bit SSL Güvenli Ödeme</span>
                                    </div>
                                    <p className="text-[10px] text-center text-charcoal/30 leading-relaxed px-4">
                                        Ödemeniz Shopier altyapısı ile %100 güvenli bir şekilde gerçekleştirilir. Kart bilgileriniz asla sistemimizde saklanmaz.
                                    </p>
                                </div>
                            </div>

                            {/* Trust Badge Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/40 rounded-2xl border border-current/5 flex items-center gap-3">
                                    <Truck size={18} className="opacity-20" />
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Hızlı Teslimat</span>
                                </div>
                                <div className="p-4 bg-white/40 rounded-2xl border border-current/5 flex items-center gap-3">
                                    <HelpCircle size={18} className="opacity-20" />
                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">7/24 Destek</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

