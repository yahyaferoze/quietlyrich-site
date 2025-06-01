'use client';

import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function ResultsProofBar() {
  return (
    <div className="w-full bg-[#120a02] border-y border-[#2e1f40] py-4 px-4 md:px-8 overflow-x-auto">
      <div className="flex gap-8 text-sm md:text-base text-[#f2f6ff] font-medium whitespace-nowrap items-center justify-center">
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-400" />
          +18,550 Followers Gained (30 Days)
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-400" />
          92% Average Watch Time
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-400" />
          7 Videos Batched in 40 Minutes
        </div>
      </div>
    </div>
  );
}