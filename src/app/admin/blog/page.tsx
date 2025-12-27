import { Plus, Edit, Trash2, Eye, FileText, Globe, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    }).catch(() => []);
}

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Blog Yönetimi</h2>
                    <p className="text-gray-500">İçeriklerinizi düzenleyin ve yeni yazılar paylaşın.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="bg-charcoal text-white px-6 py-3 rounded-xl hover:bg-black font-medium flex items-center gap-2 transition-colors shadow-lg shadow-charcoal/20"
                >
                    <Plus size={20} />
                    Yeni Yazı Ekle
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-charcoal">{posts.length}</p>
                    <p className="text-gray-500 text-sm">Toplam Yazı</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-green-600">{posts.filter((p: any) => p.published).length}</p>
                    <p className="text-gray-500 text-sm">Yayında</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                    <p className="text-3xl font-black text-yellow-600">{posts.filter((p: any) => !p.published).length}</p>
                    <p className="text-gray-500 text-sm">Taslak</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Yazı</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="text-left p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="text-right p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="font-bold">Henüz blog yazısı yok</p>
                                    <p className="text-sm">İlk yazınızı ekleyerek başlayın.</p>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post: any) => (
                                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={post.coverImage || '/images/hero.png'}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-900 line-clamp-1">{post.title}</span>
                                                <p className="text-xs text-gray-400 mt-1">/{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        {post.published ? (
                                            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                                                <Globe size={14} />
                                                Yayında
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-yellow-600 text-sm font-medium">
                                                <EyeOff size={14} />
                                                Taslak
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-6 text-gray-600 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                title="Görüntüle"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
