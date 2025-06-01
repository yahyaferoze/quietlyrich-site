'use client';

import React from 'react';

type ProgressBarProps = {
  currentStep: 'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview';
};

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = ['topic', 'format', 'script', 'voice', 'previewGen', 'preview'];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="relative w-full bg-[#222] h-2 rounded-full overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full bg-[#C2886D] transition-all duration-500"
        style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
      />
    </div>
  );
}
