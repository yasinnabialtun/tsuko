
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

// 1 Hour ISR
export const revalidate = 3600;

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

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="bg-soft-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-charcoal text-white pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Tsuko Journal
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Mimari estetik, sürdürülebilir tasarım ve evinize değer katacak dekorasyon fikirleri.
                        İlham almaya hazır olun.
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {posts.length === 0 && (
                <div className="text-center py-20 px-6">
                    <div className="text-6xl mb-6">📝</div>
                    <h2 className="text-2xl font-bold text-charcoal mb-4">Henüz içerik eklenmedi.</h2>
                    <p className="text-gray-500">Editörlerimiz harika içerikler üzerinde çalışıyor.</p>
                </div>
            )}

            {/* Posts Grid */}
            {posts.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 -mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full"
                            >
                                {/* Image Overlay Effect */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-charcoal uppercase tracking-wider">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 font-medium uppercase tracking-widest">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.author}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-charcoal mb-3 line-clamp-2 leading-tight group-hover:text-clay transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-clay font-bold text-sm mt-auto group/btn">
                                        Devamını Oku
                                        <svg className="w-4 h-4 ml-2 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
