'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const topics = {
  'Fitness Motivation': {
    'Hook Video': [
      "🏋️‍♂️ Ready to transform your life in just 30 days? Start today with one push-up. Tomorrow? Two. It’s not about intensity, it's about consistency!",
      "💥 Want to break your limits? It all starts with the decision to try. One rep, one set, one day at a time."
    ],
    'Value Drop': [
      "💡 Top Tip: To build real muscle, focus on progressive overload — increase the weight or reps every week, even if it's just a little!",
      "💡 Want faster results? Prioritize compound movements like squats, deadlifts, and push-ups — they train multiple muscles at once!"
    ],
  },
  'Mindset Growth': {
    'Hook Video': [
      "🧠 90% of success is built on habits you don’t even notice. If you win your morning, you win your day.",
      "🔥 They told you it’s impossible. Prove them wrong — quietly, consistently, daily."
    ],
    'Value Drop': [
      "💡 Mind Trick: Visualize your future self every morning — it's scientifically proven to boost motivation and action-taking.",
      "💡 Quick Tip: 5 minutes of gratitude journaling rewires your brain for positivity and resilience."
    ],
  },
  'Online Business': {
    'Hook Video': [
      "💻 Why work 40 years for a boss when you can build your dream life online in 2-5 years?",
      "🤑 The laptop lifestyle isn’t a myth — it’s a method. Start small, stay consistent, scale smart."
    ],
    'Value Drop': [
      "💡 Secret: Most online entrepreneurs fail because they chase money, not mastery. Build skills first, profits follow.",
      "💡 Want more leads? Focus on storytelling, not selling. Stories create emotional trust — the #1 sales driver."
    ],
  },
} as const;

type Topic = keyof typeof topics;
type Format = keyof (typeof topics)[Topic];

export default function TryDemo() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'select-topic' | 'select-format' | 'script' | 'voice' | 'previewGen' | 'preview'>('select-topic');
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
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

  function handleTopicSelect(topic: Topic) {
    setSelectedTopic(topic);
    setStep('select-format');
  }

  function handleFormatSelect(format: Format) {
    setSelectedFormat(format);
  }

  async function generateScript() {
    if (!selectedTopic || !selectedFormat) return;
    setLoading(true);
    setDisplayedScript('');
    setTimeout(() => {
      const scripts = topics[selectedTopic][selectedFormat];
      const script = scripts[scriptIndex % scripts.length];
      setFullScript(script);
      setScriptIndex(prev => prev + 1);
      setLoading(false);
      setTyping(true);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(false);
    }, 1000);
  }

  async function generateVoice() {
    setLoading(true);
    setTimeout(() => {
      setAudioUrl('/mock-voice.mp3'); // Static demo voice for now
      setLoading(false);
      setVoiceReady(true);
      setTimeout(() => {
        setShowPreviewButton(true);
      }, 1000);
    }, 1000);
  }

  function generatePreview() {
    setStep('previewGen');
    setTimeout(() => {
      setStep('preview');
    }, 2000);
  }

  useEffect(() => {
    if (typing && fullScript.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedScript(prev => prev + fullScript[index]);
        index++;
        if (index >= fullScript.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 50); // Typing speed
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
          {/* Left side */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'select-topic' && (
                <motion.div
                  key="topics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🎯 Choose a Topic</h3>
                  <p className="text-gray-400 text-sm mb-4">Select the topic you want to generate a TikTok video for.</p>
                  {Object.keys(topics).map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleTopicSelect(topic as Topic)}
                      className="flex justify-between items-center p-3 rounded-lg border h-20 cursor-pointer transition border-[#444] bg-[#111] hover:border-gray-500"
                    >
                      <div className="font-medium">{topic}</div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Select →</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 'select-format' && selectedTopic && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🎬 Choose Your Funnel Format</h3>
                  <p className="text-gray-400 text-sm mb-4">Pick the TikTok style you want.</p>
                  {Object.keys(topics[selectedTopic]).map((format, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleFormatSelect(format as Format)}
                      className="flex justify-between items-center p-3 rounded-lg border h-20 cursor-pointer transition border-[#444] bg-[#111] hover:border-gray-500"
                    >
                      <div className="font-medium">{format}</div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                    </div>
                  ))}

                  {selectedFormat && (
                    <div className="mt-6">
                      <LoadingButton onClick={generateScript} loading={loading}>
                        📝 Generate Script
                      </LoadingButton>
                    </div>
                  )}
                </motion.div>
              )}

              {['script', 'voice', 'previewGen', 'preview'].includes(step) && (
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="mt-6 space-y-4">
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
            </div>
          </div>

          {/* Right side */}
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

                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="relative z-10 shadow-xl shadow-[#C2886D]/10"
                >
                  <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
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

// Loading Button
function LoadingButton({ onClick, loading, children }: { onClick: () => void; loading: boolean; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      className={`w-full py-3 rounded-md font-semibold transition ${
        loading ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse' : 'bg-[#C2886D] text-black hover:shadow-md hover:shadow-[#C2886D]/40'
      }`}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  );
}