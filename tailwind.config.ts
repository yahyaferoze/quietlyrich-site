import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'fantasy-mode',
    'fantasy-mode h1',
    'fantasy-mode h2',
    'fantasy-mode .bg-black',
    'fantasy-mode .text-white',
    'fantasy-mode .text-[#C2886D]',
    'fantasy-mode .bg-[#111]',
    'fantasy-mode .border-[#C2886D]',
    'fantasy-mode .glow-text',
    'fantasy-mode .animate-pulse'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

export default config; 