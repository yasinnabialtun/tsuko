
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seedleme Başlıyor: Premium İçerik...');


    const premiumContent = {
        // Hero
        heroTitle: "EVİNİZİN\nRENKLİ RUHU.",
        heroSubtitle: "Modern minimalizmin tatlı tonlarla buluştuğu nokta: Tsuko. Japon 'Tsukumogami' felsefesiyle tasarlanan, evinize karakter ve neşe katan özel dekorasyon koleksiyonu.",
        heroButtonText: "KOLEKSİYONU KEŞFET",
        heroButtonLink: "/#collection",
        heroImage: "/images/hero.png",

        // Philosophy
        philosophyTitle: "RUHU OLAN\n'MODERN OBJELER'",
        philosophyContent: "Tsuko'da her obje, sessiz bir dost gibi evinizin en tatlı köşesinde yerini almak için tasarlanır.\n\nJapon geleneğindeki 'Tsukumogami' inancından ilham alıyoruz: Eşyaların zamanla bir ruh kazandığına inanıyoruz. Bu yüzden tasarımlarımızda sadece formu değil, o objenin size hissettireceği enerjiyi de önemsiyoruz.\n\nİleri teknoloji 3D yazıcılarımızı bir 'zanaat aracı' olarak kullanıyor, matematiksel kusursuzluğu, içinizi ısıtacak renk paletleriyle birleştiriyoruz.",

        // Announcement
        announcementBar: "🌈 EVİNİZE RENK KATIN: İLK SİPARİŞE ÖZEL %10 İNDİRİM KODU: TSUKO10",
        announcementActive: true,

        // Site General
        siteName: "TSUKO DESIGN",
        siteDescription: "Renkli, modern ve minimal ev dekorasyon stüdyosu. Tsukumogami felsefesiyle ruh kazanan eşyalar.",

        // Footer & Contact Defaults
        email: "info@tsukodesign.com",
        instagram: "tsukodesign"
    };

    await prisma.settings.upsert({
        where: { id: 'singleton' },
        create: { ...premiumContent, id: 'singleton' },
        update: premiumContent
    });

    console.log('✅ İçerik Başarıyla Güncellendi!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
