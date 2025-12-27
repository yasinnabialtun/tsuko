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
    if (!supabase) {
        return { url: null, error: 'Supabase not configured' };
    }

    try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop();
        const fileName = path || `${timestamp}-${randomId}.${extension}`;

        // Upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, {
                cacheControl: '31536000', // 1 year cache
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return { url: null, error: error.message };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return { url: publicUrl, error: null };
    } catch (err) {
        console.error('Upload exception:', err);
        return { url: null, error: 'Upload failed' };
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
