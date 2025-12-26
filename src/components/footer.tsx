import { Instagram, Twitter, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white py-24 px-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="md:col-span-2 space-y-8">
                        <h2 className="text-4xl font-bold">TSUKO <span className="text-clay">DESIGN</span></h2>
                        <p className="text-white/50 max-w-sm">
                            Modern mimari formları, geleneksel felsefe ile birleştiriyoruz.
                            Her nesnenin bir ruhu vardır. Biz sadece o ruhu ortaya çıkarıyoruz.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-clay transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-clay transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-clay transition-colors"><Mail size={24} /></a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-widest text-clay">Hızlı Bağlantılar</h4>
                        <ul className="space-y-4 text-white/70">
                            <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                            <li><a href="#collection" className="hover:text-white transition-colors">Koleksiyon</a></li>
                            <li><a href="#lighting-demo" className="hover:text-white transition-colors">Aydınlatma Deneyimi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Mağaza (Shopier)</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-lg tracking-widest uppercase">Kurumsal</h4>
                        <ul className="space-y-4 text-white/70">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Kullanım Koşulları</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30 tracking-widest uppercase font-bold">
                    <p>© 2025 TSUKO DESIGN. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
