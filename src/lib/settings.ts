import { prisma } from './prisma';

// Use a simple fetch without unstable_cache to avoid "incrementalCache missing" errors in Next.js 15
export async function getSiteSettings() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: 'singleton' }
        });

        if (!settings) {
            return {
                siteName: 'Tsuko Design',
                siteDescription: 'Mimari Estetik, Evinize Taşındı',
                siteUrl: 'https://tsukodesign.com',
                email: 'info@tsukodesign.com',
                phone: '',
                whatsapp: '',
                address: '',
                instagram: 'tsukodesign',
                pinterest: '',
                shopierUrl: '',
                freeShippingThreshold: 500,
                maintenanceMode: false
            };
        }

        return {
            ...settings,
            freeShippingThreshold: Number(settings.freeShippingThreshold)
        };
    } catch (error) {
        console.error('getSiteSettings error:', error);
        return null;
    }
}
