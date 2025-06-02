'use client';

import React, { useState } from 'react';
import QuietlyRichLandingPage from './components/QuietlyRichLandingPage';

export default function Home() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <>
      <QuietlyRichLandingPage fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />

      {/* --- How It Works Preview --- */}
      <section id="how-it-works" className="py-20 bg-black text-white border-t border-[#222]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#C2886D]">How It Works</h2>
          <p className="text-gray-400 mb-6">
            See how QuietlyRich turns any idea into scroll-stopping, AI-powered content in under 60 seconds.
          </p>
          <a href="/how-it-works">
            <button className="bg-[#C2886D] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3745b] transition">
              🚀 See Full Walkthrough →
            </button>
          </a>
        </div>
      </section>

      {/* --- Try Demo Preview --- */}
      <section id="try-demo" className="py-20 bg-[#111] text-white border-t border-[#333]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#C2886D]">Try the Demo</h2>
          <p className="text-gray-400 mb-6">
            Instantly generate a voiceover and preview video with no signup required. See the magic for yourself.
          </p>
          <a href="/trydemo">
            <button className="bg-[#C2886D] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3745b] transition">
              🎬 Try Full Demo →
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
