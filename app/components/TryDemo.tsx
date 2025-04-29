'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';
import { topics } from '../lib/scripts';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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
  const [selectedVoice, setSelectedVoice] = useState('Deep Male Voice');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dots, setDots] = useState('');

  const voices = [
    { id: 1, name: 'Deep Male Voice' },
    { id: 2, name: 'Natural Female Voice' },
  ];

  useEffect(() => {
    if (loading) {
      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 600);
      return () => clearInterval(dotsInterval);
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
      let file = '/voice-fitness-2.mp3'; // default fallback

      if (selectedTopic.toLowerCase() === 'fitness at home') {
        if (selectedFormat === 'Hook Video') {
          file = selectedVoice === 'Deep Male Voice' ? '/fitnessmale.mp3' : '/fitnessfemale.mp3';
        } else if (selectedFormat === 'Value Drop') {
          file = selectedVoice === 'Deep Male Voice' ? '/fitnessmalevd.mp3' : '/fitnessfemalevd.mp3';
        }
      }

      setAudioUrl(file);
      setVoiceReady(true);
      setLoading(false);
      setStep('voice');
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
      const delayedStart = setTimeout(() => {
        async function typeScript() {
          while (index < fullScript.length) {
            setDisplayedText(prev => prev + fullScript[index]);
            if (fullScript[index] === '\n' && fullScript[index + 1] === '\n') {
              await new Promise(resolve => setTimeout(resolve, 300));
            } else {
              await new Promise(resolve => setTimeout(resolve, 18));
            }
            index++;
          }
          setTyping(false);
        }
        typeScript();
      }, 700);
      return () => clearTimeout(delayedStart);
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

            {/* Voice Selector */}
            {step === 'script' && (
              <div className="mt-6">
                <Listbox value={selectedVoice} onChange={setSelectedVoice}>
                  <div className="relative">
                    <Listbox.Label className="block mb-2 text-sm font-medium text-[#C2886D]">🎤 Choose a Voice</Listbox.Label>
                    <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#111] py-3 pl-4 pr-10 text-left border border-[#C2886D] text-white focus:outline-none focus:ring-2 focus:ring-[#C2886D] focus:border-[#C2886D] transition">
                      <span className="block truncate">{selectedVoice}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronUpDownIcon className="h-5 w-5 text-[#C2886D]" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-[#111] py-1 text-base shadow-lg ring-1 ring-[#C2886D] focus:outline-none sm:text-sm z-50">
                        {voices.map((voice) => (
                          <Listbox.Option
                            key={voice.id}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-[#C2886D] text-black' : 'text-white'
                              }`
                            }
                            value={voice.name}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {voice.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <CheckIcon className="h-5 w-5 text-black" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>

                {/* 🌟 Glow Upgrade Message */}
                <div className="glow-text">
                  🚀 More premium voices & custom voice cloning available on upgrade!
                </div>
              </div>
            )}
            <div className="mt-2 text-xs text-center text-gray-400">
              Want your own cloned voice? <span className="text-[#C2886D] font-semibold">Upgrade now!</span>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-4">
              {step === 'script' && (
                <LoadingButton onClick={generateVoice} loading={loading}>
                  🎙 Generate Voice
                </LoadingButton>
              )}
              {step === 'voice' && voiceReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-green-400 text-center mt-4"
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
          <div className="flex justify-center items-center pt-2 min-h-[500px] relative">
            {step === 'previewGen' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
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
                  <TikTokPhonePreview script={[]} audioUrl={audioUrl} />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable Button Component
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