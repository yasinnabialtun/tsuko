import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { products } from '@/lib/data';
import { ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Tsuko Design`,
        description: product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 px-6 container mx-auto">
                <Link
                    href="/#collection"
                    className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal font-bold uppercase tracking-widest text-xs mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> Koleksiyona Dön
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    {/* Product Image Gallery (Mock single image) */}
                    <div className="relative aspect-[4/5] bg-alabaster rounded-[2rem] overflow-hidden shadow-sm">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8 sticky top-32">
                        <div>
                            <span className="text-clay font-bold tracking-widest uppercase text-sm mb-2 block">
                                {product.category}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black text-charcoal mb-4">{product.name}</h1>
                            <p className="text-3xl font-medium text-charcoal/80">{product.price}</p>
                        </div>

                        <div className="prose prose-lg text-charcoal/70">
                            <p>{product.description}</p>
                            <p>
                                Tsuko stüdyolarında %100 biyo-bozunur PLA filament kullanılarak üretilmiştir.
                                Her bir ürün, katmanlı üretim teknolojisinin karakteristik dokusunu taşır.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 py-8 border-y border-black/5">
                            <div className="flex items-center gap-3 text-sm font-bold text-charcoal/70">
                                <Truck size={20} className="text-clay" />
                                <span>Ücretsiz Kargo</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-charcoal/70">
                                <ShieldCheck size={20} className="text-clay" />
                                <span>Kırılma Garantisi</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-charcoal/70">
                                <Check size={20} className="text-clay" />
                                <span>%100 Doğa Dostu</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-charcoal/70">
                                <Check size={20} className="text-clay" />
                                <span>El İşçiliği Sonlama</span>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="space-y-4">
                            <CouponValidation />

                            <a
                                href={product.shopierUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-6 rounded-2xl text-xl font-bold hover:bg-black transition-all shadow-xl hover:shadow-charcoal/20"
                            >
                                <ShoppingBag size={24} />
                                Shopier ile Güvenle Satın Al
                            </a>
                            <p className="text-xs text-center text-charcoal/40">
                                Ödeme işlemi Shopier altyapısı üzerinden güvenle gerçekleştirilir.
                            </p>

                            <BundleSuggester currentProductId={product.id} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
