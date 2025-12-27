
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Clock, Star, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';
import { useCart } from '@/context/cart-context';
import Breadcrumb from '@/components/breadcrumb';
import ReviewSection from '@/components/review-section';
import StockNotifyForm from '@/components/stock-notify-form';
import VariantSelector from '@/components/variant-selector';

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
    variants?: any[]; // Add variants support
}

// Mock function to simulate "people viewing"
const getRandomViewers = () => Math.floor(Math.random() * (12 - 4 + 1)) + 4;

export default function ProductPageClient({ product }: { product: ProductData }) {
    const [viewers] = useState(getRandomViewers());
    const [showSticky, setShowSticky] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setShowSticky(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine current price and stock based on variant selection
    const currentPrice = selectedVariant ? selectedVariant.price : product.priceNumber;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    const isOutOfStock = currentStock === 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isOutOfStock) return;

        // If variants exist but none selected, alert user
        if (product.variants && product.variants.length > 0 && !selectedVariant) {
            alert('Lütfen bir seçenek belirleyin');
            return;
        }

        // Add to cart with variant info if selected
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

    return (
        <>
            {/* Sticky Mobile/Desktop CTA Bar */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full bg-white border-t border-black/10 p-4 z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4 md:px-12"
                    >
                        <div className="hidden md:flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal">{product.name}</h4>
                                <p className="text-sm text-charcoal/60">{product.price}</p>
                            </div>
                        </div>
                        <div className="flex-grow md:flex-grow-0 md:w-auto w-full">
                            {!isOutOfStock && (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full md:w-auto px-8 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} />
                                    Sepete Ekle
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-32 pb-24 px-6 container mx-auto">
                <Breadcrumb items={[
                    { label: 'Koleksiyon', href: '/#collection' },
                    { label: product.category, href: `/#collection` },
                    { label: product.name }
                ]} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/5] bg-alabaster rounded-[2rem] overflow-hidden shadow-sm group">
                            <Image
                                src={product.images[selectedImage] || product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-charcoal shadow-sm">
                                %100 Orijinal Tasarım
                            </div>
                            {isOutOfStock && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <span className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg">
                                        STOKTA YOK
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail gallery */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? 'border-charcoal'
                                            : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8 sticky top-32">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-orange-400">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <span className="text-xs font-bold text-charcoal/60">(24 Değerlendirme)</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <p className="text-3xl font-bold text-sage">{currentPrice.toFixed(2)} ₺</p>
                                <span className="bg-rose/10 text-rose px-2 py-1 rounded-md text-xs font-bold">Ücretsiz Kargo</span>
                            </div>

                            {/* Stock Warning or Urgency */}
                            {isOutOfStock ? (
                                <StockNotifyForm productId={product.id} />
                            ) : (
                                <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-center gap-3 animate-pulse">
                                    <Clock size={18} className="text-orange-600" />
                                    <p className="text-sm font-bold text-orange-800">
                                        Şu an <span className="font-black">{viewers} kişi</span> bu ürünü inceliyor.
                                        {currentStock < 5 && ` Sadece ${currentStock} adet kaldı!`}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Variant Selector */}
                        {product.variants && product.variants.length > 0 && (
                            <VariantSelector
                                variants={product.variants}
                                onSelect={setSelectedVariant}
                            />
                        )}

                        <div className="prose prose-lg text-charcoal/70">
                            <p>{product.description}</p>
                        </div>

                        {/* Trust Signals Grid */}
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-black/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-alabaster flex items-center justify-center text-clay">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Kırılmazlık</p>
                                    <p className="text-xs text-charcoal/50">Garantili Kargo</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-alabaster flex items-center justify-center text-clay">
                                    <Check size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-charcoal">Doğa Dostu</p>
                                    <p className="text-xs text-charcoal/50">PLA Materyal</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Components */}
                        <div className="space-y-6">
                            <CouponValidation />

                            {!isOutOfStock && (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center gap-3 py-6 rounded-2xl text-xl font-bold transition-all shadow-xl bg-charcoal text-white hover:bg-black hover:shadow-2xl hover:-translate-y-1 shadow-charcoal/10"
                                >
                                    <ShoppingBag size={24} />
                                    Sepete Ekle
                                </button>
                            )}

                            <p className="text-[10px] text-center text-charcoal/40 flex items-center justify-center gap-2">
                                <ShieldCheck size={12} />
                                Güvenli Ödeme Altyapısı ve 14 Gün İade Garantisi
                            </p>

                            <BundleSuggester products={product.similarProducts} />
                        </div>
                    </div>
                </div>

                <div className="mt-24 max-w-4xl mx-auto">
                    <ReviewSection productId={product.id} />
                </div>
            </div>
        </>
    );
}
