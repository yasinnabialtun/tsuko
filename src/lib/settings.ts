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
            siteName: settings.siteName,
            siteDescription: settings.siteDescription,
            siteUrl: settings.siteUrl,
            email: settings.email,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            address: settings.address,
            instagram: settings.instagram,
            pinterest: settings.pinterest,
            shopierUrl: settings.shopierUrl,
            freeShippingThreshold: Number(settings.freeShippingThreshold),
            maintenanceMode: settings.maintenanceMode
        };
    } catch (error) {
        console.error('getSiteSettings error:', error);
        return null;
    }
}
