'use client';

import React, {useEffect, useRef, useState} from 'react';
import TryDemo from '../components/TryDemo';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

export default function TryDemoSection({ fantasyMode, setFantasyMode }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Show a sticky CTA on mobile while the demo section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries[0].isIntersecting;
        // Show only when in view (and only on small screens via CSS)
        setShowStickyCTA(inView);
      },
      {
        root: null,
        threshold: 0.25,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dynamic backgrounds for Fantasy Mode
  const bgBase =
    'relative overflow-hidden text-white py-16 border-t border-[#222] will-change-transform';
  const bgNormal =
    'bg-gradient-to-b from-black via-[#0b0814] to-black';
  const bgFantasy =
    'bg-gradient-to-b from-[#1a0926] via-[#190c2e] to-[#0b0814]';

  return (
    <section
      id="try-demo"
      ref={sectionRef}
      aria-labelledby="try-demo-heading"
      className={`${bgBase} ${fantasyMode ? bgFantasy : bgNormal}`}
    >
      {/* Soft glow background accents (GPU friendly) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-[140px] opacity-40"
        style={{
          background: fantasyMode
            ? 'radial-gradient(50% 50% at 50% 50%, rgba(236,72,153,0.45) 0%, rgba(234,179,8,0.20) 60%, transparent 100%)'
            : 'radial-gradient(50% 50% at 50% 50%, rgba(106,0,255,0.35) 0%, rgba(194,136,109,0.22) 60%, transparent 100%)',
          transform: 'translateZ(0)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -right-24 h-[460px] w-[460px] rounded-full blur-[120px] opacity-30"
        style={{
          background: fantasyMode
            ? 'radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.18) 60%, transparent 100%)'
            : 'radial-gradient(50% 50% at 50% 50%, rgba(194,136,109,0.28) 0%, rgba(106,0,255,0.18) 60%, transparent 100%)',
          transform: 'translateZ(0)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="try-demo-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
          >
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${
                fantasyMode
                  ? 'from-yellow-200 via-pink-300 to-purple-400'
                  : 'from-[#C2886D] via-[#AF86FF] to-white'
              }`}
            >
              Try QuietlyRich Right Now
            </span>
          </h2>
          <p className="text-gray-300/90 max-w-2xl mx-auto text-base sm:text-lg">
            Script → Voice → Vertical video in under 60 seconds. No editor. No sign-up.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-3">
          <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
        </div>

        {/* Micro trust row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-white/60">
          <span>⚡ Instant preview</span>
          <span className="hidden sm:inline">•</span>
          <span>🎯 Optimized hooks & pacing</span>
          <span className="hidden sm:inline">•</span>
          <span>🔒 No upload required</span>
        </div>
      </div>

      {/* Sticky CTA (mobile only) */}
      {showStickyCTA && (
        <div
          className="fixed inset-x-0 bottom-3 z-30 md:hidden px-4"
          style={{ transform: 'translateZ(0)' }}
        >
          <a
            href="#try-demo"
            className="block text-center w-full rounded-xl py-4 font-semibold shadow-xl border border-[#C2886D]/60
                       bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black
                       active:scale-[0.99] transition"
          >
            Generate My Preview
          </a>
        </div>
      )}
    </section>
  );
}