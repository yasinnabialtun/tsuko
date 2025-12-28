
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// 1 Hour ISR
// export const revalidate = 3600; 
export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
    title: 'Blog | Tsuko Design - Dekorasyon ve Tasarım Trendleri',
    description: 'Ev dekorasyonu, minimalist yaşam, parametrik tasarım ve dekorasyon trendleri hakkında ilham verici içerikler ve rehberler.',
};

async function getBlogPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 9
        });
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

const DEFAULT_POSTS = [
    {
        id: '1',
        title: 'Parametrik Tasarımın Yükselişi: Algoritmalar Evinize Giriyor',
        slug: 'parametrik-tasarim-nedir',
        excerpt: 'Modern mimarinin en etkileyici akımı parametrik tasarım, artık sadece büyük yapılarda değil, ev dekorasyon objelerinde de hayat buluyor. İşte bilmeniz gerekenler.',
        coverImage: '/images/hero.png',
        category: 'Tasarım',
        date: '28 ARALIK 2025',
        author: 'Tsuko Editör'
    },
    {
        id: '2',
        title: 'Sürdürülebilir Dekorasyon: PLA ve Biyo-Polimer Devrimi',
        slug: 'pla-nedir-surdurulebilir-dekorasyon',
        excerpt: 'Petrol türevi plastiklere veda edin. Mısır nişastasından üretilen, doğaya saygılı ve estetik PLA materyali, geleceğin evlerini nasıl şekillendiriyor?',
        coverImage: '/images/hero.png', // Fallback
        category: 'Sürdürülebilirlik',
        date: '25 ARALIK 2025',
        author: 'Ece Yılmaz'
    },
    {
        id: '3',
        title: 'Minimalist Evler İçin 5 Aydınlatma Önerisi',
        slug: 'minimalist-aydinlatma-onerileri',
        excerpt: 'Işık sadece aydınlatmak için değildir; odaya ruh katmak içindir. Minimalist dekorasyonda doğru ışık kullanımı ve gölge oyunları hakkında ipuçları.',
        coverImage: '/images/hero.png', // Fallback
        category: 'Dekorasyon',
        date: '20 ARALIK 2025',
        author: 'Tsuko Editör'
    }
];

export default async function BlogPage() {
    let posts = await getBlogPosts();

    // Fallback to default posts if DB is empty or fails
    if (!posts || posts.length === 0) {
        posts = DEFAULT_POSTS as any;
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <Navbar /> {/* Add Navbar for consistency */}

            {/* Hero Section */}
            <div className="bg-porcelain pt-40 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-clay text-xs font-bold tracking-[0.3em] uppercase mb-4 block animate-fade-in">Journal</span>
                    <h1 className="text-5xl md:text-7xl font-light text-charcoal mb-6 tracking-tight leading-tight">
                        Tasarım ve Yaşam <br /> <span className="font-serif italic text-mauve">Kültürü</span>
                    </h1>
                    <p className="text-charcoal/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Mimari estetik, sürdürülebilir üretim ve evinize değer katacak ilham verici hikayeler.
                    </p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-stone/20 hover:shadow-2xl hover:shadow-mauve/10 transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
                        >
                            {/* Image Overlay Effect */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-stone/20">
                                <Image
                                    src={post.coverImage || '/images/hero.png'}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-charcoal uppercase tracking-widest shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-stone uppercase tracking-widest mb-4">
                                    <span>{new Date(post.date || post.createdAt).toLocaleDateString('tr-TR')}</span>
                                    <span className="w-1 h-1 rounded-full bg-stone"></span>
                                    <span>{post.author || 'Tsuko Team'}</span>
                                </div>

                                <h2 className="text-2xl font-bold text-charcoal mb-4 line-clamp-2 leading-tight group-hover:text-mauve transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-charcoal/60 text-sm line-clamp-3 mb-8 leading-relaxed flex-grow font-light">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-charcoal font-bold text-xs mt-auto group/btn uppercase tracking-wider">
                                    Okumaya Devam Et
                                    <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-2 text-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}
