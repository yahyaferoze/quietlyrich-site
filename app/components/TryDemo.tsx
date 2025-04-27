'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

// 🎯 Hardcoded Fake Scripts for Formats
const fakeScripts = [
  `🎬 [Scene: Energetic background music, person smiling at camera]\n\n🗣 "Want to hack your mornings? Here's the 1 trick that successful people SWEAR by. Stick around..."`,
  
  `🎬 [Scene: Quick shots of fun daily moments]\n\n🗣 "Feeling overwhelmed? Here's a 10-second mental reset that could change everything. Let's go!"`,
];

// 🎯 Formats
const videoFormats = [
  { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly.' },
  { icon: '💡', title: 'Value Drop', desc: 'Deliver surprising value.' },
  { icon: '🚀', title: 'Call to Action', desc: 'Prompt followers (Locked)', locked: true },
];

export default function TryDemo() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'select' | 'script' | 'preview'>('select');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleFormatSelect(idx: number) {
    if (videoFormats[idx].locked) return; // Prevent selecting locked cards
    setSelectedIdx(idx);
    setDisplayedScript(fakeScripts[idx]);
    setStep('script');
  }

  function generatePreview() {
    setLoading(true);
    setTimeout(() => {
      setStep('preview');
      setLoading(false);
    }, 1500); // Fake loading spinner
  }

  function playAudio() {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(() => {});
    }
  }

  return (
    <section className="py-12 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#C2886D] text-center mb-2">Try QuietlyRich Demo</h2>
        <p className="text-gray-400 text-center mb-10">
          Explore fake AI scripts and TikTok-style previews.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🛠 Choose Your Funnel Format</h3>
                  <p className="text-gray-400 text-sm mb-4">Each format mimics a viral TikTok structure.</p>
                  {videoFormats.map((step, i) => (
                    <div
                      key={i}
                      onClick={() => handleFormatSelect(i)}
                      className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                        step.locked
                          ? 'border-gray-700 bg-[#222] opacity-50 cursor-not-allowed'
                          : 'border-[#444] bg-[#111] hover:border-gray-500'
                      }`}
                    >
                      <div>
                        <div className="text-xl">{step.icon}</div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-gray-400 text-xs">{step.desc}</div>
                      </div>
                      {step.locked ? (
                        <button className="bg-gray-700 text-gray-400 px-3 py-1 rounded-md text-sm cursor-not-allowed">
                          Go Pro →
                        </button>
                      ) : (
                        <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 'script' && selectedIdx !== null && (
                <motion.div
                  key="script-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
                  <textarea
                    readOnly
                    value={displayedScript}
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-none"
                    style={{ minHeight: '460px' }}
                  />
                  <div className="mt-4 space-y-4">
                    <LoadingButton onClick={generatePreview} loading={loading}>
                      🎬 Generate Preview
                    </LoadingButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'preview' && (
              <div className="relative flex flex-col items-center -mt-4">
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="relative z-10 shadow-xl shadow-[#C2886D]/10"
                >
                  <TikTokPhonePreview script={displayedScript} audioUrl={audioUrl} />
                  <audio ref={audioRef} className="hidden" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable LoadingButton
function LoadingButton({
  onClick,
  loading,
  children,
}: {
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      className={`w-full py-3 rounded-md font-semibold transition relative overflow-hidden ${
        loading
          ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-lg shadow-[#C2886D]/40'
          : 'bg-[#C2886D] text-black hover:shadow-md hover:shadow-[#C2886D]/40'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
          <span className="text-black font-bold">Loading...</span>
        </div>
      ) : (
        <span className="text-black font-bold">{children}</span>
      )}
    </motion.button>
  );
}