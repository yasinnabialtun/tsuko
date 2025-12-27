import Navbar from '@/components/navbar';
import Stories from '@/components/stories';
import Hero from '@/components/hero';
import Philosophy from '@/components/philosophy';
import Process from '@/components/process';
import Collection from '@/components/collection';
import ShopTheLook from '@/components/shop-the-look';
import LightingSection from '@/components/lighting-section';
import FAQ from '@/components/faq';
import Newsletter from '@/components/newsletter';
import Footer from '@/components/footer';
import { prisma } from "@/lib/prisma";

// Revalidate data every hour
export const revalidate = 3600;

async function getProducts() {
  // If database fails (during build or no connection), return empty array or fallback
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true, isFeatured: true }, // Only fetch featured active products
      take: 8,
      orderBy: { createdAt: 'desc' }
    });

    // Transform Decimal to number/string for serialization if needed, or keep as is if component handles it.
    // For simplicity in this demo, we'll map basic fields.
    return products.map(p => ({
      ...p,
      price: p.price.toString(), // Convert Decimal to string
      image: p.images[0] || '/images/hero.png' // Fallback image
    }));
  } catch (e) {
    console.error("Database connection failed, returning fallback data");
    // Fallback Mock Data for Development/Build Safety
    return [
      { id: '1', name: 'Nami Vazo', price: '1250', image: '/images/products/nami.png', slug: 'nami-vazo', categoryId: 'cat_1' },
      { id: '2', name: 'Mantar Lamba', price: '850', image: '/images/products/mantar.png', slug: 'mantar-lamba', categoryId: 'cat_2' },
      { id: '3', name: 'Kaya Saksı', price: '450', image: '/images/products/kaya.png', slug: 'kaya-saksi', categoryId: 'cat_3' },
      // ... add more fallbacks if needed
    ];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tsuko Design',
    url: 'https://tsukodesign.com',
    logo: 'https://tsukodesign.com/images/hero.png', // Using hero as placeholder logo
    sameAs: [
      'https://www.instagram.com/tsukodesign',
      'https://twitter.com/tsukodesign'
    ],
    description: 'Mimari 3D baskı ev dekorasyon ürünleri ve aydınlatma tasarımları.',
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://tsukodesign.com${product.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'TRY',
          price: product.price.replace(' ₺', '').replace('.', ''), // Convert "1.250 ₺" to "1250"
          availability: 'https://schema.org/InStock',
          url: product.shopierUrl
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
        name: 'Modern ev dekorasyonunda hangi aksesuarlar trend?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "2025 yılı ev dekorasyon trendlerinde, seri üretim yerine hikayesi olan tasarım ev ürünleri öne çıkıyor. Tsuko Design olarak, 'Pastel Brütalizm' akımını benimsiyoruz; yani mimari ve sert formların (beton etkisi), yumuşak pastel renklerle buluştuğu vazo ve aydınlatma modelleri, modern salon aksesuarları arasında en çok tercih edilenlerdir."
        }
      },
      {
        '@type': 'Question',
        name: '3D baskı ev ürünleri dayanıklı mıdır?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kesinlikle. Kullandığımız mimari sınıf biyo-polimerler, geleneksel seramik veya cam ev aksesuarlarına göre darbelere karşı daha dirençlidir. Hem hafif hem de sağlam yapılarıyla, uzun ömürlü bir ev dekor deneyimi sunar.'
        }
      },
      {
        '@type': 'Question',
        name: 'Tsuko ürünlerini hangi odalarda kullanabilirim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Koleksiyonumuz çok yönlüdür. 'Tondo' gibi vazo modellerimiz salon dekorasyonu ve konsol üzeri için idealken, 'Aura' serisi aydınlatmalarımız yatak odası veya çalışma masası aksesuarı olarak sıcak bir atmosfer yaratır."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-alabaster">
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
      <Stories />
      <ShopTheLook />
      <Philosophy />
      {/* Pass real database products to Collection */}
      <Collection products={products} />
      <LightingSection />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
