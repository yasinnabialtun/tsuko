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
        <div className="min-h-screen bg-[var(--color-sand)] text-black">
            {/* Sticky Mobile Add-to-Cart - POP ART */}
            <AnimatePresence>
                {showSticky && !isOutOfStock && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden bg-white border-t-2 border-black"
                    >
                        <div className="flex items-center gap-4 max-w-lg mx-auto">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border bg-white">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-xs truncate uppercase tracking-tighter text-black">{product.name}</h4>
                                <p className="text-sm font-black text-[var(--color-blue)]">{currentPrice.toFixed(2)} ₺</p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 rounded-lg font-black text-sm uppercase tracking-wide border-2 border-black bg-[var(--color-yellow)] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                            >
                                Sepete Ekle
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-24 md:pt-32 pb-16 md:pb-24 container mx-auto px-6">
                <Breadcrumbs items={[
                    { label: 'Koleksiyon', href: '/collection' },
                    { label: product.category, href: `/collection?category=${product.category.toLowerCase()}` },
                    { label: product.name }
                ]} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mt-8">
                    {/* Gallery Section - Updated Component should handle styles, but ensuring wrapper is clean */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} modelUrl={product.modelUrl} />
                        {isOutOfStock && (
                            <div className="mt-4 bg-charcoal text-white px-6 py-3 rounded-xl font-bold tracking-widest uppercase text-center border-2 border-black">
                                Tükendi
                            </div>
                        )}
                    </div>

                    {/* Content Section - FRAMED & FUN */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-8 bg-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-[var(--color-yellow)] drop-shadow-sm">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                size={16}
                                                fill={i <= Math.round(product.avgRating || 0) ? "currentColor" : "none"}
                                                className={i <= Math.round(product.avgRating || 0) ? "fill-current" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase opacity-60">
                                        {product.reviewCount || 0} DEĞERLENDİRME
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none text-black">
                                    {product.name}
                                </h1>

                                <div className="flex items-end justify-between border-b-2 border-dashed border-black/10 pb-6 mb-6">
                                    <div className="space-y-1">
                                        <p className="text-4xl font-black text-[var(--color-blue)] tracking-tight">{currentPrice.toFixed(2)} ₺</p>
                                        {!isOutOfStock && (
                                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-pink)]">
                                                <Sparkles size={14} />
                                                <span>Stokta Var - Hızlı Gönderim</span>
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
                                        className="p-3 rounded-full bg-gray-100 hover:bg-[var(--color-yellow)] border-2 border-transparent hover:border-black transition-all"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Urgency & Social Proof - High Energy */}
                            {!isOutOfStock && (
                                <div className="flex items-center gap-3 text-sm p-4 rounded-xl bg-[var(--color-purple)] bg-opacity-10 border border-[var(--color-purple)] text-[var(--color-purple)]">
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full animate-ping absolute inset-0 bg-current"></div>
                                        <div className="w-2 h-2 rounded-full relative bg-current"></div>
                                    </div>
                                    <p className="font-bold">
                                        Şuan <span className="underline decoration-2">{viewers} kişi</span> bu renkli parçayı inceliyor!
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

                            {/* Action Area - BIG BUTTONS */}
                            <div className="space-y-4 pt-2">
                                {!isOutOfStock ? (
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full flex items-center justify-center gap-3 py-5 rounded-xl text-lg font-black transition-all relative overflow-hidden group bg-black text-white hover:bg-[var(--color-yellow)] hover:text-black hover:border-black border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest text-sm font-black">
                                            <ShoppingBag size={20} className="mb-1" />
                                            Sepete Ekle
                                        </span>
                                    </button>
                                ) : (
                                    <StockNotifyForm productId={product.id} />
                                )}

                                <div className="grid grid-cols-2 gap-3 text-[10px] font-black tracking-wider uppercase text-center text-black/60">
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-black/5 bg-gray-50">
                                        <Box size={14} />
                                        <span>Güvenli Paket</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-black/5 bg-gray-50">
                                        <Truck size={14} />
                                        <span>Ücretsiz Kargo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Info Tabs - Clean & Sharp */}
                            <div className="space-y-2 pt-4 border-t-2 border-black/5">
                                {sections.map((section) => (
                                    <div key={section.id} className="overflow-hidden border-b border-black/10 last:border-0">
                                        <button
                                            onClick={() => setActiveTab(activeTab === section.id ? '' : section.id)}
                                            className="w-full flex items-center justify-between py-4 transition-colors text-left group hover:text-[var(--color-blue)]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <section.icon size={18} className="opacity-50 group-hover:opacity-100 placeholder:transition-opacity" />
                                                <span className="font-bold text-sm uppercase tracking-wide">{section.title}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={cn("opacity-30 transition-transform duration-300", activeTab === section.id && "rotate-180")}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {activeTab === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <div className="pb-4 leading-relaxed text-sm opacity-80 pl-8">
                                                        {section.content}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bundle / Cross Sell placed outside the sticky box for layout balance */}
                        <div className="mt-8">
                            <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[var(--color-red)]"></span>
                                Birlikte Harika Durur
                            </h3>
                            <BundleSuggester products={product.similarProducts} />
                        </div>
                    </div>
                </div>

                <div className="mt-32 max-w-5xl mx-auto border-t-2 border-black/5 pt-16">
                    <ReviewSection productId={product.id} />
                </div>

                <div className="mt-32">
                    <RecentlyViewed />
                </div>
            </div>
        </div>
    );
}
