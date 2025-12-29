'use client';

import { UserProfile } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const DotIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

export default function UserProfilePage() {
    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />
            <div className="pt-32 pb-24 container mx-auto px-6">
                {/* Back Link */}
                <div className="max-w-6xl mx-auto mb-8">
                    <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-charcoal/60 hover:text-charcoal transition-colors">
                        <ArrowLeft size={16} />
                        Profilime Dön
                    </Link>
                </div>

                <div className="flex justify-center">
                    <UserProfile
                        path="/user-profile"
                        routing="path"
                        appearance={{
                            elements: {
                                rootBox: "w-full max-w-5xl",
                                card: "shadow-none border border-black/5 rounded-[2rem] bg-white",
                                navbar: "hidden md:flex border-r border-black/5",
                                navbarButton: "font-bold text-charcoal/60 hover:text-charcoal aria-selected:text-charcoal aria-selected:bg-porcelain",
                                headerTitle: "font-black text-2xl tracking-tighter text-charcoal",
                                headerSubtitle: "font-medium text-charcoal/40",
                                formButtonPrimary: "bg-charcoal hover:bg-black text-white font-bold uppercase tracking-widest text-xs py-4",
                                formButtonReset: "text-charcoal/60 hover:text-charcoal font-bold",
                                identityPreviewText: "font-bold text-charcoal",
                                identityPreviewEditButton: "text-clay font-bold",
                            }
                        }}
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
}
