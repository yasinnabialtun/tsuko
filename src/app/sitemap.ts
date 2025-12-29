import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tsukodesign.com';

    // Get all products
    const products = await prisma.product.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
    });

    // Get all blog posts
    const posts = await prisma.blogPost.findMany({
        select: { slug: true, createdAt: true },
    });

    const productUrls = products.map((p) => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: p.updatedAt,
    }));

    const postUrls = posts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: p.createdAt,
    }));

    return [
        { url: baseUrl, lastModified: new Date() },
        { url: `${baseUrl}/collection`, lastModified: new Date() },
        { url: `${baseUrl}/about`, lastModified: new Date() },
        { url: `${baseUrl}/contact`, lastModified: new Date() },
        { url: `${baseUrl}/blog`, lastModified: new Date() },
        ...productUrls,
        ...postUrls,
    ];
}
