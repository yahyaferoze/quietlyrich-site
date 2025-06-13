'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrustBar: React.FC = () => {
  return (
    <motion.div
      className="w-full bg-gradient-to-r from-[#181028] via-[#221537] to-[#181028] py-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5 shadow-inner text-sm font-medium text-[#C2886D] border-b border-[#291d45] relative z-10"
      initial={{ opacity: 0, y: -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <span className="text-center flex items-center gap-2">
        <span className="hidden md:inline">★</span>
        Trusted by <span className="font-bold text-white">10,000+</span> creators
        <span className="hidden md:inline">|</span>
        <span className="ml-2 flex items-center text-[#F6C244]">
          <span className="text-base mr-1">★★★★★</span>
          <span className="text-xs text-gray-300 ml-1">Rated 4.9/5</span>
        </span>
      </span>
      <span className="hidden md:inline">|</span>
      <span className="flex gap-4 items-center mt-1 md:mt-0">
        <span className="text-white/60">As seen on</span>
        <img
          src="/tiktok-logo.svg"
          alt="TikTok"
          className="w-7 h-7 opacity-85 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/reddit-logo.svg"
          alt="Reddit"
          className="w-7 h-7 opacity-85 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/youtube-logo.svg"
          alt="YouTube"
          className="w-7 h-7 opacity-85 hover:opacity-100 transition-opacity duration-300"
        />
      </span>
    </motion.div>
  );
};

export default TrustBar;

