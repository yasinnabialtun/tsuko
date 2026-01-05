import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const DEFAULT_POSTS = [
    {
        id: '1',
        title: 'Parametrik Tasarımın Yükselişi: Algoritmalar Evinize Giriyor',
        seoTitle: 'Parametrik Tasarım Nedir? | Tsuko Design',
        slug: 'parametrik-tasarim-nedir',
        excerpt: 'Modern mimarinin en etkileyici akımı parametrik tasarım, artık sadece büyük yapılarda değil, ev dekorasyon objelerinde de hayat buluyor. İşte bilmeniz gerekenler.',
        seoDesc: 'Parametrik tasarımın ev dekorasyonundaki yerini ve Tsuko Design\'ın algoritmik sanat yaklaşımını keşfedin. Modern ve fütüristik evler için ipuçları.',
        coverImage: '/images/hero.png',
        category: 'Tasarım',
        date: '28 ARALIK 2025',
        author: 'Tsuko Editör',
        content: `
            <p><strong>Parametrik tasarım</strong>, geleneksel tasarım yöntemlerinin ötesine geçerek, algoritmalar ve değişkenler arasındaki ilişkileri kullanarak karmaşık ve akışkan formlar oluşturma sürecidir. Zaha Hadid gibi mimarların devasa yapılarda kullandığı bu teknik, artık <strong>Tsuko Design</strong> sayesinde evinizin salonuna kadar giriyor.</p>
            
            <h2>Neden Parametrik Tasarım?</h2>
            <p>Bir vazo düşünün; ancak insan eliyle çizilmesi imkansız kıvrımlara sahip. Işık vurduğunda gölgeleri dans ediyor. İşte parametrik tasarımın büyüsü budur: Doğanın matematiğini taklit etmek.</p>
            
            <ul>
                <li><strong>Eşsizlik:</strong> Her açıdan farklı bir perspektif sunar.</li>
                <li><strong>Akışkanlık:</strong> Sert köşeler yerine organik geçişler vardır.</li>
                <li><strong>Işık Oyunu:</strong> Katmanlı yapısı sayesinde ışığı benzersiz şekilde kırar.</li>
            </ul>

            <h2>Ev Dekorasyonunda Nasıl Kullanılır?</h2>
            <p>Evinizde parametrik bir objeye yer vermek, mekana anında modern ve sofistike bir hava katar. Karmaşık bir vazo, sade bir masanın üzerinde tek başına bir sanat eseri gibi durabilir. Tsuko'nun origami serisi, bu yaklaşımın en erişilebilir örneklerinden biridir.</p>
        `
    },
    {
        id: '2',
        title: 'Sürdürülebilir Dekorasyon: PLA ve Biyo-Polimer Devrimi',
        seoTitle: 'PLA Nedir? Sürdürülebilir Ev Dekorasyonu | Tsuko Design',
        slug: 'pla-nedir-surdurulebilir-dekorasyon',
        excerpt: 'Petrol türevi plastiklere veda edin. Mısır nişastasından üretilen, doğaya saygılı ve estetik PLA materyali, geleceğin evlerini nasıl şekillendiriyor?',
        seoDesc: 'Doğa dostu PLA materyali ile ev dekorasyonunda sürdürülebilirlik. Mısır nişastası bazlı biyo-polimerlerin avantajları ve estetik potansiyeli.',
        coverImage: '/images/hero.png',
        category: 'Sürdürülebilirlik',
        date: '25 ARALIK 2025',
        author: 'Ece Yılmaz',
        content: `
            <p>Dünyamız değişiyor ve tasarım anlayışımız da buna ayak uyduruyor. Artık "güzel" olmak yetmiyor; aynı zamanda "iyi" olmak zorunda. İşte bu noktada <strong>PLA (Polilaktik Asit)</strong> devreye giriyor.</p>
            
            <h2>PLA Nedir?</h2>
            <p>PLA, petrol yerine yenilenebilir kaynaklardan (genellikle mısır nişastası veya şeker kamışı) üretilen biyo-bozunur bir termoplastiktir. Yani Tsuko Design ürünlerini elinize aldığınızda, fosil yakıt değil, doğanın kendisini tutuyorsunuz.</p>
            
            <h2>Neden PLA Tercih Ediyoruz?</h2>
            <ul>
                <li><strong>Karbon Ayak İzi:</strong> Geleneksel plastiklere göre üretiminde çok daha az karbon salınımı gerçekleşir.</li>
                <li><strong>Toksik Değildir:</strong> Gıda temasına uygun güvenli bir materyaldir.</li>
                <li><strong>Estetik Doku:</strong> Mat, ipeksi ve sıcak bir dokunuş hissi verir. Seramik gibi soğuk, plastik gibi yapay değildir.</li>
            </ul>

            <p>Tsuko Design olarak, teknolojiyi ve doğayı birleştiriyoruz. 3D baskı teknolojimiz sayesinde atık üretmeden, sadece ihtiyacımız olan materyali kullanarak, doğaya saygılı sanat eserleri üretiyoruz.</p>
        `
    },
    {
        id: '3',
        title: 'Minimalist Evler İçin 5 Aydınlatma Önerisi',
        seoTitle: 'Minimalist Aydınlatma Önerileri ve İpuçları | Tsuko Design',
        slug: 'minimalist-aydinlatma-onerileri',
        excerpt: 'Işık sadece aydınlatmak için değildir; odaya ruh katmak içindir. Minimalist dekorasyonda doğru ışık kullanımı ve gölge oyunları hakkında ipuçları.',
        seoDesc: 'Minimalist ev dekorasyonunda aydınlatma seçimi nasıl olmalı? Gölge oyunları, sıcak ışık ve parametrik avizeler ile atmosfer yaratma rehberi.',
        coverImage: '/images/hero.png',
        category: 'Dekorasyon',
        date: '20 ARALIK 2025',
        author: 'Tsuko Editör',
        content: `
            <p>Minimalizm, az eşya ile yaşamak değil; eşyaların anlamlı olmasıdır. Ve hiçbir şey, bir mekanın anlamını ışık kadar değiştiremez. İşte minimalist evinizde atmosferi değiştirecek 5 aydınlatma kuralı:</p>
            
            <h2>1. Işık Kaynağını Gizleyin</h2>
            <p>Gözü yoran ampuller yerine, ışığın kendisini değil, etkisini göreceğiniz tasarımlar seçin. Difüzörlü veya katmanlı abajurlar ışığı yumuşatır.</p>
            
            <h2>2. Gölgelerle Oynayın</h2>
            <p>Düz bir aydınlatma duvarları boş gösterir. Ancak <strong>parametrik bir abajur</strong>, duvarlarınıza desenler çizerek mekanı yaşayan bir tabloya dönüştürür. Tsuko aydınlatma koleksiyonu tam olarak bu gölge oyunları üzerine kuruludur.</p>

            <h2>3. Sıcaklık Dengesi (Kelvin)</h2>
            <p>Minimalist mekanlarda genellikle beyaz ve gri tonlar hakimdir. Bu soğukluğu kırmak için 2700K-3000K arası sıcak sarı ışıklar tercih edin.</p>

            <h2>4. Katmanlı Aydınlatma</h2>
            <p>Tek bir tavan lambası yerine; lambader, masa lambası ve vurgu ışıklarını kombinleyin.</p>

            <h2>5. Heykelsi Formlar</h2>
            <p>Lamba kapalıyken bile bir heykel gibi görünmeli. Fonksiyon ve estetik bir arada olmalı.</p>
        `
    }
];

import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    let post = await prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
        const fallback = DEFAULT_POSTS.find(p => p.slug === slug);
        if (fallback) post = fallback as any;
    }

    if (!post) return { title: 'Yazı Bulunamadı' };

    return {
        title: `${post.seoTitle || post.title} | Tsuko Journal`,
        description: post.seoDesc || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage || '/images/hero.png'],
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    let post = null;

    try {
        post = await prisma.blogPost.findUnique({
            where: { slug }
        });
    } catch (e) {
        console.log("DB connection failed, using fallback");
    }

    // Fallback logic
    if (!post) {
        const fallbackPost = DEFAULT_POSTS.find(p => p.slug === slug);
        if (fallbackPost) {
            post = {
                ...fallbackPost,
                // Add missing fields required by the type (if any)
                id: fallbackPost.id,
                createdAt: new Date(),
                published: true,
                tags: []
            } as any;
        }
    }

    if (!post) notFound();

    return (
        <div className="bg-white min-h-screen pb-20">
            <Navbar />

            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full bg-charcoal group overflow-hidden">
                <Image
                    src={post.coverImage || '/images/hero.png'}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-[3s] group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 text-center text-white space-y-6 mt-20 animate-fade-in-up">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-xs text-stone hover:text-white transition-colors uppercase tracking-[0.2em] font-bold mb-4"
                        >
                            <ArrowLeft size={16} /> Tsuko Journal
                        </Link>

                        <div className="inline-block px-4 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md bg-white/5">
                            {post.category}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light leading-tight tracking-tight text-porcelain">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-xs text-stone font-bold uppercase tracking-widest">
                            <span>{new Date(post.date || post.createdAt).toLocaleDateString('tr-TR')}</span>
                            <span className="w-1 h-1 rounded-full bg-stone"></span>
                            <span>{post.author || 'Tsuko Team'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <article className="max-w-3xl mx-auto px-6 -mt-24 relative z-10 transition-all duration-500 animate-fade-in">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-stone/20 border border-stone/10">
                    {/* Excerpt */}
                    <p className="text-xl md:text-2xl text-charcoal/80 font-light italic mb-12 leading-relaxed border-l-2 border-clay pl-8">
                        {post.excerpt}
                    </p>

                    {/* Main Content */}
                    <div
                        className="prose prose-lg prose-stone hover:prose-a:text-clay prose-a:no-underline prose-img:rounded-[2rem] max-w-none 
                        prose-headings:font-light prose-headings:text-charcoal prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:tracking-tight
                        prose-p:text-charcoal/70 prose-p:leading-8 prose-li:text-charcoal/70 prose-strong:font-bold prose-strong:text-charcoal"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share / Tags */}
                    <div className="mt-20 pt-10 border-t border-stone/20 flex justify-between items-center">
                        <div className="text-xs font-bold text-stone uppercase tracking-widest">
                            Paylaş
                        </div>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related CTA */}
            <div className="max-w-4xl mx-auto px-6 mt-20">
                <div className="bg-charcoal rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden group">
                    <Image
                        src="/images/hero.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay"
                    />
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-light text-white mb-6">Bu Tarzı Evinize Taşıyın</h3>
                        <p className="text-stone mb-10 max-w-lg mx-auto leading-relaxed">
                            Yazımızda bahsettiğimiz minimalist ve doğal dokunuşları Tsuko koleksiyonunda keşfedin.
                        </p>
                        <Link
                            href="/#collection"
                            className="inline-block bg-white text-charcoal font-bold py-5 px-10 rounded-xl transition-all hover:bg-clay hover:text-white shadow-lg hover:shadow-clay/30 uppercase tracking-widest text-sm"
                        >
                            Koleksiyonu İncele
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}

