'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Tsuko - Modern Dekorasyon Rehberi',
    description: 'Minimalist ev dekorasyonu, sürdürülebilir tasarım trendleri ve yaşam tarzı ipuçları.',
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-alabaster selection:bg-clay selection:text-white">
            <Navbar />

            {/* Blog Header */}
            <section className="pt-32 pb-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    <span className="text-clay font-bold tracking-widest uppercase text-sm mb-2 block">Tsuko Journal</span>
                    <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-6 leading-tight">
                        Tasarım & <br /> <span className="text-clay italic font-serif">Yaşam Kültürü.</span>
                    </h1>
                    <p className="text-xl text-charcoal/60 max-w-2xl font-light">
                        Dekorasyon ipuçları, tasarımcı röportajları ve sürdürülebilir yaşam üzerine notlar.
                    </p>
                </div>
            </section>

            {/* Featured Post (First One) */}
            <section className="px-6 pb-20">
                <div className="container mx-auto max-w-6xl">
                    <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="group block relative">
                        <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-6">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <Image src={BLOG_POSTS[0].coverImage} alt={BLOG_POSTS[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 text-sm font-medium text-charcoal/50 mb-3">
                                <span className="text-clay font-bold">{BLOG_POSTS[0].category}</span>
                                <span>•</span>
                                <span>{BLOG_POSTS[0].date}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-charcoal group-hover:text-clay transition-colors mb-4">
                                {BLOG_POSTS[0].title}
                            </h2>
                            <p className="text-lg text-charcoal/70 line-clamp-2 mb-4">
                                {BLOG_POSTS[0].excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 font-bold text-charcoal border-b-2 border-charcoal pb-0.5 group-hover:text-clay group-hover:border-clay transition-all">
                                Okumaya Devam Et <ArrowRight size={18} />
                            </span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Post Grid */}
            <section className="px-6 pb-32">
                <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
                    {BLOG_POSTS.slice(1).map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-white">
                                <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-charcoal/40 mb-3">
                                <span className="text-clay">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-charcoal group-hover:text-clay transition-colors mb-3 leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-charcoal/60 line-clamp-2 mb-4">
                                {post.excerpt}
                            </p>
                            <span className="text-sm font-bold text-charcoal group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                                İncele <ArrowRight size={14} />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
