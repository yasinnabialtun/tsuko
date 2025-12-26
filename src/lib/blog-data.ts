export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  coverImage: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "minimalist-salon-dekorasyonu-ipuclari",
    title: "Az Çoktur: Salonunuzda Ferahlık Yaratmanın 5 Yolu",
    excerpt: "Dağınık bir ev zihni de yorar. Japon minimalizmi ile salonunuzu nasıl bir huzur mabedine dönüştürebileceğinizi inceledik.",
    coverImage: "/images/hero.png",
    date: "27 Aralık 2025",
    category: "Dekorasyon Rehberi",
    readTime: "4 dk okuma",
    keywords: ["minimalist dekorasyon", "salon dekorasyonu", "modern ev tasarımı", "ferah salon", "ev düzenleme"],
    content: `
            <h2>1. Boşluklardan Korkmayın (Ma)</h2>
            <p>Japon estetiğinde "Ma" (boşluk) kavramı çok önemlidir. Her duvarı doldurmak zorunda değilsiniz. Negatif alanlar, gözün dinlenmesini sağlar ve odaklanılan objeyi (örneğin bir Tsuko vazosu) öne çıkarır.</p>
            
            <h2>2. Doğal Dokular Seçin</h2>
            <p>Plastik ve parlak metal yerine; keten, ahşap, taş ve biyo-polimer gibi mat ve doğal dokulara yönelin. Bu malzemeler ışığı yumuşatır ve mekana sıcaklık katar.</p>

            <h2>3. Işıklandırma Her Şeydir</h2>
            <p>Tek bir tavan lambası yerine, katmanlı aydınlatma kullanın. Köşe lambaları ve masa lambaları ile akşamları daha yumuşak bir atmosfer yaratın.</p>
            
            <blockquote>"Ev, sadece içinde yaşadığımız bir yer değil; ruhumuzun bir yansımasıdır."</blockquote>
        `
  },
  {
    id: 2,
    slug: "surdurulebilir-tasarim-nedir",
    title: "Geleceğin Estetiği: Neden Biyo-Tasarım?",
    excerpt: "Petrol türevi plastikler out, mısır nişastası in. Dekorasyonda sürdürülebilirlik neden sadece bir trend değil, zorunluluk?",
    coverImage: "/images/products/nami.png",
    date: "25 Aralık 2025",
    category: "Sürdürülebilirlik",
    readTime: "3 dk okuma",
    keywords: ["sürdürülebilir tasarım", "biyo plastik", "pla malzeme", "doğa dostu dekorasyon", "eko tasarım"],
    content: `
            <p>Dekorasyon dünyası değişiyor. Artık "güzel görünmesi" yetmiyor; aynı zamanda dünyaya zarar vermemesi gerekiyor. İşte tam bu noktada Tsuko olarak kullandığımız PLA (Polilaktik Asit) devreye giriyor.</p>

            <h2>PLA Nedir?</h2>
            <p>Mısır nişastası ve şeker kamışı gibi yenilenebilir kaynaklardan elde edilen, endüstriyel kompostlanabilir organik bir plastiktir. Petrol içermez.</p>
            
            <h2>Neden Tercih Edilmeli?</h2>
            <ul>
                <li>Karbon ayak izi düşüktür.</li>
                <li>Toksik gaz salınımı yapmaz.</li>
                <li>Doğal mat bir dokusu vardır, porselen gibi hissettirir.</li>
            </ul>
        `
  },
  {
    id: 3,
    slug: "wabi-sabi-felsefesi-ile-ev-duzeni",
    title: "Kusurlu Güzellik: Wabi-Sabi Nedir?",
    excerpt: "Mükemmellik arayışından yoruldunuz mu? Kusurları kucaklayan, yaşanmışlığa değer veren Wabi-Sabi felsefesiyle tanışın.",
    coverImage: "/images/products/kaya.png",
    date: "20 Aralık 2025",
    category: "Yaşam Tarzı",
    readTime: "5 dk okuma",
    keywords: ["wabi sabi nedir", "japon dekorasyon", "kusurlu güzellik", "doğal ev dekoru"],
    content: `
            <p>Modern dünya bize her şeyin pürüzsüz, simetrik ve "yeni" olması gerektiğini dayatıyor. Wabi-Sabi ise tam tersini söyler: "Hiçbir şey kalıcı değildir, hiçbir şey bitmemiştir ve hiçbir şey mükemmel değildir."</p>

            <h2>Evinize Nasıl Uygularsınız?</h2>
            <p>Simetrik eşleştirmelerden kaçının. Salonun bir köşesine koyacağınız asimetrik bir vazo, cetvelle çizilmiş gibi duran bir düzenden çok daha fazla karakter katar.</p>
        `
  }
];
