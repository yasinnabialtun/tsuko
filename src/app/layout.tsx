import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { Toaster } from 'react-hot-toast';
import TopBanner from '@/components/top-banner';
import Analytics from '@/components/analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Tsuko Design | Minimalist 3D Baskı Ev Dekorasyonu',
  description: 'Doğa dostu, minimalist ve parametrik tasarım ürünleriyle evinize modern bir dokunuş katın.',
  twitter: {
    card: 'summary_large_image',
    title: 'Tsuko Design',
    description: 'Minimalist 3D Baskı Ev Dekorasyonu',
    images: ['https://tsukodesign.com/images/hero.png'],
  },
  openGraph: {
    title: 'Tsuko Design',
    description: 'Minimalist 3D Baskı Ev Dekorasyonu',
    url: 'https://tsukodesign.com',
    siteName: 'Tsuko Design',
    images: [
      {
        url: 'https://tsukodesign.com/images/hero.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white`}>
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
            <TopBanner />
            {children}
            <Analytics />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
