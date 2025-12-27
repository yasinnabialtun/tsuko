import { NextResponse } from 'next/server';
import { supabase, BUCKETS, isSupabaseConfigured } from '@/lib/supabase-storage';

export const dynamic = 'force-dynamic';

// POST /api/upload - Upload file to Supabase Storage
export async function POST(request: Request) {
    try {
        if (!isSupabaseConfigured || !supabase) {
            return NextResponse.json(
                { error: 'Storage not configured' },
                { status: 503 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const bucket = (formData.get('bucket') as string) || BUCKETS.GENERAL;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${timestamp}-${randomId}.${extension}`;

        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(fileName, buffer, {
                contentType: file.type,
                cacheControl: '31536000',
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return NextResponse.json(
                { error: `Upload failed: ${error.message}` },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path);

        return NextResponse.json({
            url: publicUrl,
            path: data.path,
            bucket
        }, { status: 201 });

    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}

// DELETE /api/upload - Delete file from Supabase Storage
export async function DELETE(request: Request) {
    try {
        if (!isSupabaseConfigured || !supabase) {
            return NextResponse.json(
                { error: 'Storage not configured' },
                { status: 503 }
            );
        }

        const { searchParams } = new URL(request.url);
        const path = searchParams.get('path');
        const bucket = searchParams.get('bucket') || BUCKETS.GENERAL;

        if (!path) {
            return NextResponse.json(
                { error: 'No path provided' },
                { status: 400 }
            );
        }

        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            return NextResponse.json(
                { error: `Delete failed: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'File deleted successfully'
        });

    } catch (error) {
        console.error('Delete API error:', error);
        return NextResponse.json(
            { error: 'Delete failed' },
            { status: 500 }
        );
    }
}
