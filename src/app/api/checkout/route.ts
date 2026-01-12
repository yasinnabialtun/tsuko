import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// Shopier Credentials
const SHOPIER_API_KEY = process.env.SHOPIER_API_KEY;
const SHOPIER_API_SECRET = process.env.SHOPIER_API_SECRET;
const SHOPIER_WEBSITE_INDEX = process.env.SHOPIER_WEBSITE_INDEX || '1';
const SHOPIER_BASE_URL = 'https://www.shopier.com/ShowProduct/api_pay4.php';

/**
 * Generate unique Order Number
 */
function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TS-${timestamp}-${random}`;
}

// Shopier Payment Class Helper (Embedded for reliability)
class ShopierPayment {
    private apiKey: string;
    private apiSecret: string;
    private websiteIndex: string;
    private buyer: any = {};
    private order: any = {};
    private products: any[] = [];
    private currency: number = 0; // 0=TRY, 1=USD, 2=EUR

    constructor(apiKey: string, apiSecret: string, websiteIndex: string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.websiteIndex = websiteIndex;
    }

    setBuyer(fields: { id: string; name: string; surname: string; email: string; phone: string; }) {
        this.buyer = { ...this.buyer, ...fields };
    }

    setOrderBilling(fields: { address: string; city: string; country: string; postcode: string; }) {
        this.buyer = { ...this.buyer, billing_address: fields.address, billing_city: fields.city, billing_country: fields.country, billing_postcode: fields.postcode };
    }

    setOrderShipping(fields: { address: string; city: string; country: string; postcode: string; }) {
        this.buyer = { ...this.buyer, shipping_address: fields.address, shipping_city: fields.city, shipping_country: fields.country, shipping_postcode: fields.postcode };
    }

    setOrderData(orderId: string, total: number) {
        this.order = { id: orderId, total };
    }

    generatePaymentForm() {
        const randomNr = Math.floor(Math.random() * 999999) + 100000;
        const args = [
            this.apiKey,
            this.websiteIndex,
            this.order.id,
            this.order.total.toFixed(2),
            this.currency.toString(),
            // Ensure product logic is handled or send default if using total-based
            // Shopier API often just needs one consolidated "product" for the whole cart
            'Tsuko Design Siparis', // Combined Product Name
            '1', // Product Type: Real Object
            this.buyer.name,
            this.buyer.surname,
            this.buyer.email,
            '0', // Account Age
            '11111111111', // ID NR
            this.buyer.phone,
            this.buyer.billing_address,
            this.buyer.billing_city,
            this.buyer.billing_country,
            this.buyer.billing_postcode,
            this.buyer.shipping_address,
            this.buyer.shipping_city,
            this.buyer.shipping_country,
            this.buyer.shipping_postcode,
            randomNr,
            this.apiSecret
        ];

        const signature = crypto.createHash('sha256').update(args.map(String).join('')).digest('base64');

        return {
            formData: {
                API_key: this.apiKey,
                website_index: this.websiteIndex,
                platform_order_id: this.order.id,
                product_name: 'Tsuko Design Siparis',
                product_type: 1, // 1: Real Object, 2: Digital
                buyer_name: this.buyer.name,
                buyer_surname: this.buyer.surname,
                buyer_email: this.buyer.email,
                buyer_account_age: 0,
                buyer_id_nr: 11111111111,
                buyer_phone: this.buyer.phone,
                billing_address: this.buyer.billing_address,
                billing_city: this.buyer.billing_city,
                billing_country: this.buyer.billing_country,
                billing_postcode: this.buyer.billing_postcode,
                shipping_address: this.buyer.shipping_address,
                shipping_city: this.buyer.shipping_city,
                shipping_country: this.buyer.shipping_country,
                shipping_postcode: this.buyer.shipping_postcode,
                amount: this.order.total.toFixed(2),
                currency: this.currency,
                random_nr: randomNr,
                signature: signature,
                modul_version: '1.0.4',
                callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/shopier`,
                back_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?orderId=${this.order.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel?orderId=${this.order.id}`
            },
            url: SHOPIER_BASE_URL
        };
    }
}

// POST /api/checkout
export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        const body = await request.json();
        const { items, customer, couponCode } = body;

        if (!items || items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        if (!customer) return NextResponse.json({ error: 'Customer details missing' }, { status: 400 });

        // 1. Calculate Total & Validate Stock
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.id } });
            if (!product) continue;

            let finalPrice = Number(product.price);
            let checkStock = product.stock;

            if (item.variantId) {
                const variant = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
                if (variant) {
                    finalPrice = Number(variant.price);
                    checkStock = variant.stock;
                }
            }

            if (checkStock < item.quantity) {
                return NextResponse.json({ error: `Stok yetersiz: ${product.name}` }, { status: 400 });
            }

            totalAmount += finalPrice * item.quantity;
            orderItemsData.push({
                productId: product.id,
                variantId: item.variantId || null,
                quantity: item.quantity,
                price: finalPrice
            });
        }

        // Apply Coupon
        let discountAmount = 0;
        if (couponCode) {
            const coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } });
            if (coupon && coupon.isActive) {
                const val = Number(coupon.discountValue);
                discountAmount = coupon.discountType === 'PERCENTAGE' ? (totalAmount * val) / 100 : val;
            }
        }
        const finalAmount = Math.max(0, totalAmount - discountAmount);
        const orderNumber = generateOrderNumber();

        // 2. Create Order in DB
        const fullAddress = `${customer.address}, ${customer.district}, ${customer.city}, ${customer.zipCode}`;
        const order = await prisma.order.create({
            data: {
                orderNumber,
                customerName: `${customer.firstName} ${customer.lastName}`,
                customerEmail: customer.email,
                customerPhone: customer.phone,
                shippingAddress: fullAddress,
                city: customer.city,
                totalAmount: finalAmount,
                discountAmount,
                couponCode: discountAmount > 0 ? couponCode.toUpperCase() : null,
                userId: userId || null,
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                items: { create: orderItemsData }
            }
        });

        // 3. Deduct Stock
        for (const item of orderItemsData) {
            if (item.variantId) {
                await prisma.productVariant.update({ where: { id: item.variantId }, data: { stock: { decrement: item.quantity } } });
            } else {
                await prisma.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
            }
        }

        // 4. Generate Shopier Form
        if (!SHOPIER_API_KEY || !SHOPIER_API_SECRET) {
            console.error('CRITICAL: Shopier credentials missing!');
            return NextResponse.json({ error: 'Ödeme sistemi hatası.' }, { status: 500 });
        }

        const shopier = new ShopierPayment(SHOPIER_API_KEY, SHOPIER_API_SECRET, SHOPIER_WEBSITE_INDEX);
        shopier.setBuyer({
            id: '11111111111',
            name: customer.firstName,
            surname: customer.lastName,
            email: customer.email,
            phone: customer.phone
        });
        shopier.setOrderBilling({
            address: fullAddress,
            city: customer.city,
            country: 'Turkiye',
            postcode: customer.zipCode || '00000'
        });
        shopier.setOrderShipping({
            address: fullAddress,
            city: customer.city,
            country: 'Turkiye',
            postcode: customer.zipCode || '00000'
        });
        shopier.setOrderData(orderNumber, finalAmount);

        const formResult = shopier.generatePaymentForm();

        return NextResponse.json({
            success: true,
            action: 'post_form',
            url: formResult.url,
            formData: formResult.formData
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
    }
}
