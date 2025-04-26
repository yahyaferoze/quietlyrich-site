'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakePreview({ script, audioUrl }: { script: string; audioUrl?: string }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scriptLines = script?.split(/\n+/).filter(line => line.trim()) || [];

  const handlePlay = () => {
    if (!audioUrl || scriptLines.length === 0) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentLine(0);
    setIsPlaying(true);
    setIsLoadingAudio(true);

    audio.onloadeddata = () => {
      setIsLoadingAudio(false);
      audio.play().catch(err => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });

      const duration = audio.duration || 6;
      const interval = duration / scriptLines.length;

      let index = 0;
      intervalRef.current = setInterval(() => {
        setCurrentLine(index);
        index++;
        if (index >= scriptLines.length) {
          clearInterval(intervalRef.current!);
        }
      }, interval * 1000);
    };
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="bg-[#111] border border-[#333] rounded-md p-4 max-h-[240px] overflow-y-auto text-left">
      <div className="space-y-2">
        {scriptLines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: index === currentLine ? 1 : 0.4, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`transition-opacity duration-300 ${index === currentLine ? 'text-white' : 'text-gray-400'}`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {audioUrl && (
        <button
          onClick={handlePlay}
          disabled={isLoadingAudio}
          className={`mt-4 w-full py-2 rounded-md font-semibold ${
            isLoadingAudio ? "bg-gray-500 cursor-not-allowed" : "bg-[#C2886D] text-black"
          }`}
        >
          {isLoadingAudio ? "🔄 Loading..." : "▶️ Play Voice Preview"}
        </button>
      )}
    </div>
  );
}