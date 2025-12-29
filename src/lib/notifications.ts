export async function sendDiscordNotification(order: { orderNumber: string, totalAmount: string, customerName: string }) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                embeds: [{
                    title: '🎉 Yeni Sipariş!',
                    color: 0x6d4c41, // Clay color
                    fields: [
                        { name: 'Sipariş No', value: `\`${order.orderNumber}\``, inline: true },
                        { name: 'Müşteri', value: order.customerName, inline: true },
                        { name: 'Tutar', value: `${order.totalAmount} ₺`, inline: true }
                    ],
                    footer: { text: 'Tsuko Design | E-Commerce Bot' },
                    timestamp: new Date().toISOString()
                }]
            })
        });
    } catch (error) {
        console.error('Discord notification failed:', error);
    }
}

export async function sendTelegramNotification(order: { orderNumber: string, totalAmount: string, customerName: string, items: string }) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) return;

    const message = `
🎉 *YENİ SİPARİŞ!*

🆔 *Sipariş No:* \`${order.orderNumber}\`
👤 *Müşteri:* ${order.customerName}
💰 *Tutar:* ${order.totalAmount} ₺

📦 *Ürünler:*
${order.items}

🚀 [Panele Git](https://tsukodesign.com/admin/orders)
    `;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch (error) {
        console.error('Telegram notification failed:', error);
    }
}
