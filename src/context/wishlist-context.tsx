'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
    items: string[];
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
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

    const addToWishlist = (id: string) => {
        if (!items.includes(id)) {
            setItems([...items, id]);
        }
    };

    const removeFromWishlist = (id: string) => {
        setItems(items.filter((i) => i !== id));
    };

    const isInWishlist = (id: string) => items.includes(id);

    return (
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
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
