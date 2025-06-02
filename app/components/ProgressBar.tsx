'use client';

import React from 'react';

// This object is used at runtime (value)
export const StepKey = {
  topic: 'topic',
  format: 'format',
  script: 'script',
  voice: 'voice',
  previewGen: 'previewGen',
  preview: 'preview',
} as const;

// This type is used at compile-time (type)
export type StepKey = keyof typeof StepKey;

export type ProgressBarProps = {
  currentStep: StepKey;
};

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps: StepKey[] = [
    StepKey.topic,
    StepKey.format,
    StepKey.script,
    StepKey.voice,
    StepKey.previewGen,
    StepKey.preview,
  ];
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