'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, X, Check, Trash2 } from 'lucide-react';
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

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    author: string;
    published: boolean;
    createdAt: string;
}

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [postId, setPostId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
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
        published: false
    });

    useEffect(() => {
        params.then(p => setPostId(p.id));
    }, [params]);

    useEffect(() => {
        if (!postId) return;

        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/blog/${postId}`);
                const data = await response.json();

                if (response.ok && data.post) {
                    setFormData({
                        title: data.post.title || '',
                        slug: data.post.slug || '',
                        excerpt: data.post.excerpt || '',
                        content: data.post.content || '',
                        coverImage: data.post.coverImage || '',
                        category: data.post.category || 'Dekorasyon Fikirleri',
                        author: data.post.author || 'Tsuko Design',
                        published: data.post.published || false
                    });
                } else {
                    setError('Blog yazısı bulunamadı.');
                }
            } catch (err) {
                setError('Bağlantı hatası.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`/api/blog/${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Blog yazısı güncellendi!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Güncelleme başarısız.');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;

        setDeleting(true);
        try {
            const response = await fetch(`/api/blog/${postId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                router.push('/admin/blog');
            } else {
                setError('Silme işlemi başarısız.');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 size={32} className="animate-spin text-clay" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-charcoal">Blog Yazısını Düzenle</h1>
                        <p className="text-gray-500">İçeriği güncelleyin.</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                    {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    Sil
                </button>
            </div>

            {/* Messages */}
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
                            <label className="block text-sm font-bold text-gray-700 mb-2">Özet</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Kapak Görseli</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                        />

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
                    <h2 className="text-xl font-bold text-charcoal mb-6">İçerik</h2>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={15}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none font-mono text-sm leading-relaxed"
                    />
                    <p className="mt-2 text-xs text-gray-400">Markdown formatı desteklenir.</p>
                </div>

                {/* Author & Status */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Yazar & Durum</h2>

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
                                <span className="font-bold text-charcoal block">Yayında</span>
                                <span className="text-xs text-gray-500">Aktif olarak yayınla</span>
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
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
