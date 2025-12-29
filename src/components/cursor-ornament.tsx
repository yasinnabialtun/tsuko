'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CursorOrnament() {
    const [isVisible, setIsVisible] = useState(false);

    // Position of the actual mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoothed position for the shadow
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const shadowX = useSpring(mouseX, springConfig);
    const shadowY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 100); // 100 is half of the ornament size
            mouseY.set(e.clientY - 100);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // Hide on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[99999]"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <motion.div
                className="w-[200px] h-[200px] bg-mauve/10 rounded-full blur-[100px]"
                style={{
                    x: shadowX,
                    y: shadowY,
                }}
            />
        </motion.div>
    );
}
