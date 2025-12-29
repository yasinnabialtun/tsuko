'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const ping = async () => {
            try {
                await fetch('/api/analytics/ping', { method: 'POST' });
            } catch (e) {
                // Ignore silent failure
            }
        };

        // Initial ping
        ping();

        // Ping every 2 minutes while active
        const interval = setInterval(ping, 2 * 60 * 1000);

        return () => clearInterval(interval);
    }, [pathname]); // Ping on route change too

    return null;
}
