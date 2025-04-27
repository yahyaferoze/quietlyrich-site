'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const topics = [
  { title: 'Home Fitness', desc: 'Get fit without leaving your house!' },
  { title: 'Budget Travel', desc: 'Travel the world without breaking the bank.' },
  { title: 'Self-Improvement', desc: 'Unlock your best self with daily habits.' },
];

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
    { icon: '🚀', title: 'Call to Action', desc: 'Get viewers to follow, click, or take action.', locked: true },
  ],
};

export default function TryDemo() {
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number | null>(null);
  const [selectedFormatIdx, setSelectedFormatIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('/mock-voice.mp3');
  const [step, setStep] = useState<'topic' | 'select' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [dots, setDots] = useState('');
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

  function getFakeScript(topic: string, formatIdx: number) {
    if (topic === 'Home Fitness') {
      if (formatIdx === 0) {
        return "🏠 Ready to transform your living room into a fitness studio? Let's get moving! 💪✨";
      } else if (formatIdx === 1) {
        return "🚀 Here are 3 quick exercises you can do at home with ZERO equipment!";
      }
    }
    if (topic === 'Budget Travel') {
      if (formatIdx === 0) {
        return "✈️ Want to fly to paradise for under £200? Here's how you can make it happen!";
      } else if (formatIdx === 1) {
        return "🌍 5 destinations where your money goes further than you think!";
      }
    }
    if (topic === 'Self-Improvement') {
      if (formatIdx === 0) {
        return "🧠 One tiny change can completely transform your future... Ready to learn it?";
      } else if (formatIdx === 1) {
        return "📚 3 simple habits that made me 10x more productive and happy.";
      }
    }
    return "Start creating your viral journey! 🚀";
  }

  async function generateScript() {
    if (selectedFormatIdx === null || selectedTopicIdx === null) return;
    setLoading(true);

    const topic = topics[selectedTopicIdx].title;
    const fakeScript = getFakeScript(topic, selectedFormatIdx);

    setTimeout(() => {
      setFullScript(fakeScript);
      setDisplayedScript('');
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
      setLoading(false);
      setVoiceReady(true);
      setTimeout(() => {
        setShowPreviewButton(true);
      }, 1500);
    }, 1500);
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
                <motion.div
                  key="topics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🎯 Choose a Topic</h3>
                  <p className="text-gray-400 text-sm mb-4">Select a niche to preview content ideas!</p>
                  {topics.map((topic, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedTopicIdx(i);
                        setStep('select');
                      }}
                      className="flex justify-between items-center p-3 rounded-lg border h-20 cursor-pointer transition border-[#444] bg-[#111] hover:border-gray-500"
                    >
                      <div>
                        <div className="font-medium">{topic.title}</div>
                        <div className="text-gray-400 text-xs">{topic.desc}</div>
                      </div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Select →</button>
                    </div>
                  ))}
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
                  <h3 className="text-xl font-semibold mb-1">🛠 Choose Your Funnel Format</h3>
                  <p className="text-gray-400 text-sm mb-4">Each format mimics a proven viral TikTok structure.</p>
                  {videoFormats[style].map((step, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (step.locked) return;
                        setSelectedFormatIdx(i);
                        generateScript();
                      }}
                      className={`flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition ${
                        step.locked
                          ? 'border-[#555] bg-[#222] opacity-50 cursor-not-allowed hover:bg-[#111]'
                          : 'border-[#444] bg-[#111] hover:border-gray-500'
                      }`}
                    >
                      <div>
                        <div className="text-xl">{step.icon}</div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-gray-400 text-xs">{step.desc}</div>
                      </div>
                      {step.locked ? (
                        <div className="bg-[#444] text-white px-3 py-1 rounded-md text-sm font-semibold">Go Pro 🔒</div>
                      ) : (
                        <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                      )}
                    </div>
                  ))}
                </motion.div>
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
                    {typing && (
                      <div className="absolute bottom-2 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse" />
                    )}
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
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
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
                <audio ref={audioRef} className="hidden" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
      className={`w-full py-3 rounded-md font-semibold transition ${
        loading
          ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-md'
          : 'bg-[#C2886D] text-black hover:shadow-md'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 border-2 border-white border-t-transparent animate-spin rounded-full" />
          <span className="text-black">Generating{dots}</span>
        </div>
      ) : (
        <span className="text-black">{children}</span>
      )}
    </motion.button>
  );
}