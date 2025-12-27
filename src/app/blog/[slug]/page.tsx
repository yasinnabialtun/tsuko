
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

// 1 Month ISR (Blogs rarely change)
export const revalidate = 2592000;

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({ select: { slug: true } });
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) return { title: 'Yazı Bulunamadı' };

    return {
        title: `${post.seoTitle || post.title} | Tsuko Design Blog`,
        description: post.seoDesc || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: 'article',
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) notFound();

    return (
        <div className="bg-soft-white min-h-screen pb-20">
            {/* Reading Progress Bar (Could be added as client comp, skipped for MVP) */}

            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full bg-charcoal">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-6 mt-20">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-widest font-medium mb-4"
                        >
                            <ArrowLeft size={16} /> Tsuko Journal
                        </Link>

                        <div className="inline-block px-4 py-1 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                            {post.category}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-sm text-gray-300 font-medium">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>5 dk okuma</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <article className="max-w-3xl mx-auto px-6 -mt-20 relative z-10">
                <div className="bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-gray-100">
                    {/* Excerpt */}
                    <p className="text-xl md:text-2xl text-gray-600 font-serif italic mb-10 leading-relaxed border-l-4 border-clay pl-6">
                        {post.excerpt}
                    </p>

                    {/* Main Content */}
                    <div
                        className="prose prose-lg prose-slate hover:prose-a:text-clay prose-a:no-underline prose-img:rounded-2xl max-w-none 
                        prose-headings:font-bold prose-headings:text-charcoal prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-p:text-gray-600 prose-p:leading-8 prose-li:text-gray-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share / Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            Paylaş
                        </div>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related CTA */}
            <div className="max-w-3xl mx-auto px-6 mt-16">
                <div className="bg-charcoal rounded-3xl p-10 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Bu Tarzı Evinize Taşıyın</h3>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                            Yazımızda bahsettiğimiz minimalist ve doğal dokunuşları Tsuko koleksiyonunda keşfedin.
                        </p>
                        <Link
                            href="/category/all"
                            className="inline-block bg-clay hover:bg-clay-dark text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-clay/30"
                        >
                            Koleksiyonu İncele
                        </Link>
                    </div>
                    {/* Abstract bg needed? */}
                </div>
            </div>
        </div>
    );
}
