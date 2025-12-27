'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Info } from 'lucide-react';

export default function NewProductPage() {
    const [productName, setProductName] = useState('');

    // Auto-generate slug from name
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">

            {/* Header */}
            <div className="flex items-center justify-between sticky top-4 z-40 bg-[#FDFBF7]/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-charcoal/5">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-[#E6E8E6]">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-charcoal">Yeni Ürün Ekle</h1>
                        <p className="text-xs text-charcoal/60 font-bold uppercase tracking-wider">Taslak Modu</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-2.5 bg-white border border-[#E6E8E6] rounded-xl font-bold text-charcoal text-sm hover:bg-alabaster transition-colors">
                        İptal
                    </button>
                    <button className="px-6 py-2.5 bg-charcoal text-white rounded-xl font-bold text-sm shadow-lg shadow-charcoal/20 hover:bg-black transition-colors flex items-center gap-2">
                        <Save size={18} />
                        Kaydet & Yayınla
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* General Info */}
                    <section className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                        <h3 className="text-lg font-bold text-charcoal mb-4">Temel Bilgiler</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Ürün Adı</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="Örn: Nami Vazo - Stone Edition"
                                    className="w-full px-4 py-3 bg-alabaster rounded-xl border border-transparent focus:bg-white focus:border-clay/20 outline-none transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-charcoal/70 mb-2">Açıklama</label>
                                <textarea
                                    rows={6}
                                    placeholder="Ürünün hikayesini, malzemesini ve hissini anlatın..."
                                    className="w-full px-4 py-3 bg-alabaster rounded-xl border border-transparent focus:bg-white focus:border-clay/20 outline-none transition-all resize-none"
                                />
                                <p className="text-xs text-charcoal/40 mt-2 text-right">0/500 karakter</p>
                            </div>
                        </div>
                    </section>

                    {/* SEO Settings (Critical) */}
                    <section className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] z-0" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-6">
                                <h3 className="text-lg font-bold text-charcoal">Arama Motoru (SEO)</h3>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Kritik</span>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                    <div className="text-xs text-charcoal/40 font-medium mb-1">Google Önizleme</div>
                                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer truncate">
                                        {productName || 'Ürün Başlığı'} | Tsuko Modern Dekor
                                    </div>
                                    <div className="text-green-700 text-xs mb-1 truncate">
                                        https://tsuko.com.tr/product/{slug || 'urun-slug'}
                                    </div>
                                    <div className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">
                                        Minimalist Japon tasarımı {productName} ile evinizin havasını değiştirin. Biyo-bozunur malzemeden 3D baskı ile üretilmiştir. Sürdürülebilir lüksü keşfedin.
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-charcoal/70 mb-2">Sayfa Başlığı (Meta Title)</label>
                                    <input type="text" placeholder={productName} className="w-full px-4 py-2 bg-alabaster rounded-xl border-none outline-none text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal/70 mb-2">Meta Açıklama</label>
                                    <textarea rows={3} className="w-full px-4 py-2 bg-alabaster rounded-xl border-none outline-none text-sm resize-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">

                    {/* Status */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                        <h3 className="text-sm font-bold text-charcoal mb-4 uppercase tracking-wider">Durum</h3>
                        <select className="w-full px-4 py-3 bg-alabaster rounded-xl border-none outline-none font-bold text-charcoal">
                            <option>Yayında (Active)</option>
                            <option>Taslak (Draft)</option>
                            <option>Arşivlendi (Archived)</option>
                        </select>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                        <h3 className="text-sm font-bold text-charcoal mb-4 uppercase tracking-wider">Fiyatlandırma</h3>
                        <div className="relative">
                            <DollarSignIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={18} />
                            <input type="number" placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-alabaster rounded-xl border-none outline-none font-bold text-lg" />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" id="tax" className="w-4 h-4 rounded text-clay focus:ring-clay" defaultChecked />
                            <label htmlFor="tax" className="text-sm text-charcoal/70">KDV Dahil</label>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="bg-white p-6 rounded-3xl border border-[#E6E8E6] shadow-sm">
                        <h3 className="text-sm font-bold text-charcoal mb-4 uppercase tracking-wider">Medya</h3>
                        <div className="border-2 border-dashed border-[#E6E8E6] rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-alabaster transition-colors cursor-pointer group">
                            <div className="w-12 h-12 bg-alabaster rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                                <Upload size={20} className="text-charcoal/40" />
                            </div>
                            <div className="text-sm font-bold text-charcoal">Görsel Yükle</div>
                            <div className="text-xs text-charcoal/40 mt-1">PNG, JPG, WEBP</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function DollarSignIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}
