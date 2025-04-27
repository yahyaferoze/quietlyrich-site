'use client';

import React, { useState, useEffect, useRef } from 'react';

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
        setShowScript(false);
        setCurrentWords([]);
        setWordIndex(0);

        setTimeout(() => {
          setShowScript(true); // slight delay so it looks clean
        }, 400);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (showScript && script.length > 0) {
      const words = script.split(' ');
      let index = 0;
      const interval = setInterval(() => {
        setCurrentWords((prev) => [...prev, words[index]]);
        index++;
        if (index >= words.length) {
          clearInterval(interval);
        }
      }, 130); // Slow, readable typing speed
      return () => clearInterval(interval);
    }
  }, [showScript, script]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentWords]);

  return (
    <div className="relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#333] bg-black">
      <video
        ref={videoRef}
        src="/mock-clip-1.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
      />
      <audio ref={audioRef} className="hidden" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Typing animated text */}
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