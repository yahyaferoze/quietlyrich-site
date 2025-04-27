'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

const supportedTopics = ['fitness', 'small business', 'travel vlogs'];

const videoFormats = {
  classic: [
    { icon: '🎯', title: 'Hook Video', desc: 'Grab attention instantly with a question, fact, or bold claim.' },
    { icon: '💡', title: 'Value Drop', desc: 'Deliver something useful, educational or surprising.' },
    { icon: '🚀', title: 'Call to Action', desc: 'Get viewers to follow, click, or take action.' },
  ],
};

const scriptsDatabase: Record<string, Record<string, string>> = {
  fitness: {
    'Hook Video': "🎥 [Scene: Home workout setup]\n\nText on screen: 'STOP scrolling! 🛑 Ready to transform your body at home?' \n\n[Cut to Trainer]: 'Did you know you can burn 300 calories in just 15 minutes without any equipment? Let’s go!'",
    'Value Drop': "🏋️‍♂️ [Trainer demonstrating] \n\nVoiceover: 'Top 3 home exercises to burn fat fast: 1) Burpees, 2) Jump squats, 3) Mountain climbers. No gym needed, just your willpower!'",
  },
  'small business': {
    'Hook Video': "📦 [Scene: Packing orders]\n\nText on screen: 'Thinking about starting your own business? 💭'\n\n[Owner speaking]: 'The biggest mistake new entrepreneurs make... and how you can avoid it!'",
    'Value Drop': "💡 [Owner at desk] \n\nVoiceover: 'Here are 3 marketing tips that skyrocketed our small business sales: 1) Personalize emails, 2) Showcase customer stories, 3) Offer exclusive deals.'",
  },
  'travel vlogs': {
    'Hook Video': "✈️ [Scene: Airplane window shot]\n\nText on screen: 'Dreaming of your next adventure? 🌍'\n\n[Vlogger speaking]: 'Let me show you 3 hidden gems you’ve never seen before!'",
    'Value Drop': "🌟 [Walking through colorful streets]\n\nVoiceover: 'Here’s why traveling solo will change your life — confidence, new cultures, endless memories. Let’s explore together!'",
  },
};

export default function TryDemo() {
  const [style] = useState<keyof typeof videoFormats>('classic');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [fullScript, setFullScript] = useState('');
  const [displayedScript, setDisplayedScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'topic' | 'unsupported' | 'select' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [userTopic, setUserTopic] = useState('');
  const [dots, setDots] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

  async function handleTopicSubmit() {
    if (!userTopic.trim()) return;
    const normalized = userTopic.trim().toLowerCase();
    if (supportedTopics.includes(normalized)) {
      setStep('select');
    } else {
      setStep('unsupported');
    }
  }

  async function generateScript() {
    if (selectedIdx === null) return;
    setLoading(true);
    const topic = userTopic.trim().toLowerCase();
    const stepData = videoFormats[style][selectedIdx];
    const script = scriptsDatabase[topic]?.[stepData.title] || 'Coming soon...';
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
    // In real, call your API here
    await new Promise((res) => setTimeout(res, 1500));
    setAudioUrl('/mock-voice.mp3'); // Placeholder
    setLoading(false);
    setVoiceReady(true);
    setTimeout(() => {
      setShowPreviewButton(true);
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
        setDisplayedScript((prev) => prev + fullScript[index]);
        index++;
        if (index >= fullScript.length) {
          clearInterval(interval);
          setTyping(false);
          setStep('voice');
        }
      }, 35);
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
          {/* Left Side */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'topic' && (
                <motion.div key="topic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-2">🎯 Pick a Topic</h3>
                  <input
                    value={userTopic}
                    onChange={(e) => setUserTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTopicSubmit()}
                    placeholder="E.g., Fitness, Small Business, Travel Vlogs"
                    className="w-full p-3 bg-[#111] text-white rounded-md border border-[#333] placeholder-gray-500 focus:outline-none"
                  />
                  <LoadingButton onClick={handleTopicSubmit} loading={false}>
                    Next →
                  </LoadingButton>
                </motion.div>
              )}

              {step === 'unsupported' && (
                <motion.div key="unsupported" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <h3 className="text-xl font-semibold text-[#C2886D] mb-2">🔒 Upgrade Required</h3>
                  <p className="text-gray-400 mb-6">This topic isn't available in the demo. Unlock custom generation by upgrading.</p>
                  <LoadingButton onClick={() => setStep('topic')} loading={false}>
                    🔙 Back
                  </LoadingButton>
                </motion.div>
              )}

              {step === 'select' && (
                <motion.div key="formats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-2">🛠 Choose Your Funnel Format</h3>
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
                  {selectedIdx !== null && (
                    <LoadingButton onClick={generateScript} loading={loading}>
                      📝 Generate Script
                    </LoadingButton>
                  )}
                </motion.div>
              )}

              {(step === 'script' || step === 'voice') && (
                <motion.div key="scriptbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
                  <textarea
                    ref={textareaRef}
                    readOnly
                    value={displayedScript}
                    placeholder="Your script will appear here…"
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                    style={{ minHeight: '460px', maxHeight: '520px' }}
                  />
                  {step === 'voice' && !typing && (
                    <>
                      {!voiceReady && (
                        <LoadingButton onClick={generateVoice} loading={loading}>
                          🎙 Generate Voice
                        </LoadingButton>
                      )}
                      {voiceReady && (
                        <>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-green-400 text-center mt-2">
                            ✅ Voice Ready!
                          </motion.div>
                          {showPreviewButton && (
                            <LoadingButton onClick={generatePreview} loading={false}>
                              🎬 Generate Preview
                            </LoadingButton>
                          )}
                        </>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'previewGen' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                <div className="h-16 w-16 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#C2886D] font-semibold">Preparing Preview...</p>
              </motion.div>
            )}
            {step === 'preview' && (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Button
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
          <span className="text-black font-bold">Loading{dots}</span>
        </div>
      ) : (
        <span className="text-black font-bold">{children}</span>
      )}
    </motion.button>
  );
}