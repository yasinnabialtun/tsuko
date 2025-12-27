'use client';

import dynamic from 'next/dynamic';

const ExitIntentPopup = dynamic(() => import('./exit-intent-popup'), { ssr: false });
const GiftFinder = dynamic(() => import('./gift-finder'), { ssr: false });
const LiveSalesNotification = dynamic(() => import('./live-sales'), { ssr: false });
const WhatsAppButton = dynamic(() => import('./whatsapp-button'), { ssr: false });

export default function MarketingWrapper() {
    return (
        <>
            <ExitIntentPopup />
            <GiftFinder />
            <LiveSalesNotification />
            <WhatsAppButton />
        </>
    );
}
