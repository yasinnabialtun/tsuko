import { Instagram, Twitter, Mail, MapPin, Phone, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white pt-20">
            {/* Trust Bar - Integrated */}
            <div className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Truck, title: "Ücretsiz Kargo", desc: "Tüm siparişlerde" },
                        { icon: ShieldCheck, title: "Kırılma Garantisi", desc: "%100 değişim hakkı" },
                        { icon: CreditCard, title: "Güvenli Ödeme", desc: "Shopier güvencesi" },
                        { icon: null, emoji: "🌱", title: "Doğa Dostu", desc: "PLA biyo-polimer" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-mauve mt-1">
                                {item.icon ? <item.icon size={24} strokeWidth={1.5} /> : <span className="text-xl">{item.emoji}</span>}
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-stone/60">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        {/* Brand Column */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="relative w-36 h-10 opacity-90">
                                <Image src="/logo.png" alt="Tsuko Design Logo" fill className="object-contain object-left brightness-0 invert" />
                            </div>
                            <p className="text-stone/60 max-w-sm leading-relaxed font-light">
                                Modern yaşam alanları için parametrik tasarım ve 3D baskı teknolojisini birleştiriyoruz.
                                Sürdürülebilir, estetik ve fonksiyonel.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <a href="https://instagram.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-charcoal hover:border-white transition-all">
                                    <Instagram size={18} />
                                </a>
                                <a href="mailto:info@tsukodesign.com" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-charcoal hover:border-white transition-all">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="md:col-span-2 md:col-start-7 space-y-6">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-mauve">Keşfet</h4>
                            <ul className="space-y-4 text-stone/60 text-sm font-medium">
                                <li><a href="/#collection" className="hover:text-white transition-colors">Koleksiyon</a></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors">Journal</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">Hikayemiz</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-mauve">Destek</h4>
                            <ul className="space-y-4 text-stone/60 text-sm font-medium">
                                <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                                <li><Link href="/shipping" className="hover:text-white transition-colors">Teslimat</Link></li>
                                <li><Link href="/returns" className="hover:text-white transition-colors">İade</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-mauve">Yasal</h4>
                            <ul className="space-y-4 text-stone/60 text-sm font-medium">
                                <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Mesafeli Satış</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-black/20">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone/40 font-medium">© 2025 Tsuko Design. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs text-stone/40">
                        <span className="flex items-center gap-2"><MapPin size={12} /> İstanbul</span>
                        <span className="hidden md:inline">|</span>
                        <span>Designed by Tsuko Studio</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
