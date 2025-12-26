'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { blogPosts } from '@/lib/blog-data';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogList() {
    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 bg-white rounded-b-[3rem] shadow-sm">
                <div className="container mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-charcoal mb-6"
                    >
                        Tsuko <span className="text-clay italic">Journal</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-charcoal/60 max-w-2xl mx-auto"
                    >
                        Tasarım felsefemiz, sürdürülebilir üretim teknikleri ve modern dekorasyon üzerine notlar.
                    </motion.p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-black/5"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-clay">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-charcoal/40 font-bold uppercase tracking-widest mb-4">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                        <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-clay transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-charcoal/60 line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-charcoal font-bold hover:gap-3 transition-all"
                                    >
                                        Devamını Oku <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
