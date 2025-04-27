'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const topics = ['Home Fitness', 'Productivity Hacks', 'Personal Finance'];

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
    { icon: '🚀', title: 'Call to Action', desc: 'Get viewers to follow, click, or take action.' },
  ],
};

const demoScripts: any = {
  'Home Fitness': {
    'Hook Video': `
🏋️‍♂️ STOP scrolling! Did you know you can burn fat faster than running… from your living room? 🔥  
In just 5 minutes a day, you can fire up your metabolism and start seeing real results without needing any equipment!  
No excuses, no fancy gear — just you, your body, and a crazy-effective routine.  
Stick around because in the next few seconds, I'll break down the moves that torch calories FAST. 💥  
Ready to transform your body with zero gym membership? Let's get it! 🚀
`,
  },
  'Productivity Hacks': {
    'Value Drop': `
🚀 Feeling stuck and unproductive lately?  
Here's a game-changing hack used by top entrepreneurs that almost nobody talks about...  
It's called the 5-Minute Rule. 🧠  
Before starting any task, tell yourself you'll work on it for just 5 minutes.  
Most of the time, once you start, momentum kicks in, and you'll finish the whole thing! 🔥  
No more procrastination. No more overwhelming to-do lists.  
Small steps lead to massive results. Save this trick — it could change your life! 💼✨
`,
  },
  'Personal Finance': {
    'Hook Video': `
💰 Stop wasting money on things you don't even remember buying!  
Want to know the one spending habit that's quietly draining your bank account every month? 😱  
It's called **Lifestyle Creep** — as your income rises, your spending secretly does too.  
New gadgets, fancy coffees, impulsive upgrades... they add up fast.  
But the trick? Lock your lifestyle now, even as your income grows.  
That way, your savings explode without you feeling deprived. 🚀  
Hit that follow button for more no-BS money tips that actually WORK! 🧠💵
`,
  },
};

export default function TryDemo() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'selectTopic' | 'selectFormat' | 'script' | 'voice' | 'previewGen' | 'preview'>('selectTopic');
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
    if (selectedTopic && selectedIdx !== null) {
      const stepData = videoFormats[style][selectedIdx];
      const script = demoScripts[selectedTopic]?.[stepData.title] || 'No script available.';
      setFullScript(script.trim());
      setDisplayedScript('');
      setLoading(false);
      setTyping(true);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(false);
    }
  }

  function generateVoice() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVoiceReady(true);
      setTimeout(() => {
        setShowPreviewButton(true);
      }, 1000);
    }, 2000);
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
      }, 20);
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
              {step === 'selectTopic' && (
                <motion.div
                  key="topics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🔍 Choose a Topic</h3>
                  <p className="text-gray-400 text-sm mb-4">Pick what you're interested in generating content about!</p>
                  {topics.map((topic, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setStep('selectFormat');
                      }}
                      className="p-4 bg-[#111] border border-[#444] hover:border-gray-500 rounded-lg cursor-pointer"
                    >
                      {topic}
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 'selectFormat' && (
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

              {step !== 'selectTopic' && step !== 'selectFormat' && (
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
              {selectedIdx !== null && step === 'selectFormat' && (
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
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative z-10"
              >
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
      className={`w-full py-3 rounded-md font-semibold transition relative overflow-hidden ${
        loading ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-lg shadow-[#C2886D]/40' : 'bg-[#C2886D] text-black hover:shadow-md hover:shadow-[#C2886D]/40'
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