'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const topics = ['Fitness at Home', 'Tech Gadgets', 'Healthy Eating'];

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
    { icon: '🚀', title: 'Call to Action (Pro)', desc: 'Get viewers to follow, click, or take action.' },
  ],
};

export default function TryDemo() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (loading) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(dotsInterval);
    }
  }, [loading]);

  function getFakeScript(topic: string, formatIdx: number) {
    if (topic === 'Fitness at Home') {
      return formatIdx === 0
        ? "🏋️‍♂️ STOP scrolling! Here's the ONE home workout secret you need! No gym, no excuses, just results! 🔥"
        : "🏡 Build strength at home with just 10 minutes a day! These moves will change your fitness game. 💪";
    } else if (topic === 'Tech Gadgets') {
      return formatIdx === 0
        ? "🤯 This tiny gadget will change how you work forever. You won’t believe what it can do! ⚡️"
        : "🔌 Here are 3 gadgets under $50 that are must-haves for tech lovers in 2025! 🔥";
    } else if (topic === 'Healthy Eating') {
      return formatIdx === 0
        ? "🥗 Think healthy food is boring? Think again! This quick recipe will blow your mind! 💥"
        : "🍎 5 healthy snacks you can prepare in under 5 minutes that still taste AMAZING! 👨‍🍳";
    }
    return "Start your journey with us!";
  }

  async function generateScript() {
    if (selectedTopic === null || selectedIdx === null) return;
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200)); // fake loading delay

    const fakeScript = getFakeScript(selectedTopic, selectedIdx);

    setFullScript(fakeScript);
    setDisplayedScript('');
    setLoading(false);
    setTyping(true);
    setStep('script');
    setVoiceReady(false);
    setShowPreviewButton(false);
  }

  async function generateVoice() {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200)); // fake voice loading

    setAudioUrl('/mock-voice.mp3'); // fake audio
    setLoading(false);
    setVoiceReady(true);

    setTimeout(() => {
      setShowPreviewButton(true);
    }, 1200);
  }

  function generatePreview() {
    setStep('previewGen');
    setTimeout(() => {
      setStep('preview');
    }, 1800);
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
        <p className="text-gray-400 text-center mb-10">Explore AI-generated TikTok funnels & voice-powered scripts.</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div key="topics-formats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Topic Selection */}
                  {!selectedTopic && (
                    <div className="space-y-4 mb-8">
                      <h3 className="text-xl font-semibold mb-1">🎯 Choose a Topic</h3>
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setSelectedTopic(topic)}
                          className="w-full p-4 rounded-lg border border-[#444] hover:border-[#888] bg-[#111] hover:bg-[#1a1a1a] transition text-left"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Format Selection */}
                  {selectedTopic && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold mb-1">🛠 Choose Funnel Format</h3>
                      {videoFormats[style].map((step, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            if (i === 2) return; // Lock Pro format
                            setSelectedIdx(i);
                          }}
                          className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                            selectedIdx === i
                              ? 'border-[#C2886D] bg-[#1a1a1a]'
                              : 'border-[#444] bg-[#111] hover:border-gray-500'
                          } ${i === 2 && 'opacity-50 cursor-not-allowed'}`}
                        >
                          <div>
                            <div className="text-xl">{step.icon}</div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-gray-400 text-xs">{step.desc}</div>
                          </div>
                          <button
                            className={`${
                              i === 2
                                ? 'bg-gray-600 text-white cursor-not-allowed'
                                : 'bg-[#C2886D] text-black'
                            } px-3 py-1 rounded-md text-sm`}
                          >
                            {i === 2 ? 'Go Pro' : 'Use →'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {step !== 'select' && (
                <motion.div key="script-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
              {step === 'select' && selectedIdx !== null && selectedTopic && (
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
                      className="text-green-400 text-center mt-2"
                    >
                      ✅ Voice Ready!
                    </motion.div>
                  )}
                  {showPreviewButton && (
                    <LoadingButton onClick={generatePreview} loading={false}>
                      🎬 Generate Preview
                    </LoadingButton>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'previewGen' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                <div className="h-16 w-16 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#C2886D] font-semibold">Preparing Preview...</p>
              </motion.div>
            )}

            {step === 'preview' && (
              <div className="relative flex flex-col items-center -mt-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-sm text-[#C2886D] font-semibold tracking-wide">
                  🎬 Preview Mode
                </motion.div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full bg-[#C2886D] opacity-20 animate-pulse w-[300px] h-[450px] z-0" />

                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
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

// Loading Button
function LoadingButton({ onClick, loading, children }: { onClick: () => void; loading: boolean; children: React.ReactNode }) {
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