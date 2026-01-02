
import { NextResponse } from 'next/server';
import { uploadFile, BUCKETS } from '@/lib/supabase-storage';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Upload to Supabase 'products' bucket
        const result = await uploadFile(file, BUCKETS.PRODUCTS);

        if (result.error) {
            console.error('Supabase Upload Error:', result.error);
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({
            url: result.url,
            // Mocking these as Supabase doesn't return dimensions immediately without extra logic
            // But frontend might expect them.
            publicId: file.name,
            width: 0,
            height: 0
        }, { status: 201 });

    } catch (error) {
        console.error('Upload API Error:', error);
        return NextResponse.json({ error: 'Upload process failed' }, { status: 500 });
    }
}
