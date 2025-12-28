import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
                <span className="text-[200px] leading-none font-black text-charcoal/5 select-none -mb-16">404</span>
                <h2 className="text-4xl font-bold text-charcoal mb-4 relative z-10">Sayfa Bulunamadı</h2>
                <p className="text-charcoal/60 max-w-md mb-8 relative z-10">
                    Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
                </p>
                <Link
                    href="/"
                    className="relative z-10 bg-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-clay transition-all hover:scale-105 shadow-xl shadow-clay/20"
                >
                    Anasayfaya Dön
                </Link>
            </div>
            <Footer />
        </main>
    );
}
