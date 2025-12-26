import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
    items: {
        label: string;
        href: string;
    }[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center text-sm text-charcoal/50 mb-6 font-medium">
            <Link href="/" className="hover:text-charcoal transition-colors flex items-center gap-1">
                <Home size={14} />
            </Link>

            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    <ChevronRight size={14} className="mx-2" />
                    {index === items.length - 1 ? (
                        <span className="text-charcoal font-bold">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-charcoal transition-colors">
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
