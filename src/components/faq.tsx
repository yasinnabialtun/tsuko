'use client';

import { motion } from 'framer-motion';
import { Plus, ShieldCheck, Truck, CreditCard, RotateCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';

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
        <section className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-5xl">
                {/* Trust Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-alabaster rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                            <Sparkles size={24} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-bold text-charcoal text-sm">Kaliteli Malzeme</p>
                            <p className="text-xs text-charcoal/50">Dayanıklı & Şık</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Truck size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="font-bold text-charcoal text-sm">Ücretsiz Kargo</p>
                            <p className="text-xs text-charcoal/50">Tüm Türkiye</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                            <CreditCard size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="font-bold text-charcoal text-sm">Güvenli Ödeme</p>
                            <p className="text-xs text-charcoal/50">256-bit SSL</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                            <RotateCcw size={24} className="text-orange-600" />
                        </div>
                        <div>
                            <p className="font-bold text-charcoal text-sm">14 Gün İade</p>
                            <p className="text-xs text-charcoal/50">Koşulsuz</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <span className="text-clay font-bold tracking-widest uppercase text-sm mb-2 block">Yardım Merkezi</span>
                    <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">Sıkça Sorulan Sorular</h2>
                    <p className="text-charcoal/60 max-w-xl mx-auto">Kargo, ödeme, iade ve ürünlerimiz hakkında merak ettikleriniz.</p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-alabaster rounded-2xl overflow-hidden border border-black/5"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 transition-colors"
                            >
                                <span className="font-bold text-lg text-charcoal pr-8">{faq.question}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-clay text-white rotate-45' : 'bg-charcoal/10 text-charcoal'}`}>
                                    <Plus size={18} />
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-charcoal/70 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center p-8 bg-charcoal rounded-2xl">
                    <p className="text-white/80 mb-4">Başka bir sorunuz mu var?</p>
                    <a
                        href="mailto:info@tsukodesign.com"
                        className="inline-flex items-center gap-2 bg-white text-charcoal px-8 py-4 rounded-full font-bold hover:bg-clay hover:text-white transition-all"
                    >
                        Bize Yazın
                    </a>
                </div>
            </div>
        </section>
    );
}
