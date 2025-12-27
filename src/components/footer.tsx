import { Instagram, Twitter, Mail, MapPin, Phone, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white">
            {/* Trust Bar */}
            <div className="border-b border-white/10 py-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <Truck size={28} className="text-clay" />
                            <p className="font-bold text-sm">Ücretsiz Kargo</p>
                            <p className="text-xs text-white/50">Türkiye Geneli</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <ShieldCheck size={28} className="text-clay" />
                            <p className="font-bold text-sm">Kırılma Garantisi</p>
                            <p className="text-xs text-white/50">%100 Koruma</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <CreditCard size={28} className="text-clay" />
                            <p className="font-bold text-sm">Güvenli Ödeme</p>
                            <p className="text-xs text-white/50">256-bit SSL</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl">🌱</div>
                            <p className="font-bold text-sm">Eko Dostu</p>
                            <p className="text-xs text-white/50">Biyo-Polimer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="relative w-40 h-12">
                            <Image src="/logo.png" alt="Tsuko Design Logo" fill className="object-contain object-left brightness-0 invert" />
                        </div>
                        <p className="text-white/60 max-w-md leading-relaxed">
                            Türkiye&apos;nin ilk 3D baskı ev dekorasyon markası. Mimari estetik ve sürdürülebilir üretimi bir araya getiriyoruz.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clay transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://twitter.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clay transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="mailto:info@tsukodesign.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clay transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-clay text-sm">Alışveriş</h4>
                        <ul className="space-y-3 text-white/70">
                            <li><a href="/#collection" className="hover:text-white transition-colors">Koleksiyon</a></li>
                            <li><a href="/#lighting-demo" className="hover:text-white transition-colors">Aydınlatma</a></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><a href="https://shopier.com/tsukodesign" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Shopier Mağaza</a></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-clay text-sm">Destek</h4>
                        <ul className="space-y-3 text-white/70">
                            <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Kargo & Teslimat</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">İade & Değişim</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-white/10 text-sm text-white/50">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <a href="mailto:info@tsukodesign.com" className="hover:text-white transition-colors">info@tsukodesign.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <a href="tel:+905551234567" className="hover:text-white transition-colors">+90 555 123 45 67</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>İstanbul, Türkiye</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest font-bold">
                    <p>© 2025 Tsuko Design. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4">
                        <span>🇹🇷 Türkiye&apos;de Tasarlandı & Üretildi</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
