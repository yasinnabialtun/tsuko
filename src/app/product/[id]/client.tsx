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

    const { addToCart, toggleCart } = useCart();
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
                        className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden bg-white border-t-4 border-black shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]"
                    >
                        <div className="flex items-center gap-4 max-w-lg mx-auto">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-black bg-white shadow-sm">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-xs truncate uppercase tracking-tighter text-black">{product.name}</h4>
                                <p className="text-sm font-black text-[var(--color-purple)]">{currentPrice.toFixed(2)} ₺</p>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-black bg-black text-white active:bg-[var(--color-yellow)] active:text-black transition-colors"
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
                    {/* Gallery Section */}
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} name={product.name} modelUrl={product.modelUrl} />
                        {isOutOfStock && (
                            <div className="mt-4 bg-black text-white px-6 py-4 rounded-xl font-black tracking-[0.2em] uppercase text-center border-4 border-dashed border-white shadow-xl rotate-1">
                                🚧 Stoklar Tükendi 🚧
                            </div>
                        )}
                    </div>

                    {/* Content Section - FRAMED & FUN */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32 space-y-8 bg-white p-6 md:p-8 rounded-[2rem] border-4 border-[var(--color-charcoal)] shadow-[12px_12px_0px_0px_rgba(45,45,45,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_rgba(45,45,45,1)] transition-all">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex text-[var(--color-yellow)] drop-shadow-[1px_1px_0px_black]">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star
                                                key={i}
                                                size={18}
                                                fill={i <= Math.round(product.avgRating || 0) ? "currentColor" : "none"}
                                                strokeWidth={2.5}
                                                className={i <= Math.round(product.avgRating || 0) ? "fill-current text-[var(--color-yellow)] stroke-black" : "text-gray-300 stroke-gray-400"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase bg-black text-white px-2 py-0.5 rounded">
                                        {product.reviewCount || 0} Yorum
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-[0.9] text-black uppercase drop-shadow-sm">
                                    {product.name}
                                </h1>

                                <div className="flex items-end justify-between border-b-4 border-black border-dashed pb-6 mb-6">
                                    <div className="space-y-1">
                                        <p className="text-4xl md:text-5xl font-extrabold text-[var(--color-blue)] tracking-tighter" style={{ WebkitTextStroke: '1px var(--color-charcoal)' }}>{currentPrice.toFixed(2)} ₺</p>
                                        {!isOutOfStock && (
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-green)] bg-[var(--color-green)]/10 px-2 py-1 rounded w-fit">
                                                <Sparkles size={12} fill="currentColor" />
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
                                        className="p-3 rounded-xl bg-[var(--color-sand)] hover:bg-[var(--color-pink)] border-2 border-black transition-all hover:-rotate-12 hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <Share2 size={20} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                            {/* Urgency & Social Proof - High Energy */}
                            {!isOutOfStock && (
                                <div className="flex items-center gap-3 text-sm p-4 rounded-xl bg-[var(--color-purple)] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                                    <div className="relative flex items-center justify-center w-6 h-6 bg-white rounded-full border border-black">
                                        <div className="w-2 h-2 rounded-full animate-ping absolute bg-[var(--color-red)]"></div>
                                        <div className="w-2 h-2 rounded-full relative bg-[var(--color-red)]"></div>
                                    </div>
                                    <p className="font-bold text-xs">
                                        Şuan <span className="font-black underline decoration-white decoration-2">{viewers} kişi</span> bu parçayı inceliyor! 👀
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
                                        className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-xl font-bold transition-all relative overflow-hidden group bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-yellow)] hover:text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] border-4 border-transparent shadow-[4px_4px_0px_0px_rgba(45,45,45,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(45,45,45,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none"
                                    >
                                        <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest font-black transform group-hover:scale-105 transition-transform">
                                            <ShoppingBag size={24} strokeWidth={3} className="mb-1" />
                                            Sepete At
                                        </span>
                                    </button>
                                ) : (
                                    <StockNotifyForm productId={product.id} />
                                )}

                                <div className="grid grid-cols-2 gap-3 text-[10px] font-black tracking-wider uppercase text-center text-black">
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black bg-[var(--color-sand)] shadow-sm">
                                        <Box size={16} strokeWidth={2.5} />
                                        <span>Güvenli Paket</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black bg-[var(--color-sand)] shadow-sm">
                                        <Truck size={16} strokeWidth={2.5} />
                                        <span>Hızlı Kargo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Collapsible Info Tabs - Clean & Sharp */}
                            <div className="space-y-3 pt-6 border-t-4 border-black border-dashed">
                                {sections.map((section) => (
                                    <div key={section.id} className="overflow-hidden border-2 border-black rounded-xl bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                                        <button
                                            onClick={() => setActiveTab(activeTab === section.id ? '' : section.id)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 transition-colors text-left group",
                                                activeTab === section.id ? "bg-black text-white" : "hover:bg-[var(--color-sand)]"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <section.icon size={20} strokeWidth={2.5} className={cn(activeTab === section.id ? "text-[var(--color-yellow)]" : "text-black")} />
                                                <span className="font-black text-xs uppercase tracking-widest">{section.title}</span>
                                            </div>
                                            <ChevronDown
                                                size={20}
                                                strokeWidth={3}
                                                className={cn("transition-transform duration-300", activeTab === section.id && "rotate-180")}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {activeTab === section.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    <div className="p-4 pt-2 leading-relaxed text-sm font-medium border-t-2 border-black/10 text-black/80">
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
                        <div className="mt-8 relative z-10">
                            <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2 bg-black text-white px-4 py-2 w-fit rounded-lg -rotate-1 border-2 border-white shadow-lg">
                                <Sparkles size={14} className="text-[var(--color-yellow)]" />
                                Birlikte Harika Durur
                            </h3>
                            <BundleSuggester products={product.similarProducts} />
                        </div>
                    </div>
                </div>

                <div className="mt-32 max-w-5xl mx-auto border-t-4 border-dashed border-black pt-16">
                    <ReviewSection productId={product.id} />
                </div>

                <div className="mt-32">
                    <RecentlyViewed />
                </div>
            </div>
        </div>
    );
}
