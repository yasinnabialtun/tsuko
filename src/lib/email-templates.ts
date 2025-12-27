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
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #2C2C2C;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #2C2C2C 0%, #404040 100%);">
                            <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 800;">TSUKO DESIGN</h1>
                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.7); font-size: 14px;">Mimari Estetik, Evinize Taşındı</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <h2 style="margin: 0 0 20px; color: #2C2C2C; font-size: 24px; font-weight: 700;">Ailemize Hoş Geldiniz! 🎉</h2>
                            
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.7;">
                                Merhaba,<br><br>
                                Tsuko Design bültenine abone olduğunuz için teşekkür ederiz! Artık yeni koleksiyonlardan, özel kampanyalardan ve dekorasyon ilhamlarından ilk siz haberdar olacaksınız.
                            </p>
                            
                            <!-- Discount Code Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #CD8B62 0%, #B67A55 100%); padding: 30px; border-radius: 12px; text-align: center;">
                                        <p style="margin: 0 0 10px; color: rgba(255,255,255,0.9); font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Size Özel %10 İndirim</p>
                                        <p style="margin: 0; color: #FFFFFF; font-size: 32px; font-weight: 800; letter-spacing: 4px;">HOSGELDIN10</p>
                                        <p style="margin: 15px 0 0; color: rgba(255,255,255,0.7); font-size: 12px;">İlk siparişinizde geçerli</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 30px; color: #666; font-size: 16px; line-height: 1.7;">
                                Bu kodu ödeme sayfasında kullanarak tüm ürünlerde %10 indirim kazanabilirsiniz.
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">Koleksiyonu Keşfet →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #F9F9F9; border-top: 1px solid #EEE;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="margin: 0 0 10px; color: #999; font-size: 12px;">
                                            © 2025 Tsuko Design. Tüm hakları saklıdır.
                                        </p>
                                        <p style="margin: 0; color: #999; font-size: 12px;">
                                            Bu e-postayı ${email} adresine gönderdik.
                                        </p>
                                        <p style="margin: 10px 0 0;">
                                            <a href="https://tsukodesign.com" style="color: #CD8B62; text-decoration: none; font-size: 12px;">Web Sitesi</a>
                                            &nbsp;|&nbsp;
                                            <a href="https://instagram.com/tsukodesign" style="color: #CD8B62; text-decoration: none; font-size: 12px;">Instagram</a>
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
            <td style="padding: 12px 0; border-bottom: 1px solid #EEE;">
                <p style="margin: 0; font-weight: 600; color: #2C2C2C;">${item.name}</p>
                <p style="margin: 4px 0 0; color: #999; font-size: 14px;">Adet: ${item.quantity}</p>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #EEE; text-align: right; font-weight: 600; color: #2C2C2C;">
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
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #2C2C2C;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);">
                            <p style="margin: 0 0 10px; font-size: 40px;">✓</p>
                            <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800;">Siparişiniz Alındı!</h1>
                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Sipariş No: ${order.orderNumber}</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px;">
                                Sayın ${order.customerName},<br><br>
                                Siparişiniz için teşekkür ederiz! Siparişinizi en kısa sürede hazırlayıp kargoya vereceğiz.
                            </p>
                            
                            <!-- Order Summary -->
                            <h3 style="margin: 30px 0 15px; color: #2C2C2C; font-size: 18px; font-weight: 700;">Sipariş Özeti</h3>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                ${itemsHtml}
                                <tr>
                                    <td style="padding: 15px 0 0; font-weight: 800; color: #2C2C2C; font-size: 18px;">Toplam</td>
                                    <td style="padding: 15px 0 0; text-align: right; font-weight: 800; color: #CD8B62; font-size: 18px;">₺${order.totalAmount}</td>
                                </tr>
                            </table>
                            
                            <!-- Track Order -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/order-tracking" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">Siparişimi Takip Et →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #F9F9F9; border-top: 1px solid #EEE; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                Sorularınız için: info@tsukodesign.com
                            </p>
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
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FDFBF7; color: #2C2C2C;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FDFBF7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);">
                            <p style="margin: 0 0 10px; font-size: 40px;">📦</p>
                            <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800;">Siparişiniz Yola Çıktı!</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px;">
                                Sayın ${order.customerName},<br><br>
                                ${order.orderNumber} numaralı siparişiniz kargoya verildi ve yola çıktı!
                            </p>
                            
                            <!-- Tracking Number -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #F3F4F6; padding: 25px; border-radius: 12px; text-align: center;">
                                        <p style="margin: 0 0 8px; color: #666; font-size: 14px;">Kargo Takip Numarası</p>
                                        <p style="margin: 0; color: #2C2C2C; font-size: 24px; font-weight: 800; font-family: monospace;">${order.trackingNumber}</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 30px; color: #666; font-size: 16px;">
                                Siparişiniz 2-4 iş günü içinde adresinize teslim edilecektir.
                            </p>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://tsukodesign.com/order-tracking" style="display: inline-block; background-color: #2C2C2C; color: #FFFFFF; padding: 16px 40px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 14px;">Kargo Takibi →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #F9F9F9; border-top: 1px solid #EEE; text-align: center;">
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                © 2025 Tsuko Design
                            </p>
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
