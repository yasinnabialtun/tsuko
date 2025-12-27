
# Tsuko Design - Yönetici Kılavuzu

Bu belge, Tsuko Design e-ticaret platformunun yönetim paneli özelliklerini ve kullanımını açıklar.

**Yönetim Paneli Adresi:** `tsuko.vercel.app/admin`  
(Erişmek için sitede yönetici hesabıyla giriş yapmış olmalısınız.)

---

## 1. 🛍️ Sipariş Yönetimi
**Menü:** `Siparişler`
*   Gelen tüm siparişleri tarih sırasına göre görebilirsiniz.
*   Bir siparişe tıklayarak müşteri bilgilerini ve satın alınan ürünleri inceleyin.
*   **Kargo Takibi:** Siparişi kargoya verdiğinizde, "Kargo Takip No" alanını doldurup Kaydet'e basın. Müşteriye otomatik e-posta gidecektir.
*   **İptal/İade:** Sorunlu siparişlerin durumunu "İptal Edildi" olarak güncelleyebilirsiniz.

## 2. 📦 Ürün Yönetimi
**Menü:** `Ürünler`
*   **Yeni Ürün Ekle:** Sağ üstteki butonu kullanın.
*   **Stok Takibi:** Stok adedini güncel tutun. Stok 0 olduğunda ürün otomatik olarak "Tükendi" etiketi alır ve sepete eklenemez.
*   **Öne Çıkanlar:** Bir ürünü ana sayfada göstermek için "Öne Çıkanlar Listesine Ekle" kutucuğunu işaretleyin.
*   **SEO:** Her ürün için "SEO Başlığı" ve "Açıklaması" girmeyi unutmayın.

## 3. 🎫 Kupon Sistemi
**Menü:** `Kuponlar`
*   Özel günler veya kampanyalar için indirim kodları oluşturun.
*   **İndirim Türü:** % Oran (Yüzde) veya Sabit Tutar (TL).
*   **Sınırlar:** "Minimum Sepet Tutarı" veya "Kullanım Limiti" (örn: İlk 50 kişi) koyabilirsiniz.
*   *Örnek:* `YAZ2025` kodu ile %15 indirim.

## 4. 📝 Blog Yönetimi
**Menü:** `Blog`
*   SEO trafiği çekmek için düzenli makaleler yayınlayın.
*   Görsel seçimi önemlidir (Yatay format önerilir).
*   Yazıları "Taslak" olarak kaydedip sonra yayınlayabilirsiniz.

## 5. 📧 Bülten & Aboneler
**Menü:** `Aboneler`
*   Sitenin footer kısmından veya pop-up'tan bültene kayıt olan e-postalar buraya düşer.
*   Bu listeyi Excel olarak indirip (kopyalayıp) toplu e-posta servislerinde (Mailchimp vb.) kullanabilirsiniz.

---

## ⚠️ Teknik Notlar
*   **Ödeme Sistemi:** Shopier entegrasyonu aktiftir. Ödemeler Shopier panelinize düşer.
*   **Stok Mantığı:** Sipariş verildiği an stok düşer. İptal edilen siparişlerde stoku manuel düzelmeniz gerekebilir.
*   **Destek:** Teknik bir sorun yaşarsanız `error.tsx` sayfası devreye girer.

**Bol Kazançlar!** 🚀
