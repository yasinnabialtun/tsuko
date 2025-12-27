
import { Resend } from 'resend';
import { getWelcomeEmailHtml, getOrderConfirmationEmailHtml, getOrderShippedEmailHtml } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

// Domain verified in Resend dashboard must match this
const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL || 'Tsuko Design <info@tsukodesign.com>';

export async function sendWelcomeEmail(email: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing, skipping email.');
        return;
    }

    try {
        await resend.emails.send({
            from: SENDER_EMAIL,
            to: email,
            subject: 'Tsuko Dünyasına Hoş Geldiniz!',
            html: getWelcomeEmailHtml(email)
        });
    } catch (error) {
        console.error('Email send error:', error);
    }
}

export async function sendOrderConfirmationEmail(order: any) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing, skipping email.');
        return;
    }

    try {
        // Prepare items for template
        const items = order.items.map((i: any) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.price.toString()
        }));

        await resend.emails.send({
            from: SENDER_EMAIL,
            to: order.customerEmail,
            subject: `Siparişiniz Alındı! #${order.orderNumber}`,
            html: getOrderConfirmationEmailHtml({
                orderNumber: order.orderNumber,
                customerName: order.customerName,
                items: items,
                totalAmount: order.totalAmount.toString()
            })
        });

        // Notify Admin (Optional)
        /*
        await resend.emails.send({
            from: SENDER_EMAIL,
            to: 'admin@tsukodesign.com',
            subject: `Yeni Sipariş: #${order.orderNumber}`,
            html: `<p>Yeni bir sipariş geldi. Tutar: ${order.totalAmount} TL</p>`
        });
        */

    } catch (error) {
        console.error('Order email error:', error);
    }
}

export async function sendOrderShippedEmail(order: any) {
    if (!process.env.RESEND_API_KEY) return;

    try {
        await resend.emails.send({
            from: SENDER_EMAIL,
            to: order.customerEmail,
            subject: `Siparişiniz Yola Çıktı! #${order.orderNumber}`,
            html: getOrderShippedEmailHtml({
                orderNumber: order.orderNumber,
                customerName: order.customerName,
                trackingNumber: order.trackingNumber || ''
            })
        });
    } catch (error) {
        console.error('Shipping email error:', error);
    }
}
