'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Faceless Finance Guy',
    quote: "I used QuietlyRich to automate 20 TikToks a month. Now I’ve got leads coming in daily without recording anything.",
    platform: 'TikTok – 120K Followers',
    avatar: '/assets/assets/avatar1.jpg',
  },
  {
    name: 'Anonymous Fitness Coach',
    quote: "Honestly, this saved me. I was stuck on editing and voiceovers. QuietlyRich made it so fast I batch content weekly now.",
    platform: 'Instagram Reels – 80K Followers',
    avatar: '/assets/assets/avatar2.jpg',
  },
  {
    name: 'Hidden Movie Reviewer',
    quote: "From script to AI voice to preview—this tool made faceless content possible without burning out.",
    platform: 'YouTube Shorts – 60K Subscribers',
    avatar: '/assets/assets/avatar 3.jpg',
  },
  {
    name: 'AI Niche Creator',
    quote: "I’ve built an entire faceless brand without ever speaking on camera. QuietlyRich is a weapon.",
    platform: 'TikTok – 200K Followers',
    avatar: '/assets/assets/avatar4.jpg',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0B0814] via-[#1e004b] to-[#0B0814] py-28 px-6 border-t border-[#2a2a2a] overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute w-[520px] h-[520px] bg-gradient-to-br from-[#6A00FF]/25 via-[#C2886D]/15 to-[#43009C]/12 blur-[120px] rounded-full -top-36 -left-36 z-0 pointer-events-none"
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Trusted by Faceless Creators
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative bg-white/10 backdrop-blur-lg border border-[#C2886D]/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(106,0,255,0.10)] hover:shadow-[0_12px_48px_0_rgba(106,0,255,0.16)] transition group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* Subtle animated glow for highlighted cards */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0.33, scale: 0.97 }}
                animate={{ opacity: [0.33, 0.49, 0.33], scale: [0.97, 1, 0.97] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3.5 + i * 0.7,
                  delay: i * 0.21,
                  ease: "easeInOut",
                }}
                style={{
                  background: "radial-gradient(circle, rgba(106,0,255,0.11) 60%, rgba(194,136,109,0.07) 100%)",
                  filter: "blur(16px)",
                  zIndex: 0,
                }}
              />
              <div className="flex items-center gap-4 mb-6 z-10 relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-white p-1 shadow-xl flex items-center justify-center">
                  <img
                    src={t.avatar}
                    alt={`${t.name} avatar`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">{t.name}</div>
                  <div className="text-xs md:text-sm text-[#C2886D]">{t.platform}</div>
                </div>
              </div>
              <blockquote className="text-lg italic text-white/90 z-10 relative font-serif mb-2">
                <span className="text-[#C2886D] text-3xl font-bold mr-2">“</span>
                {t.quote}
                <span className="text-[#C2886D] text-3xl font-bold ml-2">”</span>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}