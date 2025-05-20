'use client';

import React from 'react';
import TryDemo from './TryDemo';
import FantasyToggle from './FantasyToggle';

export default function TryDemoSection() {
  // You can still call useFantasyMode() here if you want to use the values in this file,
  // but you no longer need to pass them as props below!
  // const { fantasyMode, setFantasyMode } = useFantasyMode();

  return (
    <section id="try-demo" className="bg-black text-white py-36 px-6 relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[180px] rounded-full -top-32 -left-20 z-0" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
          Try QuietlyRich For Yourself
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Watch AI write, voice, and preview your faceless video — no sign-up needed.
        </p>

        {/* Fantasy Mode Toggle */}
        <div className="flex justify-center mb-8">
          <FantasyToggle />
        </div>

        {/* Try Demo */}
        <div className="max-w-4xl mx-auto bg-[#111] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg">
          <TryDemo />
        </div>
      </div>
    </section>
  );
}