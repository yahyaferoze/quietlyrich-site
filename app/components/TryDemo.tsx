'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const topics = {
  fitness: {
    name: '🏋️ Fitness at Home',
    scripts: {
      hook: "Feeling stuck at home? 🏡🔥 Discover the 3 simplest exercises you can do TODAY to sculpt your dream body — without leaving your living room! Let's GO 💪✨",
      value: "Building strength from your living room is easier than you think! 🏡💥 Here are 3 power moves you can master at home to stay fit, energized, and unstoppable. Ready? 🚀",
    },
  },
  skincare: {
    name: '💧 Skincare Secrets',
    scripts: {
      hook: "Think your skincare routine is working? 😳 Think again! Here's the 1 mistake 90% of people make daily — and how to FIX it. ✨",
      value: "Want glowing skin without spending £££? 🌟💰 Here are 2 natural ingredients dermatologists SWEAR by. No filter needed after this! 📸",
    },
  },
  productivity: {
    name: '📈 Productivity Hacks',
    scripts: {
      hook: "Still making to-do lists? 📝 That's why you're stuck! Here’s a mind-blowing 3-minute trick to crush your day like a pro. 💥",
      value: "Work smarter, not harder! 💼✨ Here’s how you can reclaim 10 extra hours a week — starting today. Let’s break it down step-by-step! ⏳",
    },
  },
};

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful.' },
    { icon: '🚀', title: 'Call to Action (Locked)', desc: 'Pro users only.', locked: true },
  ],
};

export default function TryDemo() {
  const [selectedTopic, setSelectedTopic] = useState<keyof typeof topics | null>(null);
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('/mock-voice.mp3');
  const [step, setStep] = useState<'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
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

  function selectTopic(topic: keyof typeof topics) {
    setSelectedTopic(topic);
    setStep('format');
  }

  function selectFormat(idx: number) {
    if (videoFormats[style][idx].locked) return;
    setSelectedIdx(idx);
  }

  function generateScript() {
    if (!selectedTopic || selectedIdx === null) return;
    setLoading(true);
    const formatType = selectedIdx === 0 ? 'hook' : 'value';
    const script = topics[selectedTopic].scripts[formatType];
    setTimeout(() => {
      setFullScript(script);
      setDisplayedScript('');
      setLoading(false);
      setTyping(true);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(false);
    }, 1000);
  }

  function generateVoice() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVoiceReady(true);
      setTimeout(() => setShowPreviewButton(true), 1200);
    }, 1200);
  }

  function generatePreview() {
    setStep('previewGen');
    setTimeout(() => setStep('preview'), 2000);
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
          <div>
            <AnimatePresence mode="wait">
              {step === 'topic' && (
                <motion.div
                  key="topics"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-3">🎯 Choose a Topic</h3>
                  {Object.entries(topics).map(([key, topic]) => (
                    <button
                      key={key}
                      onClick={() => selectTopic(key as keyof typeof topics)}
                      className="w-full bg-[#111] border border-[#444] hover:border-[#C2886D] hover:bg-[#1a1a1a] text-white rounded-lg p-4 text-left"
                    >
                      {topic.name}
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 'format' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-3">🛠 Choose a Funnel Format</h3>
                  {videoFormats[style].map((format, i) => (
                    <div
                      key={i}
                      onClick={() => selectFormat(i)}
                      className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                        selectedIdx === i
                          ? 'border-[#C2886D] bg-[#1a1a1a]'
                          : format.locked
                          ? 'border-[#333] bg-[#111] opacity-60 hover:bg-[#222]'
                          : 'border-[#444] bg-[#111] hover:border-gray-500'
                      }`}
                    >
                      <div>
                        <div className="text-xl">{format.icon}</div>
                        <div className="font-medium">{format.title}</div>
                        <div className="text-gray-400 text-xs">{format.desc}</div>
                      </div>
                      {!format.locked && (
                        <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                      )}
                    </div>
                  ))}

                  {selectedIdx !== null && !videoFormats[style][selectedIdx].locked && (
                    <LoadingButton onClick={generateScript} loading={loading}>
                      📝 Generate Script
                    </LoadingButton>
                  )}
                </motion.div>
              )}

              {step === 'script' && (
                <motion.div
                  key="script-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
                  <textarea
                    ref={textareaRef}
                    readOnly
                    value={displayedScript}
                    placeholder="Script generating..."
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                    style={{ minHeight: '460px', maxHeight: '520px' }}
                  />
                  {typing && (
                    <div className="h-1 bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse mt-2 rounded-full" />
                  )}
                </motion.div>
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
                      className="text-green-400 text-center mt-4 font-semibold"
                    >
                      ✅ Voice Ready!
                    </motion.div>
                  )}
                  {showPreviewButton && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                      <LoadingButton onClick={generatePreview} loading={false}>
                        🎬 Generate Preview
                      </LoadingButton>
                    </motion.div>
                  )}
                </>
              )}

              {step === 'previewGen' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <div className="h-12 w-12 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-[#C2886D] font-semibold">Preparing Preview...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone preview */}
          <div className="flex justify-center items-center">
            {step === 'preview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex flex-col items-center"
              >
                <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
          ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-lg'
          : 'bg-[#C2886D] text-black hover:shadow-md'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
          <span className="text-black font-bold">Loading{dots}</span>
        </div>
      ) : (
        <span className="text-black font-bold">{children}</span>
      )}
    </motion.button>
  );
}