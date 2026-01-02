import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getCategoryTheme(categoryName?: string): string {
    const name = categoryName?.toLowerCase() || '';

    if (name.includes('aydınlatma') || name.includes('ışık') || name.includes('lighting')) {
        return 'theme-lighting';
    }

    if (name.includes('çiçek') || name.includes('everforms') || name.includes('still bloom') || name.includes('flora')) {
        return 'theme-flowers';
    }

    if (name.includes('obje') || name.includes('sculpture') || name.includes('tasarım')) {
        return 'theme-objects';
    }

    return ''; // Standard theme
}
