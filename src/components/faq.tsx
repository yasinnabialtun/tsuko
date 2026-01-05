'use client';

import { motion } from 'framer-motion';
import { Plus, ShieldCheck, Truck, CreditCard, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs?: FAQItem[];
}

const defaultFaqs = [
    {
        question: "Ürünler nasıl ve nereden kargoya veriliyor?",
        answer: "Tüm ürünlerimiz İstanbul'daki atölyemizden özenle paketlenip, Türkiye genelinde ücretsiz kargo ile gönderilmektedir. Siparişleriniz 1-3 iş günü içinde kargoya verilir ve ortalama 2-4 iş gününde elinize ulaşır."
    },
    {
        question: "Ürünler ne kadar dayanıklı?",
        answer: "Kullandığımız biyo-polimer materyal (PLA+), darbelere ve düşmelere karşı oldukça dirençlidir. Renk solması yapmaz ve uzun yıllar formunu korur. Paketleme konusunda çok titiziz, ürünün size sorunsuz ulaşması en büyük önceliğimiz."
    },
    {
        question: "3D baskı ev ürünleri dayanıklı mıdır?",
        answer: "Kesinlikle. Kullandığımız mimari sınıf biyo-polimerler (PLA+), geleneksel seramik veya cam ev aksesuarlarına göre darbelere karşı daha dirençlidir. UV dayanımlı, su geçirmez ve uzun ömürlüdür. Renk solması olmaz."
    },
    {
        question: "Ödeme seçenekleri neler?",
        answer: "Shopier altyapısı üzerinden kredi kartı, banka kartı ve havale/EFT ile güvenli ödeme yapabilirsiniz. Tüm kart bilgileriniz 256-bit SSL ile korunmaktadır. İsterseniz kapıda ödeme seçeneği de mevcuttur."
    },
    {
        question: "İade ve değişim politikanız nedir?",
        answer: "Ürünü teslim aldıktan sonra 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak koşuluyla koşulsuz iade veya değişim yapabilirsiniz. İade kargo ücreti tarafımıza aittir."
    },
    {
        question: "Kişiye özel renk veya boyut çalışıyor musunuz?",
        answer: "Evet! Tsuko Design bir tasarım stüdyosudur. Evinizin renk paletine uygun özel üretim aksesuarlar için info@tsukodesign.com adresinden bizimle iletişime geçebilirsiniz. Butik çözümler sunuyoruz."
    }
];

export default function FAQ({ faqs: customFaqs }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;

    return (
        <section className="py-24 px-6 bg-white border-t-4 border-black border-dashed">
            <div className="container mx-auto max-w-5xl">
                {/* Trust Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-6 lg:px-0">
                    <div className="flex flex-col items-center gap-3 text-center p-4 bg-[var(--color-sand)] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-rotate-2 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm">
                            <Sparkles size={24} className="text-[var(--color-purple)]" />
                        </div>
                        <div>
                            <p className="font-black text-black text-sm uppercase tracking-wide">Kaliteli Malzeme</p>
                            <p className="text-xs text-black/60 font-medium">Dayanıklı & Şık</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center p-4 bg-[var(--color-sand)] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm">
                            <Truck size={24} className="text-[var(--color-blue)]" />
                        </div>
                        <div>
                            <p className="font-black text-black text-sm uppercase tracking-wide">Ücretsiz Kargo</p>
                            <p className="text-xs text-black/60 font-medium">Tüm Türkiye</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center p-4 bg-[var(--color-sand)] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-rotate-1 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm">
                            <CreditCard size={24} className="text-[var(--color-green)]" />
                        </div>
                        <div>
                            <p className="font-black text-black text-sm uppercase tracking-wide">Güvenli Ödeme</p>
                            <p className="text-xs text-black/60 font-medium">256-bit SSL</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center p-4 bg-[var(--color-sand)] rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform cursor-default">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sm">
                            <RotateCcw size={24} className="text-[var(--color-pink)]" />
                        </div>
                        <div>
                            <p className="font-black text-black text-sm uppercase tracking-wide">14 Gün İade</p>
                            <p className="text-xs text-black/60 font-medium">Koşulsuz</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1 mb-4 bg-[var(--color-yellow)] text-black border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs uppercase tracking-widest rotate-[-3deg]">
                        Merak Ettikleriniz
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-black mb-4 uppercase tracking-tighter">
                        AKLINIZA TAKILANLAR
                    </h2>
                    <p className="text-black/60 max-w-xl mx-auto font-bold border-l-4 border-[var(--color-blue)] pl-4 text-left md:text-center md:border-l-0 md:pl-0">
                        Kargo sürecinden ödemeye, ürün bakımından iadeye kadar her şey burada.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                                openIndex === index ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-y-1" : "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                            >
                                <span className={cn(
                                    "font-black text-lg md:text-xl pr-8 transition-colors",
                                    openIndex === index ? "text-[var(--color-purple)]" : "text-black group-hover:text-black/80"
                                )}>{faq.question}</span>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center transition-all duration-300",
                                    openIndex === index ? 'bg-black text-white rotate-45' : 'bg-white text-black group-hover:bg-[var(--color-yellow)]'
                                )}>
                                    <Plus size={20} strokeWidth={3} />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden bg-[var(--color-sand)] ${openIndex === index ? 'max-h-64 opacity-100 border-t-2 border-black' : 'max-h-0 opacity-0 border-t-0 border-transparent'}`}
                            >
                                <div className="p-6 md:p-8 pt-6 text-black/80 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center p-12 bg-black rounded-[3rem] border-4 border-[var(--color-purple)] shadow-[12px_12px_0px_0px_var(--color-purple)] relative overflow-hidden group">
                    {/* Decor shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-yellow)] rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-pink)] rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity" />

                    <h3 className="text-3xl font-black text-white mb-4 relative z-10">Hala sorunuz mu var?</h3>
                    <p className="text-white/70 mb-8 font-medium max-w-md mx-auto relative z-10">Ekibimiz size yardımcı olmak için hazır. Çekinmeyin, bize yazın!</p>
                    <a
                        href="mailto:info@tsukodesign.com"
                        className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-[var(--color-yellow)] hover:scale-105 transition-all shadow-[4px_4px_0px_0px_#fff] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-transparent relative z-10 uppercase"
                    >
                        Bize Ulaşın 💌
                    </a>
                </div>
            </div>
        </section>
    );
}
