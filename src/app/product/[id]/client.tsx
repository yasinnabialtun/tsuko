
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Clock, Star, Minus, Plus, ChevronDown, Share2, Truck, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';
import { useCart } from '@/context/cart-context';
import Breadcrumb from '@/components/breadcrumb';
import ReviewSection from '@/components/review-section';
import StockNotifyForm from '@/components/stock-notify-form';
import VariantSelector from '@/components/variant-selector';
import { cn } from '@/lib/utils';

interface ProductData {
    id: string;
    name: string;
    slug: string;
    price: string;
    priceNumber: number;
    category: string;
    image: string;
    images: string[];
    description: string;
    stock: number;
    shopierUrl: string;
    similarProducts: any[];
    variants?: any[];
}

const getRandomViewers = () => Math.floor(Math.random() * (8 - 3 + 1)) + 3;

export default function ProductPageClient({ product }: { product: ProductData }) {
    const [viewers] = useState(getRandomViewers());
    const [showSticky, setShowSticky] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('details'); // details, specs, shipping

    const { addToCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 800);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentPrice = selectedVariant ? selectedVariant.price : product.priceNumber;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    const isOutOfStock = currentStock === 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOutOfStock) return;
        if (product.variants && product.variants.length > 0 && !selectedVariant) {
            alert('Lütfen bir seçenek belirleyin');
            return;
        }

        if (selectedVariant) {
            addToCart(product, 1, {
                id: selectedVariant.id,
                name: selectedVariant.title,
                price: selectedVariant.price,
                stock: selectedVariant.stock,
                image: selectedVariant.images?.[0]
            });
        } else {
            addToCart(product);
        }
    };

    const sections = [
        {
            id: 'details',
            title: 'Ürün Hikayesi',
            content: product.description,
            icon: Star
        },
        {
            id: 'specs',
            title: 'Malzeme & İşçilik',
            content: "Tsuko Design objeleri, doğadan ilham alır. Kullandığımız organik biyo-polimer (PLA+), mısır nişastasından elde edilen, sürdürülebilir ve toksik olmayan bir materyaldir. Her bir obje, parametrik algoritmalarla tasarlanır ve 18 saati bulan hassas katmanlama süreciyle fiziksel forma kavuşur. Dokunduğunuzda, dijital zanaatin izlerini hissedeceksiniz.",
            icon: Box
        },
        {
            id: 'shipping',
            title: 'Teslimat & Garanti',
            content: "Tüm siparişler özel korumalı ambalajlarda gönderilir. Kargo sırasında oluşabilecek her türlü hasara karşı Tsuko Design %100 değişim garantisi sunar. Siparişiniz 1-3 iş günü içinde kargoya teslim edilir. Memnun kalmazsanız 14 gün içinde iade edebilirsiniz.",
            icon: Truck
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Sticky Bar - Minimal & Efficient */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-stone/20 p-4 z-[60] shadow-[0_-5px_30px_rgba(0,0,0,0.05)] md:px-12"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="hidden md:flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone/20">
                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-charcoal text-sm">{product.name}</h4>
                                    <p className="text-xs text-charcoal/60">{currentPrice.toFixed(2)} ₺</p>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="w-full md:w-auto px-8 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-clay transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag size={18} />
                                {isOutOfStock ? 'Stokta Yok' : 'Sepete Ekle'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-32 pb-24 container mx-auto px-6">
                <Breadcrumb items={[
                    { label: 'Koleksiyon', href: '/#collection' },
                    { label: product.category, href: `/#collection` },
                    { label: product.name }
                ]} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mt-8">
                    {/* Gallery Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative aspect-[4/5] bg-stone/10 rounded-[2rem] overflow-hidden group">
                            <Image
                                src={product.images[selectedImage] || product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                priority
                            />
                            {isOutOfStock && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                                    <span className="bg-charcoal text-white px-6 py-3 rounded-xl font-bold tracking-widest uppercase">
                                        Tükendi
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                                            selectedImage === index ? 'border-charcoal opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                        )}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-10">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-clay">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs font-bold tracking-widest text-charcoal/40 uppercase">Elite Collection</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-4 tracking-tight leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-end gap-4 border-b border-stone/30 pb-8">
                                    <p className="text-3xl font-medium text-charcoal">{currentPrice.toFixed(2)} ₺</p>
                                </div>
                            </div>

                            {/* Urgency & Social Proof */}
                            {!isOutOfStock && (
                                <div className="flex items-center gap-3 text-sm text-charcoal/70 bg-stone/10 p-4 rounded-xl">
                                    <div className="relative">
                                        <div className="w-2 h-2 bg-clay rounded-full animate-ping absolute inset-0"></div>
                                        <div className="w-2 h-2 bg-clay rounded-full relative"></div>
                                    </div>
                                    <p>
                                        Şu an <span className="font-bold text-charcoal">{viewers} kişi</span> inceliyor.
                                        {currentStock < 5 && <span className="text-clay font-bold ml-1">Son {currentStock} ürün!</span>}
                                    </p>
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants && product.variants.length > 0 && (
                                <VariantSelector
                                    variants={product.variants}
                                    onSelect={setSelectedVariant}
                                />
                            )}

                            {/* Action Area */}
                            <div className="space-y-4">
                                {!isOutOfStock ? (
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full flex items-center justify-center gap-3 py-5 rounded-xl text-lg font-bold transition-all shadow-xl bg-charcoal text-white hover:bg-clay hover:shadow-2xl hover:-translate-y-1 shadow-charcoal/10 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <ShoppingBag size={20} />
                                            Sepete Ekle
                                        </span>
                                    </button>
                                ) : (
                                    <StockNotifyForm productId={product.id} />
                                )}

                                <div className="grid grid-cols-2 gap-4 text-[11px] font-bold tracking-wider text-charcoal/50 uppercase text-center">
                                    <div className="flex items-center justify-center gap-2 bg-stone/5 py-3 rounded-lg border border-stone/20">
                                        <ShieldCheck size={14} />
                                        <span className="mt-0.5">%100 Kırılma Garantisi</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 bg-stone/5 py-3 rounded-lg border border-stone/20">
                                        <Truck size={14} />
                                        <span className="mt-0.5">Hızlı Teslimat</span>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Info Tabs - Elite UX */}
                            <div className="space-y-2 pt-8">
                                {sections.map((section) => (
                                    <div key={section.id} className="border border-stone/20 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setActiveTab(activeTab === section.id ? '' : section.id)}
                                            className="w-full flex items-center justify-between p-4 bg-white hover:bg-stone/5 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <section.icon size={18} className="text-mauve" />
                                                <span className="font-bold text-sm text-charcoal uppercase tracking-wide">{section.title}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={cn("text-stone transition-transform duration-300", activeTab === section.id && "rotate-180")}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {activeTab === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="p-4 pt-0 text-charcoal/70 leading-relaxed text-sm border-t border-stone/10 bg-stone/5">
                                                        {section.content}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Bundle / Cross Sell */}
                            <div className="pt-8 border-t border-stone/30">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-charcoal mb-4">Birlikte Harika Durur</h3>
                                <BundleSuggester products={product.similarProducts} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 max-w-5xl mx-auto border-t border-stone/20 pt-16">
                    <ReviewSection productId={product.id} />
                </div>
            </div>
        </div>
    );
}
