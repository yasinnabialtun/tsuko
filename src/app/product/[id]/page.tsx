import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowLeft, Check, ShoppingBag, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import CouponValidation from '@/components/coupon-validation';
import BundleSuggester from '@/components/bundle-suggester';
import { prisma } from '@/lib/prisma';
import ProductPageClient from './client';

// SSR with revalidation
export const revalidate = 60; // Revalidate every minute

// Generate static params for known products
export async function generateStaticParams() {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true }
        });
        return products.map((p) => ({ id: p.slug }));
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
                variants: true
            }
        });

        if (!product) {
            product = await prisma.product.findUnique({
                where: { id: idOrSlug },
                include: {
                    category: true,
                    variants: true
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
                    id: { not: currentProductId, notIn: products.map(p => p.id) }
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

        return products.map(p => ({
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
        description: product.description,
        stock: product.stock,
        // Generate Shopier URL from product data or use placeholder
        shopierUrl: `https://www.shopier.com/tsukodesign/${product.slug}`,
        similarProducts: similarProducts
    };

    // Schema.org Product structured data
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images[0] ? `https://tsukodesign.com${product.images[0]}` : undefined,
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

    return (
        <main className="min-h-screen bg-white">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <Navbar />

            {/* Client component for interactive elements */}
            <ProductPageClient product={productData} />

            <Footer />
        </main>
    );
}
