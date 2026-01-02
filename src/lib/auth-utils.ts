
import { createHmac } from 'crypto';

const SECRET = process.env.ADMIN_SECRET || process.env.SHOPIER_API_SECRET || 'fallback-secret-key-CHANGE-ME';

export function signToken(payload: object): string {
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = createHmac('sha256', SECRET).update(data).digest('hex');
    return `${data}.${signature}`;
}

interface TokenPayload {
    exp: number;
    [key: string]: unknown;
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        const [data, signature] = token.split('.');
        if (!data || !signature) return null;

        const expectedSignature = createHmac('sha256', SECRET).update(data).digest('hex');
        if (signature !== expectedSignature) return null;

        const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf-8')) as TokenPayload;

        // Expiration check (24 hours)
        if (payload.exp && Date.now() > payload.exp) return null;

        return payload;
    } catch (e) {
        return null;
    }
}
