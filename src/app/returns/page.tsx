import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { RotateCcw, Clock, Package, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'İade & Değişim | Tsuko Design',
    description: 'Tsuko Design iade ve değişim politikası. 14 gün koşulsuz iade hakkı, ücretsiz iade kargo.'
};

export default function ReturnsPage() {
    return (
        <main className="min-h-screen bg-alabaster">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-6">İade & Değişim</h1>
                    <p className="text-xl text-charcoal/60 mb-12">Memnun kalmadığınız ürünleri kolayca iade edebilirsiniz.</p>

                    {/* Highlight Box */}
                    <div className="bg-green-50 border border-green-200 p-8 rounded-2xl mb-12 flex items-start gap-4">
                        <CheckCircle size={32} className="text-green-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">14 Gün Koşulsuz İade Garantisi</h3>
                            <p className="text-green-700">Ürünü teslim aldıktan sonra 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak koşuluyla hiçbir gerekçe belirtmeden iade edebilirsiniz.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                                <Clock size={28} className="text-blue-600" />
                            </div>
                            <h3 className="font-bold text-charcoal mb-2">14 Gün Süre</h3>
                            <p className="text-sm text-charcoal/60">Teslimattan itibaren 14 gün içinde başvuru yapabilirsiniz.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                                <Package size={28} className="text-green-600" />
                            </div>
                            <h3 className="font-bold text-charcoal mb-2">Ücretsiz Kargo</h3>
                            <p className="text-sm text-charcoal/60">İade kargo ücreti tamamen bize aittir.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-black/5 text-center">
                            <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
                                <RotateCcw size={28} className="text-purple-600" />
                            </div>
                            <h3 className="font-bold text-charcoal mb-2">Hızlı İade</h3>
                            <p className="text-sm text-charcoal/60">Ürün bize ulaştıktan sonra 3-5 iş günü içinde iade yapılır.</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-black/5 mb-12">
                        <h2 className="text-2xl font-bold text-charcoal mb-6">İade Koşulları</h2>
                        <ul className="space-y-4 text-charcoal/70">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Ürün kullanılmamış ve orijinal ambalajında olmalıdır.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Ürün etiketleri sökülmemiş olmalıdır.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span>İade başvurusu teslimattan itibaren 14 gün içinde yapılmalıdır.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                <span>Kişiye özel üretilen ürünler (özel renk/boyut) iade kapsamı dışındadır.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-charcoal text-white p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">İade Nasıl Yapılır?</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold mb-1">Bize Ulaşın</h4>
                                    <p className="text-white/70">info@tsukodesign.com adresine sipariş numaranız ve iade sebebinizi yazarak başvurun.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold mb-1">Kargo Kodu Alın</h4>
                                    <p className="text-white/70">Size ücretsiz iade kargo kodu göndereceğiz.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold mb-1">Ürünü Gönderin</h4>
                                    <p className="text-white/70">Ürünü orijinal ambalajında paketleyip en yakın kargo şubesine bırakın.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-clay flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                                <div>
                                    <h4 className="font-bold mb-1">İade Onayı</h4>
                                    <p className="text-white/70">Ürün bize ulaştıktan sonra 3-5 iş günü içinde ödemeniz iade edilir.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-8 bg-alabaster rounded-2xl border border-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Mail size={32} className="text-clay" />
                            <div>
                                <h3 className="font-bold text-charcoal">Sorularınız mı var?</h3>
                                <p className="text-charcoal/60">İade süreciyle ilgili her konuda yardımcı oluruz.</p>
                            </div>
                        </div>
                        <a
                            href="mailto:info@tsukodesign.com"
                            className="bg-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors"
                        >
                            Bize Yazın
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
