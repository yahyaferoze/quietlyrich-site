'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

// --- Topic Definitions ---
const topics = {
  fitness: {
    name: "🏋️‍♂️ Fitness Motivation",
    scripts: [
      "Imagine transforming your body in just 15 minutes a day! 🏃‍♂️✨ Stick around, because I'm about to show you 3 simple moves you can do right at home — no equipment needed!",
      "Tired of feeling stuck with your workouts? 😩 There's ONE small change you can make today that’ll completely shift your fitness journey. Stick around, I’ll show you how!"
    ],
  },
  business: {
    name: "💼 Small Business Growth",
    scripts: [
      "STOP wasting money on ads that don’t convert! 🚫💸 I'm about to reveal a secret marketing hack used by businesses making 6-figures a month. Ready?",
      "Ever wonder why some small businesses explode overnight? 🤔💥 It comes down to one strategy — and I’m giving it to you today. Watch closely!"
    ],
  },
  travel: {
    name: "🌍 Travel Hacks",
    scripts: [
      "Want to fly first class for economy prices? ✈️💺 Stay tuned because I’m dropping the best-kept travel secrets airlines don’t want you to know!",
      "This ONE website saved me over £500 on my last holiday 🏖️🛫 — and no, it’s not what you think. Watch ‘til the end to find out!"
    ],
  },
};

const formats = [
  { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
  { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
  { icon: '🚀', title: 'Call to Action', desc: 'Encourage viewers to act (Locked - Go Pro)', locked: true },
];

export default function TryDemo() {
  const [selectedTopic, setSelectedTopic] = useState<keyof typeof topics | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('/mock-voice.mp3'); // Mocked voice
  const [step, setStep] = useState<'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [dots, setDots] = useState('');

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

  function selectTopic(topic: keyof typeof topics) {
    setSelectedTopic(topic);
    setStep('format');
  }

  function selectFormat(index: number) {
    if (formats[index].locked) {
      alert('This format is only available with Pro Access!');
      return;
    }
    setSelectedFormat(index);
    generateScript(index);
  }

  async function generateScript(formatIdx: number) {
    if (selectedTopic === null) return;
    setLoading(true);
    const script = topics[selectedTopic].scripts[formatIdx];
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
      setTimeout(() => {
        setShowPreviewButton(true);
      }, 1000);
    }, 1500);
  }

  function generatePreview() {
    setStep('previewGen');
    setTimeout(() => {
      setStep('preview');
    }, 1500);
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
              {step === 'topic' && (
                <motion.div key="topics" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-semibold mb-2">🎯 Pick a Topic</h3>
                  <div className="space-y-4">
                    {Object.entries(topics).map(([key, value]) => (
                      <div key={key}
                        onClick={() => selectTopic(key as keyof typeof topics)}
                        className="p-4 bg-[#111] rounded-lg border border-[#444] hover:border-[#C2886D] cursor-pointer"
                      >
                        <div className="font-bold">{value.name}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'format' && (
                <motion.div key="formats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-semibold mb-2 mt-6">🛠 Choose Your Funnel Format</h3>
                  <div className="space-y-4">
                    {formats.map((format, i) => (
                      <div key={i}
                        onClick={() => selectFormat(i)}
                        className={`flex justify-between items-center p-4 rounded-lg border h-24 cursor-pointer transition ${
                          format.locked
                            ? 'border-[#555] bg-[#222] hover:bg-[#1a1a1a]'
                            : 'border-[#444] bg-[#111] hover:border-[#C2886D]'
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
                        {format.locked && (
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">🔒 Go Pro</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'script' && (
                <motion.div key="script-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
              {step === 'script' && (
                <LoadingButton onClick={generateVoice} loading={loading}>
                  🎙 Generate Voice
                </LoadingButton>
              )}

              {step === 'voice' && (
                <>
                  {!voiceReady && (
                    <LoadingButton onClick={generateVoice} loading={loading}>
                      🎙 Generate Voice
                    </LoadingButton>
                  )}
                  {voiceReady && !showPreviewButton && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-green-400 text-center mt-2">✅ Voice Ready!</div>
                    </motion.div>
                  )}
                  {showPreviewButton && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <LoadingButton onClick={generatePreview} loading={false}>
                        🎬 Generate Preview
                      </LoadingButton>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {(step === 'previewGen' || step === 'preview') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                {step === 'previewGen' && (
                  <>
                    <div className="h-16 w-16 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[#C2886D] font-semibold">Preparing Preview...</p>
                  </>
                )}
                {step === 'preview' && (
                  <div className="relative flex flex-col items-center -mt-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full bg-[#C2886D] opacity-20 animate-pulse w-[300px] h-[450px] z-0" />
                    <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
                    <audio ref={audioRef} className="hidden" />
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- LoadingButton ---
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