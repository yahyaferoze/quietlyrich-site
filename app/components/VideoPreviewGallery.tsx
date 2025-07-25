'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const videos = [
  {
    id: 1,
    title: '5 Passive Income Ideas That Work',
    caption: '"Number 3 will change your life..."',
    views: '2.3M',
    category: 'Finance',
    videoSrc: '/passive-income.mp4',
  },
  {
    id: 2,
    title: 'Anime Characters Who Could End Reality',
    caption: '"These powers are actually terrifying..."',
    views: '1.8M',
    category: 'Anime',
    videoSrc: '/anime-reality.mp4',
  },
  {
    id: 3,
    title: 'Gym Mistakes Killing Your Gains',
    caption: '"Stop doing this immediately..."',
    views: '3.1M',
    category: 'Fitness',
    videoSrc: '/gym-mistakes.mp4',
  },
  {
    id: 4,
    title: 'Psychology Tricks That Control Minds',
    caption: '"This works on everyone..."',
    views: '4.2M',
    category: 'Psychology',
    videoSrc: '/psychology-tricks.mp4',
  },
  {
    id: 5,
    title: 'Ancient Mysteries Still Unsolved',
    caption: '"Scientists are baffled..."',
    views: '1.9M',
    category: 'History',
    videoSrc: '/ancient-mysteries.mp4',
  },
];

export default function VideoPreviewGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-gradient-to-br from-[#0B0814] via-[#1e004b] to-[#0B0814] py-24 px-4 overflow-x-hidden">
      {/* Animated glowing abstract background blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#6A00FF]/20 via-[#C2886D]/30 to-[#43009C]/10 blur-[160px] rounded-full top-[-200px] left-[-200px] z-0 pointer-events-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-[#6A00FF]/30 blur-[110px] rounded-full bottom-[-100px] right-[-100px] z-0 pointer-events-none"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Viral Videos Made by <span className="text-[#C2886D]">QuietlyRich</span>
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Real faceless videos going viral right now. Each one created in under 30 seconds.
        </motion.p>

        {/* Snap-scrolling glassy video gallery */}
        <div
          className="flex overflow-x-auto gap-8 hide-scrollbar justify-center px-1 snap-x snap-mandatory pb-4"
          ref={scrollRef}
        >
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              className="min-w-[250px] max-w-[260px] bg-white/10 backdrop-blur-lg border border-[#C2886D]/30 rounded-3xl overflow-hidden flex-shrink-0 shadow-[0_8px_32px_0_rgba(106,0,255,0.17)] relative snap-center transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.13 }}
              viewport={{ once: true }}
            >
              {/* Animated glow behind centered card */}
              <motion.div
                className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
                initial={{ opacity: 0.7, scale: 0.96 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1, 0.96] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3 + i,
                  delay: i * 0.23,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(106,0,255,0.16) 60%, rgba(194,136,109,0.09) 100%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Phone frame effect */}
              <div className="relative w-full h-64 bg-black rounded-b-3xl rounded-t-3xl overflow-hidden z-10">
                <video
                  src={video.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "1.5rem" }}
                />
                {/* Category pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, #6A00FF 0%, #C2886D 100%)",
                    color: "#fff",
                    border: "1px solid #fff3",
                  }}>
                  {video.category}
                </div>
                {/* Views badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-[#C2886D]/30"
                  style={{
                    background:
                      "linear-gradient(90deg, #C2886D 0%, #6A00FF 100%)",
                    color: "#fff",
                  }}>
                  👁 {video.views}
                </div>
              </div>
              <div className="p-4 z-10">
                <h3 className="text-sm font-bold leading-snug mb-1 text-white">{video.title}</h3>
                <p className="text-xs italic text-[#C2886D]">{video.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics: Glassy, premium cards with gradient numbers */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-center text-base sm:text-lg">
          <div className="backdrop-blur bg-white/5 border border-[#C2886D]/30 rounded-xl px-7 py-4 shadow-md">
            <span className="bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent font-bold text-2xl">12M+</span>
            <span className="block text-white mt-1 font-normal text-sm">Total Views</span>
          </div>
          <div className="backdrop-blur bg-white/5 border border-[#6A00FF]/30 rounded-xl px-7 py-4 shadow-md">
            <span className="bg-gradient-to-r from-[#6A00FF] via-[#C2886D] to-white bg-clip-text text-transparent font-bold text-2xl">850K+</span>
            <span className="block text-white mt-1 font-normal text-sm">Videos Created</span>
          </div>
          <div className="backdrop-blur bg-white/5 border border-[#C2886D]/30 rounded-xl px-7 py-4 shadow-md">
            <span className="bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent font-bold text-2xl">25</span>
            <span className="block text-white mt-1 font-normal text-sm">Viral Niches</span>
          </div>
          <div className="backdrop-blur bg-white/5 border border-[#6A00FF]/30 rounded-xl px-7 py-4 shadow-md">
            <span className="bg-gradient-to-r from-[#6A00FF] via-[#C2886D] to-white bg-clip-text text-transparent font-bold text-2xl">4.9/5</span>
            <span className="block text-white mt-1 font-normal text-sm">Creator Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
