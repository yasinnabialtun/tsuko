import { MetadataRoute } from 'next';
import { products } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tsukodesign.com';

    // Static routes
    const routes = [
        '',
        '#collection',
        '#philosophy',
        '#lighting-demo',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Not strictly needed for a single page app, but good for future proofing if we add detailed product pages
    // For now, these are external links (Shopier), so they aren't part of our sitemap's internal structure
    // apart from being mentioned in the page content.

    return routes;
}
