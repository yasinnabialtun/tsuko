
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple In-Memory Rate Limiter
 * @param identifier - Unique ID (like IP address)
 * @param limit - Max requests per window
 * @param windowMs - Time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(identifier);

    // If no entry or window expired, reset
    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
        return true;
    }

    // Check limit
    if (entry.count >= limit) {
        return false;
    }

    entry.count++;
    return true;
}
