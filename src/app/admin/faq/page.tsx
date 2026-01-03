'use client';

import { useState, useEffect } from 'react';
import { Plus, Save, Trash2, GripVertical, Loader2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface FAQ {
    id?: string;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
}

export default function AdminFAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const res = await fetch('/api/admin/faq');
            if (res.ok) {
                const data = await res.json();
                setFaqs(data);
            }
        } catch (error) {
            toast.error('SSS yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        const newFaq: FAQ = {
            question: '',
            answer: '',
            order: faqs.length,
            isActive: true
        };
        setFaqs([...faqs, newFaq]);
    };

    const handleChange = (index: number, field: keyof FAQ, value: any) => {
        const updated = [...faqs];
        updated[index] = { ...updated[index], [field]: value };
        setFaqs(updated);
    };

    const handleRemove = async (index: number) => {
        const faq = faqs[index];
        if (faq.id) {
            if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
            try {
                const res = await fetch(`/api/admin/faq?id=${faq.id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Silindi');
                }
            } catch (error) {
                toast.error('Silme hatası');
                return;
            }
        }
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const handleSave = async (index: number) => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/faq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(faqs[index])
            });
            if (res.ok) {
                const savedFaq = await res.json();
                const updated = [...faqs];
                updated[index] = savedFaq;
                setFaqs(updated);
                toast.success('Kaydedildi');
            }
        } catch (error) {
            toast.error('Kaydetme hatası');
        } finally {
            setSaving(false);
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
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-charcoal">Sıkça Sorulan Sorular</h1>
                    <p className="text-gray-500">Müşterilerinizin merak ettiği soruları yönetin.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-xl font-bold hover:bg-black transition-colors"
                >
                    <Plus size={20} />
                    Yeni Soru Ekle
                </button>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={faq.id || index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Soru</label>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) => handleChange(index, 'question', e.target.value)}
                                        placeholder="Örn: Kargo ne zaman ulaşır?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cevap</label>
                                    <textarea
                                        value={faq.answer}
                                        onChange={(e) => handleChange(index, 'answer', e.target.value)}
                                        placeholder="Cevap metni..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-clay outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-bold text-gray-600">Sıra:</label>
                                        <input
                                            type="number"
                                            value={faq.order}
                                            onChange={(e) => handleChange(index, 'order', parseInt(e.target.value))}
                                            className="w-20 px-3 py-1.5 rounded-lg border border-gray-200 focus:border-clay outline-none"
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={faq.isActive}
                                            onChange={(e) => handleChange(index, 'isActive', e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-clay focus:ring-clay"
                                        />
                                        <span className="text-sm font-bold text-gray-600">Aktif</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleSave(index)}
                                    className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                                    title="Kaydet"
                                >
                                    <Save size={20} />
                                </button>
                                <button
                                    onClick={() => handleRemove(index)}
                                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {faqs.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500">Henüz soru eklenmemiş.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
