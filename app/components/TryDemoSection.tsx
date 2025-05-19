'use client';

import React from 'react';
import FantasyToggle from './FantasyToggle';
import TryDemo from './TryDemo';

type TryDemoSectionProps = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

export default function TryDemoSection({ fantasyMode, setFantasyMode }: TryDemoSectionProps) {
  return (
    <section id="try-demo" className="bg-black text-white py-36 px-6 relative overflow-hidden">
      <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed text-center">
        Watch AI write, voice, and preview your faceless video – no sign-up needed.
      </p>

      {/* Fantasy Mode Toggle */}
      <div className="flex justify-center mb-8">
        <FantasyToggle fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
      </div>

      {/* Try Demo */}
      <div className="max-w-4xl mx-auto bg-[#111] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg">
        <TryDemo fantasyMode={fantasyMode} />
      </div>
    </section>
  );
}
