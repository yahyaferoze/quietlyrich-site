'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Trust logos: place SVGs or PNGs in /public/logos/
const logos = [
  { src: "/logos/tiktok.svg", alt: "TikTok" },
  { src: "/logos/youtube.svg", alt: "YouTube" },
  { src: "/logos/instagram.svg", alt: "Instagram" },
  { src: "/logos/twitter.svg", alt: "X" },
];

type Props = {
  fantasyMode: boolean;
};

export default function PricingSectionFixed({ fantasyMode }: Props) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  // Pricing data
  const plans = [
    {
      label: 'Free Trial',
      price: '£0',
      subtitle: '',
      cta: 'Try Free',
      link: '/signup',
      features: [
        { label: 'Try Demo Tool', included: true },
        { label: 'Limited script preview', included: true },
        { label: 'No audio or full preview export', included: false },
      ],
      highlighted: false,
    },
    {
      label: 'Creator Plan',
      price: billing === 'monthly' ? '£29/mo' : '£290/yr',
      subtitle: billing === 'monthly' ? '' : 'Save 2 months',
      cta: billing === 'monthly' ? 'Unlock Full Access' : 'Pay Annually',
      link: billing === 'monthly' ? '/pricing' : '/signup',
      features: [
        { label: 'Unlimited script generation', included: true },
        { label: 'Unlimited voice samples', included: true },
        { label: billing === 'monthly' ? '30 high-quality previews per month' : '100 bonus preview exports', included: true },
        { label: 'Commercial license', included: true },
        { label: 'Fantasy mode access', included: true },
      ],
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="relative px-6 py-36 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Glowing BG */}
      <motion.div
        className="absolute top-0 left-0 w-[520px] h-[520px] bg-gradient-to-br from-[#6A00FF]/20 via-[#C2886D]/10 to-[#43009C]/10 blur-[160px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[380px] h-[400px] bg-gradient-to-tr from-[#C2886D]/20 to-[#6A00FF]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none z-0"
        animate={{ scale: [1, 0.97, 1] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl">
          {fantasyMode ? 'Fantasy or Real. Your Brand. One Price.' : 'Start Quietly. Scale Loudly.'}
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
          One simple plan to unlock full access to QuietlyRich. Unlimited voices, scripts, previews — all yours.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-3 mb-14">
          <span className={`text-sm font-semibold transition-colors ${billing === 'monthly' ? 'text-[#C2886D]' : 'text-gray-400'}`}>Monthly</span>
          <button
            className={`relative w-14 h-8 bg-[#222] rounded-full flex items-center transition-colors duration-300 ${billing === 'annual' ? 'bg-[#C2886D]/60' : ''}`}
            onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
            aria-label="Toggle billing"
          >
            <span
              className={`absolute left-1 top-1 w-6 h-6 bg-gradient-to-br from-[#C2886D] via-[#6A00FF] to-white rounded-full shadow-md transition-all duration-300 ${billing === 'annual' ? 'translate-x-6' : ''}`}
            />
          </button>
          <span className={`text-sm font-semibold transition-colors ${billing === 'annual' ? 'text-[#C2886D]' : 'text-gray-400'}`}>Annual</span>
          {billing === 'annual' && (
            <span className="ml-2 text-xs bg-[#C2886D] text-black rounded-full px-2 py-0.5 font-bold shadow-sm animate-pulse">Save 2 months</span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Trial */}
          <motion.div
            className="relative bg-white/5 backdrop-blur-lg border border-[#291d45]/60 rounded-3xl p-8 shadow-md hover:shadow-lg transition group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Free Trial</p>
            <h3 className="text-3xl font-bold text-white mb-4">£0</h3>
            <ul className="text-left text-base text-gray-200 space-y-2 mb-8">
              <li>✅ Try Demo Tool</li>
              <li>✅ Limited script preview</li>
              <li className="opacity-80">🚫 No audio or full preview export</li>
            </ul>
            <a
              href="/signup"
              className="block w-full text-center bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-[#C2886D] text-black font-bold py-3 px-4 rounded-xl hover:opacity-90 shadow-lg transition"
            >
              Try Free
            </a>
          </motion.div>

          {/* Creator Plan */}
          <motion.div
            className="relative bg-gradient-to-br from-[#181028]/90 via-[#1c132e]/95 to-[#322259]/80 border-2 border-[#C2886D] rounded-3xl p-10 shadow-2xl hover:scale-105 transition group"
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#C2886D] via-[#fff] to-[#6A00FF] text-black text-xs font-bold px-5 py-1.5 rounded-full shadow-md"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              Most Popular
            </motion.span>
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Creator Plan</p>
            <h3 className="text-4xl font-extrabold text-white mb-4">{billing === 'monthly' ? '£29/mo' : '£290/yr'}</h3>
            <ul className="text-left text-base text-gray-100 space-y-2 mb-8">
              <li>✅ Unlimited script generation</li>
              <li>✅ Unlimited voice samples</li>
              <li>✅ {billing === 'monthly' ? '30 high-quality previews per month' : '100 bonus preview exports'}</li>
              <li>✅ Commercial license</li>
              <li>✅ Fantasy mode access</li>
            </ul>
            <a
              href={billing === 'monthly' ? '/pricing' : '/signup'}
              className="block w-full text-center bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-[#C2886D] text-black font-bold py-3 px-4 rounded-xl hover:opacity-90 shadow-lg transition"
            >
              {billing === 'monthly' ? 'Unlock Full Access' : 'Pay Annually'}
            </a>
          </motion.div>

          {/* Annual Plan (shows only if billing is monthly for clarity) */}
          <motion.div
            className="relative bg-white/5 backdrop-blur-lg border border-[#291d45]/60 rounded-3xl p-8 shadow-md hover:shadow-lg transition group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Annual Deal</p>
            <h3 className="text-3xl font-bold text-white mb-4">£290/yr</h3>
            <ul className="text-left text-base text-gray-200 space-y-2 mb-8">
              <li>✅ Everything in Creator Plan</li>
              <li>✅ Save 2 months</li>
              <li>✅ Bonus: 100 preview exports</li>
            </ul>
            <a
              href="/signup"
              className="block w-full text-center border-2 border-[#C2886D] text-[#C2886D] font-bold py-3 px-4 rounded-xl hover:bg-[#C2886D]/80 hover:text-black transition"
            >
              Pay Annually
            </a>
          </motion.div>
        </div>

        {/* Trust Logos Row */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <span className="text-sm text-gray-400 tracking-wide font-medium">Trusted by creators on</span>
          <div className="flex gap-8 items-center justify-center opacity-80">
            {logos.map((logo, i) => (
              <img
                src={logo.src}
                alt={logo.alt}
                key={i}
                className="h-8 w-auto grayscale hover:grayscale-0 transition"
                style={{ filter: "drop-shadow(0 1px 8px rgba(106,0,255,0.12))" }}
              />
            ))}
          </div>
        </div>

        <p className="mt-10 text-base text-gray-400 italic">
          Cancel anytime. 100% satisfaction guarantee.
        </p>
      </div>
    </section>
  );
}