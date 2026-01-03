import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for storage operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client only if configured
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl!, supabaseAnonKey!)
    : null;

// Storage bucket names
export const BUCKETS = {
    PRODUCTS: 'products',
    BLOG: 'blog',
    GENERAL: 'uploads'
};


// Upload a file to Supabase Storage
export async function uploadFile(
    file: File,
    bucket: string = BUCKETS.GENERAL,
    path?: string
): Promise<{ url: string; error: null } | { url: null; error: string }> {
    if (!isSupabaseConfigured || !supabase) {
        return { url: null, error: 'Supabase yapılandırması eksik (.env kontrol edin).' };
    }

    try {
        // Safe filename generation
        const timestamp = Date.now();
        const rand = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

        // Clean special characters but keep alphanumeric
        const baseName = file.name
            .split('.')[0]
            .toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .substring(0, 30);

        const fileName = path || `${baseName}-${timestamp}-${rand}.${extension}`;

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '31536000',
                upsert: true
            });

        if (error) {
            console.error('Supabase ERROR:', error);
            if (error.message.toLowerCase().includes('bucket not found')) {
                return { url: null, error: `Supabase'de '${bucket}' isimli kova bulunamadı. Lütfen kovanın oluşturulduğundan ve 'Public' olduğundan emin olun.` };
            }
            return { url: null, error: `Supabase Hatası: ${error.message}` };
        }

        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return { url: publicUrl, error: null };
    } catch (err: any) {
        console.error('Upload exception:', err);
        return { url: null, error: `Beklenmeyen yükleme hatası: ${err.message || 'Bağlantı sorunu'}` };
    }
}

// Delete a file from Supabase Storage
export async function deleteFile(
    path: string,
    bucket: string = BUCKETS.GENERAL
): Promise<{ success: boolean; error: string | null }> {
    if (!supabase) {
        return { success: false, error: 'Supabase not configured' };
    }

    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (err) {
        return { success: false, error: 'Delete failed' };
    }
}

// Get signed URL for private files (if needed)
export async function getSignedUrl(
    path: string,
    bucket: string = BUCKETS.GENERAL,
    expiresIn: number = 3600 // 1 hour
): Promise<string | null> {
    if (!supabase) return null;

    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

    if (error) {
        console.error('Signed URL error:', error);
        return null;
    }

    return data.signedUrl;
}
