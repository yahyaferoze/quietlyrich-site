'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrustBar: React.FC = () => {
  return (
    <motion.div
      className="w-full bg-gradient-to-r from-[#181028] via-[#221537] to-[#181028] py-4 px-4 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 shadow-inner text-sm font-medium border-b border-[#291d45] relative z-10"
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Left side: Stats & rating */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[#F6C244] text-lg">★</span>
          <span className="text-[#C2886D]">Trusted by</span>
          <span className="font-bold text-white text-lg md:text-xl">10,000+</span>
          <span className="text-[#C2886D]">creators</span>
        </div>
        <div className="flex items-center text-[#F6C244]">
          <span className="text-lg md:text-xl mr-1">★★★★★</span>
          <span className="text-xs text-gray-300">Rated 4.9/5</span>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block h-5 w-px bg-[#291d45]" />

      {/* Right side: “As seen on” logos */}
      <div className="flex items-center gap-3 md:gap-5">
        <span className="text-white/60 text-xs md:text-sm">As seen on</span>
        {[
          { src: '/tiktok-logo.svg', alt: 'TikTok' },
          { src: '/reddit-logo.svg', alt: 'Reddit' },
          { src: '/youtube-logo.svg', alt: 'YouTube' },
        ].map((logo, i) => (
          <motion.img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="w-6 h-6 md:w-7 md:h-7 opacity-85 hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TrustBar;