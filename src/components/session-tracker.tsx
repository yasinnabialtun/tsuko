'use client';

import { useEffect } from 'react';

export default function SessionTracker() {
    useEffect(() => {
        // Function to send heartbeat
        const sendHeartbeat = async () => {
            try {
                await fetch('/api/track/session', { method: 'POST' });
            } catch (e) {
                // Silent fail
            }
        };

        // Send immediately on mount
        sendHeartbeat();

        // Send every 30 seconds to keep session "alive"
        const interval = setInterval(sendHeartbeat, 30000);

        return () => clearInterval(interval);
    }, []);

    return null; // Invisible component
}
