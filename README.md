# Tsuko Design E-Commerce Platform

Tsuko Design is a premium e-commerce platform built for high-end 3D printed home decor. It features a custom "Soft Minimalism & Pastel UX" design language and a robust full-stack architecture.

![Tsuko Design](public/images/hero.png)

## Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Database:** PostgreSQL (via Supabase)
*   **ORM:** Prisma
*   **Styling:** Tailwind CSS v3
*   **Payments:** Shopier Integration
*   **Email:** Resend API
*   **Analytics:** GTM & Facebook Pixel
*   **State Management:** React Context (Cart & Wishlist)

## Key Features

*   🛍️ **Dynamic E-Commerce:** Product catalog, variants, and stock management.
*   💳 **Secure Checkout:** Integrated with Shopier for credit card payments.
*   📦 **Order Management:** Admin dashboard for tracking orders and updating statuses.
*   🎨 **Custom Admin Panel:** Manage products, categories, coupons, and view analytics.
*   💌 **Newsletter:** Automatic subscription and welcome emails.
*   🔍 **SEO Optimized:** Dynamic sitemap, JSON-LD schemas, and meta tags.
*   📱 **Responsive:** Mobile-first design with sticky actions and optimized navigation.

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yasinnabialtun/tsuko.git
    cd tsuko
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file based on `.env.example` (or ask the admin for credentials). Key variables:
    *   `DATABASE_URL`
    *   `SHOPIER_API_KEY`
    *   `RESEND_API_KEY`
    *   `ADMIN_PASSWORD`

4.  **Database Migration:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Admin Access

Access the admin panel at `/admin`.
Default password (if not set in env): `tsuko123`

## Deployment

Deploy on [Vercel](https://vercel.com) for best performance. Ensure all environment variables are properly configured in Vercel project settings.

## License

All rights reserved © 2025 Tsuko Design.
