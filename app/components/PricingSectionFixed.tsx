'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Place these logos in /public/logos/
const logos = [
  { src: "/logos/tiktok.svg", alt: "TikTok" },
  { src: "/logos/youtube.svg", alt: "YouTube" },
  { src: "/logos/instagram.svg", alt: "Instagram" },
  { src: "/logos/twitter.svg",  alt: "X"     },
];

type Props = {
  fantasyMode: boolean;
};

export default function PricingSectionFixed({ fantasyMode }: Props) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  // Define your plans
  const plans = [
    {
      key: 'free',
      label: 'Free Trial',
      price: '£0',
      subtitle: '',
      features: [
        { label: '3 AI scripts/month', included: true },
        { label: '3 AI voice samples (≤30s)', included: true },
        { label: 'No video downloads', included: false },
      ],
      cta: 'Try Free',
      href: '/signup',
      highlighted: false,
    },
    {
      key: 'creator',
      label: 'Creator Plan',
      price: billing === 'monthly' ? '£29/mo' : '£290/yr',
      subtitle: billing === 'annual' ? 'Save 2 months!' : '',
      features: [
        { label: 'Unlimited scripts (fair ~100/mo)', included: true },
        { label: '60 AI voice gens/mo', included: true },
        { label: billing === 'monthly' ? '30 video exports/mo' : '30 video exports/mo', included: true },
        { label: 'Commercial license', included: true },
        { label: 'Fantasy Mode (standard)', included: true },
      ],
      cta: billing === 'monthly' ? 'Unlock Full Access' : 'Pay Annually',
      href: billing === 'monthly' ? '/pricing' : '/signup',
      highlighted: true,
    },
    {
      key: 'pro',
      label: 'Pro Plan',
      price: billing === 'monthly' ? '£69/mo' : '£690/yr',
      subtitle: billing === 'annual' ? 'Save 2 months!' : '',
      features: [
        { label: 'Up to 300 scripts/mo', included: true },
        { label: '200 AI voice gens/mo', included: true },
        { label: '100 video exports/mo', included: true },
        { label: 'Full Fantasy Mode', included: true },
        { label: 'Whitelabel & Commercial', included: true },
        { label: 'Priority Support', included: true },
      ],
      cta: billing === 'monthly' ? 'Upgrade to Pro' : 'Pay Annually',
      href: '/signup',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="relative px-6 py-36 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[520px] h-[520px] bg-gradient-to-br from-[#6A00FF]/20 via-[#C2886D]/10 to-[#43009C]/10 blur-[160px] rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"
        animate={{ scale: [1,1.04,1] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[380px] h-[400px] bg-gradient-to-tr from-[#C2886D]/20 to-[#6A00FF]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none z-0"
        animate={{ scale: [1,0.97,1] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl">
          { fantasyMode ? 'Fantasy or Real. Your Brand. One Price.' : 'Start Quietly. Scale Loudly.' }
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
          One simple plan to unlock full access to QuietlyRich. Unlimited voices, scripts, previews — all yours.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <span className={`text-sm font-semibold transition-colors ${billing==='monthly' ? 'text-[#C2886D]' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setBilling(billing==='monthly'?'annual':'monthly')}
            className={`relative w-14 h-8 bg-[#222] rounded-full flex items-center transition ${billing==='annual'? 'bg-[#C2886D]/60':''}`}
            aria-label="Toggle billing"
          >
            <span className={`absolute left-1 top-1 w-6 h-6 bg-gradient-to-br from-[#C2886D] via-[#6A00FF] to-white rounded-full transition-transform ${billing==='annual'? 'translate-x-6':''}`} />
          </button>
          <span className={`text-sm font-semibold transition-colors ${billing==='annual' ? 'text-[#C2886D]' : 'text-gray-500'}`}>Annual</span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              className={`
                relative p-8 rounded-3xl shadow-lg transition-transform 
                ${plan.highlighted 
                  ? 'bg-gradient-to-br from-[#181028]/90 via-[#1C132E]/95 to-[#322259]/80 border-2 border-[#C2886D] hover:scale-105' 
                  : 'bg-white/5 backdrop-blur-lg border border-[#291D45]/60 hover:shadow-xl'}
              `}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.highlighted && (
                <motion.span
                  className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#C2886D] via-[#fff] to-[#6A00FF] text-black text-xs font-bold px-5 py-1.5 rounded-full shadow-md"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                >
                  Most Popular
                </motion.span>
              )}
              <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">{plan.label}</p>
              <h3 className="text-4xl font-extrabold text-white mb-2">{plan.price}</h3>
              {plan.subtitle && (
                <div className="text-sm text-[#C2886D] font-semibold mb-4">{plan.subtitle}</div>
              )}
              <ul className="text-left text-base text-gray-200 space-y-2 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`${f.included ? '' : 'opacity-60'}`}>
                    {f.included ? '✅' : '🚫'} {f.label}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`
                  block w-full text-center font-bold py-3 px-4 rounded-xl transition
                  ${plan.highlighted 
                    ? 'bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-[#C2886D] text-black hover:opacity-90 shadow-lg'
                    : 'border-2 border-[#C2886D] text-[#C2886D] hover:bg-[#C2886D]/80 hover:text-black'
                  }
                `}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Logos Row */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Trusted by creators on</span>
          <div className="flex gap-8 items-center justify-center opacity-80">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-filter"
                style={{ filter: 'drop-shadow(0 1px 8px rgba(106,0,255,0.12))' }}
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