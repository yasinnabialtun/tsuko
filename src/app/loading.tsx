
export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-6 text-center">

            {/* Minimalist Premium Spinner */}
            <div className="relative w-24 h-24 mb-10">
                {/* Static Ring */}
                <div className="absolute inset-0 border-[0.5px] border-black/5 rounded-full" />

                {/* Spinning Segment */}
                <div className="absolute inset-0 border-t-[1.5px] border-clay rounded-full animate-spin transition-all duration-1000 ease-linear" />

                {/* Inner Logo/Brand Symbol Placehold */}
                <div className="absolute inset-6 bg-porcelain rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-clay rounded-full" />
                </div>
            </div>

            <div className="space-y-6 max-w-xs mx-auto">
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-[10px] font-black tracking-[0.5em] uppercase text-charcoal/80">
                        Tsuko Design
                    </h2>
                    <div className="w-12 h-[1px] bg-clay/30" />
                </div>

                <div className="h-[1px] w-48 bg-black/5 relative overflow-hidden mx-auto">
                    <div className="absolute inset-y-0 left-0 bg-clay w-1/3 animate-[loading_2s_infinite_ease-in-out]" />
                </div>

                <p className="text-[9px] text-charcoal/30 font-bold tracking-[0.2em] uppercase">
                    Modern Estetik Şekilleniyor
                </p>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loading {
                    0% { left: -40%; width: 30%; }
                    50% { left: 40%; width: 60%; }
                    100% { left: 100%; width: 30%; }
                }
            `}} />
        </div>
    );
}
