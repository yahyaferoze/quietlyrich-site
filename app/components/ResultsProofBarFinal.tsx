'use client';

import React from 'react';

const results = [
  {
    stat: '+18,550',
    desc: 'Followers Gained (30 Days)',
  },
  {
    stat: '92%',
    desc: 'Average Watch Time',
  },
  {
    stat: '7',
    desc: 'Videos Batched in 40 Minutes',
  },
];

export default function ResultsProofBar() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {results.map((r, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center bg-[#161616] border border-[#282828] rounded-2xl p-6 min-w-[200px] shadow-md"
          >
            <div className="text-3xl font-bold text-[#C2886D] mb-1">{r.stat}</div>
            <div className="text-gray-300 mb-2">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}