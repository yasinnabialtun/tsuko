
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-charcoal/60 mb-6 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide">
            <Link href="/" className="hover:text-charcoal transition-colors flex items-center gap-1 opacity-60 hover:opacity-100">
                <Home size={14} />
                <span className="sr-only">Ana Sayfa</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight size={14} className="text-gray-300" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-charcoal transition-colors font-medium hover:underline decoration-clay underline-offset-4">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-charcoal font-bold line-clamp-1 max-w-[200px]">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
