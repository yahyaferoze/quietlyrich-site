'use client';

import React from 'react';
import { motion } from 'framer-motion';

const competitors = [
  { name: 'QuietlyRich', logo: '/quietlyrich-logo.svg', effortless: true, faceless: true, voiceControl: true, previewSpeed: true, exclusive: true },
  { name: 'InVideo', logo: '/invideo-logo.svg', effortless: false, faceless: true, voiceControl: false, previewSpeed: false, exclusive: false },
  { name: 'Pictory', logo: '/pictory-logo.svg', effortless: false, faceless: true, voiceControl: false, previewSpeed: false, exclusive: false },
  { name: 'Opus.pro', logo: '/opus-logo.svg', effortless: true, faceless: false, voiceControl: false, previewSpeed: true, exclusive: false },
];

const featureLabels = [
  { key: 'effortless', label: 'No Editing Needed' },
  { key: 'faceless', label: 'Faceless Content' },
  { key: 'voiceControl', label: 'Voice + Script Control' },
  { key: 'previewSpeed', label: 'Preview in Seconds' },
  { key: 'exclusive', label: 'Fantasy Mode (Celebrity/Character AI)' }, // QuietlyRich differentiator
];

export default function CompareBar() {
  return (
    <section className="bg-black py-24 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent"
        >
          Why Creators Switch to QuietlyRich
        </motion.h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
          See how we compare to other tools—and why we’re built for viral, faceless creators.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse text-left text-sm min-w-[650px] rounded-xl overflow-hidden">
            <thead>
              <tr className="text-[#C2886D] border-b border-[#333] text-base">
                <th className="py-4 pr-4">Feature</th>
                {competitors.map((tool, index) => (
                  <th
                    key={index}
                    className={`py-4 px-2 font-semibold text-center ${
                      tool.name === 'QuietlyRich'
                        ? 'bg-gradient-to-t from-[#6A00FF]/20 via-[#C2886D]/20 to-transparent rounded-t-xl relative'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-base font-bold">{tool.name}</span>
                      {/* If you have logos, show here:
                      <img src={tool.logo} alt={tool.name} className="h-6 w-6 mx-auto" />
                      */}
                      {tool.name === 'QuietlyRich' && (
                        <span className="mt-1 px-2 py-0.5 bg-[#C2886D] text-black text-xs rounded-full font-bold shadow animate-pulse">
                          Most Loved
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map(({ key, label }, rowIdx) => (
                <tr
                  key={key}
                  className={`border-b border-[#222] ${
                    rowIdx === featureLabels.length - 1
                      ? 'bg-gradient-to-r from-[#6A00FF]/5 via-[#C2886D]/10 to-transparent'
                      : ''
                  }`}
                >
                  <td className="py-4 pr-4 text-white font-semibold">{label}</td>
                  {competitors.map((tool, colIdx) => (
                    <td
                      key={colIdx}
                      className={`text-center py-4 ${
                        tool.name === 'QuietlyRich'
                          ? 'bg-gradient-to-t from-[#C2886D]/15 via-[#6A00FF]/10 to-transparent font-extrabold text-white rounded-lg border-2 border-[#C2886D]/40'
                          : ''
                      }`}
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
        </motion.div>
        <p className="mt-6 text-sm text-gray-500 italic">
          * Fantasy Mode: Only on QuietlyRich. Generate celebrity/character podcasts & faceless video with a click.
        </p>
      </div>
    </section>
  );
}