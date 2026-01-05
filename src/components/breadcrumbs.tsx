'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/40 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 no-scrollbar">
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-[var(--color-purple)] transition-colors"
                title="Ana Sayfa"
            >
                <Home size={14} strokeWidth={2.5} />
                <span>TSUKO</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight size={12} strokeWidth={3} className="text-black/20" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-[var(--color-purple)] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-black">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
