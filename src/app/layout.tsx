import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tsuko Design | Mimari 3D Baskı Dekorasyon & Aydınlatma",
    template: "%s | Tsuko Design"
  },
  description: "Modern ev dekor ve ev ürünleri koleksiyonumuzla yaşam alanlarınıza ruh katın. 3D baskı teknolojisiyle üretilen eşsiz vazo, aydınlatma ve minimalist aksesuar modelleri Tsuko Design'da. Salon aksesuarları ve tasarım hediyelikler.",
  keywords: [
    "ev dekor", "ev ürünleri", "aksesuar", "salon aksesuarları", "modern vazo",
    "ev dekorasyonu", "tasarım aydınlatma", "3d baskı dekorasyon", "hediyelik ev eşyası",
    "minimalist ev aksesuarları", "dekoratif objeler", "sıradışı ev aksesuarları",
    "masaüstü dekorasyon", "mimari tasarım", "Tsuko"
  ],
  authors: [{ name: "Tsuko Design Studio" }],
  creator: "Tsuko Design",
  publisher: "Tsuko Design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://tsukodesign.com",
    title: "Tsuko Design | Yapıya Ruh Katmak",
    description: "Modern yaşam alanları için mimari 3D dekorasyon. Cansız materyallerin katman katman canlandığı, yaşayan objeler.",
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
  twitter: {
    card: "summary_large_image",
    title: "Tsuko Design | Mimari 3D Dekorasyon",
    description: "Yapıya ruh katan 3D baskı tasarım objeleri.",
    images: ["/images/hero.png"],
    creator: "@tsukodesign",
  },
  alternates: {
    canonical: "https://tsukodesign.com",
  },
};

import { WishlistProvider } from '@/context/wishlist-context';
import ExitIntentPopup from '@/components/exit-intent-popup';
import GiftFinder from '@/components/gift-finder';
import AnalyticsScripts from '@/components/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <AnalyticsScripts />
      </head>
      <body className="font-sans bg-alabaster text-charcoal antialiased selection:bg-clay selection:text-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <WishlistProvider>
          <ExitIntentPopup />
          <GiftFinder />
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
