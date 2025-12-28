'use client';

import { useState, useEffect } from 'react';

export interface RecentProduct {
    id: string;
    name: string;
    slug: string;
    price: string;
    image: string;
    category: string;
}

const MAX_RECENT_ITEMS = 6;
const STORAGE_KEY = 'tsuko_recent_products';

export function useRecentProducts() {
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);

    useEffect(() => {
        // Load initial
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setRecentProducts(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load recent products');
        }
    }, []);

    const addProduct = (product: RecentProduct) => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            let currentItems: RecentProduct[] = stored ? JSON.parse(stored) : [];

            // Remove if already exists to move it to top
            currentItems = currentItems.filter(p => p.id !== product.id);

            // Add to beginning
            currentItems.unshift(product);

            // Limit size
            if (currentItems.length > MAX_RECENT_ITEMS) {
                currentItems = currentItems.slice(0, MAX_RECENT_ITEMS);
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentItems));
            setRecentProducts(currentItems);
        } catch (e) {
            console.error('Failed to save recent product');
        }
    };

    return { recentProducts, addProduct };
}
