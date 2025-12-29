import { SignUp } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-porcelain">
            <Navbar />
            <div className="pt-40 pb-24 flex justify-center items-center">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-charcoal hover:bg-black text-sm uppercase tracking-widest font-bold',
                            card: 'shadow-2xl border border-black/5 rounded-3xl',
                            headerTitle: 'font-black text-2xl tracking-tighter',
                            headerSubtitle: 'text-charcoal/40 font-medium'
                        }
                    }}
                />
            </div>
            <Footer />
        </main>
    );
}
