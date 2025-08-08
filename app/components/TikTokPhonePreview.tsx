'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TikTokPhonePreviewProps {
  script: { type: string; text: string }[];
  audioUrl: string;
  fantasyMode?: boolean;
}

export default function TikTokPhonePreview({ script, audioUrl, fantasyMode }: TikTokPhonePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Start playback when audio URL changes
  useEffect(() => {
    if (audioUrl && videoRef.current && audioRef.current) {
      startPlayback();
    }
  }, [audioUrl]);

  // Auto-advance script
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

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentIndex]);

  const startPlayback = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;
      Promise.all([
        videoRef.current.play().catch(() => {}),
        audioRef.current.play().catch(() => {}),
      ]).then(() => {
        setIsPlaying(true);
        setShowScript(true);
        setCurrentIndex(0);
        setIsDone(false);
      });
    }
  };

  const replay = () => {
    setIsPlaying(false);
    setTimeout(() => startPlayback(), 300);
  };

  return (
    <div
      className={`relative w-[280px] md:w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 ${
        fantasyMode ? 'border-purple-500/50 shadow-purple-500/30' : 'border-[#333]'
      } bg-black`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/mock-clip-1.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
      />
      <audio ref={audioRef} src={audioUrl} className="hidden" />

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          fantasyMode
            ? 'from-purple-900/90 via-purple-600/40 to-transparent'
            : 'from-black/85 via-black/30 to-transparent'
        } z-10`}
      />

      {/* Script Text */}
      <div
        ref={scrollRef}
        className="absolute bottom-0 w-full px-4 pb-6 text-white text-sm leading-relaxed overflow-y-auto max-h-48 z-20 space-y-2"
      >
        <AnimatePresence>
          {script.slice(0, currentIndex + 1).map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`${
                idx === currentIndex
                  ? fantasyMode
                    ? 'text-purple-300 font-semibold'
                    : 'text-[#C2886D] font-semibold'
                  : 'text-gray-300'
              }`}
            >
              <span
                className={`font-bold ${
                  fantasyMode ? 'text-purple-400' : 'text-[#C2886D]'
                }`}
              >
                {block.type.toUpperCase()}:
              </span>{' '}
              <span>{block.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Center Play Button */}
      {!isPlaying && !isDone && (
        <motion.button
          onClick={startPlayback}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              fantasyMode ? 'bg-purple-500' : 'bg-[#C2886D]'
            } shadow-lg`}
          >
            ▶
          </div>
        </motion.button>
      )}

      {/* Replay Button */}
      {isDone && (
        <motion.button
          onClick={replay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-4 right-4 text-xs px-3 py-1 ${
            fantasyMode ? 'bg-purple-500 text-white' : 'bg-[#C2886D] text-black'
          } rounded-md font-semibold hover:opacity-80 transition z-30`}
        >
          🔁 Replay
        </motion.button>
      )}
    </div>
  );
}