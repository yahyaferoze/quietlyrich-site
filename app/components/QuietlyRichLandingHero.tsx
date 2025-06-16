'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FantasyToggle from './FantasyToggle';
import { motion } from 'framer-motion';

export default function QuietlyRichLandingHero() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-32 md:pt-44 md:pb-48 bg-[#0B0814] text-white min-h-[95vh] flex items-center justify-center">
      {/* Animated Glowing Abstract Background */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] bg-gradient-to-br from-[#6A00FF]/30 via-[#43009C]/40 to-[#C2886D]/20 blur-[200px] rounded-full -top-56 -left-64 z-0 pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#C2886D]/30 via-[#fff]/0 to-[#6A00FF]/15 blur-[180px] rounded-full -bottom-20 -right-32 z-0 pointer-events-none"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Fantasy Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
        <FantasyToggle />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        {/* Brand Logo */}
        {heroVisible && (
          <motion.div
            className="mb-8 will-change-transform"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
          >
            <span
              className="inline-block bg-gradient-to-tr from-[#fff] via-[#C2886D] to-[#6A00FF] bg-clip-text text-transparent text-7xl md:text-8xl font-extrabold tracking-tight drop-shadow-xl select-none"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.04em' }}
            >
              Quietly<span className="font-serif text-[#C2886D]">Rich</span>
            </span>
          </motion.div>
        )}

        {/* Headline */}
        {heroVisible && (
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-2xl will-change-transform"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Launch a Faceless Brand <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-[#fff] bg-clip-text text-transparent font-serif font-extrabold">People Actually Watch</span>
          </motion.h1>
        )}

        {/* Glassmorphic Tagline */}
        {heroVisible && (
          <motion.p
            className="backdrop-blur-md bg-white/10 border border-[#C2886D]/20 text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-14 rounded-2xl shadow-lg px-6 py-4 will-change-transform"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <span className="font-medium">
              AI scripts it. Voices it. Previews it. <span className="text-[#C2886D]">You post it.</span> No editing. No burnout.
            </span>
          </motion.p>
        )}

        {/* CTAs */}
        {heroVisible && (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10 will-change-transform"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <Link
              href="#try-demo"
              className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-10 py-4 rounded-2xl shadow-2xl text-lg border border-[#C2886D]/60 backdrop-blur-lg transition-all duration-200 hover:scale-105 group"
              style={{ boxShadow: '0 0 40px 0 #C2886D44' }}
            >
              <span className="relative z-10">Try It Free</span>
              <span className="absolute left-0 top-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700"
                style={{
                  background: 'linear-gradient(120deg, transparent 20%, #fff7f3 50%, transparent 80%)',
                  filter: 'blur(8px)',
                  animation: 'shine 1.3s linear'
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
        )}

        {/* Animated Scroll Arrow */}
        {heroVisible && (
          <motion.div
            className="flex justify-center items-center mt-4 will-change-transform"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <span className="animate-bounce text-[#C2886D] text-4xl drop-shadow-2xl select-none glow-text">
              ↓
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
