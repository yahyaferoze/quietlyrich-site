'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';
import { topics } from '../lib/scripts';

export default function TryDemo() {
  const [step, setStep] = useState<'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [fullScript, setFullScript] = useState<string>('');
  const [displayedText, setDisplayedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dots, setDots] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 400);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topicInput = selectedTopic.toLowerCase().trim();
    const availableTopics = Object.keys(topics);
    const matchedTopic = availableTopics.find(topic => topic.includes(topicInput));

    if (matchedTopic) {
      setSelectedTopic(matchedTopic);
      setError('');
      setStep('format');
    } else {
      setError('❌ This topic is not available in the demo. Upgrade to unlock full access!');
    }
  };

  const handleFormatSelect = async (format: string) => {
    setSelectedFormat(format);
    if (!selectedTopic) return;

    const topicKey = selectedTopic.toLowerCase().trim();
    const scripts = (topics as any)[topicKey]?.[format];

    if (!scripts) {
      setError('❌ This format is locked for this topic.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const combined = scripts.map((block: any) => `${block.type.toUpperCase()}: ${block.text}`).join('\n\n');
      setFullScript(combined);
      setDisplayedText('');
      setTyping(true);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(false);
      setLoading(false);
    }, 800);
  };

  async function generateVoice() {
    setLoading(true);
    setTimeout(() => {
      setAudioUrl('/voice-fitness-2.mp3');
      setVoiceReady(true);
      setLoading(false);
      setTimeout(() => {
        setShowPreviewButton(true);
      }, 1500);
    }, 1200);
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
      const delayBeforeTyping = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayedText((prev) => prev + fullScript[index]);
          index++;
          if (index >= fullScript.length) {
            clearInterval(interval);
            setTyping(false);
          }
        }, 40); // 40ms = slower smooth typing
      }, 1000); // 1000ms = 1 second delay before typing starts

      return () => clearTimeout(delayBeforeTyping);
    }
  }, [typing, fullScript]);

  useEffect(() => {
    if (textareaRef.current && typing) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText, typing]);

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
                <motion.form
                  onSubmit={handleTopicSubmit}
                  key="topic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🔍 Enter Your Topic</h3>
                  <input
                    type="text"
                    placeholder="e.g. Fitness, Skin care, Focus, Budget Eating..."
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-3 rounded-md text-white placeholder-gray-500 text-sm"
                  />
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  <LoadingButton onClick={() => {}} loading={loading}>
                    Search Topics
                  </LoadingButton>
                </motion.form>
              )}

              {step === 'format' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold mb-1">🛠 Choose Your Funnel Format</h3>
                  {['Hook Video', 'Value Drop'].map((format) => (
                    <div
                      key={format}
                      onClick={() => handleFormatSelect(format)}
                      className="flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition border-[#444] bg-[#111] hover:border-[#C2886D]"
                    >
                      <div className="font-medium">{format}</div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {(step === 'script' || step === 'voice' || step === 'previewGen' || step === 'preview') && (
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
                      value={displayedText}
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
              {step === 'voice' && voiceReady && !showPreviewButton && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-green-400 text-center mt-2"
                >
                  ✅ Voice Ready!
                </motion.div>
              )}
              {step === 'voice' && showPreviewButton && (
                <LoadingButton onClick={generatePreview} loading={false}>
                  🎬 Generate Preview
                </LoadingButton>
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

          {/* Right Side */}
          {/* TikTokPhonePreview here */}
        </div>
      </div>
    </section>
  );
}

// 🔥 Reusable Loading Button
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