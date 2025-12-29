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
