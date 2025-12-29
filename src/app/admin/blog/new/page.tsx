'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, X, Check, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const BLOG_CATEGORIES = [
    'Dekorasyon Fikirleri',
    '3D Baskı Teknolojisi',
    'Sürdürülebilirlik',
    'Ürün Tanıtımı',
    'İlham',
    'Marka Hikayesi'
];

export default function NewBlogPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: 'Dekorasyon Fikirleri',
        author: 'Tsuko Design',
        published: false,
        seoTitle: '',
        seoDesc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));

            // Auto-generate slug from title
            if (name === 'title') {
                const autoSlug = value
                    .toLowerCase()
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                setFormData(prev => ({ ...prev, slug: autoSlug }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        if (!formData.title || !formData.content) {
            setError('Başlık ve içerik zorunludur.');
            setSaving(false);
            return;
        }

        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    coverImage: formData.coverImage || '/images/hero.png'
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Blog yazısı başarıyla oluşturuldu!');
                setTimeout(() => router.push('/admin/blog'), 1500);
            } else {
                setError(data.error || 'Kayıt başarısız.');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-charcoal">Yeni Blog Yazısı</h1>
                        <p className="text-gray-500">SEO uyumlu içerik oluşturun.</p>
                    </div>
                </div>
            </div>

            {/* Status Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <X size={20} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3">
                    <Check size={20} />
                    <span>{success}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Temel Bilgiler</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Başlık *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Dikkat çekici bir başlık yazın..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all text-lg"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="otomatik-olusturulur"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all font-mono text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                                >
                                    {BLOG_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Özet (Excerpt)</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Yazının kısa özeti (liste sayfalarında görünür)..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Kapak Görseli</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Görsel URL</label>
                            <input
                                type="text"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                placeholder="https://... veya /images/..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                            />
                        </div>

                        {formData.coverImage && (
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                <Image
                                    src={formData.coverImage}
                                    alt="Cover preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">İçerik *</h2>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={15}
                        placeholder="Blog yazınızı buraya yazın... (Markdown desteklenir)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                    />
                    <p className="mt-2 text-xs text-gray-400">Markdown formatı desteklenir. **kalın**, *italik*, [link](url)</p>
                </div>

                {/* SEO Settings */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">SEO Ayarları</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Meta Başlık (SEO Title)</label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Google sonuçlarında görünecek başlık..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Meta Açıklama (SEO Description)</label>
                            <textarea
                                name="seoDesc"
                                value={formData.seoDesc}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Yazının arama motoru açıklaması..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Author & Status */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Yazar & Yayın Durumu</h2>

                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Yazar</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full max-w-xs px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                            />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-6 py-4 rounded-xl">
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                            />
                            <div>
                                <span className="font-bold text-charcoal block">Hemen Yayınla</span>
                                <span className="text-xs text-gray-500">Veya taslak olarak kaydet</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/blog"
                        className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        İptal
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 rounded-xl bg-charcoal text-white font-bold hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                {formData.published ? 'Yayınla' : 'Taslak Kaydet'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
