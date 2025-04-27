'use client';

import React from 'react';

interface ScriptLine {
  type: 'voiceover' | 'onscreen' | 'scene' | 'cta';
  text: string;
}

interface TikTokPhonePreviewProps {
  script: ScriptLine[];
  audioUrl: string;
}

export default function TikTokPhonePreview({ script, audioUrl }: TikTokPhonePreviewProps) {
  return (
    <div className="w-[250px] h-[500px] rounded-3xl border-4 border-[#C2886D] overflow-hidden bg-black relative flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-y-auto p-4">
        {script.map((line, index) => (
          <div
            key={index}
            className={`mb-4 text-center ${
              line.type === 'onscreen'
                ? 'text-lg font-bold text-white'
                : line.type === 'scene'
                ? 'text-sm text-gray-400 italic'
                : line.type === 'cta'
                ? 'text-base font-semibold text-[#C2886D]'
                : 'text-sm text-gray-300'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Audio Player (hidden) */}
      {audioUrl && (
        <audio src={audioUrl} autoPlay preload="auto" className="hidden" />
      )}
    </div>
  );
}