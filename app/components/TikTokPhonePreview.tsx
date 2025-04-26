'use client';

import React, { useRef, useEffect, useState } from 'react';

interface VisualAction {
  type: string;
  content: string;
}

interface TikTokPhonePreviewProps {
  script: string;
  visualActions: VisualAction[];
  audioUrl: string;
}

export default function TikTokPhonePreview({ script, visualActions, audioUrl }: TikTokPhonePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showVisual, setShowVisual] = useState(false);
  const [currentAction, setCurrentAction] = useState<VisualAction | null>(null);
  const [actionIndex, setActionIndex] = useState(0);

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
        setShowVisual(true);
        setCurrentAction(null);
        setActionIndex(0);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (showVisual && visualActions.length > 0) {
      const interval = setInterval(() => {
        if (actionIndex < visualActions.length) {
          setCurrentAction(visualActions[actionIndex]);
          setActionIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 2200); // Switch action every 2.2 seconds (you can adjust timing)
      return () => clearInterval(interval);
    }
  }, [showVisual, visualActions, actionIndex]);

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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Flashing Visual Actions */}
      {currentAction && (
        <div className="absolute bottom-6 w-full px-4 text-center text-white text-lg font-semibold animate-pulse">
          {currentAction.content}
        </div>
      )}
    </div>
  );
}