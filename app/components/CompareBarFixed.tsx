'use client';

import React from 'react';

const competitors = [
  {
    name: 'QuietlyRich',
    faceless: true,
    fantasy: true,
    tiktok: true,
    autoContent: true,
    price: '£0–£29/mo',
    highlight: true,
  },
  {
    name: 'Opus.pro',
    faceless: false,
    fantasy: false,
    tiktok: true,
    autoContent: true,
    price: '£19–£49/mo',
  },
  {
    name: 'InVideo',
    faceless: false,
    fantasy: false,
    tiktok: true,
    autoContent: false,
    price: '£15–£24/mo',
  },
];

export default function CompareBarFixed() {
  return (
    <div className="bg-[#121212] border border-[#1e1e1e] rounded-2xl my-16 max-w-4xl mx-auto overflow-x-auto shadow-lg">
      <div className="grid grid-cols-5 text-center text-sm font-medium">
        <div className="py-4"></div>
        {competitors.map((c, i) => (
          <div
            key={i}
            className={`py-4 ${c.highlight ? 'text-[#C2886D]' : 'text-white/70'}`}
          >
            {c.name}
          </div>
        ))}
      </div>
      {[
        { label: 'True Faceless Creation', key: 'faceless' },
        { label: 'Fantasy/Parody Mode', key: 'fantasy' },
        { label: 'TikTok-Optimized Export', key: 'tiktok' },
        { label: 'Auto Script & Content', key: 'autoContent' },
        { label: 'Starting Price', key: 'price' },
      ].map((row, idx) => (
        <div key={idx} className="grid grid-cols-5 text-center border-t border-[#232323]">
          <div className="py-4 font-semibold text-white">{row.label}</div>
          {competitors.map((c, i) =>
            row.key === 'price' ? (
              <div key={i} className="py-4 text-[#C2886D] font-bold">{c.price}</div>
            ) : (
              <div key={i} className="py-4">
                {c[row.key as keyof typeof c] ? (
                  <span className="text-green-400 text-xl">✔</span>
                ) : (
                  <span className="text-red-500 text-xl">✖</span>
                )}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}