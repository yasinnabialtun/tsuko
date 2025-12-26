import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Eye, ExternalLink, Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useWishlist } from '@/context/wishlist-context';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { hasItem, addItem, removeItem } = useWishlist();
    const isLiked = hasItem(product.id);

    const toggleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLiked) {
            removeItem(product.id);
        } else {
            addItem(product.id);
        }
    };

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const xPos = clientX - rect.left - rect.width / 2;
        const yPos = clientY - rect.top - rect.height / 2;

        x.set(xPos);
        y.set(yPos);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]); // Inverted for natural tilt
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{
                perspective: 1000,
            }}
            className="h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative flex flex-col h-full bg-white border border-black/5 overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F0F0F0]">
                    <motion.div
                        style={{ translateZ: 20 }}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 4} // Load first 4 images immediately
                        />
                    </motion.div>

                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />


                    <button
                        onClick={toggleLike}
                        className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white transition-all group/heart"
                    >
                        <Heart
                            size={20}
                            className={cn(
                                "transition-colors",
                                isLiked ? "fill-rose text-rose" : "text-charcoal/60 group-hover/heart:text-rose"
                            )}
                        />
                    </button>

                    {/* Overlay buttons - Floating effect */}
                    <motion.div
                        style={{ translateZ: 60 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <Link
                            href={`/product/${product.id}`}
                            className="flex items-center gap-2 bg-white text-charcoal px-8 py-4 rounded-full font-bold tracking-wide hover:bg-alabaster transition-transform hover:scale-105 shadow-2xl"
                        >
                            <Eye size={18} />
                            İncele
                        </Link>
                    </motion.div>

                    {/* Category Badge */}
                    <motion.div
                        style={{ translateZ: 40 }}
                        className="absolute top-6 left-6"
                    >
                        <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-charcoal/60">
                            {product.category}
                        </span>
                    </motion.div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-white z-20">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-charcoal">{product.name}</h3>
                        <p className="text-xl font-medium text-charcoal/60">{product.price}</p>
                    </div>
                    <p className="text-charcoal/50 text-sm leading-relaxed mb-6">
                        {product.description}
                    </p>

                    {/* Mobile-only CTA */}
                    <div className="lg:hidden mt-auto">
                        <Link
                            href={`/product/${product.id}`}
                            className="w-full flex items-center justify-center gap-2 bg-charcoal/5 text-charcoal border border-charcoal/10 px-4 py-3 rounded-xl font-medium"
                        >
                            İncele
                            {/* <ExternalLink size={16} /> */}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
