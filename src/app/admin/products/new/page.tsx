'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, X, Check } from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/admin/image-uploader';
import { createProduct } from '../actions';

interface Category {
    id: string;
    name: string;
}

export default function NewProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: 10,
        categoryId: '',
        images: [] as string[],
        isActive: true,
        isFeatured: false,
        seoTitle: '',
        seoDescription: ''
    });

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (data.categories) {
                    setCategories(data.categories);
                }
            } catch (err) {
                console.error('Categories fetch failed');
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));

            // Auto-generate slug from name
            if (name === 'name') {
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

        if (!formData.name || !formData.price) {
            setError('Ürün adı ve fiyat zorunludur.');
            setSaving(false);
            return;
        }

        if (formData.images.length === 0) {
            setError('En az bir ürün görseli eklemelisiniz.');
            setSaving(false);
            return;
        }

        try {
            // Server Action call
            const result = await createProduct({
                ...formData,
                price: parseFloat(formData.price)
            });

            if (result.success) {
                setSuccess('Ürün başarıyla oluşturuldu!');
                setTimeout(() => router.push('/admin/products'), 1500);
            } else {
                setError(result.error || 'Kayıt başarısız.');
            }
        } catch (err) {
            console.error(err);
            setError('İşlem sırasında bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Yeni Ürün Ekle</h1>
                    <p className="text-gray-500">Ürün bilgilerini doldurun.</p>
                </div>
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
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Temel Bilgiler</h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ürün Adı *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Örn: Spiral Vazo"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                                />
                            </div>
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
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Ürün açıklaması..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Fiyat (₺) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="199.90"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Stok</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                                >
                                    <option value="">Kategori Seç</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <ImageUploader
                        value={formData.images}
                        onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                        bucket="products"
                        maxFiles={5}
                        label="Ürün Görselleri *"
                    />
                </div>

                {/* Status */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">Durum</h2>

                    <div className="flex gap-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                            />
                            <span className="font-medium text-charcoal">Aktif (Yayında)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                            />
                            <span className="font-medium text-charcoal">Öne Çıkan</span>
                        </label>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <h2 className="text-xl font-bold text-charcoal mb-6">SEO Ayarları</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">SEO Başlığı</label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Ürün adı | Tsuko Design"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">SEO Açıklaması</label>
                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Ürün açıklaması (max 160 karakter)"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/products"
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
                                Ürün Oluştur
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
