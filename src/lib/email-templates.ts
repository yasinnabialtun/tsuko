// Newsletter Welcome Email Template
export function getWelcomeEmailHtml(email: string): string {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tsuko Design'a Hoş Geldiniz</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #FAFAFA; border-bottom: 1px solid #EAEAEA;">
                            <h1 style="margin: 0; color: #2C2C2C; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">TSUKO DESIGN</h1>
                            <p style="margin: 10px 0 0; color: #888888; font-size: 14px; font-weight: 500;">Mimari Estetik, Evinize Taşındı</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px; color: #2C2C2C; font-size: 22px; font-weight: 700;">Ailemize Hoş Geldiniz! 🌿</h2>
                            
                            <p style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.7;">
                                Merhaba,<br><br>
                                Tsuko Design bültenine abone olduğunuz için teşekkür ederiz. Sürdürülebilir tasarım yolculuğumuzda bize katıldığınız için çok mutluyuz.
                            </p>
                            
                            <!-- Discount Code Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                                <tr>
                                    <td style="background-color: #F5EBE0; border: 1px solid #E6D5C3; padding: 35px; border-radius: 16px; text-align: center;">
                                        <p style="margin: 0 0 10px; color: #8D7B68; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Size Özel Tanışma Hediyesi</p>
                                        <p style="margin: 0; color: #2C2C2C; font-size: 36px; font-weight: 800; letter-spacing: 2px;">HOSGELDIN10</p>
                                        <p style="margin: 15px 0 0; color: #8D7B68; font-size: 13px;">Tüm siparişlerde %10 indirim sağlar</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com" style="display: inline-block; background-color: #D4A373; color: #FFFFFF; padding: 18px 45px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(212, 163, 115, 0.3);">Koleksiyonu Keşfet →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0; color: #999; font-size: 12px;">
                                            Bu e-posta ${email} adresine gönderilmiştir.
                                            <br>
                                            © 2025 Tsuko Design. Tüm hakları saklıdır.
                                        </p>
                                        <p style="margin: 15px 0 0;">
                                            <a href="https://tsukodesign.com" style="color: #D4A373; text-decoration: none; font-size: 12px; font-weight: 600;">Web Sitesi</a>
                                            <span style="color: #DDD; margin: 0 10px;">|</span>
                                            <a href="https://instagram.com/tsukodesign" style="color: #D4A373; text-decoration: none; font-size: 12px; font-weight: 600;">Instagram</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Order Confirmation Email Template
export function getOrderConfirmationEmailHtml(order: {
    orderNumber: string;
    customerName: string;
    items: Array<{ name: string; quantity: number; price: string }>;
    totalAmount: string;
}): string {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 16px 0; border-bottom: 1px solid #F0F0F0;">
                <p style="margin: 0; font-weight: 600; color: #4A4A4A; font-size: 15px;">${item.name}</p>
                <p style="margin: 4px 0 0; color: #9CA3AF; font-size: 13px;">Adet: ${item.quantity}</p>
            </td>
            <td style="padding: 16px 0; border-bottom: 1px solid #F0F0F0; text-align: right; font-weight: 600; color: #2C2C2C; font-size: 15px;">
                ₺${item.price}
            </td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sipariş Onayı - Tsuko Design</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header - Pastel Clay -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #E6D5C3;">
                            <div style="width: 60px; height: 60px; line-height: 60px; background: #FFFFFF; border-radius: 50%; display: inline-block; font-size: 24px; color: #D4A373; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">✓</div>
                            <h1 style="margin: 0; color: #5D4037; font-size: 24px; font-weight: 800;">Siparişiniz Alındı!</h1>
                            <p style="margin: 10px 0 0; color: #8D7B68; font-size: 15px; font-weight: 500;">Sipariş No: ${order.orderNumber}</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.6;">
                                Sayın ${order.customerName},<br><br>
                                Harika seçim! Siparişinizi özenle hazırlamaya başlıyoruz. Süreçle ilgili sizi bilgilendirmeye devam edeceğiz.
                            </p>
                            
                            <!-- Order Summary -->
                            <div style="background-color: #FAFAFA; border-radius: 12px; padding: 30px;">
                                <h3 style="margin: 0 0 15px; color: #2C2C2C; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Sipariş Özeti</h3>
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    ${itemsHtml}
                                    <tr>
                                        <td style="padding: 20px 0 0; font-weight: 700; color: #2C2C2C; font-size: 16px;">Genel Toplam</td>
                                        <td style="padding: 20px 0 0; text-align: right; font-weight: 800; color: #D4A373; font-size: 20px;">₺${order.totalAmount}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Track Order -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 35px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/order-tracking?id=${order.orderNumber}" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Siparişimi Görüntüle →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">© 2025 Tsuko Design</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Order Shipped Email Template
export function getOrderShippedEmailHtml(order: {
    orderNumber: string;
    customerName: string;
    trackingNumber: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Siparişiniz Kargoya Verildi - Tsuko Design</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header - Pastel Sage Green -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #CCD5AE;">
                            <div style="width: 60px; height: 60px; line-height: 60px; background: #FFFFFF; border-radius: 50%; display: inline-block; font-size: 28px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">📦</div>
                            <h1 style="margin: 0; color: #3A4735; font-size: 24px; font-weight: 800;">Siparişiniz Yola Çıktı!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.6;">
                                Sayın ${order.customerName},<br><br>
                                Güzel haberi sizinle paylaşmak istedik: #${order.orderNumber} numaralı siparişiniz kuryeye teslim edildi.
                            </p>
                            
                            <!-- Tracking Number Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEFAE0; border: 1px solid #E9EDC9; padding: 30px; border-radius: 16px; text-align: center;">
                                        <p style="margin: 0 0 10px; color: #78856E; font-size: 13px; font-weight: 600; text-transform: uppercase;">Kargo Takip Numaranız</p>
                                        <p style="margin: 0; color: #2C2C2C; font-size: 26px; font-weight: 800; font-family: monospace; letter-spacing: 2px;">${order.trackingNumber}</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 35px; color: #666; font-size: 15px; text-align: center;">
                                Siparişiniz 2-4 iş günü içinde adresinize ulaşacaktır.
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/order-tracking" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Kargomu Takip Et →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">© 2025 Tsuko Design</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Stock Notification Email Template
export function getStockNotificationEmailHtml(product: {
    name: string;
    image: string;
    slug: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stok Alarmı - Tsuko Design</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #FAFAFA; border-bottom: 1px solid #EAEAEA;">
                            <h1 style="margin: 0; color: #2C2C2C; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">TSUKO DESIGN</h1>
                            <p style="margin: 10px 0 0; color: #888888; font-size: 14px; font-weight: 500;">Stok Alarmı</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px; color: #2C2C2C; font-size: 22px; font-weight: 700;">Aranan Ürün Tekrar Stokta! 🎉</h2>
                            
                            <p style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.7;">
                                Merhaba,<br><br>
                                Beklediğiniz ürün tekrar stoklarımıza dahil oldu. Bu fırsatı kaçırmamanız için hemen haber vermek istedik.
                            </p>
                            
                            <!-- Product Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0; background-color: #FAFAFA; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td width="120" valign="top">
                                        <img src="${product.image}" alt="${product.name}" width="100" style="border-radius: 8px; display: block;">
                                    </td>
                                    <td style="padding-left: 20px;">
                                        <h3 style="margin: 0 0 5px; color: #2C2C2C; font-size: 18px; font-weight: 700;">${product.name}</h3>
                                        <p style="margin: 0; color: #D4A373; font-weight: 700;">Şimdi Stokta!</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/product/${product.slug}" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 18px 45px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Hemen İncele ve Satın Al</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 30px 0 0; color: #999; font-size: 13px; text-align: center;">
                                Ürünlerimizin el yapımı ve butik üretim olması nedeniyle stoklarımız hızla tükenebilir.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">© 2025 Tsuko Design</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}
// Generic Newsletter Template
export function getNewsletterEmailHtml(content: { title: string; body: string; ctaText?: string; ctaLink?: string }): string {
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #FAFAFA; border-bottom: 1px solid #EAEAEA;">
                            <h1 style="margin: 0; color: #2C2C2C; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">TSUKO DESIGN</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px; color: #2C2C2C; font-size: 24px; font-weight: 700; text-align: center;">${content.title}</h2>
                            
                            <div style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.7;">
                                ${content.body}
                            </div>
                            
                            ${content.ctaText && content.ctaLink ? `
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 35px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${content.ctaLink}" style="display: inline-block; background-color: #D4A373; color: #FFFFFF; padding: 18px 45px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">${content.ctaText}</a>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">© 2025 Tsuko Design</p>
                            <p style="margin: 10px 0 0; color: #BBB; font-size: 11px;">Bülten aboneliğiniz kapsamında gönderilmiştir.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}

// Abandoned Cart Email Template
export function getAbandonedCartEmailHtml(order: {
    customerName: string;
    items: Array<{ name: string; quantity: number; price: string; image: string }>;
    orderNumber: string;
}): string {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td width="80" style="padding: 10px 0; border-bottom: 1px solid #EEE;">
                <img src="${item.image}" width="60" style="border-radius: 8px;">
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #EEE;">
                <p style="margin: 0; font-weight: 700; color: #2C2C2C; font-size: 14px;">${item.name}</p>
                <p style="margin: 2px 0 0; color: #999; font-size: 12px;">Adet: ${item.quantity}</p>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #EEE; text-align: right; font-weight: 700; color: #2C2C2C; font-size: 14px;">
                ₺${item.price}
            </td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sepetini Unutma - Tsuko Design</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #4A4A4A;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 50px 40px; text-align: center; background-color: #FAFAFA;">
                            <div style="font-size: 40px; margin-bottom: 20px;">🛒</div>
                            <h1 style="margin: 0; color: #2C2C2C; font-size: 24px; font-weight: 800;">Sepetinde Bir Şeyler Kaldı!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 25px; color: #666; font-size: 16px; line-height: 1.6; text-align: center;">
                                Sayın ${order.customerName},<br>
                                Seçtiğin ürünler sepetinde seni bekliyor. Onları senin için ayırdık ama stoklarımız hızla tükenebilir. Alışverişini tamamlamak ister misin?
                            </p>
                            
                            <!-- Items List -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                ${itemsHtml}
                            </table>
                            
                            <!-- Promo Code Box -->
                            <div style="background-color: #F8F9FA; border: 1px dashed #DDD; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
                                <p style="margin: 0 0 5px; color: #D4A373; font-size: 12px; font-weight: 700; text-transform: uppercase;">Sana Özel %10 İndirim Kodu</p>
                                <p style="margin: 0; color: #2C2C2C; font-size: 24px; font-weight: 800;">DONUS10</p>
                            </div>

                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/order-tracking?id=${order.orderNumber}" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 18px 45px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">Siparişimi Tamamla →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #FAFAFA; border-top: 1px solid #EAEAEA; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">© 2025 Tsuko Design</p>
                            <p style="margin: 10px 0 0; color: #BBB; font-size: 11px;">Evinizin havasını değiştirmek için buradayız.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}
