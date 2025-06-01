'use client';

import React from 'react';

const testimonials = [
  {
    name: 'Faceless Finance Guy',
    quote: "I used QuietlyRich to automate 20 TikToks a month. Now I’ve got leads coming in daily without recording anything.",
    platform: 'TikTok – 120K Followers',
    avatar: '/avatar-1.png',
  },
  {
    name: 'Anonymous Fitness Coach',
    quote: "Honestly, this saved me. I was stuck on editing and voiceovers. QuietlyRich made it so fast I batch content weekly now.",
    platform: 'Instagram Reels – 80K Followers',
    avatar: '/avatar-2.png',
  },
  {
    name: 'Hidden Movie Reviewer',
    quote: "From script to AI voice to preview—this tool made faceless content possible without burning out.",
    platform: 'YouTube Shorts – 60K Subscribers',
    avatar: '/avatar-3.png',
  },
  {
    name: 'AI Niche Creator',
    quote: "I’ve built an entire faceless brand without ever speaking on camera. QuietlyRich is a weapon.",
    platform: 'TikTok – 200K Followers',
    avatar: '/avatar-4.png',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#0b0b0b] border-t border-[#2a2a2a] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-[#C2886D] mb-12">
          Trusted by Faceless Creators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#161616] border border-[#282828] rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={`${t.name} avatar`}
                  className="w-12 h-12 rounded-full border border-[#444]"
                />
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.platform}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 