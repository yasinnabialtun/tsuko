import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Philosophy from '@/components/philosophy';
import Collection from '@/components/collection';
import FAQ from '@/components/faq';
import Newsletter from '@/components/newsletter';
import Footer from '@/components/footer';
import NewsletterPopup from '@/components/newsletter-popup';
import ExitIntentPopup from '@/components/exit-intent-popup';
import ShopTheLook from '@/components/shop-the-look';
import LiveSales from '@/components/live-sales';
import InstagramFeed from '@/components/instagram-feed';
import { prisma } from "@/lib/prisma";

// Revalidate data every hour
export const revalidate = 3600;

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });

    return products.map((p: any) => ({
      ...p,
      id: p.id,
      name: p.name,
      price: `${p.price.toString()} ₺`,
      image: p.images[0] || '/images/hero.png',
      category: p.category?.name || 'Tasarım',
      description: p.description
    }));
  } catch (e) {
    console.error("Database connection failed, returning fallback data");
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tsuko Design',
    url: 'https://tsukodesign.com',
    logo: 'https://tsukodesign.com/images/hero.png',
    sameAs: [
      'https://www.instagram.com/tsukodesign',
      'https://twitter.com/tsukodesign'
    ],
    description: 'Mimari 3D baskı ev dekorasyon ürünleri ve aydınlatma tasarımları.',
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description || '',
        image: product.image.startsWith('http') ? product.image : `https://tsukodesign.com${product.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          price: String(product.price).replace(/[^\d]/g, ''),
          availability: 'https://schema.org/InStock',
          url: product.shopierUrl || ''
        }
      }
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ürünler kırılır mı, garanti var mı?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kullandığımız biyo-polimer materyal, cam veya seramiğe göre çok daha dayanıklıdır. Yine de kargo kaynaklı hasarlarda %100 kırılma garantisi sunuyoruz. Hasarlı ürün gelirse fotoğraf paylaşmanız yeterli, hemen yenisini gönderiyoruz.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kargo ücretsiz mi, ne zaman teslim edilir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evet, Türkiye genelinde ücretsiz kargo sunuyoruz. Siparişleriniz 1-3 iş günü içinde kargoya verilir ve ortalama 2-4 iş gününde elinize ulaşır.'
        }
      },
      {
        '@type': 'Question',
        name: '3D baskı ev ürünleri dayanıklı mıdır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kesinlikle. Kullandığımız mimari sınıf biyo-polimerler (PLA+), geleneksel seramik veya cam ev aksesuarlarına göre darbelere karşı daha dirençlidir. UV dayanımlı, su geçirmez ve uzun ömürlüdür.'
        }
      },
      {
        '@type': 'Question',
        name: 'İade ve değişim yapabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ürünü teslim aldıktan sonra 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak koşuluyla koşulsuz iade veya değişim yapabilirsiniz. İade kargo ücreti tarafımıza aittir.'
        }
      },
      {
        '@type': 'Question',
        name: 'Ödeme seçenekleri neler?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shopier altyapısı üzerinden kredi kartı, banka kartı ve havale/EFT ile güvenli ödeme yapabilirsiniz. Tüm kart bilgileriniz 256-bit SSL ile korunmaktadır.'
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-mauve selection:text-charcoal">
      <NewsletterPopup />
      <ExitIntentPopup />
      <LiveSales />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      <Hero />
      <Philosophy />
      <Collection products={products} />
      <ShopTheLook />
      <FAQ />
      <Newsletter />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
