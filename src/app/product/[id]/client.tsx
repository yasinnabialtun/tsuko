'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Star, ChevronDown, Share2, Truck, Box, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useCart } from '@/context/cart-context';
import Breadcrumbs from '@/components/breadcrumbs';
import ReviewSection from '@/components/review-section';
import StockNotifyForm from '@/components/stock-notify-form';
import VariantSelector from '@/components/variant-selector';
import { useRecentProducts } from '@/hooks/use-recent-products';
import ProductGallery from '@/components/product-gallery';
import RecentlyViewed from '@/components/recently-viewed';
import BundleSuggester from '@/components/bundle-suggester';
import { cn } from '@/lib/utils';
interface Variant {
    id: string;
    title: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, any>;
    images: string[];
}

interface Suggestion {
    id: string;
    name: string;
    price: string;
    image: string;
    slug: string;
}

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
    similarProducts: Suggestion[];
    variants?: Variant[];
    avgRating?: number;
    reviewCount?: number;
    modelUrl?: string | null;
}

const getRandomViewers = () => Math.floor(Math.random() * (8 - 3 + 1)) + 3;

export default function ProductPageClient({ product }: { product: ProductData }) {
    const { scrollY } = useScroll();
    const [viewers] = useState(getRandomViewers());
    const [showSticky, setShowSticky] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [activeTab, setActiveTab] = useState('details');

    const { addToCart } = useCart();
    const { addProduct } = useRecentProducts();

    useEffect(() => {
        addProduct({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
            category: product.category
        });
    }, [product]);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setShowSticky(latest > 600);
        });
    }, [scrollY]);

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
            title: 'Tasarım & Form',
            content: "Tsuko tasarımları, modern minimalizmin en dinamik detaylarını evinize taşır. İleri teknoloji üretim teknikleriyle hazırlanan her bir parça, pürüzsüz geometrisi ve canlı renk paletiyle mekanın enerjisini tazeler. Modern yaşam alanları için şık bir tamamlayıcıdır.",
            icon: Box
        },


        {
            id: 'shipping',
            title: 'Teslimat & Paketleme',
            content: "Ürünlerimiz, yolculukları sırasında zarar görmemeleri için darbelere dayanıklı özel kutularda paketlenir. Siparişiniz size kusursuz bir şekilde ulaşana kadar bizim güvencemiz altındadır.",
            icon: Truck
        },
        {
            id: 'faq',
            title: 'Sıkça Sorulan Sorular',
            content: (
                <div className="space-y-4">
                    <div>
                        <p className="font-bold mb-1">Ürünler su geçirir mi?</p>
                        <p className="text-xs">Tüm vazolarımız, özel iç kaplama sayesinde %100 su sızdırmazdır. Canlı çiçekleriniz için güvenle kullanabilirsiniz.</p>
                    </div>
                    <div>
                        <p className="font-bold mb-1">Nasıl temizlemeliyim?</p>
                        <p className="text-xs">Nemli bir bezle silmeniz yeterlidir. Bulaşık makinesinde yıkama tavsiye edilmez, yüksek ısı formun bozulmasına neden olabilir.</p>
                    </div>
                    <div>
                        <p className="font-bold mb-1">Kendi tasarımımı bastırabilir miyim?</p>
                        <p className="text-xs">Tabii ki! Özel projeleriniz ve kişiselleştirilmiş tasarımlarınız için bizlerle 'İletişim' sayfasından iletişime geçebilirsiniz.</p>
                    </div>
                </div>
            ),
            icon: MessageCircle
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--mood-bg)', color: 'var(--mood-text)' }}>
            {/* Sticky Mobile Add-to-Cart */}
            <AnimatePresence>
                {showSticky && !isOutOfStock && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
                        style={{ backgroundColor: 'var(--mood-card-bg)', borderTop: '1px solid rgba(var(--mood-text), 0.05)' }}
                    >
                        <div className="flex items-center gap-4 max-w-lg mx-auto">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-black/5">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-xs truncate uppercase tracking-tighter" style={{ color: 'var(--mood-text)' }}>{product.name}</h4>
                                <p className="text-sm font-black" style={{ color: 'var(--mood-accent)' }}>{currentPrice.toFixed(2)} ₺</p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all"
                                style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}
                            >
                                Sepete Ekle
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-32 pb-24 container mx-auto px-6">
                <Breadcrumbs items={[
                    { label: 'Koleksiyon', href: '/collection' },
                    { label: product.category, href: `/collection?category=${product.category.toLowerCase()}` },
                    { label: product.name }
                ]} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mt-8">
                    {/* Gallery Section */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} modelUrl={product.modelUrl} />
                        {isOutOfStock && (
                            <div className="mt-4 bg-charcoal text-white px-6 py-3 rounded-xl font-bold tracking-widest uppercase text-center">
                                Tükendi
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-10">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex" style={{ color: 'var(--mood-accent)' }}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill={i <= Math.round(product.avgRating || 0) ? "currentColor" : "none"}
                                                className={i <= Math.round(product.avgRating || 0) ? "" : "opacity-20"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold tracking-widest uppercase opacity-40">
                                        {product.reviewCount || 0} DEĞERLENDİRME
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight leading-tight" style={{ color: 'var(--mood-text)' }}>
                                    {product.name}
                                </h1>

                                <div className="flex items-end justify-between border-b pb-8" style={{ borderColor: 'rgba(var(--mood-text), 0.1)' }}>
                                    <div className="space-y-2">
                                        <p className="text-3xl font-medium" style={{ color: 'var(--mood-text)' }}>{currentPrice.toFixed(2)} ₺</p>
                                        {!isOutOfStock && (
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--mood-accent)' }}>
                                                <Clock size={14} />
                                                <span>Aynı Gün Kargo</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: product.name,
                                                    text: product.description,
                                                    url: window.location.href,
                                                });
                                            } else {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('Bağlantı kopyalandı!');
                                            }
                                        }}
                                        className="p-3 rounded-full transition-colors opacity-40 hover:opacity-100"
                                        style={{ backgroundColor: 'rgba(var(--mood-text), 0.05)' }}
                                    >
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Urgency & Social Proof */}
                            {!isOutOfStock && (
                                <div className="flex items-center gap-3 text-sm p-4 rounded-xl" style={{ backgroundColor: 'rgba(var(--mood-text), 0.05)', color: 'var(--mood-text)' }}>
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full animate-ping absolute inset-0" style={{ backgroundColor: 'var(--mood-accent)' }}></div>
                                        <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: 'var(--mood-accent)' }}></div>
                                    </div>
                                    <p className="opacity-80">
                                        Şu an <span className="font-bold">{viewers} kişi</span> inceliyor.
                                        {currentStock < 5 && <span className="font-bold ml-1" style={{ color: 'var(--mood-accent)' }}>Son {currentStock} ürün!</span>}
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
                                        className="w-full flex items-center justify-center gap-3 py-5 rounded-xl text-lg font-bold transition-all shadow-xl relative overflow-hidden group hover:scale-[1.02]"
                                        style={{ backgroundColor: 'var(--mood-accent)', color: 'var(--mood-bg)' }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm font-black">
                                            <ShoppingBag size={20} />
                                            Sepete Ekle
                                        </span>
                                    </button>
                                ) : (
                                    <StockNotifyForm productId={product.id} />
                                )}

                                <div className="grid grid-cols-2 gap-4 text-[11px] font-bold tracking-wider opacity-50 uppercase text-center">

                                    <div className="flex items-center justify-center gap-2 py-3 rounded-lg border" style={{ borderColor: 'rgba(var(--mood-text), 0.1)', backgroundColor: 'rgba(var(--mood-text), 0.02)' }}>
                                        <Sparkles size={14} />
                                        <span className="mt-0.5">Modern Form</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-lg border" style={{ borderColor: 'rgba(var(--mood-text), 0.1)', backgroundColor: 'rgba(var(--mood-text), 0.02)' }}>
                                        <Truck size={14} />
                                        <span className="mt-0.5">Hızlı Teslimat</span>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Info Tabs - Elite UX */}
                            <div className="space-y-2 pt-8">
                                {sections.map((section) => (
                                    <div key={section.id} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(var(--mood-text), 0.1)' }}>
                                        <button
                                            onClick={() => setActiveTab(activeTab === section.id ? '' : section.id)}
                                            className="w-full flex items-center justify-between p-4 transition-colors text-left"
                                            style={{ backgroundColor: 'transparent' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <section.icon size={18} className="opacity-40" />
                                                <span className="font-bold text-sm uppercase tracking-wide">{section.title}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={cn("opacity-20 transition-transform duration-300", activeTab === section.id && "rotate-180")}
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
                                                    <div className="p-4 pt-0 leading-relaxed text-sm opacity-70" style={{ backgroundColor: 'rgba(var(--mood-text), 0.02)' }}>
                                                        {section.content}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Bundle / Cross Sell */}
                            <div className="pt-8 border-t" style={{ borderColor: 'rgba(var(--mood-text), 0.1)' }}>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Birlikte Harika Durur</h3>
                                <div className="opacity-90">
                                    <BundleSuggester products={product.similarProducts} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 max-w-5xl mx-auto border-t pt-16" style={{ borderColor: 'rgba(var(--mood-text), 0.1)' }}>
                    <ReviewSection productId={product.id} />
                </div>

                <div className="mt-32">
                    <RecentlyViewed />
                </div>
            </div>
        </div>
    );
}
