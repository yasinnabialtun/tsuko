'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, ImageIcon, Check } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
    value: string[];
    onChange: (urls: string[]) => void;
    bucket?: string;
    maxFiles?: number;
    label?: string;
}

export default function ImageUploader({
    value = [],
    onChange,
    bucket = 'products',
    maxFiles = 5,
    label = 'Görseller'
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        setError('');

        const newUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            if (value.length + newUrls.length >= maxFiles) {
                setError(`Maksimum ${maxFiles} görsel yükleyebilirsiniz.`);
                break;
            }

            const file = files[i];

            // Validate file
            if (!file.type.startsWith('image/')) {
                setError('Sadece görsel dosyaları yükleyebilirsiniz.');
                continue;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('Dosya boyutu maksimum 5MB olabilir.');
                continue;
            }

            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('bucket', bucket);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok && data.url) {
                    newUrls.push(data.url);
                } else {
                    setError(data.error || 'Yükleme başarısız.');
                }
            } catch (err) {
                setError('Yükleme sırasında hata oluştu.');
            }
        }

        if (newUrls.length > 0) {
            onChange([...value, ...newUrls]);
        }

        setUploading(false);
    };

    const handleRemove = (index: number) => {
        const newValue = value.filter((_, i) => i !== index);
        onChange(newValue);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleUpload(e.dataTransfer.files);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700">{label}</label>

            {/* Current Images */}
            {value.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                    {value.map((url, index) => (
                        <div key={index} className="relative aspect-square group">
                            <div className="absolute inset-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                <Image
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                            >
                                <X size={14} />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-clay text-white text-[10px] font-bold rounded-full">
                                    Ana
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            {value.length < maxFiles && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                        ${dragOver
                            ? 'border-clay bg-clay/5'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                        ${uploading ? 'pointer-events-none opacity-50' : ''}
                    `}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleUpload(e.target.files)}
                        className="hidden"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 size={32} className="text-clay animate-spin" />
                            <p className="text-sm text-gray-600">Yükleniyor...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <Upload size={24} className="text-gray-400" />
                            </div>
                            <div>
                                <p className="font-medium text-charcoal">Görsel Yükle</p>
                                <p className="text-sm text-gray-500">
                                    veya sürükle bırak • Max 5MB • JPG, PNG, WebP
                                </p>
                            </div>
                            <p className="text-xs text-gray-400">
                                {value.length}/{maxFiles} görsel
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                    <X size={14} />
                    {error}
                </p>
            )}

            {/* URL Input Fallback */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="veya URL yapıştır..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-clay outline-none"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const url = input.value.trim();
                            if (url && value.length < maxFiles) {
                                onChange([...value, url]);
                                input.value = '';
                            }
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={() => {
                        const input = document.querySelector('input[placeholder="veya URL yapıştır..."]') as HTMLInputElement;
                        const url = input?.value.trim();
                        if (url && value.length < maxFiles) {
                            onChange([...value, url]);
                            input.value = '';
                        }
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    Ekle
                </button>
            </div>
        </div>
    );
}
