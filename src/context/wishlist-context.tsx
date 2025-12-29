'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface WishlistContextType {
    items: string[];
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<string[]>([]);
    const { user, isSignedIn, isLoaded } = useUser();

    // Load initial data
    useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn) {
            // Logged in: Fetch from API
            fetch('/api/wishlist')
                .then(res => res.json())
                .then(data => {
                    if (data.items) {
                        setItems(data.items.map((i: any) => i.product.id));
                    }
                })
                .catch(err => console.error(err));
        } else {
            // Guest: Load from Local Storage
            const stored = localStorage.getItem('tsuko-wishlist');
            if (stored) {
                setItems(JSON.parse(stored));
            }
        }
    }, [isLoaded, isSignedIn]);

    // Save to local storage only if guest (or backup)
    useEffect(() => {
        if (!isSignedIn) {
            localStorage.setItem('tsuko-wishlist', JSON.stringify(items));
        }
    }, [items, isSignedIn]);

    const addToWishlist = async (id: string) => {
        // Optimistic update
        if (!items.includes(id)) {
            setItems(prev => [...prev, id]);
        }

        if (isSignedIn) {
            try {
                await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: id })
                });
            } catch (error) {
                console.error('Failed to add to wishlist', error);
                // Revert if needed, but keeping it simple for now
            }
        }
    };

    const removeFromWishlist = async (id: string) => {
        setItems(prev => prev.filter((i) => i !== id));

        if (isSignedIn) {
            try {
                await fetch(`/api/wishlist?productId=${id}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Failed to remove from wishlist', error);
            }
        }
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
