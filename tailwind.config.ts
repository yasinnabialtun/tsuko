import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#FAFAFA",
                foreground: "#1F1F23",
                // Safe Mode: Hardcoded Premium Palette
                porcelain: "#FAFAFA",
                stone: "#E6E3DF",
                mauve: "#C7A4E0",
                charcoal: "#1F1F23",
                clay: "#E07A5F",
                white: "#FFFFFF",
                black: "#000000",
                sage: "#E6E3DF", // Mapped to stone for safety
                rose: "#E07A5F", // Mapped to clay for safety
                softWhite: "#FDFBF7",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Inter', 'sans-serif'], // Fallback
            },
            borderRadius: {
                lg: "1rem",
                md: "0.75rem",
                sm: "0.5rem",
            },
            animation: {
                'reveal': 'reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                reveal: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
