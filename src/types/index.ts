export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price: number | string;
    stock: number;
    images: string[];
    image?: string; // Single display image
    categoryId?: string;
    category?: { id?: string; name?: string; slug?: string } | string;
    isFeatured?: boolean;
    isActive?: boolean;
    modelUrl?: string | null;
    shopierUrl?: string | null;
    variantName?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartItem extends Product {
    quantity: number;
    image: string; // Used in frontend as a single image
    price: number; // Frontend price is numeric for calculations
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    category: string;
    author: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    date?: string; // Optional formatted date
    seoTitle?: string | null;
    seoDesc?: string | null;
}

export interface SiteSettings {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    instagram: string;
    pinterest: string;
    shopierUrl: string;
    freeShippingThreshold: number;
    maintenanceMode: boolean;
}

export interface OrderItem {
    id: string;
    product: Product;
    productId: string;
    variantId?: string | null;
    quantity: number;
    price: number | string;
}

export interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    trackingNumber?: string | null;
    items: OrderItem[];
    totalAmount: number | string;
    status: string;
    paymentStatus: string;
    createdAt: Date;
}
