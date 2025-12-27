import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Calendar, User } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) return { title: 'Not Found' };

    return {
        title: `${post.title} | Tsuko Journal`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage],
        },
    };
}

export async function generateStaticParams() {
    const posts = await prisma.blogPost.findMany({
        select: { slug: true }
    });

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            <article className="pt-32 pb-24">
                {/* Article Header */}
                <div className="container mx-auto px-6 max-w-4xl text-center mb-16">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal font-bold uppercase tracking-widest text-xs mb-8 transition-colors"
                    >
                        <ArrowLeft size={16} /> Tsuko Journal
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-charcoal/60 font-medium">
                        <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                        <span className="flex items-center gap-2"><User size={16} /> Tsuko Team</span>
                        <span className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-black/5 text-clay">{post.category}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="container mx-auto px-6 max-w-6xl mb-16">
                    <div className="relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden shadow-xl">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 max-w-3xl">
                    <div
                        className="prose prose-lg prose-headings:font-bold prose-headings:font-heading prose-p:text-charcoal/80 prose-a:text-clay prose-img:rounded-3xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>

            <Footer />
        </main>
    );
}
