
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from '@/context/wishlist-context';
import { CartProvider } from '@/context/cart-context';
import CartDrawer from '@/components/cart-drawer';
import AnalyticsScripts from '@/components/analytics';
import MarketingWrapper from '@/components/marketing-wrapper';
import WhatsAppButton from '@/components/whatsapp-button';
import PromoBanner from '@/components/promo-banner';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tsuko Design | 3D Baskı Dekorasyon",
    template: "%s | Tsuko Design"
  },
  description: "Modern ev dekorasyonu için parametrik 3D baskı tasarım objeleri. Minimalist ve sürdürülebilir dekorasyon fikirleri.",
  keywords: [
    "3d baskı dekorasyon", "parametrik tasarım", "modern vazo", "duvar saati",
    "minimalist ev", "tsuko design", "pla malzeme", "kişiye özel baskı"
  ],
  authors: [{ name: "Tsuko Design Studio" }],
  creator: "Tsuko Design",
  publisher: "Tsuko Design",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'auexUc8k3AxzLjJgztb11nidmTla1rymTCJVDpI_yTM',
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://tsukodesign.com",
    title: "Tsuko Design | Özgün 3D Dekorasyon",
    description: "Evinizin havasını değiştirecek modern tasarım objeleri. 3D baskı teknolojisi sanatla buluşuyor.",
    siteName: "Tsuko Design",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Tsuko Design Koleksiyonu",
      },
    ],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-mauve selection:text-charcoal">
        <PromoBanner />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-T2TZGWWP'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <CartProvider>
          <WishlistProvider>
            <Toaster position="top-center" richColors theme="light" />
            <CartDrawer />
            {children}
            <MarketingWrapper />
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
