import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  safelist: [
    'fantasy-mode',
    'fantasy-mode h1',
    'fantasy-mode h2',
    'fantasy-mode h3',
    'fantasy-mode h4',
    'fantasy-mode .bg-black',
    'fantasy-mode .text-white',
    'fantasy-mode .text-[#C2886D]',
    'fantasy-mode .bg-[#111]',
    'fantasy-mode .border-[#2a2a2a]',
    'fantasy-mode .border-[#C2886D]',
    'fantasy-mode .glow-text',
    'fantasy-mode .animate-pulse',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        spin: "spin 1s linear infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config; 