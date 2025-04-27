'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

// Your hardcoded scripts
const scripts = {
  'Fitness at Home': {
    'Hook Video': "🏋️‍♂️ Stop scrolling! Want a 5-minute workout that burns fat faster than running? 🔥 Stay tuned!",
    'Value Drop': "💡 Did you know 5-minute HIIT can burn more calories than a 5K run? Here's how to get started easily at home! 🏠",
  },
  'Starting a Side Hustle': {
    'Hook Video': "💸 Feeling stuck financially? Here's the simplest side hustle you can start TODAY with just your phone! 📱",
    'Value Drop': "🚀 1 side hustle you can start right now without quitting your job: Freelance writing! Build it in your free time! 🕒",
  },
  'Mindset Growth': {
    'Hook Video': "🧠 Ready to transform your life? It starts with ONE daily habit. Curious? Let's dive in. 🚀",
    'Value Drop': "🌱 Success isn't built overnight—it's built daily. One small consistent habit beats motivation every time! 🔥",
  }
};

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
  ],
};

export default function TryDemo() {
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormatIdx, setSelectedFormatIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'topic' | 'select' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
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

  function generateScript() {
    if (!selectedTopic || selectedFormatIdx === null) return;

    const format = videoFormats[style][selectedFormatIdx].title;
    const topicScripts = scripts[selectedTopic as keyof typeof scripts];
    const script = topicScripts ? topicScripts[format as keyof typeof topicScripts] : '';

    if (!script) {
      alert('⚡ This demo only supports specific topics and formats. Upgrade to unlock full generation!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setFullScript(script);
      setDisplayedScript('');
      setTyping(true);
      setLoading(false);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(false);
    }, 1000);
  }

  function generateVoice() {
    setLoading(true);
    setTimeout(() => {
      setAudioUrl('/mock-clip-1.mp4'); // mock audio
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
      }, 80); // slightly slower typing for better feel
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
                <motion.div
                  key="topics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🧠 Choose a Topic</h3>
                  <div className="space-y-2">
                    {Object.keys(scripts).map((topic) => (
                      <div
                        key={topic}
                        onClick={() => {
                          setSelectedTopic(topic);
                          setStep('select');
                        }}
                        className="cursor-pointer p-3 border rounded-lg hover:bg-[#111] transition"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 'select' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🎥 Choose Your Funnel Format</h3>
                  <p className="text-gray-400 text-sm mb-4">Each format mimics a proven viral TikTok structure.</p>
                  {videoFormats[style].map((format, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedFormatIdx(i)}
                      className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                        selectedFormatIdx === i
                          ? 'border-[#C2886D] bg-[#1a1a1a]'
                          : 'border-[#444] bg-[#111] hover:border-gray-500'
                      }`}
                    >
                      <div>
                        <div className="text-xl">{format.icon}</div>
                        <div className="font-medium">{format.title}</div>
                        <div className="text-gray-400 text-xs">{format.desc}</div>
                      </div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {(step === 'select' && selectedFormatIdx !== null) && (
                <div className="mt-6">
                  <LoadingButton onClick={generateScript} loading={loading}>
                    📝 Generate Script
                  </LoadingButton>
                </div>
              )}

              {step === 'script' && (
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

                  {/* Generate Voice Button */}
                  {!typing && !voiceReady && (
                    <div className="mt-6">
                      <LoadingButton onClick={generateVoice} loading={loading}>
                        🎙 Generate Voice
                      </LoadingButton>
                    </div>
                  )}

                  {voiceReady && !showPreviewButton && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-green-400 text-center mt-4 font-semibold"
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
                </motion.div>
              )}
            </AnimatePresence>

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

          {/* Right side - TikTok preview */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
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

// Reusable button
function LoadingButton({ onClick, loading, children }: { onClick: () => void; loading: boolean; children: React.ReactNode; }) {
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