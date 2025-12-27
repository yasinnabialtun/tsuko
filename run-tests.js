
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runTests() {
    console.log('🧪 BAŞLATILIYOR: TSUKO DESIGN SİSTEM TESTİ...\n');
    let passed = 0;
    let failed = 0;

    // --- TEST 1: KATEGORİ SORGUSU ---
    try {
        console.log('📝 Test 1: Kategori Veritabanı Bağlantısı');
        const categories = await prisma.category.findMany();
        if (categories.length > 0) {
            console.log('✅ BAŞARILI: Kategoriler çekildi. Toplam:', categories.length);
            passed++;
        } else {
            console.log('⚠️ UYARI: Kategori tablosu boş. (Bu bir hata değil ama içerik girilmeli)');
        }
    } catch (e) {
        console.error('❌ HATA: Kategori sorgusu başarısız.', e.message);
        failed++;
    }

    // --- TEST 2: ÜRÜN SORGUSU ---
    try {
        console.log('\n📝 Test 2: Ürün Veritabanı Bağlantısı');
        const products = await prisma.product.findMany({ take: 1 });
        if (products.length >= 0) {
            console.log('✅ BAŞARILI: Ürün tablosuna erişildi.');
            passed++;
        }
    } catch (e) {
        console.error('❌ HATA: Ürün sorgusu başarısız.', e.message);
        failed++;
    }

    // --- TEST 3: SİTE URL ERİŞİMİ (Localhost) ---
    console.log('\n📝 Test 3: Sayfa Erişim Kontrolü (Simülasyon)');
    // Node.js ortamında fetch ile localhost kontrolü
    const pages = [
        'http://localhost:3000',
        'http://localhost:3000/sitemap.xml',
        'http://localhost:3000/robots.txt',
        'http://localhost:3000/admin/login'
    ];

    for (const url of pages) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                console.log(`✅ BAŞARILI: ${url} (Status: ${res.status})`);
                passed++;
            } else {
                console.error(`❌ HATA: ${url} (Status: ${res.status})`);
                failed++;
            }
        } catch (e) {
            console.error(`❌ BAĞLANTI HATASI: ${url} sunucu çalışıyor mu?`);
            failed++;
        }
    }

    // --- SONUÇ ---
    console.log('\n----------------------------------------');
    console.log(`🏁 TEST TAMAMLANDI`);
    console.log(`✅ BAŞARILI: ${passed}`);
    console.log(`❌ HATA: ${failed}`);
    console.log('----------------------------------------');
}

runTests()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
