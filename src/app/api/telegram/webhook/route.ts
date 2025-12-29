import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message || !message.text) {
            return NextResponse.json({ ok: true });
        }

        const chatId = message.chat.id;
        const text = message.text.trim();

        const botToken = process.env.TELEGRAM_BOT_TOKEN;

        async function sendReply(replyText: string) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: replyText,
                    parse_mode: 'Markdown'
                })
            });
        }

        if (text === '/start') {
            await sendReply(`👋 *Merhaba!* Tsuko Design Sipariş Takip Botuna Hoş Geldiniz.\n\nSiparişinizi sorgulamak için lütfen sipariş numaranızı yazın.\n\nÖrn: \`TS-1024\``);
            return NextResponse.json({ ok: true });
        }

        // Search for order number (Case insensitive check might be needed or assuming they copy paste TS-...)
        const orderNumber = text.toUpperCase();
        const order = await prisma.order.findUnique({
            where: { orderNumber: orderNumber },
            include: { items: { include: { product: true } } }
        });

        if (order) {
            const statusMap: Record<string, string> = {
                'PENDING': '⏳ Beklemede',
                'PREPARING': '🛠 Hazırlanıyor',
                'SHIPPED': '🚚 Kargoya Verildi',
                'DELIVERED': '✅ Teslim Edildi',
                'CANCELLED': '❌ İptal Edildi'
            };

            const paymentMap: Record<string, string> = {
                'UNPAID': '🔴 Ödenmedi',
                'PAID': '🟢 Ödendi',
                'REFUNDED': '🔵 İade Edildi'
            };

            const itemsStr = order.items.map(item => `- ${item.product.name} (x${item.quantity})`).join('\n');

            await sendReply(`📦 *Sipariş Detayı: ${order.orderNumber}*\n\n👤 *Müşteri:* ${order.customerName}\n📊 *Durum:* ${statusMap[order.status] || order.status}\n💳 *Ödeme:* ${paymentMap[order.paymentStatus] || order.paymentStatus}\n💰 *Toplam:* ${order.totalAmount} ₺\n\n📌 *Ürünler:*\n${itemsStr}\n\n${order.trackingNumber ? `📍 *Kargo Takip No:* \`${order.trackingNumber}\`` : ''}`);
        } else {
            if (text.startsWith('TS-')) {
                await sendReply(`🔍 *"${text}"* numaralı sipariş bulunamadı. Lütfen numarayı kontrol edip tekrar deneyin.`);
            } else {
                await sendReply(`❓ Yazdığınız mesajı anlayamadım. Sipariş takip etmek için \`TS-...\` formatındaki sipariş numaranızı gönderebilirsiniz.`);
            }
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Telegram Webhook Error:', error);
        return NextResponse.json({ ok: true }); // Always return 200 to Telegram
    }
}
