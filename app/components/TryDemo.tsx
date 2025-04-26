'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
    { icon: '🚀', title: 'Call to Action', desc: 'Get viewers to follow, click, or take action.' },
  ],
};

export default function TryDemo() {
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'select' | 'script' | 'voice' | 'previewGen' | 'preview'>('select');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (loading) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(dotsInterval);
    }
  }, [loading]);

  const [dots, setDots] = useState('');

  async function generateScript() {
    if (selectedIdx === null) return;
    setLoading(true);
    const stepData = videoFormats[style][selectedIdx];
    const res = await fetch('/api/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        funnelStyle: style,
        stepTitle: stepData.title,
        stepDesc: stepData.desc,
      }),
    });
    const { script = '' } = await res.json();
    setFullScript(script);
    setDisplayedScript('');
    setLoading(false);
    setTyping(true);
    setStep('script');
    setVoiceReady(false);
    setShowPreviewButton(false);
  }

  async function generateVoice() {
    setLoading(true);
    const res = await fetch('/api/generate-voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script: fullScript }),
    });
    const { audioUrl = '' } = await res.json();
    setAudioUrl(audioUrl);
    setLoading(false);
    setVoiceReady(true);

    // Delay before showing Preview Button
    setTimeout(() => {
      setShowPreviewButton(true);
    }, 1500);
  }

  function generatePreview() {
    setStep('previewGen');
    setTimeout(() => {
      setStep('preview');
    }, 2000); // Longer delay to let spinner show clearly
  }

  function playAudio() {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(() => {});
    }
  }

  useEffect(() => {
    if (typing && fullScript.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedScript((prev) => prev + fullScript[index]);
        index++;
        if (index >= fullScript.length) {
          clearInterval(interval);
          setTyping(false);
          setStep('voice');
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [typing, fullScript]);

  useEffect(() => {
    if (textareaRef.current && typing) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedScript, typing]);

  return (
    <section className="py-12 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#C2886D] text-center mb-2">Try QuietlyRich Demo</h2>
        <p className="text-gray-400 text-center mb-10">
          Explore AI-generated TikTok funnels & voice-powered scripts.
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
                  <p className="text-gray-400 text-sm mb-4">Each format mimics a proven viral TikTok structure.</p>
                  {videoFormats[style].map((step, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedIdx(i)}
                      className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                        selectedIdx === i
                          ? 'border-[#C2886D] bg-[#1a1a1a]'
                          : 'border-[#444] bg-[#111] hover:border-gray-500'
                      }`}
                    >
                      <div>
                        <div className="text-xl">{step.icon}</div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-gray-400 text-xs">{step.desc}</div>
                      </div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {step !== 'select' && (
                <motion.div
                  key="script-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      readOnly
                      value={displayedScript}
                      placeholder="Your generated script will appear here…"
                      className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                      style={{ minHeight: '460px', maxHeight: '520px' }}
                    />
                    {typing && (
                      <div className="absolute bottom-2 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="mt-6 space-y-4">
              {step === 'select' && (
                <LoadingButton onClick={generateScript} loading={loading}>
                  📝 Generate Script
                </LoadingButton>
              )}

              {step === 'voice' && !typing && (
                <>
                  {!voiceReady && (
                    <LoadingButton onClick={generateVoice} loading={loading}>
                      🎙 Generate Voice
                    </LoadingButton>
                  )}
                  {voiceReady && !showPreviewButton && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-green-400 text-center mt-2"
                    >
                      ✅ Voice Ready!
                    </motion.div>
                  )}
                  {showPreviewButton && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                      <LoadingButton onClick={generatePreview} loading={false}>
                        🎬 Generate Preview
                      </LoadingButton>
                    </motion.div>
                  )}
                </>
              )}

              {step === 'previewGen' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center items-center text-[#C2886D] font-semibold mt-4"
                >
                  <div className="h-6 w-6 border-2 border-[#C2886D] border-t-transparent rounded-full animate-spin mr-3" />
                  Generating Preview...
                </motion.div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'previewGen' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="h-16 w-16 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#C2886D] font-semibold">Preparing Preview...</p>
              </motion.div>
            )}

            {step === 'preview' && (
              <div className="relative flex flex-col items-center -mt-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 text-sm text-[#C2886D] font-semibold tracking-wide"
                >
                  🎬 Preview Mode
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full bg-[#C2886D] opacity-20 animate-pulse w-[300px] h-[450px] z-0" />

                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="relative z-10 shadow-xl shadow-[#C2886D]/10"
                >
                  <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
                  <audio ref={audioRef} className="hidden" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 pointer-events-none animate-[pulse_2s_infinite]" />
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
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

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
          <span className="text-black font-bold">Generating{dots}</span>
        </div>
      ) : (
        <span className="text-black font-bold">{children}</span>
      )}
    </motion.button>
  );
}