# Tsuko Design - Yönetici Rehberi

## 🚀 Kurulum ve İlk Çalıştırma

### 1. Canlıya Alma (Vercel)
Bu projeyi Vercel'e dağıtırken aşağıdaki **Environment Variable**'ları eklemelisiniz:

```env
# Veritabanı
DATABASE_URL="postgres://..."

# Admin Paneli Girişi (BURAYI GÜÇLÜ BİR ŞİFRE YAPIN)
ADMIN_PASSWORD="super-secret-password"

# Ödeme Sistemi (Shopier)
SHOPIER_API_KEY="..."
SHOPIER_API_SECRET="..."
SHOPIER_WEBSITE_INDEX="1"

# Email Sistemi (Resend)
RESEND_API_KEY="re_..."
RESEND_SENDER_EMAIL="Tsuko <bilgi@tsukodesign.com>"

# Site Adresi (Callback URLleri için)
NEXT_PUBLIC_SITE_URL="https://tsukodesign.com"
```

### 2. Veritabanını Hazırlama
Projeyi yükledikten sonra veritabanı tablolarını oluşturmak için:
- Build adımı otomatik olarak `prisma generate` yapar.
- Ancak tabloları oluşturmak için **Deployment** sonrası Vercel Console'dan veya localden şunu çalıştırın:
```bash
npx prisma db push
```

### 3. Demo Verisi (Seeding)
Veritabanını örnek ürünler, kategoriler ve blog yazılarıyla doldurmak için:
Browser'dan şu adrese gidin:
`https://siteniz.com/api/seed?secret=ADMIN_PASSWORD_DEGERINIZ`

Bu işlem veritabanına otomatik olarak:
- Kategoriler (Vazo, Aydınlatma vb.)
- Örnek Ürünler
- Blog Yazıları
- İndirim Kuponu (MERHABA10)
Ekleyecektir.

---

## 🛠 Yönetim Paneli
Adres: `/admin`
Giriş Şifresi: `.env` dosyasındaki `ADMIN_PASSWORD`

### Özellikler:
- **Siparişler:** Gelen siparişleri görün, kargo takip no girin, durumu güncelleyin.
- **Ürünler:** Yeni ürün ekleyin, stok güncelleyin, varyant (renk/boyut) ekleyin.
- **Kuponlar:** Yüzdelik veya sabit indirim kuponları oluşturun.
- **Blog:** SEO uyumlu blog yazıları yazın.
- **Aboneler:** Newsletter abonelerini toplayın.

---

## ⚠️ Önemli Notlar
1. **Görseller:** Şu an tüm görseller `/images/hero.png` placeholder'ını kullanıyor. Ürün düzenleme sayfasından gerçek resim URL'lerini girmelisiniz.
2. **Ödeme:** Shopier API bilgileri girilmeden ödeme alınamaz. Test sırasında "Geri Dönüş URL"leri (Callback) Shopier panelinden de ayarlanmalıdır ama kod içinde dinamik olarak gönderiyoruz, çoğu zaman sorun olmaz.

İyi satışlar!
