'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function RealPreview({
  script,
  audioUrl,
  videoUrl
}: {
  script: string;
  audioUrl: string;
  videoUrl: string;
}) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scriptLines = script.split(/\n+/).filter(line => line.trim());

  const handlePlay = () => {
    if (!audioUrl || scriptLines.length === 0) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentLine(0);
    setIsPlaying(true);

    audio.onloadeddata = () => {
      audio.play().catch(() => {});
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
    <div className="flex flex-col md:flex-row gap-6 mt-8 items-center justify-center">
      {/* Script block */}
      <div className="bg-[#111] border border-[#333] p-4 rounded-md w-full md:w-1/2 max-h-[280px] overflow-y-auto">
        {scriptLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: i === currentLine ? 1 : 0.4, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`mb-2 text-sm ${i === currentLine ? "text-white" : "text-gray-400"}`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Phone-style mockup */}
      <div className="relative w-[220px] h-[440px] border-[12px] border-black rounded-[2rem] overflow-hidden shadow-xl bg-black">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <audio ref={audioRef} />
        <div className="absolute bottom-4 left-0 w-full px-3 text-white text-xs bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <motion.p
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {scriptLines[currentLine] || ""}
          </motion.p>
        </div>
      </div>

      {/* Control */}
      <button
        onClick={handlePlay}
        className="mt-6 md:mt-0 bg-[#C2886D] text-black px-4 py-2 rounded-md font-semibold"
      >
        ▶️ Play Full Preview
      </button>
    </div>
  );
}