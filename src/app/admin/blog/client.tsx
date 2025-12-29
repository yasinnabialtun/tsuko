'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Globe, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
    const [posts, setPosts] = useState(initialPosts);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
                toast.success('Yazı silindi.');
            } else {
                toast.error('Silme işlemi başarısız.');
            }
        } catch (e) {
            toast.error('Bir hata oluştu.');
        } finally {
            setDeletingId(null);
        }
    };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-black text-charcoal">{posts.length}</p>
                    <p className="text-gray-500 text-sm">Toplam Yazı</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-black text-green-600">{posts.filter((p: any) => p.published).length}</p>
                    <p className="text-gray-500 text-sm">Yayında</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-3xl font-black text-yellow-600">{posts.filter((p: any) => !p.published).length}</p>
                    <p className="text-gray-500 text-sm">Taslak</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
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
                        <tbody className="divide-y divide-gray-100 text-sm">
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
                                                <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden flex-shrink-0 border border-gray-100">
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
                                            <span className="px-3 py-1 bg-[#F3F4F6] rounded-full text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {post.published ? (
                                                <span className="flex items-center gap-1.5 text-green-600 font-bold text-xs uppercase tracking-tight">
                                                    <Globe size={14} />
                                                    Yayında
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-yellow-600 font-bold text-xs uppercase tracking-tight">
                                                    <EyeOff size={14} />
                                                    Taslak
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6 text-gray-500 font-medium">
                                            {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-2 hover:bg-gray-100 text-gray-400 hover:text-charcoal rounded-lg transition-colors"
                                                    title="Görüntüle"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <Link
                                                    href={`/admin/blog/edit/${post.id}`}
                                                    className="p-2 hover:bg-clay/10 text-gray-400 hover:text-clay rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deletingId === post.id}
                                                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Sil"
                                                >
                                                    {deletingId === post.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
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
        </div>
    );
}
