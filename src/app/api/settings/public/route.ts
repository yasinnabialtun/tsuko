import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const settings = await getSiteSettings();

        if (!settings) {
            return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
        }

        // Return only safe public fields
        const publicSettings = {
            siteName: settings.siteName,
            siteDescription: settings.siteDescription,
            siteUrl: settings.siteUrl,
            email: settings.email,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            instagram: settings.instagram,
            pinterest: settings.pinterest,
            maintenanceMode: settings.maintenanceMode,
            freeShippingThreshold: settings.freeShippingThreshold
        };

        return NextResponse.json(publicSettings);
    } catch (error) {
        console.error('Public settings API error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
