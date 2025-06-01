'use client';

import React from 'react';
import { motion } from 'framer-motion';

const competitors = [
  { name: 'QuietlyRich', effortless: true, faceless: true, voiceControl: true, previewSpeed: true },
  { name: 'InVideo', effortless: false, faceless: true, voiceControl: false, previewSpeed: false },
  { name: 'Pictory', effortless: false, faceless: true, voiceControl: false, previewSpeed: false },
  { name: 'Opus.pro', effortless: true, faceless: false, voiceControl: false, previewSpeed: true },
];

const featureLabels = [
  { key: 'effortless', label: 'No Editing Needed' },
  { key: 'faceless', label: 'Faceless Content' },
  { key: 'voiceControl', label: 'Voice + Script Control' },
  { key: 'previewSpeed', label: 'Preview in Seconds' },
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
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Why Creators Switch to QuietlyRich
        </motion.h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
          See how we compare to other tools — and why we’re built for viral, faceless creators.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm min-w-[600px]">
            <thead>
              <tr className="text-[#C2886D] border-b border-[#333] text-base">
                <th className="py-4 pr-4">Feature</th>
                {competitors.map((tool, index) => (
                  <th key={index} className="py-4 px-2 font-semibold text-center">
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map(({ key, label }) => (
                <tr key={key} className="border-b border-[#222] text-white">
                  <td className="py-4 pr-4">{label}</td>
                  {competitors.map((tool, i) => (
                    <td key={i} className="text-center">
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
      </div>
    </section>
  );
}
