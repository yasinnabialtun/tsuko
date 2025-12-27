import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Plus, Search, Filter, Edit2, Archive } from 'lucide-react';

export const revalidate = 0; // Don't cache admin pages

async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    }).catch(() => []);
}

export default async function ProductList() {
    const PRODUCTS = await getProducts();
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-charcoal mb-2">Ürün Yönetimi</h1>
                    <p className="text-charcoal/60">Envanter, fiyatlandırma ve SEO ayarları.</p>
                </div>
                <Link href="/admin/products/new" className="bg-charcoal text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg shadow-charcoal/20">
                    <Plus size={20} />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-[#E6E8E6] flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Ürün adı, SKU veya kategori ara..."
                        className="w-full pl-12 pr-4 py-3 bg-alabaster rounded-xl border-none outline-none focus:ring-2 focus:ring-clay/20 transition-all font-medium"
                    />
                </div>
                <button className="px-6 py-3 bg-white border border-[#E6E8E6] rounded-xl font-bold text-charcoal flex items-center gap-2 hover:bg-alabaster transition-colors">
                    <Filter size={20} />
                    Filtrele
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#E6E8E6] rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead className="bg-[#F9FAFB] border-b border-[#E6E8E6]">
                        <tr className="text-left text-xs font-bold text-charcoal/40 uppercase tracking-widest">
                            <th className="px-8 py-4">Ürün</th>
                            <th className="px-8 py-4">Kategori</th>
                            <th className="px-8 py-4">Durum</th>
                            <th className="px-8 py-4">Fiyat</th>
                            <th className="px-8 py-4">Stok</th>
                            <th className="px-8 py-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E8E6]">
                        {PRODUCTS.map((product: any) => (
                            <tr key={product.id} className="group hover:bg-alabaster/50 transition-colors">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-alabaster rounded-xl relative overflow-hidden border border-[#E6E8E6]">
                                            <Image src={product.images[0] || '/images/hero.png'} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-charcoal">{product.name}</div>
                                            <div className="text-xs text-charcoal/40 font-mono mt-0.5">SKU-88{product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-sm font-medium text-charcoal/60">{product.category?.name || 'Kategorisiz'}</td>
                                <td className="px-8 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${product.isActive
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-gray-100 text-gray-500 border-gray-200'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        {product.isActive ? 'Yayında' : 'Taslak'}
                                    </span>
                                </td>
                                <td className="px-8 py-4 font-bold text-charcoal">₺{product.price.toString()}</td>
                                <td className="px-8 py-4 text-sm font-medium text-charcoal/80">{product.stock} adet</td>
                                <td className="px-8 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/edit/${product.id}`}
                                            className="p-2 text-charcoal/40 hover:text-clay hover:bg-clay/10 rounded-lg transition-colors"
                                            title="Düzenle"
                                        >
                                            <Edit2 size={18} />
                                        </Link>
                                        <button
                                            className="p-2 text-charcoal/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Arşivle"
                                        >
                                            <Archive size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
