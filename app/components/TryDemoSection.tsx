'use client';

import React from 'react';
import TryDemo from './TryDemo';
import FantasyToggle from './FantasyToggle';
import { useFantasyMode } from './FantasyModeContext';

export default function TryDemoSection() {
  const { fantasyMode } = useFantasyMode();

  return (
    <section
      id="try-demo"
      className="relative overflow-hidden py-36 px-6 transition-all duration-500"
    >
      {/* Fantasy Glow Backgrounds */}
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[180px] rounded-full -top-32 -left-20 z-0 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D]">
            Try QuietlyRich For Yourself
          </h2>

          {/* Fantasy Mode Toggle */}
          <FantasyToggle />
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Watch AI write, voice, and preview your faceless video — no sign-up needed.
        </p>

        <div className="max-w-4xl mx-auto bg-[#111] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg transition-colors duration-500">
          <TryDemo fantasyMode={fantasyMode} />
        </div>
      </div>
    </section>
  );
}