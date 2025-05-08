// components/ProgressBar.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = ['Topic', 'Format', 'Script', 'Voice', 'Preview'];

export default function ProgressBar({ currentStep }: { currentStep: string }) {
  const stepIndex = steps.findIndex((s) => currentStep.toLowerCase().includes(s.toLowerCase()));

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center text-xs text-gray-400 uppercase tracking-wide">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 text-center relative">
            <div
              className={`rounded-full h-2 ${
                idx <= stepIndex ? 'bg-[#C2886D]' : 'bg-gray-700'
              } transition-all`}
            />
            <div className="mt-1 text-[10px] text-white">{label}</div>
          </div>
        ))}
      </div>

      <motion.div
        className="h-1 bg-[#C2886D] rounded-full mt-2"
        initial={{ width: 0 }}
        animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}