'use client';

import React, { useEffect, useRef, useState } from 'react';

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
        audio.play().catch(() => {})
      ]).then(() => {
        setCurrentWords([]);
        setWordIndex(0);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (script.length > 0) {
      const words = script.split(' ');
      const interval = setInterval(() => {
        setCurrentWords(prev => {
          if (prev.length < words.length) {
            return [...prev, words[prev.length]];
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 150); // typing speed (adjust if you want faster/slower)

      return () => clearInterval(interval);
    }
  }, [script]);

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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Typing Text */}
      <div
        ref={scrollRef}
        className="absolute bottom-0 w-full p-4 text-white text-sm leading-relaxed overflow-y-auto max-h-48"
      >
        {currentWords.map((word, idx) => (
          <span key={idx} className="inline-block animate-fadeIn">
            {word}{' '}
          </span>
        ))}
      </div>

      {/* Fade animation keyframes */}
      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}