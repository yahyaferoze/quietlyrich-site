'use client';

import React from 'react';
import { motion } from 'framer-motion';

// If you have logos, add the import or src here
const competitors = [
  {
    name: 'QuietlyRich',
    logo: '/quietlyrich-logo.svg', // Optional, else leave blank
    effortless: true,
    faceless: true,
    voiceControl: true,
    previewSpeed: true,
    fantasyMode: true,
  },
  {
    name: 'InVideo',
    logo: '/invideo-logo.svg', // Optional
    effortless: false,
    faceless: true,
    voiceControl: false,
    previewSpeed: false,
    fantasyMode: false,
  },
  {
    name: 'Pictory',
    logo: '/pictory-logo.svg', // Optional
    effortless: false,
    faceless: true,
    voiceControl: false,
    previewSpeed: false,
    fantasyMode: false,
  },
  {
    name: 'Opus.pro',
    logo: '/opus-logo.svg', // Optional
    effortless: true,
    faceless: false,
    voiceControl: false,
    previewSpeed: true,
    fantasyMode: false,
  },
];

const featureLabels = [
  {
    key: 'effortless',
    label: 'No Editing Needed',
    tooltip: 'Create content in one click—no timeline editing, no video software.',
  },
  {
    key: 'faceless',
    label: 'Faceless Content',
    tooltip: 'Generate videos/podcasts without ever showing your face.',
  },
  {
    key: 'voiceControl',
    label: 'Voice + Script Control',
    tooltip: 'Choose viral voices or upload your own. Script is 100% AI customizable.',
  },
  {
    key: 'previewSpeed',
    label: 'Preview in Seconds',
    tooltip: 'No more waiting for rendering. Get a preview instantly.',
  },
  {
    key: 'fantasyMode',
    label: 'Fantasy Mode (Celebrity/Character AI)',
    tooltip: 'Only on QuietlyRich: Generate AI podcasts/videos with any celebrity or character.',
  },
];

export default function CompareBar() {
  return (
    <section className="bg-black py-24 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          Why Creators Switch to QuietlyRich
        </motion.h2>

        {/* Emotional punchline headline */}
        <p className="mb-8 text-lg font-semibold text-purple-400">
          Stop wasting hours editing—see why creators are switching.
        </p>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
          See how we compare to other tools — and why we’re built for viral, faceless creators.
        </p>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#6A00FF]/40 scrollbar-track-[#181028]">
          <table className="w-full border-collapse text-left text-sm min-w-[670px] relative">
            <thead>
              <tr className="text-[#C2886D] border-b border-[#333] text-base">
                <th className="py-4 pr-4 text-left">Feature</th>
                {competitors.map((tool, index) => (
                  <th
                    key={index}
                    className={`py-4 px-2 font-semibold text-center ${
                      tool.name === 'QuietlyRich'
                        ? 'relative'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      {/* Logo (if you want to use) */}
                      {/* {tool.logo && (
                        <img src={tool.logo} alt={tool.name} className="h-6 w-6 mb-1" />
                      )} */}
                      <span
                        className={`text-base font-bold ${
                          tool.name === 'QuietlyRich'
                            ? 'bg-gradient-to-r from-[#C2886D] via-purple-400 to-[#6A00FF] text-transparent bg-clip-text'
                            : ''
                        }`}
                      >
                        {tool.name}
                      </span>
                      {tool.name === 'QuietlyRich' && (
                        <span className="mt-1 px-2 py-0.5 bg-[#C2886D] text-black text-xs rounded-full font-bold shadow animate-pulse ring-2 ring-[#6A00FF]/60">
                          Most Loved
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map(({ key, label, tooltip }) => (
                <tr key={key} className="border-b border-[#222] text-white group">
                  <td className="py-4 pr-4 relative">
                    <span className="cursor-help inline-block">
                      {label}
                      {/* Tooltip */}
                      <span className="hidden md:block absolute left-full ml-3 w-60 top-1/2 -translate-y-1/2 z-20 px-4 py-2 bg-[#181028] border border-[#6A00FF]/40 text-xs text-purple-300 rounded-lg shadow-md opacity-0 group-hover:opacity-100 pointer-events-none transition duration-200">
                        {tooltip}
                      </span>
                    </span>
                  </td>
                  {competitors.map((tool, i) => (
                    <td
                      key={i}
                      className={`
                        text-center relative py-4
                        ${tool.name === 'QuietlyRich'
                          ? 'bg-gradient-to-t from-[#C2886D]/15 via-[#6A00FF]/15 to-transparent font-extrabold text-white rounded-lg border-2 border-[#C2886D]/60 shadow-[0_0_18px_2px_#6A00FF66] backdrop-blur-sm'
                          : ''
                        }
                      `}
                    >
                      {tool[key as keyof typeof tool] ? (
                        <span className="text-green-400 font-bold text-lg">✔</span>
                      ) : (
                        <span className="text-gray-600 font-bold text-lg">–</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Optional: Small note under table */}
        <p className="text-xs text-gray-500 mt-6 max-w-xl mx-auto">
          <span className="font-semibold text-[#C2886D]">*</span> Fantasy Mode: Only on QuietlyRich. Generate celebrity/character podcasts & faceless video with a click.
        </p>
      </div>
    </section>
  );
}