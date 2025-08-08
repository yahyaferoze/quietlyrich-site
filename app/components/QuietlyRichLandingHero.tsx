'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import FantasyToggle from './FantasyToggle';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (val: boolean) => void;
};

export default function QuietlyRichLandingHero({ fantasyMode }: Props) {
  const [heroVisible, setHeroVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { margin: '-20% 0px -20% 0px', amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const containerVariants = { visible: { transition: { staggerChildren: 0.14 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  };

  // Dynamic colors based on mode
  const bgTop = fantasyMode
    ? 'from-purple-500/35 via-pink-500/25 to-yellow-300/15'
    : 'from-[#6A00FF]/25 via-[#43009C]/32 to-[#C2886D]/16';

  const bgBottom = fantasyMode
    ? 'from-yellow-300/25 via-transparent to-pink-500/12'
    : 'from-[#C2886D]/24 via-transparent to-[#6A00FF]/12';

  const logoGradient = fantasyMode
    ? 'from-pink-300 via-yellow-200 to-purple-400'
    : 'from-white via-[#C2886D] to-[#6A00FF]';

  const headlineGradient = fantasyMode
    ? 'from-yellow-200 via-pink-300 to-purple-400'
    : 'from-[#C2886D] via-[#6A00FF] to-white';

  // Background animation params (paused if off-screen or reduced motion)
  const bgAnimate = prefersReducedMotion || !inView ? { scale: 1 } : { scale: [1, 1.04, 1] };
  const bgAnimate2 = prefersReducedMotion || !inView ? { scale: 1 } : { scale: [1, 1.02, 1] };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-6 pt-28 pb-28 md:pt-40 md:pb-44 bg-[#0B0814] text-white min-h-[92vh] flex items-center justify-center"
      aria-label="QuietlyRich hero section"
    >
      {/* Animated Backgrounds (GPU-friendly) */}
      <motion.div
        className={`absolute w-[800px] h-[800px] bg-gradient-to-br ${bgTop}
                    blur-[140px] rounded-full -top-56 -left-64 z-0 pointer-events-none will-change-transform`}
        style={{ transform: 'translateZ(0)' }}
        animate={bgAnimate}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' as const }}
      />
      <motion.div
        className={`absolute w-[520px] h-[520px] bg-gradient-to-tr ${bgBottom}
                    blur-[120px] rounded-full -bottom-24 -right-28 z-0 pointer-events-none will-change-transform`}
        style={{ transform: 'translateZ(0)' }}
        animate={bgAnimate2}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' as const }}
      />

      {/* Fantasy Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
        <FantasyToggle />
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={heroVisible ? 'visible' : 'hidden'}
      >
        {/* Brand Logo */}
        <motion.div variants={fadeUp} className="mb-6 will-change-transform">
          <span
            className={`inline-block bg-gradient-to-tr ${logoGradient}
                        bg-clip-text text-transparent text-[52px] sm:text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-xl select-none`}
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}
          >
            Quietly<span className="font-serif text-[#C2886D]">Rich</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[30px] sm:text-5xl md:text-6xl font-serif font-bold mb-5 leading-tight drop-shadow-2xl will-change-transform"
        >
          Launch a Faceless Brand <br className="hidden md:inline" />
          <span className={`bg-gradient-to-r ${headlineGradient} bg-clip-text text-transparent font-serif font-extrabold`}>
            People Actually Watch
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="backdrop-blur-md bg-white/10 border border-[#C2886D]/20 text-gray-200 text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 rounded-2xl shadow-lg px-6 py-4 will-change-transform"
        >
          <span className="font-medium">
            AI scripts it. Voices it. Previews it. <span className="text-[#C2886D]">You post it.</span> No editing. No burnout.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6 will-change-transform"
        >
          <Link
            href="#try-demo"
            aria-label="Try the demo for free"
            className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-8 sm:px-10 py-4 rounded-2xl shadow-2xl text-lg border border-[#C2886D]/60 backdrop-blur-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2886D]"
            style={{ boxShadow: '0 0 40px 0 #C2886D44' }}
          >
            <span className="relative z-10">Try It Free</span>
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700"
              style={{
                background: 'linear-gradient(120deg, transparent 20%, #fff7f3 50%, transparent 80%)',
                filter: 'blur(8px)',
                animation: 'shine 1.3s linear',
              }}
            />
          </Link>
          <Link
            href="#pricing"
            className="text-white/85 hover:text-white underline-offset-4 hover:underline text-base tracking-wide font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2886D] px-2 py-1 rounded"
            aria-label="View pricing"
          >
            View Pricing →
          </Link>
        </motion.div>

        {/* Micro-proof row (conversion bump) */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/80 mb-8"
          aria-label="Quick proof"
        >
          <span>✅ No editing needed</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>⚡ Preview in seconds</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>🎙 Viral AI voices</span>
        </motion.div>

        {/* Scroll Arrow (hidden for reduced motion) */}
        {!prefersReducedMotion && (
          <motion.div variants={fadeUp} className="flex justify-center items-center mt-2 will-change-transform">
            <span className="animate-bounce text-[#C2886D] text-4xl drop-shadow-2xl select-none">↓</span>
          </motion.div>
        )}
      </motion.div>

      {/* Local keyframes for shine (scoped) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes shine { 
              from { transform: translateX(-50%); } 
              to { transform: translateX(50%); } 
            }
          `,
        }}
      />
    </section>
  );
}