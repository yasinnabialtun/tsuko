'use client';

import { Plus, Edit, Trash2, FileText } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export default function AdminBlogPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Blog Yönetimi</h2>
                    <p className="text-gray-500">İçeriklerinizi düzenleyin ve yeni yazılar paylaşın.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="bg-charcoal text-white px-6 py-3 rounded-xl hover:bg-black font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Yeni Yazı Ekle
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Başlık</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Yazar</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="text-right p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {blogPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-bold text-gray-900">{post.title}</span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="p-6 text-gray-600">{post.author}</td>
                                <td className="p-6 text-gray-600">{post.date}</td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors" title="Düzenle">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Sil">
                                            <Trash2 size={18} />
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
