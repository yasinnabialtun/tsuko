
'use client';

import { useState, useEffect } from 'react';
import { Star, User, MessageCircle, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewSection({ productId }: { productId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?productId=${productId}`);
            if (res.ok) {
                setReviews(await res.json());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        if (!userName.trim()) {
            setError('Lütfen isminizi giriniz.');
            setSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    rating,
                    comment,
                    userName
                })
            });

            if (res.ok) {
                setComment('');
                setShowForm(false);
                fetchReviews(); // Refresh list
            } else {
                setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch {
            setError('Bağlantı hatası.');
        } finally {
            setSubmitting(false);
        }
    };

    const averageSimple = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '0';

    return (
        <div className="py-12 border-t-4 border-black border-dashed" id="reviews">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h3 className="text-3xl font-black text-black flex items-center gap-4 uppercase tracking-tighter">
                        Değerlendirmeler
                        <span className="text-sm bg-[var(--color-yellow)] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-3 py-1 -rotate-6 font-black rounded-lg">
                            {reviews.length} Yorum
                        </span>
                    </h3>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-4 mt-3 pl-1">
                            <div className="flex text-[var(--color-purple)]">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star
                                        key={s}
                                        size={24}
                                        fill={s <= Math.round(Number(averageSimple)) ? "currentColor" : "none"}
                                        strokeWidth={3}
                                        className={s <= Math.round(Number(averageSimple)) ? "drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="font-black text-2xl text-black">{averageSimple} / 5</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-8 py-3 bg-black text-white border-2 border-transparent hover:border-black hover:bg-[var(--color-pink)] hover:text-black rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                >
                    {showForm ? 'Vazgeç ❌' : 'Yorum Yaz ✍️'}
                </button>
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[var(--color-sand)] p-8 rounded-3xl mb-12 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        onSubmit={handleSubmit}
                    >
                        <h4 className="font-black text-2xl mb-6 uppercase tracking-tight">Deneyimini Paylaş</h4>

                        <div className="space-y-6">
                            {/* Rating */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-black/60 mb-2">Puanınız</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95 group"
                                        >
                                            <Star
                                                size={32}
                                                strokeWidth={3}
                                                fill={star <= rating ? "var(--color-yellow)" : "none"}
                                                className={star <= rating ? "text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "text-black/20 group-hover:text-black/40"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-black/60 mb-2">İsminiz</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-4 rounded-xl border-2 border-black focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-purple)] bg-white font-bold transition-all"
                                    placeholder="Adınız Soyadınız"
                                    required
                                />
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-black/60 mb-2">Yorumunuz</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full px-4 py-4 rounded-xl border-2 border-black focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-purple)] bg-white resize-none font-bold transition-all"
                                    rows={4}
                                    placeholder="Ürün hakkındaki düşünceleriniz..."
                                    required
                                />
                            </div>

                            {error && <p className="text-[var(--color-red)] text-sm font-black p-2 bg-white border border-black inline-block rotate-1">{error}</p>}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-4 bg-[var(--color-green)] text-black border-2 border-black rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[var(--color-green)] hover:brightness-110 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} strokeWidth={3} />}
                                Gönder
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Reviews List */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin text-black" size={48} strokeWidth={3} />
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-[2rem] border-4 border-dashed border-black/20 group hover:border-[var(--color-blue)] transition-colors">
                    <div className="inline-flex p-4 bg-[var(--color-sand)] rounded-full mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform">
                        <MessageCircle size={32} className="text-black" strokeWidth={2.5} />
                    </div>
                    <p className="text-black font-black text-xl mb-1">Henüz ses yok!</p>
                    <p className="text-black/50 font-medium">İlk yorumu yapan sen olabilirsin. 🎤</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {reviews.map((review, i) => (
                        <div key={review.id} className={cn(
                            "bg-white p-6 md:p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                        )}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                                        i % 3 === 0 ? "bg-[var(--color-pink)] text-white" : i % 3 === 1 ? "bg-[var(--color-blue)] text-white" : "bg-[var(--color-yellow)] text-black"
                                    )}>
                                        <User size={24} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h5 className="font-black text-black text-lg">{review.userName}</h5>
                                        <div className="flex text-[var(--color-yellow)] text-xs mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < review.rating ? "currentColor" : "none"}
                                                    strokeWidth={3}
                                                    className={i < review.rating ? "text-black drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-black/40 bg-gray-100 px-2 py-1 rounded border border-black/10">
                                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <p className="text-black/80 leading-relaxed font-medium pl-16 border-l-4 border-[var(--color-purple)]">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
