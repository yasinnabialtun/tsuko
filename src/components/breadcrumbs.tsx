'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs({
    items
}: {
    items?: { label: string; href: string }[]
}) {
    const pathname = usePathname();

    // Auto-generate if no items provided (simple logic)
    const paths = items || pathname.split('/').filter(Boolean).map((segment, index, arr) => {
        const href = `/${arr.slice(0, index + 1).join('/')}`;
        // Basic capitalization
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        return { label, href };
    });

    // Don't show on home page
    if (pathname === '/') return null;

    return (
        <nav className="flex items-center text-sm text-charcoal/40 font-medium overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide">
            <Link href="/" className="flex items-center hover:text-charcoal transition-colors">
                <Home size={14} className="mr-1" />
                Ana Sayfa
            </Link>

            {paths.map((item, index) => {
                const isLast = index === paths.length - 1;
                return (
                    <div key={item.href} className="flex items-center">
                        <ChevronRight size={14} className="mx-2 text-charcoal/20" />
                        {isLast ? (
                            <span className="text-charcoal font-bold pointer-events-none">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className="hover:text-charcoal transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
