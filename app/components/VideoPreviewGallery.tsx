'use client';

import React from 'react';
import { motion } from 'framer-motion';

const videos = [
  {
    title: 'Passive Income Hack 💸',
    src: '/assets/quietlyrich-homepage-clip-1.mp4',
  },
  {
    title: 'Hidden Anime Details 👀',
    src: '/assets/quietlyrich-homepage-clip-2.mp4',
  },
  {
    title: 'AI Body Transformation 💪',
    src: '/assets/quietlyrich-homepage-clip-3.mp4',
  },
  {
    title: 'Productivity Hacks 🚀',
    src: '/assets/quietlyrich-homepage-clip-4.mp4',
  },
  {
    title: 'TikTok Faceless Fitness 🧘',
    src: '/assets/quietlyrich-homepage-clip-5.mp4',
  },
  {
    title: 'Tech in 30 Seconds ⚙️',
    src: '/assets/quietlyrich-homepage-clip-6.mp4',
  },
];

export default function VideoPreviewGallery() {
  return (
    <section className="bg-black py-20 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-[#C2886D] mb-4"
        >
          See QuietlyRich in Action
        </motion.h2>

        <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
          Real faceless videos created with QuietlyRich. These convert, captivate, and cost nothing to make.
        </p>

        <div className="overflow-x-scroll no-scrollbar flex gap-6 pb-2">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="min-w-[240px] max-w-[240px] rounded-xl overflow-hidden shadow-lg shadow-[#C2886D]/10 border border-[#1a1a1a] bg-[#111]"
            >
              <video
                src={video.src}
                playsInline
                muted
                autoPlay
                loop
                className="w-full h-[430px] object-cover"
              />
              <div className="text-sm text-white p-3 font-medium">{video.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
