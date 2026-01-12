
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import NotFoundContent from '@/components/not-found-content';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <NotFoundContent />
            <Footer />
        </main>
    );
}
