'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
    items: string[];
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    hasItem: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('tsuko-wishlist');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('tsuko-wishlist', JSON.stringify(items));
    }, [items]);

    const addItem = (id: string) => {
        if (!items.includes(id)) {
            setItems([...items, id]);
        }
    };

    const removeItem = (id: string) => {
        setItems(items.filter((i) => i !== id));
    };

    const hasItem = (id: string) => items.includes(id);

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, hasItem }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
