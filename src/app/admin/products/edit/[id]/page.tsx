'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, X, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ImageUploader from '@/components/admin/image-uploader';
import { updateProduct } from '../../actions';

interface Category {
    id: string;
    name: string;
}

interface ProductData {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    images: string[];
    categoryId: string;
    seoTitle: string | null;
    seoDescription: string | null;
    isActive: boolean;
    isFeatured: boolean;
    category: Category;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [productId, setProductId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: 0,
        images: [] as string[],
        categoryId: '',
        seoTitle: '',
        seoDescription: '',
        isActive: true,
        isFeatured: false
    });

    // Get product ID from params
    useEffect(() => {
        params.then(p => setProductId(p.id));
    }, [params]);

    // Fetch product and categories
    useEffect(() => {
        if (!productId) return;

        const fetchData = async () => {
            try {
                const [productRes, categoriesRes] = await Promise.all([
                    fetch(`/api/products/${productId}`),
                    fetch('/api/categories')
                ]);

                if (!productRes.ok) {
                    setError('Ürün bulunamadı.');
                    return;
                }

                const productData = await productRes.json();
                const categoriesData = await categoriesRes.json();

                const product = productData.product;
                setFormData({
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    images: product.images || [],
                    categoryId: product.categoryId,
                    seoTitle: product.seoTitle || '',
                    seoDescription: product.seoDescription || '',
                    isActive: product.isActive,
                    isFeatured: product.isFeatured
                });

                setCategories(categoriesData.categories || []);
            } catch (err) {
                setError('Veri yüklenirken hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

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
            // Server Action call
            const result = await updateProduct(productId, {
                ...formData,
                price: parseFloat(formData.price)
            });

            if (result.success) {
                setSuccess('Ürün başarıyla güncellendi!');
                setTimeout(() => router.push('/admin/products'), 1500);
            } else {
                setError(result.error || 'Güncelleme başarısız.');
            }
        } catch (err) {
            console.error(err);
            setError('İşlem sırasında bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const addImageUrl = () => {
        const url = prompt('Görsel URL\'si girin:');
        if (url) {
            setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
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
                    <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-charcoal">Ürün Düzenle</h1>
                        <p className="text-gray-500">Ürün bilgilerini güncelleyin.</p>
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

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ürün Adı *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
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
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Açıklama</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Fiyat (₺) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
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

                {/* Images */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                    <ImageUploader
                        value={formData.images}
                        onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
                        bucket="products"
                        maxFiles={5}
                        label="Ürün Görselleri"
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
                                Kaydet
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
