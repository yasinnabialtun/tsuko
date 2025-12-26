export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    author: string;
    category: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'wabi-sabi-ve-modern-dekorasyon',
        title: 'Wabi-Sabi: Kusurların Güzelliği ve Modern Dekorasyona Yansıması',
        excerpt: 'Japon estetik anlayışı Wabi-Sabi\'nin, mükemmel olmayan detaylardaki güzelliği nasıl modern evlere taşıdığını keşfedin.',
        content: `
      <p>Wabi-sabi, geçiciliğin ve kusurluluğun kabul edilmesine odaklanan geleneksel bir Japon estetiğidir. Bazen "kusurlu, kalıcı olmayan ve eksik olanın güzelliği" olarak tanımlanır.</p>
      <h3>Tsuko Design ve Wabi-Sabi</h3>
      <p>Tsuko olarak tasarımlarımızda 3D baskının getirdiği o karakteristik katman izlerini (layer lines) saklamak yerine, onları tasarımın bir parçası olarak kucaklıyoruz. Her bir çizgi, objenin üretim yolculuğunun bir kanıtıdır.</p>
      <p>Modern dekorasyonda steril ve pürüzsüz yüzeyler yerine, dokunma hissi uyandıran, yaşanmışlık hissi veren dokular ön plana çıkıyor. Pastel brütalizm felsefemiz de tam olarak bu noktada devreye giriyor.</p>
    `,
        coverImage: '/images/kora.png',
        date: '27 Aralık 2025',
        author: 'Tsuko Studio',
        category: 'Tasarım Felsefesi'
    },
    {
        id: '2',
        slug: 'surdurulebilir-dekorasyon-biyo-polimerler',
        title: 'Geleceğin Malzemesi: Neden PLA ve Biyo-Polimerler?',
        excerpt: 'Petrol türevi plastikler yerine mısır nişastasından üretilen, doğada çözünebilen malzemelerle dekorasyonun geleceği.',
        content: `
      <p>Dekorasyon dünyası hızla sürdürülebilirliğe evriliyor. Tsuko Design olarak kullandığımız ana materyal PLA (Polilaktik Asit), yenilenebilir kaynaklardan (mısır nişastası veya şeker kamışı) elde edilen biyo-bozunur bir termoplastiktir.</p>
      <h3>Neden Önemli?</h3>
      <ul>
        <li>Düşük Karbon Ayak İzi: Üretimi sırasında atmosfere salınan karbon miktarı, geleneksel plastiklere göre çok daha düşüktür.</li>
        <li>Toksik Değil: Ev ortamında güvenle kullanılabilir, zararlı gaz salınımı yapmaz.</li>
        <li>Geri Dönüştürülebilir: Doğru koşullarda endüstriyel olarak kompost edilebilir.</li>
      </ul>
    `,
        coverImage: '/images/hero.png',
        date: '20 Aralık 2025',
        author: 'Ece Saner',
        category: 'Sürdürülebilirlik'
    },
    {
        id: '3',
        slug: 'aydinlatma-ile-atmosfer-yaratmak',
        title: 'Doğru Aydınlatma İle Evin Ruhunu Değiştirin',
        excerpt: 'Sıcak ışık, soğuk ışık ve difüzyon teknikleri. 3D baskı aydınlatmaların katmanlı yapısı ışığı nasıl sanat eserine dönüştürür?',
        content: `
      <p>Işık, bir mekanın atmosferini belirleyen en önemli unsurdur. Sadece aydınlatmak değil, hissettirmek gerekir.</p>
      <p>Aura serisi aydınlatmalarımızda kullandığımız yarı saydam (transparan) materyaller, ışığın kaynağını gizleyerek yumuşak bir hüzme yayılmasını sağlar. 3D baskı katmanları, ışığın kırılmasına neden olarak, lambayı sadece bir ışık kaynağı olmaktan çıkarıp, kendi başına parlayan bir heykele dönüştürür.</p>
    `,
        coverImage: '/images/aura.png',
        date: '15 Aralık 2025',
        author: 'Tsuko Studio',
        category: 'İpuçları'
    }
];
