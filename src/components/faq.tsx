'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: "Modern ev dekorasyonunda hangi aksesuarlar trend?",
        answer: "2025 yılı ev dekorasyon trendlerinde, seri üretim yerine hikayesi olan tasarım ev ürünleri öne çıkıyor. Tsuko Design olarak, 'Pastel Brütalizm' akımını benimsiyoruz; yani mimari ve sert formların (beton etkisi), yumuşak pastel renklerle buluştuğu vazo ve aydınlatma modelleri, modern salon aksesuarları arasında en çok tercih edilenlerdir."
    },
    {
        question: "3D baskı ev ürünleri dayanıklı mıdır?",
        answer: "Kesinlikle. Kullandığımız mimari sınıf biyo-polimerler, geleneksel seramik veya cam ev aksesuarlarına göre darbelere karşı daha dirençlidir. Hem hafif hem de sağlam yapılarıyla, uzun ömürlü bir ev dekor deneyimi sunar."
    },
    {
        question: "Tsuko ürünlerini hangi odalarda kullanabilirim?",
        answer: "Koleksiyonumuz çok yönlüdür. 'Tondo' gibi vazo modellerimiz salon dekorasyonu ve konsol üzeri için idealken, 'Aura' serisi aydınlatmalarımız yatak odası veya çalışma masası aksesuarı olarak sıcak bir atmosfer yaratır."
    },
    {
        question: "Kişiye özel renk veya boyut çalışıyor musunuz?",
        answer: "Evet, Tsuko Design bir tasarım stüdyosudur. Evinizin renk paletine uygun özel üretim aksesuarlar için bizimle iletişime geçebilirsiniz. Standart dışı ev ürünleri arayanlar için butik çözümler sunuyoruz."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-6 bg-alabaster">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-charcoal mb-4">Merak Edilenler</h2>
                    <p className="text-charcoal/60">Ev dekorasyonu ve ürünlerimiz hakkında sıkça sorulan sorular.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden border border-black/5"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-black/5 transition-colors"
                            >
                                <span className="font-bold text-lg text-charcoal pr-8">{faq.question}</span>
                                <Plus
                                    className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                                    color="var(--color-clay)"
                                />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-charcoal/70 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
