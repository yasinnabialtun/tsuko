
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// We will pass the key as an argument or env var when running
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('❌ Hata: Supabase URL veya Service Key eksik.');
    console.log('Kullanım: SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/setup-buckets.ts');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const BUCKETS = ['products', 'blog', 'uploads'];

async function setupBuckets() {
    console.log('🔄 Kovalar (Buckets) kontrol ediliyor...');

    for (const bucket of BUCKETS) {
        // 1. Try to get the bucket
        const { data: existingBucket, error: getError } = await supabase.storage.getBucket(bucket);

        if (existingBucket) {
            console.log(`✅ '${bucket}' kovası zaten var. Ayarları güncelleniyor...`);
            const { error: updateError } = await supabase.storage.updateBucket(bucket, {
                public: true,
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
            });
            if (updateError) console.error(`⚠️ '${bucket}' güncellenemedi:`, updateError.message);
        } else {
            // 2. Create if not exists
            console.log(`hammer_and_pick: '${bucket}' kovası oluşturuluyor...`);
            const { error: createError } = await supabase.storage.createBucket(bucket, {
                public: true,
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
            });

            if (createError) {
                console.error(`❌ '${bucket}' oluşturulamadı:`, createError.message);
            } else {
                console.log(`✅ '${bucket}' başarıyla oluşturuldu!`);
            }
        }

        // 3. Create a policy to allow public access (just in case)
        // Note: The JS client storage.createBucket with public:true usually handles the basic public read access.
        // Writing policies via JS client is not directly supported in the same way as SQL, 
        // but creating a public bucket is usually enough for the 'public' schema access.
    }
    console.log('✨ İşlem tamamlandı.');
}

setupBuckets();
