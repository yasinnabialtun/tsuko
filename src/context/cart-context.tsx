'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
    id: string; // Product ID
    name: string;
    slug: string;
    price: number;
    image: string;
    quantity: number;
    maxStock: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Initialize from LocalStorage
    useEffect(() => {
        setIsClient(true);
        const storedItems = localStorage.getItem('tsuko_cart');
        if (storedItems) {
            try {
                setItems(JSON.parse(storedItems));
            } catch (e) {
                console.error('Failed to parse cart items');
            }
        }
    }, []);

    // Persist to LocalStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('tsuko_cart', JSON.stringify(items));
        }
    }, [items, isClient]);

    const addToCart = (product: any, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // Check stock
                const newQuantity = Math.min(existing.quantity + quantity, product.stock);
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: typeof product.price === 'string' ? parseFloat(product.price) : product.priceNumber || 0,
                image: product.images?.[0] || product.image || '',
                quantity: Math.min(quantity, product.stock),
                maxStock: product.stock
            }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = Math.max(1, Math.min(quantity, item.maxStock));
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
