'use client';

import { useState } from 'react';
import { Save, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPostPage() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Demo modu: İçerik veritabanına kaydedildi olarak simüle edildi.");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/blog" className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Yeni Yazı Ekle</h2>
                    <p className="text-gray-500">Blog içeriği oluştur.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Başlık</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors"
                                placeholder="Yazı başlığı..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                            <select
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors bg-white"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Seçiniz...</option>
                                <option value="Tasarım Felsefesi">Tasarım Felsefesi</option>
                                <option value="Sürdürülebilirlik">Sürdürülebilirlik</option>
                                <option value="İpuçları">İpuçları</option>
                                <option value="Haberler">Haberler</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Özet (Meta Description)</label>
                        <textarea
                            rows={3}
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors resize-none"
                            placeholder="Kısa bir özet..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Kapak Görseli URL</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="flex-grow border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors"
                                placeholder="/images/example.jpg"
                            />
                            <button type="button" className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors">
                                <ImageIcon size={20} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">İçerik (HTML veya Markdown)</label>
                        <textarea
                            rows={12}
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-charcoal transition-colors font-mono text-sm"
                            placeholder="Yazı içeriğinizi buraya girin..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/blog" className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                        İptal
                    </Link>
                    <button type="submit" className="bg-charcoal text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2">
                        <Save size={20} />
                        Yayınla
                    </button>
                </div>
            </form>
        </div>
    );
}
