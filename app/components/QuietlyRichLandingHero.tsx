'use client';

import React from 'react';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (v: boolean) => void;
};

export default function QuietlyRichLandingHero({ fantasyMode, setFantasyMode }: Props) {
  return (
    <section
      id="hero"
      className="relative h-screen bg-gradient-to-b from-black via-[#140032] to-[#6A00FF]/40 text-white flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background glows */}
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/20 rounded-full blur-[180px] -top-24 -left-24 z-0" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/20 rounded-full blur-[140px] -bottom-20 -right-20 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-28 md:pt-0">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-6">
            Build <span className="text-[#C2886D]">{fantasyMode ? 'Viral Dreams' : 'Faceless Fame'}</span><br />
            Without Ever Showing Your Face.
          </h1>
          <p className="text-lg text-gray-300 max-w-md leading-relaxed mx-auto md:mx-0 mb-8">
            {fantasyMode
              ? 'Fantasy Mode: Animate the impossible. Fake podcasts, parody memes, viral skits—no camera, no rules.'
              : 'QuietlyRich creates scroll-stopping videos with zero camera, zero editing, and zero burnout. AI-powered, faceless, and freakishly viral.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <a
              href="#try-demo"
              className="bg-[#C2886D] text-white px-6 py-3 rounded-full font-medium text-sm shadow-md hover:scale-105 transition"
            >
              Start Free
            </a>
            <button className="border border-gray-500 text-gray-300 px-6 py-3 rounded-full hover:border-white hover:text-white transition text-sm">
              Watch Demo
            </button>
            <div className="flex items-center space-x-2 ml-4">
              <label htmlFor="fantasy-toggle" className="text-xs text-gray-400">
                Fantasy Mode
              </label>
              <input
                id="fantasy-toggle"
                type="checkbox"
                className="accent-[#C2886D] scale-125"
                checked={fantasyMode}
                onChange={() => setFantasyMode(!fantasyMode)}
                aria-label="Toggle Fantasy Mode"
              />
            </div>
          </div>
        </div>

        {/* Hero Video */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source
                src={fantasyMode ? '/fantasy-preview-clip.mp4' : '/quietlyrich-homepage-clip-1.mp4'}
                type="video/mp4"
              />
              Sorry, your browser doesn’t support embedded videos.
            </video>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-white text-sm opacity-80">
        ↓ Scroll to see how it works
      </div>
    </section>
  );
}
