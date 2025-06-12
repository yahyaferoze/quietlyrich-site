'use client';

import React from 'react';
import Link from 'next/link';
import FantasyToggle from './FantasyToggle'; // already uses context
import { motion } from 'framer-motion';

export default function QuietlyRichLandingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-28 md:pt-44 md:pb-40 bg-black text-white min-h-[90vh] flex items-center">
      {/* Animated Glowing background swirls */}
      <motion.div
        className="absolute w-[900px] h-[900px] bg-gradient-to-tr from-[#6A00FF]/30 via-[#43009c]/40 to-[#C2886D]/20 blur-[210px] rounded-full -top-48 -left-64 z-0 pointer-events-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[520px] h-[520px] bg-[#C2886D]/30 blur-[180px] rounded-full -bottom-20 -right-24 z-0 pointer-events-none"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Fantasy Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
        <FantasyToggle />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        {/* Brand Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
        >
          <span className="inline-block bg-gradient-to-tr from-[#fff] via-[#C2886D] to-[#6A00FF] bg-clip-text text-transparent text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-xl select-none"
            style={{ letterSpacing: "0.04em", fontFamily: "serif" }}
          >
            Quietly<span className="font-serif text-[#C2886D]">Rich</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight glow-text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Launch a Faceless Brand <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-[#fff] bg-clip-text text-transparent">People Actually Watch</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          <span className="backdrop-blur px-2 py-0.5 rounded-lg bg-white/5 border border-[#C2886D]/20 shadow-inner">
            AI scripts it. Voices it. Previews it. You post it. No editing. No burnout.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <Link
            href="#try-demo"
            className="bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-8 py-4 rounded-2xl shadow-xl text-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 border border-[#C2886D]/60 backdrop-blur glow-text"
            style={{ boxShadow: '0 0 32px 0 #C2886D44' }}
          >
            Try It Free
          </Link>
          <Link
            href="#pricing"
            className="text-white/80 hover:underline text-base tracking-wide font-medium"
          >
            View Pricing →
          </Link>
        </motion.div>

        {/* Animated scroll arrow */}
        <motion.div
          className="flex justify-center items-center mt-2"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <span className="animate-bounce text-[#C2886D] text-3xl drop-shadow-2xl select-none">↓</span>
        </motion.div>
      </div>
    </section>
  );
}