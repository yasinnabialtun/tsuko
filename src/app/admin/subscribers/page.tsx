
'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, Check, X, Copy, Download, Loader2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const res = await fetch('/api/newsletter');
            if (res.ok) {
                setSubscribers(await res.json());
            }
        } catch (e) {
            toast.error('Aboneler yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const copyEmails = () => {
        const emails = subscribers
            .filter(s => s.isActive)
            .map(s => s.email)
            .join(', ');

        if (!emails) {
            toast.error('Kopyalanacak aktif abone bulunmuyor.');
            return;
        }

        navigator.clipboard.writeText(emails);
        toast.success(`${subscribers.filter(s => s.isActive).length} e-posta kopyalandı.`);
    };

    const toggleStatus = async (id: string, current: boolean) => {
        try {
            const res = await fetch('/api/newsletter', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isActive: !current })
            });

            if (res.ok) {
                setSubscribers(prev => prev.map(s => s.id === id ? { ...s, isActive: !current } : s));
                toast.success('Durum güncellendi.');
            }
        } catch (e) {
            toast.error('Güncelleme başarısız.');
        }
    };

    const deleteSubscriber = async (id: string) => {
        if (!confirm('Bu aboneyi silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetch(`/api/newsletter?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setSubscribers(prev => prev.filter(s => s.id !== id));
                toast.success('Abone silindi.');
            }
        } catch (e) {
            toast.error('Silme işlemi başarısız.');
        }
    };

    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [campaignData, setCampaignData] = useState({ title: '', content: '', ctaText: '', ctaLink: '' });
    const [campaignSending, setCampaignSending] = useState(false);

    const handleCampaignSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCampaignSending(true);

        try {
            const res = await fetch('/api/admin/newsletter/campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData)
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                setShowCampaignModal(false);
                setCampaignData({ title: '', content: '', ctaText: '', ctaLink: '' });
            } else {
                toast.error(data.error);
            }
        } catch (e) {
            toast.error('Bağlantı hatası.');
        } finally {
            setCampaignSending(false);
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-charcoal">Bülten Aboneleri</h1>
                    <p className="text-charcoal/60">E-posta bültenine kayıt olan kullanıcılar.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowCampaignModal(true)}
                        className="flex items-center gap-2 bg-clay text-white px-6 py-2 rounded-xl shadow-lg shadow-clay/20 font-bold hover:bg-black transition-all text-sm"
                    >
                        <Mail size={16} />
                        Kampanya Gönder
                    </button>
                    <button
                        onClick={copyEmails}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-black/5 shadow-sm font-bold text-charcoal hover:bg-alabaster transition-colors text-sm"
                    >
                        <Copy size={16} />
                        E-postaları Kopyala
                    </button>
                    <div className="bg-charcoal px-4 py-2 rounded-xl shadow-lg border border-white/10 font-bold text-white text-sm">
                        Toplam: {subscribers.length}
                    </div>
                </div>
            </div>

            {/* Campaign Modal */}
            {showCampaignModal && (
                <div className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-alabaster/30">
                            <div>
                                <h3 className="text-2xl font-black text-charcoal">E-posta Kampanyası</h3>
                                <p className="text-sm text-charcoal/40">Tüm aktif abonelerinize toplu e-posta gönderin.</p>
                            </div>
                            <button onClick={() => setShowCampaignModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCampaignSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">E-posta Başlığı</label>
                                <input
                                    required
                                    type="text"
                                    value={campaignData.title}
                                    onChange={e => setCampaignData({ ...campaignData, title: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-alabaster border-transparent focus:bg-white focus:border-clay/20 focus:ring-4 focus:ring-clay/5 transition-all outline-none text-charcoal font-medium"
                                    placeholder="Yeni Koleksiyonumuz Çıktı!"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">Mesaj İçeriği</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={campaignData.content}
                                    onChange={e => setCampaignData({ ...campaignData, content: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-alabaster border-transparent focus:bg-white focus:border-clay/20 focus:ring-4 focus:ring-clay/5 transition-all outline-none text-charcoal font-medium resize-none"
                                    placeholder="Harika yeni ürünlerimizi keşfetmeye hazır mısınız?..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">Buton Metni (Opsiyonel)</label>
                                    <input
                                        type="text"
                                        value={campaignData.ctaText}
                                        onChange={e => setCampaignData({ ...campaignData, ctaText: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-alabaster border-transparent focus:bg-white focus:bg-white transition-all outline-none text-charcoal font-medium"
                                        placeholder="Şimdi İncele"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">Buton Linki</label>
                                    <input
                                        type="text"
                                        value={campaignData.ctaLink}
                                        onChange={e => setCampaignData({ ...campaignData, ctaLink: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-alabaster border-transparent focus:bg-white transition-all outline-none text-charcoal font-medium"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={campaignSending}
                                className="w-full py-5 bg-charcoal text-white rounded-2xl font-black text-lg shadow-xl shadow-charcoal/10 hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {campaignSending ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <Mail size={24} />
                                        Kampanyayı Başlat ({subscribers.filter(s => s.isActive).length} Kişi)
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden text-sm">
                <table className="w-full">
                    <thead className="bg-[#F9FAFB] border-b border-black/5">
                        <tr>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">E-posta</th>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Kaynak</th>
                            <th className="text-left py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Durum</th>
                            <th className="text-right py-4 px-8 text-xs font-bold text-charcoal/40 uppercase tracking-widest">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-charcoal/40">
                                    <Mail className="mx-auto mb-4 opacity-10" size={64} />
                                    <p className="font-medium">Henüz abone bulunmuyor.</p>
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-alabaster/30 transition-colors group">
                                    <td className="py-4 px-8 font-bold text-charcoal">
                                        {sub.email}
                                    </td>
                                    <td className="py-4 px-8">
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black uppercase text-gray-500 tracking-wider">
                                            {sub.source || 'Website'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-8">
                                        <button
                                            onClick={() => toggleStatus(sub.id, sub.isActive)}
                                            className="focus:outline-none"
                                        >
                                            {sub.isActive ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-50 text-green-700 border border-green-100 hover:bg-green-100 transition-colors">
                                                    Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 transition-colors">
                                                    Pasif
                                                </span>
                                            )}
                                        </button>
                                    </td>
                                    <td className="py-4 px-8 text-right flex items-center justify-end gap-4">
                                        <span className="text-gray-400 font-mono text-[11px]">
                                            {new Date(sub.createdAt).toLocaleDateString('tr-TR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <button
                                            onClick={() => deleteSubscriber(sub.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
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
