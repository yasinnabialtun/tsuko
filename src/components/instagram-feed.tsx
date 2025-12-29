'use client';

import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const INSTA_POSTS = [
    { id: 1, image: '/images/hero.png', likes: 245, comments: 12 },
    { id: 2, image: '/images/hero.png', likes: 189, comments: 8 },
    { id: 3, image: '/images/hero.png', likes: 432, comments: 25 },
    { id: 4, image: '/images/hero.png', likes: 312, comments: 15 },
    { id: 5, image: '/images/hero.png', likes: 156, comments: 6 },
    { id: 6, image: '/images/hero.png', likes: 278, comments: 10 },
];

export default function InstagramFeed() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <span className="text-clay text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Koleksiyonumuz Sizin Evinizde</span>
                        <h2 className="text-5xl font-black text-charcoal leading-none tracking-tighter mb-6 uppercase">
                            Instagram'da <span className="text-mauve italic">#TsukoDesign</span>
                        </h2>
                        <p className="text-charcoal/40 font-medium leading-relaxed">
                            Bizi etiketleyin, tasarımlarımızın sizin dünyanızda nasıl hayat bulduğunu tüm topluluğumuzla paylaşalım.
                        </p>
                    </div>

                    <a
                        href="https://instagram.com/tsukodesign"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-porcelain px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-charcoal hover:bg-mauve hover:text-white transition-all shadow-xl shadow-black/[0.02]"
                    >
                        <Instagram size={20} />
                        Bizi Takip Edin
                    </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {INSTA_POSTS.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg shadow-black/[0.03]"
                        >
                            <Image
                                src={post.image}
                                alt="Insta Post"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 text-white">
                                <div className="flex items-center gap-2">
                                    <Heart size={20} fill="white" />
                                    <span className="text-sm font-black">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={20} fill="white" />
                                    <span className="text-sm font-black">{post.comments}</span>
                                </div>
                            </div>

                            {/* Insta Icon Tag */}
                            <div className="absolute top-4 right-4 text-white p-1.5 opacity-100 group-hover:opacity-0 transition-opacity">
                                <Instagram size={18} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
