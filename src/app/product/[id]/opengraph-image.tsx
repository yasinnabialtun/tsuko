import { ImageResponse } from 'next/og';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime to access Prisma
export const runtime = 'nodejs';

export const alt = 'Tsuko Design';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch product
    // Try by slug first, then ID
    let product = await prisma.product.findUnique({
        where: { slug: id },
        select: { name: true, price: true, images: true }
    });

    if (!product) {
        product = await prisma.product.findUnique({
            where: { id: id },
            select: { name: true, price: true, images: true }
        });
    }

    if (!product) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 48,
                        background: 'white',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#333',
                    }}
                >
                    Tsuko Design
                </div>
            ),
            { ...size }
        );
    }

    const productImage = product.images?.[0] || 'https://tsukodesign.com/images/hero.png';
    const absoluteImage = productImage.startsWith('http') ? productImage : `https://tsukodesign.com${productImage}`;

    return new ImageResponse(
        (
            <div
                style={{
                    background: '#F5F5F4', // bg-porcelain
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'serif',
                }}
            >
                {/* Left: Text */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', width: '50%' }}>
                    <div style={{ fontSize: 24, letterSpacing: '0.2em', color: '#B68D78', marginBottom: 20, textTransform: 'uppercase' }}>
                        Tsuko Design
                    </div>
                    <div style={{ fontSize: 64, color: '#333', lineHeight: 1.1, marginBottom: 20, fontWeight: 'bold' }}>
                        {product.name}
                    </div>
                    <div style={{ fontSize: 48, color: '#666' }}>
                        {product.price.toString()} ₺
                    </div>
                </div>

                {/* Right: Image */}
                <div style={{ display: 'flex', width: '50%', height: '100%', position: 'relative' }}>
                    {/* Note: Next.og ImageResponse doesn't support 'next/image' component, use standard img */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={absoluteImage}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
