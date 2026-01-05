'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Product } from '@/types';

export interface CartItem {
    id: string;
    variantId?: string;
    name: string;
    variantName?: string;
    slug: string;
    price: number;
    image: string;
    quantity: number;
    maxStock: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, variant?: ProductVariantInfo) => void;
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
    setIsCartOpen: (open: boolean) => void;
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

    // Derived state
    const cartSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discountAmount = activeCoupon ? activeCoupon.discountAmount : 0;
    const cartTotal = Math.max(0, cartSubtotal - discountAmount);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const addToCart = (product: Product, quantity = 1, variant?: ProductVariantInfo) => {
        setItems(prev => {
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

            toast.success('Sepete eklendi');
            return [...prev, {
                id: product.id,
                variantId: variant?.id,
                name: product.name,
                variantName: variant?.name,
                slug: product.slug,
                price: variant ? variant.price : Number(String(product.price).replace(/[^0-9.-]+/g, "")),
                image: variant?.image || product.images?.[0] || product.image || '',
                quantity: Math.min(quantity, stockLimit),
                maxStock: stockLimit
            }];
        });

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

    const applyCoupon = async (code: string) => {
        try {
            const response = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, cartTotal: cartSubtotal })
            });
            const data = await response.json();
            if (data.valid) {
                setActiveCoupon({ code, discountAmount: data.discountAmount, message: data.message });
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

    // Initialize from LocalStorage
    useEffect(() => {
        setIsClient(true);
        const storedItems = localStorage.getItem('tsuko_cart');
        const storedCoupon = localStorage.getItem('tsuko_coupon');
        if (storedItems) {
            try {
                setItems(JSON.parse(storedItems));
            } catch (e) { }
        }
        if (storedCoupon) {
            try {
                setActiveCoupon(JSON.parse(storedCoupon));
            } catch (e) { }
        }

        // Expose to window immediately on mount
        if (typeof window !== 'undefined') {
            (window as any).cart = {
                items: [],
                addToCart,
                toggleCart,
                setIsCartOpen
            };
        }
    }, []);

    // Keep window.cart synced
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).cart = {
                items,
                addToCart,
                toggleCart,
                setIsCartOpen,
                isCartOpen,
                cartCount,
                cartTotal
            };
        }
    }, [items, isCartOpen, cartCount, cartTotal]);

    // Persist to LocalStorage
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('tsuko_cart', JSON.stringify(items));
            localStorage.setItem('tsuko_coupon', JSON.stringify(activeCoupon));
        }
    }, [items, activeCoupon, isClient]);

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
            removeCoupon,
            setIsCartOpen
        }}>
            <Toaster position="top-right" />
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
