'use client';

import React from 'react';
import Link from 'next/link';
import FantasyToggle from './FantasyToggle'; // already uses context

export default function QuietlyRichLandingHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-32 bg-black text-white">
      {/* Glowing background shapes */}
      <div className="absolute w-[700px] h-[700px] bg-[#6A00FF]/20 blur-[200px] rounded-full -top-40 -left-40 z-0 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#C2886D]/20 blur-[160px] rounded-full -bottom-20 -right-20 z-0 pointer-events-none" />

      {/* Fantasy Toggle */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20">
        <FantasyToggle />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight glow-text">
          Launch a Faceless Brand<br />People Actually Watch
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          AI scripts it. Voices it. Previews it. You post it. No editing. No burnout.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#try-demo"
            className="bg-[#C2886D] hover:bg-[#b3745b] text-black font-semibold px-6 py-3 rounded-xl transition shadow-md"
          >
            Try It Free
          </Link>
          <Link
            href="#pricing"
            className="text-white hover:underline text-sm"
          >
            View Pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
