
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CheckoutContent from './checkout-content';

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-[var(--color-sand)] flex flex-col text-black">
            <Navbar />
            <CheckoutContent />
            <Footer />
        </div>
    );
}
