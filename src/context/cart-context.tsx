'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface CartItem {
    id: string; // Product ID
    variantId?: string; // Variant ID if applicable
    name: string;
    variantName?: string; // Display name for variant (e.g. "Red / Large")
    slug: string;
    price: number;
    image: string;
    quantity: number;
    maxStock: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, quantity?: number, variant?: ProductVariantInfo) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    activeCoupon: AppliedCoupon | null;
    applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
    removeCoupon: () => void;
    cartSubtotal: number;
    discountAmount: number;
}

export interface ProductVariantInfo {
    id: string;
    name: string;
    price: number;
    stock: number;
    image?: string;
}

export interface AppliedCoupon {
    code: string;
    discountAmount: number;
    message: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCoupon, setActiveCoupon] = useState<AppliedCoupon | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Initialize from LocalStorage
    useEffect(() => {
        setIsClient(true);
        const storedItems = localStorage.getItem('tsuko_cart');
        const storedCoupon = localStorage.getItem('tsuko_coupon');
        if (storedItems) {
            try {
                setItems(JSON.parse(storedItems));
            } catch (e) {
                console.error('Failed to parse cart items');
            }
        }
        if (storedCoupon) {
            try {
                setActiveCoupon(JSON.parse(storedCoupon));
            } catch (e) { }
        }
    }, []);

    // Persist to LocalStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('tsuko_cart', JSON.stringify(items));
            localStorage.setItem('tsuko_coupon', JSON.stringify(activeCoupon));
        }
    }, [items, activeCoupon, isClient]);

    const addToCart = (product: any, quantity = 1, variant?: ProductVariantInfo) => {
        setItems(prev => {
            // Check if item exists (match product ID AND variant ID)
            const existing = prev.find(item => item.id === product.id && item.variantId === variant?.id);

            const stockLimit = variant ? variant.stock : product.stock;

            if (existing) {
                const newQuantity = Math.min(existing.quantity + quantity, stockLimit);
                toast.success(`Ürün miktarı güncellendi (${newQuantity} adet)`);
                return prev.map(item =>
                    (item.id === product.id && item.variantId === variant?.id)
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            // New Item
            toast.success('Sepete eklendi');
            return [...prev, {
                id: product.id,
                variantId: variant?.id,
                name: product.name,
                variantName: variant?.name,
                slug: product.slug,
                price: variant ? variant.price : (typeof product.price === 'string' ? parseFloat(product.price) : product.priceNumber || 0),
                image: variant?.image || product.images?.[0] || product.image || '',
                quantity: Math.min(quantity, stockLimit),
                maxStock: stockLimit
            }];
        });

        // Track Activity for Live View
        fetch('/api/track/activity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'CART_ADD',
                productName: product.name,
                city: 'Ziyaretçi' // We could get real city from session but this is a good start
            })
        }).catch(() => { });

        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, variantId?: string) => {
        setItems(prev => prev.filter(item => !(item.id === productId && item.variantId === variantId)));
        toast.error('Ürün sepetten çıkarıldı');
    };

    const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
        setItems(prev => prev.map(item => {
            if (item.id === productId && item.variantId === variantId) {
                const newQuantity = Math.max(1, Math.min(quantity, item.maxStock));
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
        setActiveCoupon(null);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const cartSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Apply Coupon Logic
    const applyCoupon = async (code: string) => {
        try {
            const response = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, cartTotal: cartSubtotal })
            });
            const data = await response.json();

            if (data.valid) {
                setActiveCoupon({
                    code: code,
                    discountAmount: data.discountAmount,
                    message: data.message
                });
                toast.success('Kupon uygulandı! 🎉');
                return { success: true, message: data.message || 'Kupon uygulandı!' };
            } else {
                setActiveCoupon(null);
                toast.error(data.error || 'Geçersiz kupon.');
                return { success: false, message: data.error || 'Geçersiz kupon.' };
            }
        } catch (error) {
            toast.error('Bağlantı hatası.');
            return { success: false, message: 'Bağlantı hatası.' };
        }
    };

    const removeCoupon = () => {
        setActiveCoupon(null);
        toast('Kupon kaldırıldı');
    };

    // Calculate total with active coupon
    const discountAmount = activeCoupon ? activeCoupon.discountAmount : 0;
    const cartTotal = Math.max(0, cartSubtotal - discountAmount);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartSubtotal,
            discountAmount,
            cartCount,
            isCartOpen,
            toggleCart,
            activeCoupon,
            applyCoupon,
            removeCoupon
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
