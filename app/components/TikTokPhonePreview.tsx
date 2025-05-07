'use client';

import React, { useRef, useEffect, useState } from 'react';

interface TikTokPhonePreviewProps {
  script: { type: string; text: string }[];
  audioUrl: string;
}

export default function TikTokPhonePreview({ script, audioUrl }: TikTokPhonePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [isDone, setIsDone] = useState(false);

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
        setCurrentIndex(0);
        setIsDone(false);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (showScript && script.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
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
  }, [showScript, script]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const replay = () => {
    setCurrentIndex(0);
    setShowScript(false);
    setIsDone(false);

    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;

      videoRef.current.play().catch(() => {});
      audioRef.current.play().catch(() => {});

      setShowScript(true);
    }
  };

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

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div ref={scrollRef} className="absolute bottom-0 w-full p-4 text-white text-sm leading-relaxed overflow-y-auto max-h-48">
        {script.slice(0, currentIndex + 1).map((block, idx) => (
          <div key={idx} className={`mb-2 ${idx === currentIndex ? 'text-[#C2886D]' : ''}`}>
            <span className="font-bold text-[#C2886D]">{block.type.toUpperCase()}:</span>{' '}
            <span>{block.text}</span>
          </div>
        ))}
      </div>

      {isDone && (
        <button
          onClick={replay}
          className="absolute bottom-4 right-4 text-xs px-3 py-1 bg-[#C2886D] text-black rounded-md font-semibold hover:bg-[#b3745b] transition z-20"
        >
          🔁 Replay
        </button>
      )}
    </div>
  );
}