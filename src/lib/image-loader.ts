
/**
 * Supabase Image Loader for Next.js
 * Automatically resizes and optimizes images from Supabase Storage
 */
export default function supabaseLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    // If the image is not from Supabase, return as is
    if (!src.includes('supabase.co')) {
        return src;
    }

    // Supabase optimization params: width, quality, and automatic format selection
    // Format: https://[URL]/storage/v1/render/image/public/[BUCKET]/[PATH]?width=800&quality=75
    // Note: Only works if the bucket is public and transformation is enabled in Supabase
    const url = new URL(src);

    // Transform URL to use Supabase's image rendering service
    // Original: https://xyz.supabase.co/storage/v1/object/public/products/image.jpg
    // Render:   https://xyz.supabase.co/storage/v1/render/image/public/products/image.jpg
    if (src.includes('/storage/v1/object/public/')) {
        url.pathname = url.pathname.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
    }

    url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', (quality || 75).toString());

    return url.href;
}
