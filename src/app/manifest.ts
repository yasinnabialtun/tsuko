
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Tsuko Design',
        short_name: 'Tsuko',
        description: '3D Baskı Vazo & Aydınlatma Tasarımları',
        start_url: '/',
        display: 'standalone',
        background_color: '#FDFBF7',
        theme_color: '#2C2C2C',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/logo.png', // Assuming logo.png exists in public
                sizes: '192x192',
                type: 'image/png'
            }
        ],
    };
}
