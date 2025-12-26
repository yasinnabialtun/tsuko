'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Gift, User, Home, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';

// Simple logic tree
const STEPS = [
    {
        id: 1,
        question: "Hediyeyi kime alıyorsun?",
        options: [
            { label: "Kendime (Şımarmak lazım)", value: "self", icon: User },
            { label: "Arkadaşıma / Sevgilime", value: "gift", icon: Gift },
            { label: "Ev Hediyesi", value: "home", icon: Home },
        ]
    },
    {
        id: 2,
        question: "Tarzı nasıl tanımlarsın?",
        options: [
            { label: "Minimalist & Sade", value: "minimal", icon: Check },
            { label: "Renkli & Enerjik", value: "colorful", icon: Sparkles },
            { label: "Doğal & Organik", value: "organic", icon: Home },
        ]
    },
];

// Mock recommendations
const RECOMMENDATIONS = {
    'self-minimal': { name: "Nami Vazo - Stone", id: "nami-vazo", reason: "Sakin ve dingin yapısıyla kendine ayırdığın o özel köşeye çok yakışacak." },
    'self-colorful': { name: "Mantar Lamba - Turuncu", id: "mantar-lamba", reason: "Mekanına ihtiyacın olan o enerjiyi getirecek parça bu." },
    'self-organic': { name: "Kaya Saksı", id: "kaya-saksi", reason: "Doğal dokuları seven ruhun için en iyi eşleşme." },
    // Fallbacks handled generally
};

export default function GiftFinder() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); // 0 = closed/intro, 1 = q1, 2 = q2, 3 = result
    const [answers, setAnswers] = useState<string[]>([]);

    const handleAnswer = (answer: string) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (step < STEPS.length) {
            setStep(step + 1);
        } else {
            // Start loading/calculating
            setStep(99);
            setTimeout(() => setStep(3), 1500);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
        setIsOpen(false);
    };

    const getRecommendation = () => {
        const key = `${answers[0]}-${answers[1]}`;
        // Simple mock logic for recommendation
        if (answers[1] === 'minimal') return RECOMMENDATIONS['self-minimal'];
        if (answers[1] === 'colorful') return RECOMMENDATIONS['self-colorful'];
        return RECOMMENDATIONS['self-organic']; // default
    };

    const result = step === 3 ? getRecommendation() : null;

    return (
        <div className="fixed bottom-4 right-4 z-40">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => { setIsOpen(true); setStep(1); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-charcoal text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold hover:shadow-charcoal/30 border border-white/20"
                    >
                        <Gift size={20} className="animate-bounce" />
                        <span>Hediye Seçemedin mi?</span>
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white w-[350px] shadow-2xl rounded-3xl border border-black/5 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-charcoal p-4 flex justify-between items-center text-white">
                            <span className="font-bold text-sm tracking-widest uppercase">Hediye Sihirbazı 🧙‍♂️</span>
                            <button onClick={reset} className="p-1 hover:bg-white/20 rounded"><X size={16} /></button>
                        </div>

                        <div className="p-6 min-h-[300px] flex flex-col justify-center">
                            {step < 3 && step > 0 && (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="text-xl font-bold text-charcoal mb-6 text-center">
                                        {STEPS[step - 1].question}
                                    </h3>
                                    <div className="space-y-3">
                                        {STEPS[step - 1].options.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleAnswer(opt.value)}
                                                className="w-full text-left p-4 rounded-xl border border-black/5 hover:border-black/20 hover:bg-alabaster transition-all flex items-center gap-3 group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-clay/10 text-clay flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-colors">
                                                    <opt.icon size={14} />
                                                </div>
                                                <span className="font-medium text-charcoal/80 group-hover:text-charcoal">{opt.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex justify-center mt-6 gap-1">
                                        {STEPS.map(s => (
                                            <div key={s.id} className={`h-1 rounded-full transition-all duration-300 ${s.id <= step ? 'w-8 bg-clay' : 'w-2 bg-gray-200'}`} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 99 && (
                                <motion.div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="font-bold text-charcoal">En uygun parça seçiliyor...</p>
                                </motion.div>
                            )}

                            {step === 3 && result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 text-sage text-3xl">
                                        🎉
                                    </div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Mükemmel Seçim!</h3>
                                    <h4 className="text-2xl font-black text-clay mb-4">{result.name}</h4>
                                    <p className="text-sm text-charcoal/60 mb-6 bg-alabaster p-4 rounded-xl italic">
                                        "{result.reason}"
                                    </p>

                                    <Link
                                        href={`/product/${result.id}`}
                                        className="block w-full bg-charcoal text-white py-4 rounded-xl font-bold hover:bg-black transition-colors mb-3"
                                    >
                                        Ürünü İncele
                                    </Link>
                                    <button
                                        onClick={() => { setStep(1); setAnswers([]); }}
                                        className="text-xs font-bold text-charcoal/40 hover:text-charcoal uppercase tracking-wider"
                                    >
                                        Tekrar Başla
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Icon helper
function X({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
}
