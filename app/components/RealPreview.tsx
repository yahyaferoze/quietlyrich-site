'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScriptBlock {
  type: string;
  text: string;
}

interface RealPreviewProps {
  script: ScriptBlock[];
  audioUrl: string;
}

export default function RealPreview({ script, audioUrl }: RealPreviewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      const audio = audioRef.current;
      audio.pause();
      audio.load();
      audio.play().catch(() => {});
      setCurrentIndex(0);
      setIsDone(false);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (script.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= script.length - 1) {
            clearInterval(interval);
            setIsDone(true);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [script]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-xl relative border border-[#2a2a2a] bg-[#0a0a0a]">
      {/* Audio */}
      <audio ref={audioRef} className="hidden" />

      {/* Script Overlay */}
      <div className="p-6 sm:p-10 text-white space-y-4 min-h-[320px]">
        {script.slice(0, currentIndex + 1).map((block, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 ease-in-out ${
              idx === currentIndex ? 'text-[#C2886D] font-semibold' : 'text-gray-300'
            }`}
          >
            <span className="block text-xs text-[#C2886D] tracking-wide uppercase mb-1">
              {block.type}
            </span>
            <p className="text-lg leading-relaxed">{block.text}</p>
          </div>
        ))}
      </div>

      {/* Completion CTA */}
      {isDone && (
        <div className="absolute bottom-4 right-4 z-10">
          <button className="bg-[#C2886D] text-black text-sm px-4 py-2 rounded-lg shadow-md hover:bg-[#b3745b] transition font-bold">
            🔁 Replay
          </button>
        </div>
      )}
    </div>
  );
}