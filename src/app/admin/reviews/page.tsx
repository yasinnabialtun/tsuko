
'use client';

import { useState, useEffect } from 'react';
import { Star, Trash2, CheckCircle, XCircle, Loader2, MessageCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews?all=true');
            if (res.ok) {
                setReviews(await res.json());
            }
        } catch (e) {
            toast.error('Yorumlar yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Yorum silindi.');
                setReviews(reviews.filter(r => r.id !== id));
            }
        } catch (e) {
            toast.error('İşlem başarısız.');
        }
    };

    const toggleApproval = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/reviews', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isApproved: !currentStatus })
            });
            if (res.ok) {
                toast.success(currentStatus ? 'Yorum gizlendi.' : 'Yorum onaylandı.');
                setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: !currentStatus } : r));
            }
        } catch (e) {
            toast.error('İşlem başarısız.');
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="animate-spin text-clay" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-charcoal mb-2 font-syne">Müşteri Yorumları</h1>
                    <p className="text-charcoal/60">Ürünleriniz için yapılan tüm değerlendirmeleri buradan yönetebilirsiniz.</p>
                </div>
            </div>

            {reviews.length === 0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-[#E6E8E6]">
                    <MessageCircle className="mx-auto text-gray-200 mb-6" size={64} />
                    <h3 className="text-xl font-bold text-charcoal mb-2">Henüz Yorum Yok</h3>
                    <p className="text-gray-400">Ürünleriniz değerlendirildiğinde burada görünecektir.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl p-6 border border-[#E6E8E6] flex gap-6 items-start group hover:border-clay/30 transition-all shadow-sm hover:shadow-xl hover:shadow-clay/5">

                            {/* Product Info */}
                            <div className="w-24 shrink-0">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-alabaster mb-2">
                                    <Image
                                        src={review.product?.images?.[0] || '/images/hero.png'}
                                        alt={review.product?.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h4 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest text-center truncate">
                                    {review.product?.name}
                                </h4>
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-charcoal">{review.userName}</span>
                                            {!review.isApproved && (
                                                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase">Gizli</span>
                                            )}
                                        </div>
                                        <div className="flex text-orange-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-charcoal/70 bg-alabaster/50 p-4 rounded-2xl text-sm leading-relaxed italic border border-black/5">
                                    "{review.comment}"
                                </p>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        onClick={() => toggleApproval(review.id, review.isApproved)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all
                                            ${review.isApproved
                                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                    >
                                        {review.isApproved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                        {review.isApproved ? 'Gizle' : 'Onayla'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-200 transition-all"
                                    >
                                        <Trash2 size={16} />
                                        Sil
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
