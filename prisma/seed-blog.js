
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BLOG_POSTS = [
    {
        title: "Neden 3D Baskı Dekorasyon? Geleceğin Estetiği Evinize Geliyor",
        slug: "neden-3d-baski-dekorasyon",
        excerpt: "Seri üretim, birbirinin kopyası ürünlerden sıkıldınız mı? 3D baskı teknolojisi ile üretilen kişiselleştirilebilir, sürdürülebilir ve sanatsal dekorasyon objeleriyle tanışın.",
        coverImage: "https://images.unsplash.com/photo-1629196914168-3a9644338cf5?auto=format&fit=crop&q=80&w=2000",
        category: "Teknoloji & Tasarım",
        date: "28 Aralık 2024",
        seoTitle: "3D Baskı Dekorasyon Ürünleri Neden Tercih Edilmeli? | Tsuko",
        seoDesc: "3D baskı teknolojisinin ev dekorasyonundaki yeri. Özgün tasarımlar, sürdürülebilir üretim ve 3D baskı vazo, saat gibi ürünlerin avantajları.",
        content: `
            <p>Evinize aldığınız bir vazonun aynısını komşunuzda, ofis arkadaşınızda veya binlerce kilometre uzaktaki birinde görmek, o objeye olan bağınızı zayıflatır mı? Bizce evet. Geleneksel seri üretim, maliyeti düşürürken "ruhu" da yok etti.</p>
            <p>İşte tam bu noktada, <strong>3D Baskı Teknolojisi (Additive Manufacturing)</strong> devreye giriyor. Tsuko Design olarak biz, sadece bir ürün satmıyoruz; "katmanlı üretim" felsefesiyle evlerinizde bir devrim başlatıyoruz.</p>

            <h2>Katmanların Estetiği: Kusursuzluk Sıkıcıdır</h2>
            <p>3D baskı ürünlerine yakından baktığınızda, yüzeydeki o incecik çizgileri, yani "katmanları" (layers) görürsünüz. Kimileri bunu pürüzsüzleştirmeye çalışsa da, bizce bu izler ürünün parmak izidir. Ahşabın damarları neyse, 3D baskının katmanları da odur; ışığı farklı kırar, dokunma hissi uyandırır ve ürünün "robot eliyle ama butik bir mantıkla" üretildiğini kanıtlar.</p>

            <h2>Tasarım Özgürlüğü: İmkansız Formlar</h2>
            <p>Seramik kalıpları veya plastik enjeksiyon makineleri, her şekli üretemez. Ama 3D yazıcılar, yerçekimine meydan okuyan, iç içe geçmiş geometrik desenleri ve <strong>parametrik tasarımları</strong> kolayca üretebilir. Tsuko koleksiyonundaki o akışkan formlu vazolar, geleneksel yöntemlerle üretilmesi neredeyse imkansız olan sanat eserleridir.</p>

            <h2>Atıksız Üretim (Zero Waste)</h2>
            <p>Geleneksel üretimde büyük bir blok yontulur ve kalan parça çöp olur. 3D baskıda ise sadece ihtiyaç duyulan yere malzeme konur. Fazladan bir gram bile plastik harcanmaz. Bu, dünyamıza borcumuzu ödemenin en modern yoludur.</p>

            <h3>Sonuç: Geleceği Masanıza Koyun</h3>
            <p>3D baskı bir vazo veya saat aldığınızda, sadece bir dekorasyon ürünü almıyorsunuz. Evinize bir "teknoloji ve sanat sohbeti" başlatıcısı (conversation starter) koyuyorsunuz.</p>
        `
    },
    {
        title: "PLA Nedir? Doğada Çözünen 'Masum' Plastik Hakkında Her Şey",
        slug: "pla-nedir-surdurulebilir-malzeme",
        excerpt: "Plastiğin çevreye zararlı olduğu algısını yıkıyoruz. Tsuko ürünlerinde kullanılan PLA (Polilaktik Asit), mısır nişastasından üretiliyor ve doğaya geri dönüyor.",
        coverImage: "https://images.unsplash.com/photo-1595429035839-c99c298ffdde?auto=format&fit=crop&q=80&w=2000",
        category: "Sürdürülebilirlik",
        date: "26 Aralık 2024",
        seoTitle: "PLA Nedir? 3D Baskıda PLA Malzeme Sağlıklı mı? - Tsuko Blog",
        seoDesc: "Mısır nişastasından üretilen biyoplastik PLA hakkında detaylı rehber. Sağlığa zararı var mı? Doğada nasıl çözünür? Tsuko'nun malzeme tercihi.",
        content: `
            <p>"Plastik" kelimesi, günümüzde ne yazık ki çevre kirliliği ile eş anlamlı hale geldi. Ancak her plastik aynı değildir. Petrol türevi, yüzyıllarca yok olmayan plastiklerin karşısında, doğanın gücünü arkasına alan bir kahraman var: <strong>PLA (Polilaktik Asit).</strong></p>

            <h2>Mısırdan Vazoya: Üretim Yolculuğu</h2>
            <p>PLA, petrol kaynaklarından değil; mısır nişastası, şeker kamışı veya tapyoka kökü gibi **yenilenebilir bitkisel kaynaklardan** üretilir. Yani Tsuko Design'dan aldığınız o şık saksı, aslında bir zamanlar tarlada büyüyen bir mısırdı.</p>

            <h2>Sıkça Sorulan Sorular</h2>
            
            <h3>1. PLA Sağlığa Zararlı mı?</h3>
            <p>Hayır. PLA, biyouyumlu bir malzemedir ve gıda ambalajlarında dahi kullanılır. Evinizde, yatak odanızda veya çocuk odasında güvenle kullanabilirsiniz. Zehirli gaz salınımı yapmaz, kötü koku yaymaz.</p>

            <h3>2. Doğada Nasıl Yok Olur?</h3>
            <p>Standart bir plastik şişe doğada 450 yılda yok olurken, PLA endüstriyel kompost ortamında aylar içinde, doğada ise çok daha kısa sürede çözünerek toprağa karışır. Karbon ayak izi, petrole göre %80 daha düşüktür.</p>

            <h3>3. Dayanıklı mı?</h3>
            <p>"Biyoplastik" denince aklınıza hemen eriyen, dayanıksız bir şey gelmesin. PLA, oda sıcaklığında sert ve dayanıklıdır. Sadece 60°C üzeri çok yüksek sıcaklıklarda (örneğin bulaşık makinesi veya yazın araba içi) formunu kaybedebilir. Bu yüzden Tsuko ürünlerini direkt ateşten ve aşırı sıcaktan korumanız yeterlidir.</p>

            <h2>Vicdani Dekorasyon</h2>
            <p>Evinizi güzelleştirirken vicdanınızın da rahat olmasını istiyorsanız, petrol türevi aksesuarlar yerine biyobozunur PLA ürünleri tercih etmek, doğaya yapacağınız en zarif jesttir.</p>
        `
    },
    {
        title: "Parametrik Tasarım: Evinizde Işık ve Gölge Oyunları",
        slug: "parametrik-tasarim-ve-golge-oyunlari",
        excerpt: "Düz ve sıkıcı duvarlardan kurtulun. Algoritmaların sanata dönüştüğü parametrik aydınlatmalarla evinize hareket, derinlik ve modernite katın.",
        coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000",
        category: "Tasarım & Mimari",
        date: "25 Aralık 2024",
        seoTitle: "Parametrik Tasarım Nedir? Ev Dekorasyonunda Kullanımı",
        seoDesc: "Parametrik aydınlatma ve dekorasyon ürünleri. Işık ve gölge oyunlarıyla evinize modern bir dokunuş yapın. 3D baskı parametrik tasarım örnekleri.",
        content: `
            <p>Işığı açtığınızda odanız sadece aydınlanıyor mu, yoksa duvarda bir sanat eseri mi beliriyor? <strong>Parametrik tasarım</strong>, aydınlatmayı sadece bir ihtiyaç olmaktan çıkarıp, görsel bir şölene dönüştürüyor.</p>

            <h2>Matematiğin Sanatsal Hali</h2>
            <p>Parametrik tasarımda, objenin formu sabit değildir; bir dizi kural ve algoritmaya göre akar, döner ve kıvrılır. Bu tasarımlar genellikle doğadaki formlardan (bir deniz kabuğunun spirali, rüzgarın kumda bıraktığı izler veya bir hücrenin yapısı) ilham alır.</p>
            <p>Tsuko Design olarak biz, bu karmaşık algoritmaları bilgisayar ortamında tasarlıyor ve 3D yazıcılarımızla fiziksel dünyaya taşıyoruz. El işçiliği ile yapılması aylar sürecek bir detay seviyesini, teknolojinin gücüyle evinize getiriyoruz.</p>

            <h2>Gölge Oyununun Gücü</h2>
            <p>Parametrik bir abajur veya avizenin en büyüleyici yanı, kapalıyken bir heykel gibi durması; açıldığında ise odanın duvarlarına hipnotik gölgeler yansıtmasıdır. Bu gölgeler:</p>
            <ul>
                <li>Mekana derinlik katar.</li>
                <li>Düz ve boş duvarları "dolu" gösterir.</li>
                <li>Sakinleştirici ve meditatif bir atmosfer yaratır (Hygge etkisi).</li>
            </ul>

            <h2>Hangi Odada Kullanmalı?</h2>
            <p>Parametrik ürünler iddialıdır. Onları salonunuzun baş köşesinde, yatak odanızda başucu lambası olarak veya antrenizde misafirlerinizi etkilemek için kullanabilirsiniz. Modern, İskandinav, Endüstriyel veya Bohem; hangi tarza sahip olursanız olun, parametrik bir parça odaya "gelecekten gelmiş" bir dokunuş katar.</p>
        `
    }
];

async function main() {
    console.log('🌱 Starting 3D Printing Blog Seeding...');

    // Clean existing
    await prisma.blogPost.deleteMany({});
    console.log('🗑️  Old blog posts deleted.');

    // Insert new
    for (const post of BLOG_POSTS) {
        await prisma.blogPost.create({
            data: {
                ...post,
                published: true
            }
        });
        console.log(`✅ Created: ${post.title}`);
    }

    console.log('🏁 Blog Seeding Completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
