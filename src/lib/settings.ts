import { prisma } from './prisma';

import { unstable_cache } from 'next/cache';

export const getSiteSettings = unstable_cache(
    async () => {
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
    },
    ['site-settings'],
    { tags: ['site-settings'], revalidate: 3600 }
);
