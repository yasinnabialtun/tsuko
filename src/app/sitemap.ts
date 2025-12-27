import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tsukodesign.com';

    // Static Pages
    const staticRoutes = [
        '',
        '/blog',
        '/products', // This might be a category page or removed if handled by homepage
        '/contact',
        '/#collection',
        '/#philosophy'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Products
    let products: MetadataRoute.Sitemap = [];
    try {
        const productData = await prisma.product.findMany({
            where: { isActive: true },
            select: { slug: true, updatedAt: true }
        });
        products = productData.map((p) => ({
            url: `${baseUrl}/product/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));
    } catch (e) {
        console.error('Sitemap product fetch error', e);
    }

    // Dynamic Blog Posts
    let posts: MetadataRoute.Sitemap = [];
    try {
        const postData = await prisma.blogPost.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true }
        });
        posts = postData.map((p) => ({
            url: `${baseUrl}/blog/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (e) {
        console.error('Sitemap blog fetch error', e);
    }

    return [...staticRoutes, ...products, ...posts];
}
