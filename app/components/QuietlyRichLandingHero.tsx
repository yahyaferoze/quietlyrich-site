'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FantasyToggle from './FantasyToggle';
import { motion } from 'framer-motion';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (val: boolean) => void;
};

export default function QuietlyRichLandingHero({ fantasyMode, setFantasyMode }: Props) {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut' as const, // TypeScript-safe
      },
    },
  };

  // Dynamic colors based on mode
  const bgTop = fantasyMode
    ? 'from-purple-500/40 via-pink-500/30 to-yellow-300/20'
    : 'from-[#6A00FF]/30 via-[#43009C]/40 to-[#C2886D]/20';

  const bgBottom = fantasyMode
    ? 'from-yellow-300/30 via-transparent to-pink-500/15'
    : 'from-[#C2886D]/30 via-transparent to-[#6A00FF]/15';

  const logoGradient = fantasyMode
    ? 'from-pink-300 via-yellow-200 to-purple-400'
    : 'from-[#fff] via-[#C2886D] to-[#6A00FF]';

  const headlineGradient = fantasyMode
    ? 'from-yellow-200 via-pink-300 to-purple-400'
    : 'from-[#C2886D] via-[#6A00FF] to-[#fff]';

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-32 md:pt-44 md:pb-48 bg-[#0B0814] text-white min-h-[95vh] flex items-center justify-center">
      {/* Animated Backgrounds */}
      <motion.div
        className={`absolute w-[1000px] h-[1000px] bg-gradient-to-br ${bgTop} blur-[180px] rounded-full -top-56 -left-64 z-0 pointer-events-none will-change-transform`}
        style={{ transform: 'translateZ(0)' }}
        animate={{ scale: [1, fantasyMode ? 1.08 : 1.05, 1] }}
        transition={{
          repeat: Infinity,
          duration: fantasyMode ? 10 : 14,
          ease: 'easeInOut' as const,
        }}
      />
      <motion.div
        className={`absolute w-[600px] h-[600px] bg-gradient-to-tr ${bgBottom} blur-[150px] rounded-full -bottom-20 -right-32 z-0 pointer-events-none will-change-transform`}
        style={{ transform: 'translateZ(0)' }}
        animate={{ scale: [1, fantasyMode ? 1.05 : 1.03, 1] }}
        transition={{
          repeat: Infinity,
          duration: fantasyMode ? 8 : 10,
          ease: 'easeInOut' as const,
        }}
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
        <motion.div variants={fadeUp} className="mb-8 will-change-transform">
          <span
            className={`inline-block bg-gradient-to-tr ${logoGradient} bg-clip-text text-transparent text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-xl select-none`}
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.04em' }}
          >
            Quietly<span className="font-serif text-[#C2886D]">Rich</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-2xl will-change-transform"
        >
          Launch a Faceless Brand <br className="hidden md:inline" />
          <span className={`bg-gradient-to-r ${headlineGradient} bg-clip-text text-transparent font-serif font-extrabold`}>
            People Actually Watch
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="backdrop-blur-md bg-white/10 border border-[#C2886D]/20 text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-14 rounded-2xl shadow-lg px-6 py-4 will-change-transform"
        >
          <span className="font-medium">
            AI scripts it. Voices it. Previews it.{' '}
            <span className="text-[#C2886D]">You post it.</span> No editing. No burnout.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10 will-change-transform"
        >
          <Link
            href="#try-demo"
            className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-10 py-4 rounded-2xl shadow-2xl text-lg border border-[#C2886D]/60 backdrop-blur-lg transition-all duration-200 hover:scale-105 group"
            style={{ boxShadow: '0 0 40px 0 #C2886D44' }}
          >
            <span className="relative z-10">Try It Free</span>
            <span
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
            className="text-white/80 hover:underline text-base tracking-wide font-medium"
          >
            View Pricing →
          </Link>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div variants={fadeUp} className="flex justify-center items-center mt-4 will-change-transform">
          <span className="animate-bounce text-[#C2886D] text-4xl drop-shadow-2xl select-none glow-text">
            ↓
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}