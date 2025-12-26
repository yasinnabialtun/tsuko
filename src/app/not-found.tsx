import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-alabaster text-charcoal px-6 text-center">
            <h1 className="text-9xl font-black text-clay opacity-20 select-none">404</h1>
            <h2 className="text-4xl font-bold -mt-12 mb-4">Bu Obje Henüz Tasarlanmadı.</h2>
            <p className="text-charcoal/60 max-w-md mb-8">
                Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. Tıpkı hatalı bir 3D baskı gibi...
            </p>
            <Link
                href="/"
                className="bg-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-black transition-colors"
            >
                Ana Sayfaya Dön
            </Link>
        </div>
    );
}
