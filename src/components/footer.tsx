import { Instagram, Mail, MapPin, Phone, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/lib/settings';

export default async function Footer() {
    const settings = await getSiteSettings();
    const siteName = settings?.siteName || 'Tsuko Design';
    const email = settings?.email || 'info@tsukodesign.com';
    const instagram = settings?.instagram || 'tsukodesign';

    return (
        <footer className="bg-black text-white pt-20 border-t-2 border-black">
            {/* Trust Bar - POP ART STICKERS */}
            <div className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, title: "Ücretsiz Kargo", desc: "Tüm siparişlerde", color: "bg-[var(--color-blue)]" },
                        { icon: Mail, title: "%100 Destek", desc: "Hızlı yanıt süresi", color: "bg-[var(--color-purple)]" },
                        { icon: CreditCard, title: "Güvenli Ödeme", desc: "Shopier güvencesi", color: "bg-[var(--color-pink)]" },
                        { icon: null, emoji: "✨", title: "Özgün Tasarım", desc: "Modern ev dekoru", color: "bg-[var(--color-yellow)]" }
                    ].map((item, i) => (
                        <div key={i} className={`flex items-start gap-4 p-6 rounded-2xl border-2 border-white/20 hover:border-white hover:-translate-y-1 transition-all group ${item.color} bg-opacity-10`}>
                            <div className={`p-3 rounded-lg ${item.color} text-black border border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:-translate-y-0.5 transition-all`}>
                                {item.icon ? <item.icon size={20} className="stroke-[2.5]" /> : <span className="text-lg">{item.emoji}</span>}
                            </div>
                            <div>
                                <h4 className="font-black text-sm mb-1 uppercase tracking-wide">{item.title}</h4>
                                <p className="text-xs opacity-70 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="border-t border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
                <div className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        {/* Brand Column */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="relative w-40 h-12">
                                <Image src="/images/logo-full.png" alt="Tsuko Design Logo" fill className="object-contain object-left brightness-0 invert" />
                            </div>
                            <p className="text-white/70 max-w-sm leading-relaxed font-medium">
                                Sıkıcı evlere savaş açtık! 🎨<br />
                                Tsuko, 3D baskı teknolojisinin matematiksel kusursuzluğunu, dopamine decor akımının neşesiyle birleştiriyor.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white text-black border-2 border-transparent hover:bg-[var(--color-pink)] hover:border-white hover:text-white transition-all flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                    <Instagram size={24} />
                                </a>
                                <a href={`mailto:${email}`} className="w-12 h-12 rounded-xl bg-white text-black border-2 border-transparent hover:bg-[var(--color-blue)] hover:border-white hover:text-white transition-all flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                    <Mail size={24} />
                                </a>
                                {settings?.whatsapp && (
                                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white text-black border-2 border-transparent hover:bg-[var(--color-green)] hover:border-white hover:text-white transition-all flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                        <Phone size={24} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="md:col-span-2 md:col-start-7 space-y-6">
                            <h4 className="font-black text-sm uppercase tracking-widest text-[var(--color-yellow)]">Keşfet</h4>
                            <ul className="space-y-4 text-white/60 text-sm font-bold">
                                <li><a href="/#collection" className="hover:text-white hover:translate-x-1 transition-all inline-block">Koleksiyon</a></li>
                                <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">Journal</Link></li>
                                <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hikayemiz</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <h4 className="font-black text-sm uppercase tracking-widest text-[var(--color-cyan)]">Destek</h4>
                            <ul className="space-y-4 text-white/60 text-sm font-bold">
                                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">İletişim</Link></li>
                                <li><Link href="/order-tracking" className="hover:text-white hover:translate-x-1 transition-all inline-block">Sipariş Takibi</Link></li>
                                <li><Link href="/shipping" className="hover:text-white hover:translate-x-1 transition-all inline-block">Teslimat</Link></li>
                                <li><Link href="/returns" className="hover:text-white hover:translate-x-1 transition-all inline-block">İade</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <h4 className="font-black text-sm uppercase tracking-widest text-[var(--color-pink)]">Yasal</h4>
                            <ul className="space-y-4 text-white/60 text-sm font-bold">
                                <li><Link href="/privacy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gizlilik</Link></li>
                                <li><Link href="/terms" className="hover:text-white hover:translate-x-1 transition-all inline-block">Mesafeli Satış</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 bg-black">
                <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">© 2025 {siteName}. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs text-white/30 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={12} /> {settings?.address || 'İstanbul'}</span>
                        <span className="hidden md:inline">|</span>
                        <span>Designed with 💖 by Tsuko Studio</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
