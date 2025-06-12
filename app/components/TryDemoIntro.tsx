'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TryDemoIntro() {
  return (
    <section className="relative bg-gradient-to-br from-[#0B0814] via-[#1e004b] to-[#0B0814] text-white py-28 px-6 md:px-10 border-t border-[#1a1a1a] overflow-hidden">
      {/* Animated glowing abstract background blob */}
      <motion.div
        className="absolute w-[520px] h-[520px] bg-gradient-to-br from-[#6A00FF]/30 via-[#C2886D]/25 to-[#43009C]/15 blur-[120px] rounded-full -top-36 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-5 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl"
        >
          Turn Any Idea Into a Scroll-Stopping Video
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Instantly see how QuietlyRich transforms simple prompts into binge-worthy, faceless content—powered by AI voices, viral frameworks, and dynamic previews.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="#try-demo">
            <button className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-extrabold px-12 py-5 rounded-2xl text-xl shadow-xl border border-[#C2886D]/60 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-2xl group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">🎬 Try the Demo Now</span>
              {/* Animated Shine */}
              <span className="absolute left-[-100%] top-0 w-full h-full rounded-2xl opacity-50 group-hover:left-[100%] transition-all duration-700"
                style={{
                  background: 'linear-gradient(120deg, transparent 30%, #fff7f3 50%, transparent 70%)',
                  filter: 'blur(8px)'
                }}
              />
            </button>
          </Link>
          <div className="text-sm mt-3 text-gray-400">
            No signup needed. Instant preview.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
