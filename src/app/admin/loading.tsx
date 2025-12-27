
export default function AdminLoading() {
    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-alabaster border-t-charcoal mb-4"></div>
            <p className="text-charcoal/40 text-sm font-medium">Veriler yükleniyor...</p>
        </div>
    );
}
