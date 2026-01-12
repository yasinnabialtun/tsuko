'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Lock, ShieldCheck, ArrowLeft, Truck, HelpCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function CheckoutContent() {
    const { items, cartTotal, cartSubtotal, discountAmount, activeCoupon } = useCart();
    const router = useRouter();
    const { user, isLoaded: isUserLoaded } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

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
                    items: items.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        variantId: (item as any).variantId
                    })),
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
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[60vh]">
                <div className="w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Lock size={48} />
                </div>
                <h1 className="text-3xl font-black text-black mb-4 tracking-tighter uppercase">Sepetiniz Boş</h1>
                <p className="text-black/60 mb-8 max-w-xs font-bold">Ödeme adımına geçebilmek için sepetinize en az bir tasarım eklemelisiniz.</p>
                <button onClick={() => router.push('/')} className="px-10 py-4 bg-black text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[var(--color-yellow)] hover:text-black border-2 border-transparent hover:border-black uppercase">
                    Koleksiyonu Keşfet
                </button>
            </div>
        );
    }

    return (
        <div className="container-custom pt-24 md:pt-40 pb-20 md:pb-32">
            <div className="flex items-center gap-4 mb-8 md:mb-12">
                <button onClick={() => router.back()} className="w-12 h-12 bg-white rounded-xl border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
                    <ArrowLeft size={24} strokeWidth={3} />
                </button>
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-charcoal)] tracking-tighter uppercase">Güvenli Ödeme</h1>
                    <p className="text-[var(--color-charcoal)]/60 text-xs md:text-sm font-bold">Siparişinizi tamamlamak için bilgilerinizi girin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                {/* Left Side: Forms */}
                <div className="lg:col-span-7">
                    <form
                        ref={formRef}
                        id="checkout-form"
                        onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}
                        className="space-y-12"
                    >

                        {/* Contact Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-[var(--color-purple)] text-white flex items-center justify-center text-lg font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">1</div>
                                <h2 className="text-2xl font-black tracking-tight uppercase">İletişim Bilgileri</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">E-Posta</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">Telefon</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" placeholder="5XX XXX XX XX" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                </div>
                            </div>
                        </section>

                        {/* Shipping Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-[var(--color-pink)] text-white flex items-center justify-center text-lg font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">2</div>
                                <h2 className="text-2xl font-black tracking-tight uppercase">Teslimat Adresi</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">Ad</label>
                                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} autoComplete="given-name" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">Soyad</label>
                                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} autoComplete="family-name" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">Tam Adres</label>
                                    <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} autoComplete="street-address" placeholder="Mahalle, Sokak, No/Daire..." className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 resize-none placeholder:text-black/30" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">İl</label>
                                        <input required type="text" name="city" value={formData.city} onChange={handleChange} autoComplete="address-level1" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">İlçe</label>
                                        <input required type="text" name="district" value={formData.district} onChange={handleChange} autoComplete="address-level2" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60 ml-1">Posta Kodu</label>
                                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} autoComplete="postal-code" className="w-full px-6 py-4 rounded-xl border-4 border-black bg-white focus:bg-[var(--color-yellow)]/10 text-black font-bold outline-none transition-all focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 placeholder:text-black/30" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Terms */}
                        <section className="bg-white p-8 rounded-3xl border-4 border-[var(--color-charcoal)] shadow-[8px_8px_0px_0px_rgba(45,45,45,1)] space-y-4">
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <input required type="checkbox" className="mt-1 w-6 h-6 rounded-lg border-2 border-black text-black focus:ring-0 transition-all cursor-pointer accent-black" />
                                <span className="text-xs text-black/80 leading-relaxed font-bold">
                                    <Link href="/terms" className="underline decoration-2 decoration-[var(--color-pink)] hover:text-[var(--color-pink)]">Mesafeli Satış Sözleşmesi</Link> ve <Link href="/privacy" className="underline decoration-2 decoration-[var(--color-blue)] hover:text-[var(--color-blue)]">KVKK Aydınlatma Metni</Link>'ni okudum, onaylıyorum.
                                </span>
                            </label>
                        </section>

                        {error && (
                            <div className="bg-[var(--color-red)] text-white p-6 rounded-2xl text-sm font-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                ERROR: {error}
                            </div>
                        )}
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-32 space-y-8">

                        <div className="p-8 bg-white rounded-[2rem] border-4 border-[var(--color-charcoal)] shadow-[12px_12px_0px_0px_rgba(45,45,45,1)] space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <ShieldCheck size={120} />
                            </div>

                            <div className="flex items-center justify-between border-b-4 border-black border-dashed pb-6 relative z-10">
                                <h3 className="text-2xl font-black tracking-tight uppercase">Sipariş Özeti</h3>
                                <span className="text-xs font-black uppercase bg-black text-white px-2 py-1 rounded tracking-widest">{items.length} Ürün</span>
                            </div>

                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide relative z-10">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border-2 border-black">
                                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 py-1 flex flex-col justify-between">
                                            <div>
                                                <p className="text-sm font-black text-black leading-tight line-clamp-2 uppercase">{item.name}</p>
                                                <p className="text-[10px] font-bold uppercase text-black/40 mt-1 tracking-widest">{item.quantity} ADET • {item.variantName || 'Standart'}</p>
                                            </div>
                                            <p className="font-black text-[var(--color-purple)]">{item.price.toLocaleString('tr-TR')} ₺</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t-4 border-black border-dashed relative z-10">
                                <div className="flex justify-between text-sm uppercase">
                                    <span className="opacity-40 font-black">Ara Toplam</span>
                                    <span className="font-black">{cartSubtotal.toFixed(2)} ₺</span>
                                </div>
                                {activeCoupon && (
                                    <div className="flex justify-between text-sm text-[var(--color-green)]">
                                        <span className="font-black">İndirim ({activeCoupon.code})</span>
                                        <span className="font-black">-{discountAmount.toFixed(2)} ₺</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="opacity-40 font-black uppercase">Kargo</span>
                                    <span className="font-black text-black bg-[var(--color-green)] px-2 py-0.5 rounded text-[10px] uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Ücretsiz</span>
                                </div>
                                <div className="flex justify-between text-3xl font-black text-black pt-6 mt-2 border-t-4 border-black border-dashed tracking-tighter">
                                    <span>Toplam</span>
                                    <span className="text-[var(--color-blue)]" style={{ WebkitTextStroke: '1px black' }}>{cartTotal.toFixed(2)} ₺</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 bg-[var(--color-green)] text-black rounded-2xl font-black text-xl hover:bg-[var(--color-yellow)] border-4 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100 group relative z-10 active:translate-y-1 active:translate-x-1 active:shadow-none uppercase"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        <span>Sipariş İşleniyor</span>
                                    </>
                                ) : (
                                    <>
                                        <Lock size={24} strokeWidth={2.5} />
                                        <span>Ödemeye Geç</span>
                                    </>
                                )}
                            </button>

                            <div className="flex flex-col gap-4 relative z-10">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-40 justify-center">
                                    <ShieldCheck size={16} />
                                    <span>256-Bit SSL Güvenli Ödeme</span>
                                </div>
                                <p className="text-[10px] text-center text-black/40 leading-relaxed px-4 font-bold">
                                    Ödemeniz Shopier altyapısı ile %100 güvenli bir şekilde gerçekleştirilir. Kart bilgileriniz asla sistemimizde saklanmaz.
                                </p>
                            </div>
                        </div>

                        {/* Trust Badge Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border-2 border-black flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <Truck size={20} strokeWidth={2.5} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Hızlı Teslimat</span>
                            </div>
                            <div className="p-4 bg-white rounded-xl border-2 border-black flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                                <HelpCircle size={20} strokeWidth={2.5} />
                                <span className="text-[10px] font-black uppercase tracking-widest">7/24 Destek</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
