
export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-alabaster rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-charcoal border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-charcoal/40 font-bold tracking-widest text-xs animate-pulse">YÜKLENİYOR</p>
        </div>
    );
}
