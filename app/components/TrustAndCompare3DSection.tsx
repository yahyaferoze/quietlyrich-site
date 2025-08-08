'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FeatureKey = 'effortless' | 'faceless' | 'voiceControl' | 'previewSpeed' | 'fantasyMode';

type Row = {
  key: FeatureKey;
  label: string;
  tooltip: string;
};

type Competitor = {
  name: string;
  logo?: string;
} & Record<FeatureKey, boolean>;

const competitors: Competitor[] = [
  {
    name: 'QuietlyRich',
    logo: '/logos/quietlyrich-logo.svg',
    effortless: true,
    faceless: true,
    voiceControl: true,
    previewSpeed: true,
    fantasyMode: true,
  },
  {
    name: 'InVideo',
    logo: '/logos/invideo-logo.svg',
    effortless: false,
    faceless: true,
    voiceControl: false,
    previewSpeed: false,
    fantasyMode: false,
  },
  {
    name: 'Pictory',
    logo: '/logos/pictory-logo.svg',
    effortless: false,
    faceless: true,
    voiceControl: false,
    previewSpeed: false,
    fantasyMode: false,
  },
  {
    name: 'Opus.pro',
    logo: '/logos/opus-logo.svg',
    effortless: true,
    faceless: false,
    voiceControl: false,
    previewSpeed: true,
    fantasyMode: false,
  },
];

const featureLabels: Row[] = [
  {
    key: 'effortless',
    label: 'No Editing Needed',
    tooltip:
      'Generate content in one click—no timeline or keyframes. Scripts, voices, and previews are automated.',
  },
  {
    key: 'faceless',
    label: 'Faceless Content',
    tooltip:
      'Create videos and podcasts without showing your face—ideal for niche or brand accounts.',
  },
  {
    key: 'voiceControl',
    label: 'Voice + Script Control',
    tooltip:
      'Pick viral AI voices, upload your own, and tweak the script with guardrails for pacing and tone.',
  },
  {
    key: 'previewSpeed',
    label: 'Preview in Seconds',
    tooltip:
      'Instant preview—no render queue. Iterate faster until it’s post-ready.',
  },
  {
    key: 'fantasyMode',
    label: 'Fantasy Mode (Celebrity/Character)',
    tooltip:
      'Only on QuietlyRich: craft celebrity/character-style podcasts and faceless videos with a click.',
  },
];

// Benefit chips for QuietlyRich (instead of a plain ✔)
const quietlyRichBenefits: Record<FeatureKey, string> = {
  effortless: '1-click, no timeline',
  faceless: 'Made for faceless niches',
  voiceControl: 'Viral voices + custom',
  previewSpeed: '~2s preview loop',
  fantasyMode: 'Exclusive to QuietlyRich',
};

export default function TrustAndCompare3DSection() {
  const [openTip, setOpenTip] = useState<FeatureKey | null>(null);

  return (
    <section className="relative bg-black border-t border-[#1a1a1a]">
      {/* Soft ambient glow connecting bar + table */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[160px] opacity-30"
             style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(106,0,255,.25), rgba(194,136,109,.12) 60%, transparent 80%)' }} />
      </motion.div>

      {/* TRUST BAR */}
      <motion.div
        className="w-full bg-gradient-to-r from-[#181028] via-[#221537] to-[#181028] py-4 px-4 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 shadow-inner text-sm font-medium border-b border-[#291d45] relative z-10"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {/* Left: Stats & rating */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-[#F6C244] text-lg">★</span>
            <span className="text-[#C2886D]">Trusted by</span>
            <span className="font-bold text-white text-lg md:text-xl">10,000+</span>
            <span className="text-[#C2886D]">creators</span>
          </div>
          <div className="flex items-center text-[#F6C244]">
            <span className="text-lg md:text-xl mr-1">★★★★★</span>
            <span className="text-xs text-gray-300">Rated 4.9/5</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-5 w-px bg-[#291d45]" />

        {/* Right: “As seen on” logos */}
        <div className="flex items-center gap-3 md:gap-5">
          <span className="text-white/60 text-xs md:text-sm">As seen on</span>
          {[
            { src: '/logos/tiktok.svg', alt: 'TikTok' },
            { src: '/logos/reddit.svg', alt: 'Reddit' },
            { src: '/logos/youtube.svg', alt: 'YouTube' },
          ].map((logo, i) => (
            <motion.img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="w-6 h-6 md:w-7 md:h-7 opacity-85 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.08, rotate: i === 0 ? 0 : i === 1 ? -2 : 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          ))}
        </div>
      </motion.div>

      {/* COMPARE TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true }}
        className="py-16 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Why Creators Quit Editing & Switch to QuietlyRich
          </h2>
          <p className="mb-2 text-lg font-semibold text-purple-400">
            Stop burning hours in timelines. Ship content in minutes.
          </p>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
            Here’s how we compare to popular tools—built specifically for viral, faceless creators.
          </p>

          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#6A00FF]/40 scrollbar-track-[#181028] rounded-2xl">
            <table className="w-full border-collapse text-left text-sm min-w-[720px] relative">
              <thead>
                <tr className="text-[#C2886D] border-b border-[#333] text-sm md:text-base">
                  <th className="py-4 pr-4 pl-2 text-left sticky left-0 bg-black z-20">Feature</th>
                  {competitors.map((tool, index) => {
                    const isQR = tool.name === 'QuietlyRich';
                    return (
                      <th
                        key={index}
                        className={`py-4 px-2 font-semibold text-center align-middle ${isQR ? 'relative' : ''}`}
                      >
                        <div className={`flex flex-col items-center gap-1 ${isQR ? 'scale-[1.04]' : ''}`}>
                          {tool.logo ? (
                            <img src={tool.logo} alt={tool.name} className="h-6 w-auto opacity-90" />
                          ) : null}
                          <span
                            className={`text-base font-bold ${
                              isQR
                                ? 'bg-gradient-to-r from-[#C2886D] via-purple-400 to-[#6A00FF] text-transparent bg-clip-text'
                                : 'text-white'
                            }`}
                          >
                            {tool.name}
                          </span>
                          {isQR && (
                            <motion.span
                              className="mt-1 px-2 py-0.5 bg-[#C2886D] text-black text-[10px] rounded-full font-bold shadow ring-2 ring-[#6A00FF]/60"
                              initial={{ opacity: 0, y: -6, scale: 0.9 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.4 }}
                              viewport={{ once: true }}
                            >
                              Most Loved
                            </motion.span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {featureLabels.map(({ key, label, tooltip }) => (
                  <tr key={key} className="border-b border-[#222] text-white group">
                    {/* Feature label (sticky) */}
                    <td className="py-4 pr-4 pl-2 sticky left-0 bg-black z-10 align-middle">
                      <div className="flex items-start gap-2">
                        <span className="font-medium">{label}</span>
                        {/* Tap/Click tooltip */}
                        <TooltipButton
                          active={openTip === key}
                          onToggle={() => setOpenTip(openTip === key ? null : key)}
                          label={label}
                        />
                      </div>
                      <TooltipBody open={openTip === key}>{tooltip}</TooltipBody>
                    </td>

                    {/* Competitor cells */}
                    {competitors.map((tool) => {
                      const isQR = tool.name === 'QuietlyRich';
                      const hasFeature = tool[key];

                      return (
                        <td
                          key={`${tool.name}-${key}`}
                          className={`text-center relative py-4 align-middle ${
                            isQR
                              ? 'bg-gradient-to-t from-[#C2886D]/15 via-[#6A00FF]/15 to-transparent font-extrabold text-white rounded-lg border border-[#C2886D]/50 shadow-[0_0_18px_2px_#6A00FF44] backdrop-blur-sm'
                              : ''
                          }`}
                        >
                          {isQR ? (
                            <span className="inline-flex items-center justify-center text-xs md:text-sm px-2 py-1 rounded-md bg-white/10 border border-white/10">
                              {quietlyRichBenefits[key]}
                            </span>
                          ) : hasFeature ? (
                            <span className="text-green-400 font-bold text-lg leading-none">✔</span>
                          ) : (
                            <span className="text-gray-600 font-bold text-lg leading-none">–</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <p className="text-xs text-gray-500 mt-6 max-w-xl mx-auto">
            <span className="font-semibold text-[#C2886D]">*</span> Fantasy Mode is exclusive to QuietlyRich.
            Create celebrity/character-style podcasts and faceless videos with a click.
          </p>
        </div>
      </motion.div>

      {/* Sticky CTA after comparison */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="sticky bottom-0 z-30 bg-black/90 backdrop-blur border-t border-[#333] px-4 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
      >
        <a href="#try-demo">
          <button className="bg-[#C2886D] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3745b] transition w-full sm:w-auto">
            🚀 Try QuietlyRich Free →
          </button>
        </a>
        <a href="#pricing">
          <button className="bg-white/5 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 border border-white/10 transition w-full sm:w-auto">
            See Pricing
          </button>
        </a>
      </motion.div>
    </section>
  );
}

/* ---------- Small internal components for tooltips ---------- */

function TooltipButton({
  active,
  onToggle,
  label,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={active}
      aria-label={`More info about ${label}`}
      onClick={onToggle}
      className={`shrink-0 mt-0.5 h-5 w-5 rounded-full bg-[#1a1a1a] border border-[#333] text-[11px] text-purple-200 flex items-center justify-center hover:border-[#6A00FF] focus:outline-none focus:ring-2 focus:ring-[#6A00FF]/40 ${
        active ? 'ring-2 ring-[#6A00FF]/40' : ''
      }`}
      title="More info"
    >
      i
    </button>
  );
}

function TooltipBody({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-2 text-xs text-purple-200 bg-[#181028] border border-[#6A00FF]/40 rounded-lg px-3 py-2 max-w-xs transition ${
        open ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
      } ${open ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}`}
    >
      {children}
    </div>
  );
}