'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '905551234567'; // TODO: Update with real number
const DEFAULT_MESSAGE = 'Merhaba! Tsuko Design ürünleri hakkında bilgi almak istiyorum.';

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);

    const openWhatsApp = (message: string = DEFAULT_MESSAGE) => {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(url, '_blank');
        setIsOpen(false);
    };

    const quickMessages = [
        { label: '📦 Kargo süreci', message: 'Merhaba! Kargo süreci hakkında bilgi almak istiyorum.' },
        { label: '💳 Ödeme seçenekleri', message: 'Merhaba! Ödeme seçenekleri hakkında bilgi almak istiyorum.' },
        { label: '🎁 Özel sipariş', message: 'Merhaba! Özel renk/boyut siparişi hakkında bilgi almak istiyorum.' },
        { label: '❓ Genel soru', message: DEFAULT_MESSAGE }
    ];

    return (
        <div className="fixed bottom-4 right-4 z-[45]">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="button"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/30 flex items-center gap-2 group"
                    >
                        <MessageCircle size={24} />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 whitespace-nowrap font-bold text-sm">
                            Yardım
                        </span>
                    </motion.button>
                ) : (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden w-[300px]"
                    >
                        {/* Header */}
                        <div className="bg-[#25D366] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Tsuko Destek</p>
                                    <p className="text-xs text-white/80">Genellikle 5 dk içinde yanıt</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-charcoal/70 text-sm mb-4">
                                Merhaba! 👋 Size nasıl yardımcı olabiliriz?
                            </p>

                            <div className="space-y-2">
                                {quickMessages.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => openWhatsApp(item.message)}
                                        className="w-full text-left p-3 rounded-xl border border-black/5 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-sm text-charcoal font-medium flex items-center justify-between group"
                                    >
                                        <span>{item.label}</span>
                                        <Send size={14} className="text-charcoal/30 group-hover:text-[#25D366] transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 pt-0">
                            <button
                                onClick={() => openWhatsApp()}
                                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-[#1da851] transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={18} />
                                WhatsApp&apos;tan Yaz
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
