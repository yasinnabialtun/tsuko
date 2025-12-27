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
    default: "Tsuko Design | 3D Baskı Vazo, Aydınlatma & Modern Ev Dekorasyonu",
    template: "%s | Tsuko Design"
  },
  description: "Türkiye'nin ilk 3D baskı ev dekorasyon markası. Mimari estetik, sürdürülebilir biyo-polimer ve el yapımı hissiyatı bir arada. Modern vazo, tasarım aydınlatma ve minimalist ev aksesuarları. Ücretsiz kargo, kırılma garantisi.",
  keywords: [
    // Primary - High Volume
    "ev dekorasyonu", "modern vazo", "dekoratif vazo", "salon dekorasyonu",
    "ev aksesuarları", "tasarım aydınlatma", "masa lambası", "dekoratif lamba",
    // Secondary - Intent Based
    "hediyelik eşya", "özel hediye", "ev hediyesi", "minimalist dekorasyon",
    // Long-tail - Low Competition
    "3d baskı vazo", "mimari vazo", "biyo polimer dekorasyon", "sürdürülebilir ev ürünleri",
    "türk tasarım markası", "el yapımı vazo", "modern saksı", "dekoratif obje",
    // Brand
    "Tsuko", "Tsuko Design", "tsukodesign"
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
    title: "Tsuko Design | Mimari Estetik, Evinize Taşındı",
    description: "3D baskı teknolojisi ve biyo-polimer ile üretilen, doğa dostu vazo ve aydınlatma koleksiyonu. Seri üretimden uzak, sadece sizin için.",
    siteName: "Tsuko Design",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Tsuko Design - 3D Baskı Mimari Vazo Koleksiyonu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tsuko Design | 3D Baskı Ev Dekorasyonu",
    description: "Mimari estetik, sürdürülebilir üretim. Türkiye'nin ilk 3D baskı dekorasyon markası.",
    images: ["/images/hero.png"],
    creator: "@tsukodesign",
  },
  alternates: {
    canonical: "https://tsukodesign.com",
  },
  verification: {
    google: "your-google-verification-code", // TODO: Add real verification code
  },
};

import { WishlistProvider } from '@/context/wishlist-context';
import AnalyticsScripts from '@/components/analytics';
import MarketingWrapper from '@/components/marketing-wrapper';
import { ClerkProvider } from '@clerk/nextjs';
import { trTR } from '@clerk/localizations';

// Check if Clerk is configured
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = (
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
          {children}
          {/* Deferred Loading for Performance */}
          <MarketingWrapper />
        </WishlistProvider>
      </body>
    </html>
  );

  // Wrap with ClerkProvider only if configured
  if (isClerkConfigured) {
    return (
      <ClerkProvider localization={trTR}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}
