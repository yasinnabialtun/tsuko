# Tsuko Design - Proje Kontrol & Eksikler Listesi

Projeniz teknik olarak tamamlanmıştır (Sepet, Checkout, Ödeme, Stok Takibi vb.). Ancak canlıya geçmeden önce aşağıdaki adımları tamamlamanız gerekmektedir.

## 🚨 1. ACİL YAPILMASI GEREKENLER (KODLARIN HİSSEDİLMESİ İÇİN)
- [ ] **Terminali Yeniden Başlat:** Terminalinizde çalışan sunucu (5+ saattir açık) yeni eklediğimiz Sepet ve Checkout sistemlerini henüz görmüyor.
  - Terminale gidin.
  - `CTRL + C` yapıp durdurun.
  - Tekrar `npm run dev` yazıp çalıştırın.
  - Tarayıcınızı `CTRL + F5` ile yenileyin.

## 🛠 2. KONFIGÜRASYON EKSİKLERİ (.env dosyası)
Projenin ana dizininde `.env` (yoksa `.env.example` dosyasını kopyalayıp `.env` yapın) dosyasını açın ve şu bilgileri girin:
- [ ] `SHOPIER_API_KEY` ve `SHOPIER_API_SECRET`: Shopier panelinden alıp yapıştırın.
- [ ] `RESEND_API_KEY`: E-posta gönderimi için Resend.com'dan alıp yapıştırın.
- [ ] `ADMIN_API_KEY`: API güvenliği için kendiniz bir şifre belirleyip yazın.
- [ ] `NEXT_PUBLIC_SITE_URL`: Canlı site adresinizi (veya localde http://localhost:3000) yazın.

## 🌐 3. 3. PARTİ SERVİS AYARLARI
- [ ] **Shopier Webhook:** Ödeme alındığında stoğun düşmesi için Shopier'a şu URL'i bildirin (veya API otomatik halleder ama kontrol edin):
  `https://siteniz.com/api/webhooks/shopier`
- [ ] **Resend Domain:** E-postaların spama düşmemesi için Resend panelinde domaininizi doğrulayın (DNS ayarları).

## ⚠️ 4. SİSTEMDE OLMAYAN / EKSİK KALAN ÖZELLİKLER
Bu özellikler şu an kodlanmamıştır:
1.  **Otomatik Para İadesi:** Sipariş iptalinde Shopier'dan otomatik iade yapılmaz. Shopier panelinden manuel iade yapmalısınız.
2.  **Kargo Entegrasyonu:** Yurtiçi/Aras/MNG ile otomatik barkod entegrasyonu yoktur. Takip numaralarını Admin panelinden elle girmelisiniz.
3.  **Üyelik Sistemi (Müşteri):** Sadece Admin girişi vardır. Müşteriler üye olmadan ("Misafir") alışveriş yapar.

## ✅ 5. YAPILAN DÜZELTMELER (FIX LOG)
- **Product Page:** Artık veri tabanından canlı çekiliyor.
- **Cart System:** Sıfırdan Sepet ve Drawer eklendi.
- **Checkout:** Shopier öncesi "Adres Formu" sayfası eklendi.
- **Güvenlik:** Admin API'leri şifrelendi.
- **Stok:** Ödeme sonrası otomatik stok düşümü eklendi.
