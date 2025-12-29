import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { Toaster } from 'react-hot-toast';
import TopBanner from '@/components/top-banner';
import Analytics from '@/components/analytics';
import AnalyticsTracker from '@/components/analytics-tracker';
import { getSiteSettings } from '@/lib/settings';
import { headers } from 'next/headers';
import MaintenanceMode from '@/components/maintenance-mode';
import FloatingWidgets from '@/components/floating-widgets';
import ScrollProgress from '@/components/scroll-progress';
import CursorOrnament from '@/components/cursor-ornament';
import SessionTracker from '@/components/session-tracker';
import SafeHydrate from '@/components/safe-hydrate';
import GlobalErrorBoundary from '@/components/error-boundary';

import { ClerkProvider } from '@clerk/nextjs';
import { trTR } from '@clerk/localizations';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || 'Tsuko Design';
  const siteDescription = settings?.siteDescription || 'Minimalist 3D Baskı Ev Dekorasyonu';
  const siteUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://tsukodesign.com';
  let metadataBase: URL;
  try {
    metadataBase = new URL(siteUrl);
  } catch {
    metadataBase = new URL('https://tsukodesign.com');
  }

  return {
    title: {
      template: `%s | ${siteName}`,
      default: `${siteName} | Minimalist 3D Baskı`,
    },
    description: siteDescription,
    metadataBase,
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
      images: ['/images/hero.png'],
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: '/images/hero.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
  };
}

import { validateEnv } from '@/lib/env-check';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  validateEnv();
  const settings = await getSiteSettings();
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '';
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  // If maintenance mode is ON and we are NOT on an admin page, show maintenance UI
  if (settings?.maintenanceMode && !isAdmin) {
    return (
      <html lang="tr">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white`}>
          <MaintenanceMode />
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      localization={trTR}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="tr">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <Script
            type="module"
            src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
            strategy="lazyOnload"
          />
        </head>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white scroll-smooth`}>
          <GlobalErrorBoundary>
            {!isAdmin && (
              <SafeHydrate>
                <ScrollProgress />
                <CursorOrnament />
              </SafeHydrate>
            )}
            <CartProvider>
              <WishlistProvider>
                <Toaster
                  position="top-center"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--charcoal)',
                      color: '#fff',
                      borderRadius: '16px',
                      padding: '16px 24px',
                      boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                      fontSize: '14px',
                      fontWeight: 500,
                    },
                    success: {
                      iconTheme: {
                        primary: 'var(--clay)',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                {!isAdmin && <TopBanner />}
                {children}
                <SessionTracker />
              </WishlistProvider>
            </CartProvider>
            {!isAdmin && (
              <SafeHydrate>
                <AnalyticsTracker />
                <Analytics />
                <FloatingWidgets />
              </SafeHydrate>
            )}
          </GlobalErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}
