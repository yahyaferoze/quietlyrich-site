'use client';

import React from 'react';
import TryDemo from '../components/TryDemo';

type Props = {
  fantasyMode: boolean;
};

export default function TryDemoSection({ fantasyMode }: Props) {
  return (
    <section id="try-demo" className="bg-black text-white py-16 border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#C2886D] mb-4">
            Try QuietlyRich Right Now
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Experience the power of AI-generated scripts, voices, and vertical videos in real time.
            Build your content funnel in seconds — no sign-up needed.
          </p>
        </div>

        {/* Actual Interactive Demo */}
        <TryDemo fantasyMode={fantasyMode} />
      </div>
    </section>
  );
}
