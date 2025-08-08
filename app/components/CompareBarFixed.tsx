'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ---- ASSETS NOTES ----
// Add logos to /public/logos/ (or adjust paths):
// quietlyrich-logo.svg, invideo-logo.svg, pictory-logo.svg, opus-logo.svg, tiktok.svg, youtube.svg, instagram.svg, twitter.svg

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

// What users *get* with QuietlyRich (benefit text instead of a plain check)
const quietlyRichBenefits: Record<FeatureKey, string> = {
  effortless: '1-click, no timeline',
  faceless: 'Made for faceless niches',
  voiceControl: 'Viral voices + custom',
  previewSpeed: '~2s preview loop',
  fantasyMode: 'Exclusive to QuietlyRich',
};

export default function CompareBarFixed() {
  const [openTip, setOpenTip] = useState<FeatureKey | null>(null);

  return (
    <section className="bg-black py-24 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          Why Creators Quit Editing & Switch to QuietlyRich
        </motion.h2>

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
                      className={`py-4 px-2 font-semibold text-center align-middle ${
                        isQR ? 'relative' : ''
                      }`}
                    >
                      <div
                        className={`flex flex-col items-center gap-1 ${
                          isQR ? 'scale-[1.04]' : ''
                        }`}
                      >
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-6 w-auto opacity-90"
                          />
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
                  {/* Feature label (sticky on mobile scroll) */}
                  <td className="py-4 pr-4 pl-2 sticky left-0 bg-black z-10 align-middle">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">{label}</span>
                      {/* Mobile-friendly tooltip button */}
                      <button
                        type="button"
                        aria-label={`More info about ${label}`}
                        onClick={() => setOpenTip(openTip === key ? null : key)}
                        className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-[#1a1a1a] border border-[#333] text-[11px] text-purple-200 flex items-center justify-center hover:border-[#6A00FF] focus:outline-none focus:ring-2 focus:ring-[#6A00FF]/40"
                        title="More info"
                      >
                        i
                      </button>
                    </div>

                    {/* Tooltip (works on tap/click & hover) */}
                    <div
                      className={`mt-2 text-xs text-purple-200 bg-[#181028] border border-[#6A00FF]/40 rounded-lg px-3 py-2 max-w-xs transition ${
                        openTip === key ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                      } ${openTip === key ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}`}
                    >
                      {tooltip}
                    </div>
                  </td>

                  {/* Competitor cells */}
                  {competitors.map((tool, i) => {
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
    </section>
  );
}