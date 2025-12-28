import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Loading() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="bg-porcelain pt-40 pb-20 px-6">
                <div className="container mx-auto text-center space-y-4">
                    <div className="h-4 w-24 bg-charcoal/10 rounded-full mx-auto" />
                    <div className="h-12 w-64 bg-charcoal/10 rounded-xl mx-auto" />
                    <div className="h-6 w-96 bg-charcoal/5 rounded-xl mx-auto" />
                </div>
            </div>

            <section className="py-20 px-6">
                <div className="container mx-auto">
                    {/* Filter Tabs Skeleton */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-10 w-32 bg-gray-100 rounded-full" />
                        ))}
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-[4/5] bg-gray-100 rounded-[2rem]" />
                                <div className="space-y-2 flex flex-col items-center">
                                    <div className="h-3 w-16 bg-gray-100 rounded-full" />
                                    <div className="h-6 w-40 bg-gray-100 rounded-xl" />
                                    <div className="h-5 w-20 bg-gray-100 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
