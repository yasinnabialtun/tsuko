import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';
import { prisma } from '@/lib/prisma';
import Breadcrumbs from '@/components/breadcrumbs';
import ProductPageClient from './client';
import { getCategoryTheme, cn } from '@/lib/utils';
import { Product } from '@/types';

// SSR with revalidation
export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) return { title: 'Ürün Bulunamadı' };

    return {
        title: `${product.name} | Tsuko Design`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0] || '/images/hero.png'],
        }
    };
}

// Generate static params for known products
export async function generateStaticParams() {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true }
        });
        return products.map((p: { slug: string }) => ({ id: p.slug }));
    } catch {
        return [];
    }
}

// Fetch product from database
async function getProduct(idOrSlug: string) {
    try {
        // Try by slug first, then by ID
        let product = await prisma.product.findUnique({
            where: { slug: idOrSlug },
            include: {
                category: true,
                variants: true,
                reviews: {
                    select: { rating: true }
                }
            }
        });

        if (!product) {
            product = await prisma.product.findUnique({
                where: { id: idOrSlug },
                include: {
                    category: true,
                    variants: true,
                    reviews: {
                        select: { rating: true }
                    }
                }
            });
        }

        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Fetch similar products based on category
async function getSimilarProducts(currentProductId: string, categoryId: string) {
    try {
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                categoryId: categoryId,
                id: { not: currentProductId }
            },
            take: 3,
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                slug: true
            }
        });

        // If not enough products in category, fetch random ones
        if (products.length < 2) {
            const randomProducts = await prisma.product.findMany({
                where: {
                    isActive: true,
                    id: { not: currentProductId, notIn: products.map((p: { id: string }) => p.id) }
                },
                take: 3 - products.length,
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    slug: true
                }
            });
            products.push(...randomProducts);
        }

        return products.map((p: { id: string; name: string; price: any; images: string[]; slug: string }) => ({
            id: p.id,
            name: p.name,
            price: `${p.price.toString()} ₺`,
            image: p.images[0] || '/images/hero.png',
            slug: p.slug
        }));
    } catch {
        return [];
    }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product || !product.isActive) {
        notFound();
    }

    const similarProducts = await getSimilarProducts(product.id, product.categoryId);

    const reviewCount = product.reviews.length;
    const avgRating = reviewCount > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        : 5; // Default 5 if no reviews for aesthetic

    // Transform to frontend format
    const productData = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: `${product.price.toString()} ₺`,
        priceNumber: parseFloat(product.price.toString()),
        category: product.category?.name || 'Tasarım',
        image: product.images[0] || '/images/hero.png',
        images: product.images,
        description: product.description || '',
        stock: product.stock,
        avgRating,
        reviewCount,
        variants: product.variants as any[],
        modelUrl: (product as any).modelUrl || null,
        shopierUrl: `https://www.shopier.com/tsukodesign/${product.slug}`,
        similarProducts: similarProducts
    };

    // Schema.org Product structured data
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        aggregateRating: reviewCount > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: avgRating,
            reviewCount: reviewCount
        } : undefined,
        image: product.images[0]?.startsWith('http')
            ? product.images[0]
            : (product.images[0] ? `https://tsukodesign.com${product.images[0]}` : undefined),
        offers: {
            '@type': 'Offer',
            priceCurrency: 'TRY',
            price: product.price.toString(),
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Tsuko Design'
            }
        }
    };

    const themeClass = getCategoryTheme(product.category?.name);

    return (
        <main className={cn("min-h-screen transition-colors duration-1000", themeClass)}>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <Navbar />

            <ProductPageClient product={productData as any} />

            <Footer />
        </main>
    );
}
