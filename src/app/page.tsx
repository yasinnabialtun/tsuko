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
import { products } from '@/lib/data';

export default function Home() {
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
      <Philosophy />
      <Process />
      <ShopTheLook />
      <Collection />
      <LightingSection />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}
