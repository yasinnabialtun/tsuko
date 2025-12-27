# 🚀 TSUKO: PRODUCTION & INTEGRATION MASTER GUIDE

Bu doküman, Tsuko projesini "Statik Web Sitesi" durumundan "Tam Fonksiyonel E-Ticaret Platformu"na dönüştürmek için gereken tüm teknik adımları, entegrasyonları ve stratejileri içerir.

---

## 🏗️ FAZ 1: BACKEND ALTYAPISI (MOTORU TAKMAK)
Şu an tüm veriler `src/lib/data.ts` gibi dosyalardan (Mock Data) geliyor. Bu değişmeli.

### 1.1 Veritabanı Kurulumu (Supabase)
*   **Araç:** Supabase (PostgreSQL)
*   **Tablo Yapısı (Schema):**
    *   `Products`: id, name, slug, price, stock, category, images[], description, seo_title, seo_desc
    *   `Orders`: id, customer_info, items JSON, total, status, created_at
    *   `BlogPosts`: id, title, slug, content (HTML/Markdown), cover_image, published_at
    *   `Subscribers`: email, joined_at

### 1.2 ORM Entegrasyonu (Prisma)
*   **Araç:** Prisma
*   **Amaç:** Veritabanı ile JavaScript kodunu güvenli konuşturmak.
*   **Komutlar:**
    ```bash
    npm install prisma --save-dev
    npm install @prisma/client
    npx prisma init
    ```

---

## 🔒 FAZ 2: GÜVENLİK & AUTH (KAPILARI KİLİTLEMEK)
Admin paneli şu an herkese açık. Bu büyük bir risk.

### 2.1 Admin Authentication
*   **Araç:** Clerk (Önerilen) veya NextAuth.js
*   **Aksiyon:**
    *   `/admin` altındaki tüm sayfalara "Middleware" koruması eklenecek.
    *   Sadece `yasin@tsuko.com` (örnek) email adresine sahip kullanıcı girebilecek.
    *   Giriş yapmamış kullanıcı `/login` sayfasına atılacak.

---

## ☁️ FAZ 3: MEDYA & OPERASYON (DEPOT YÖNETİMİ)
Admin panelinden ürün resmi yükleyebilmek için bulut depolama şart.

### 3.1 Görsel Upload Sistemi
*   **Araç:** Supabase Storage (Bucket)
*   **Entegrasyon:**
    *   Admin panelindeki ürün ekleme sayfasına "File Input" eklenecek.
    *   Seçilen resim Supabase'e yüklenecek.
    *   Dönen URL (örn: `https://supabase.co/storage/v1/object/public/products/vazo-1.jpg`) veritabanına kaydedilecek.

---

## 💳 FAZ 4: ÖDEME & SEPET (KASAYI KURMAK)
Shopier ile çalışmaya devam edilecekse, sistemin akıllı olması lazım.

### 4.1 Dinamik Sepet & Ödeme
*   **Mevcut Durum:** Statik linkler.
*   **Hedef:** Sepet mantığı (Cart Context) zaten var.
*   **Entegrasyon Seçenekleri:**
    1.  **Tam API:** Shopier API kullanarak arkaplanda sipariş oluşturmak (Gelişmiş).
    2.  **Link Generator:** Sepetteki toplam tutarı alıp, Shopier üzerinde o tutarda bir "Genel Ödeme" linkine yönlendirmek ve açıklamaya ürünleri yazdırmak (Basit & Hızlı).

---

## 📧 FAZ 5: PAZARLAMA OTOMASYONU (SESİMİZİ DUYURMAK)

### 5.1 Transactional Emails (Sipariş & Bildirim)
*   **Araç:** Resend
*   **Senaryolar:**
    *   Sipariş alındığında Yöneticiye ve Müşteriye mail.
    *   Newsletter aboneliğinde "Hoşgeldin Kuponu" maili.

### 5.2 Analytics (Gözlem)
*   **Google Tag Manager (GTM):**
    *   `src/app/layout.tsx` içindeki `GTM-XXXXXXX` ID'si güncellenmeli.
    *   GTM panelinden "Add to Cart", "Purchase" eventleri tanımlanmalı.

---

## ✅ ACİL AKSİYON LİSTESİ (HEMEN YAPILACAKLAR)

1.  [ ] **Supabase Hesabı Aç:** Yeni bir proje oluştur ve veritabanı şifresini al.
2.  [ ] **.env Dosyası Oluştur:** Proje köküne `.env` dosyası açıp API anahtarlarını oraya koy.
3.  [ ] **Prisma Kurulumu:** Veritabanı şemasını koda dök.
4.  [ ] **Clerk Kurulumu:** Admin panelini kilitle.

---
*Tsuko Digital Product Team*
