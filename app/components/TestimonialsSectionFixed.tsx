'use client';

import React from 'react';

const testimonials = [
  {
    name: "Jay N.",
    role: "Anonymous TikTok Creator",
    quote: "I hit 100K followers in 3 weeks using AI scripts — never showed my face once.",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Zara Patel",
    role: "Digital Ghostwriter",
    quote: "I batch 7 videos in 40 minutes now. QuietlyRich made me consistent without effort.",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Ali R.",
    role: "Voice-Only YouTuber",
    quote: "QuietlyRich writes, voices, and previews everything. I just publish and grow.",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    name: "Sophia Kim",
    role: "Faceless Brand Coach",
    quote: "My clients love it. They no longer need to hire editors or writers to scale.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-black text-white py-36 px-6 relative overflow-hidden"
    >
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[160px] rounded-full -top-32 -left-20 z-0" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[140px] rounded-full -bottom-20 right-0 z-0" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
          Loved by Faceless Creators
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
          Hear how QuietlyRich powers growth behind the scenes — without burnout.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#111] border border-[#2a2a2a] rounded-2xl px-8 py-10 shadow-lg text-left group hover:shadow-[#C2886D]/20 transition"
            >
              <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-[#C2886D] object-cover"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}