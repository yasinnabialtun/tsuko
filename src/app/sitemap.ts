import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tsuko.com.tr'; // Gerçek domain buraya gelecek

    // Statik Sayfalar
    const routes = [
        '',
        '/blog',
        '/products',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog Yazıları (Dinamik) - Gerçekte veritabanından gelecek
    const posts = [
        'minimalist-salon-dekorasyonu-ipuclari',
        'surdurulebilir-tasarim-nedir',
        'wabi-sabi-felsefesi-ile-ev-duzeni',
    ].map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...posts];
}
