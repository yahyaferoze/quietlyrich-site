'use client';

import React, { useRef, useEffect, useState } from 'react';

interface TikTokPhonePreviewProps {
  script: string;
  audioUrl: string;
}

export default function TikTokPhonePreview({ script, audioUrl }: TikTokPhonePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showScript, setShowScript] = useState(false);

  useEffect(() => {
    if (audioUrl && videoRef.current && audioRef.current) {
      const video = videoRef.current;
      const audio = audioRef.current;

      video.pause();
      audio.pause();
      video.load();
      audio.load();

      Promise.all([
        video.play().catch(() => {}),
        audio.play().catch(() => {}),
      ]).then(() => {
        setShowScript(true);
        setCurrentWords([]);
        setWordIndex(0);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (showScript && script) {
      const words = script.split(' ');
      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          setCurrentWords(prev => [...prev, words[wordIndex]]);
          setWordIndex(prev => prev + 1);
        }
      }, 180); // Typing speed

      return () => clearInterval(interval);
    }
  }, [showScript, script, wordIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentWords]);

  return (
    <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#333]">
      <video
        ref={videoRef}
        src="/mock-clip-1.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
      />
      <audio ref={audioRef} className="hidden" />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Typing Script */}
      {showScript && (
        <div
          ref={scrollRef}
          className="absolute bottom-0 w-full p-4 text-white text-sm leading-relaxed overflow-y-auto max-h-48"
        >
          {currentWords.join(' ')}
        </div>
      )}
    </div>
  );
}