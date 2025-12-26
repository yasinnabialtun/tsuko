import { Plus, Search, Filter } from "lucide-react";
import Image from "next/image";
import { products } from "@/lib/data";

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Ürün Yönetimi</h2>
                    <p className="text-gray-500">Koleksiyonunuzu buradan yönetin.</p>
                </div>
                <button className="bg-charcoal text-white px-6 py-3 rounded-xl hover:bg-black font-medium flex items-center gap-2 transition-colors">
                    <Plus size={20} />
                    Yeni Ürün Ekle
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex-grow relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-charcoal transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    <Filter size={20} />
                    Filtrele
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                        <div className="relative aspect-square">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-charcoal shadow-sm">
                                {product.category}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                                <span className="font-bold text-gray-900">{product.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                {product.description}
                            </p>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    Düzenle
                                </button>
                                <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors">
                                    Sil
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
