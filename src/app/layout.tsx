
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Tsuko Design | Mitolojinin Modern Yüzü",
    template: "%s | Tsuko Design"
  },
  description: "Evinizin ruhunu yansıtan zamansız parçalar. Mitolojik formların modern 3D baskı teknolojisiyle buluştuğu, doğa dostu ve sofistike tasarım objeleri.",
  keywords: [
    "sanatsal vazo", "modern dekorasyon", "mitolojik tasarım", "3d baskı sanat",
    "sürdürülebilir lüks", "minimalist ev", "Tsuko Design", "iç mimari obje"
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
    title: "Tsuko Design | Mitolojinin Modern Yüzü",
    description: "Geçmişin estetiği, geleceğin teknolojisiyle buluştu.",
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
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className="font-sans bg-alabaster text-charcoal antialiased selection:bg-clay selection:text-white">
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
            <Toaster position="top-center" richColors />
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
