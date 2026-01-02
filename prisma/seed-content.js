
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seedleme Başlıyor: Premium İçerik...');

    const premiumContent = {
        // Hero
        heroTitle: "EVİNİZİN\nHEYKEL HALİ.",
        heroSubtitle: "Parametrik tasarımın matematiksel kusursuzluğu, doğa dostu biyo-polimerlerin sıcaklığıyla buluştu. Yaşam alanınıza karakter katan dijital zanaat eserleri.",
        heroButtonText: "KOLEKSİYONU KEŞFET",
        heroButtonLink: "/#collection",
        heroImage: "/images/hero.png", // Varsayılan görsel kalabilir, kullanıcı panelden değiştirebilir.

        // Philosophy
        philosophyTitle: "SADECE SİZİN İÇİN\n'DİJİTAL ZANAAT'",
        philosophyContent: "Tsuko'da 'Stokta ne varsa onu gönder' mantığı yoktur. Siparişiniz bize ulaştığında, ürününüz sadece sizin için atölyemizde yolculuğuna başlar.\n\nİleri teknoloji 3D yazıcılarımız, mısır nişastasından elde edilen doğal polimerleri mikron hassasiyetinde işler. Bu süreç, el yapımı seramiklerin sıcaklığını dijital dünyanın geometrik kusursuzluğuyla buluşturur.\n\nJapon folklorendeki 'Tsukumogami' inancından ilham alıyoruz: Objelerin zamanla ve emekle bir ruh kazandığına inanıyoruz.",

        // Announcement
        announcementBar: "✨ ŞİMDİ AL, SONRA ÇİÇEKLENSİN: İLK SİPARİŞE ÖZEL %10 İNDİRİM KODU: TSUKO10",
        announcementActive: true,

        // Site General
        siteName: "TSUKO DESIGN",
        siteDescription: "Türkiye'nin öncü parametrik tasarım ve 3D baskı dekorasyon stüdyosu. Sürdürülebilir lüks.",

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
