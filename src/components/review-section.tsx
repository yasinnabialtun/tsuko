
'use client';

import { useState, useEffect } from 'react';
import { Star, User, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewSection({ productId }: { productId: string }) {
    const { user, isLoaded } = useUser();
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

    useEffect(() => {
        if (user) {
            setUserName(user.fullName || user.firstName || '');
        }
    }, [user]);

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
        <div className="py-12 border-t border-gray-100" id="reviews">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-charcoal flex items-center gap-2">
                        Değerlendirmeler
                        <span className="text-sm bg-alabaster px-2 py-1 rounded-full text-charcoal/60">
                            {reviews.length}
                        </span>
                    </h3>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-orange-400">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star
                                        key={s}
                                        size={16}
                                        fill={s <= Math.round(Number(averageSimple)) ? "currentColor" : "none"}
                                        className={s <= Math.round(Number(averageSimple)) ? "" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="font-bold text-charcoal">{averageSimple} / 5</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 border border-charcoal/10 rounded-full font-bold text-sm hover:bg-charcoal hover:text-white transition-colors"
                >
                    {showForm ? 'İptal' : 'Yorum Yap'}
                </button>
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-alabaster p-6 rounded-2xl mb-8 overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        <h4 className="font-bold text-lg mb-4">Deneyiminizi Paylaşın</h4>

                        <div className="space-y-4">
                            {/* Rating */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2">Puanınız</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={star <= rating ? "text-orange-400 fill-orange-400" : "text-gray-300"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2">İsminiz</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-clay/20 bg-white"
                                    placeholder="Adınız Soyadınız"
                                    required
                                />
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2">Yorumunuz</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-clay/20 bg-white resize-none"
                                    rows={4}
                                    placeholder="Ürün hakkındaki düşünceleriniz..."
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-8 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                Gönder
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Reviews List */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="animate-spin text-charcoal/30" />
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-charcoal/50 font-medium">Henüz değerlendirme yapılmamış.</p>
                    <p className="text-sm text-gray-400">İlk yorumu siz yapın!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-clay/10 rounded-full flex items-center justify-center text-clay">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-charcoal">{review.userName}</h5>
                                        <div className="flex text-orange-400 text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill={i < review.rating ? "currentColor" : "none"}
                                                    className={i < review.rating ? "" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <p className="text-charcoal/80 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
