'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';
import { topics } from '../lib/scripts';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import ProgressBar from '../components/ProgressBar';

// Voice context (if needed)
import { useFantasyMode } from './FantasyModeContext';

type TryDemoProps = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

function LoadingButton({
  onClick,
  loading,
  children,
}: {
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
}) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (loading) {
      const id = setInterval(() => setDots(d => (d.length < 3 ? d + '.' : '')), 400);
      return () => clearInterval(id);
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

export default function TryDemo({ fantasyMode, setFantasyMode }: TryDemoProps) {
  const [step, setStep] = useState<'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview'>('topic');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [fullScript, setFullScript] = useState<string>('');
  const [displayedText, setDisplayedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(true);
  const [error, setError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Deep Male Voice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScriptBox, setShowScriptBox] = useState(false);
  const [showPreviewPhone, setShowPreviewPhone] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const voices = [
    { id: 1, name: 'Deep Male Voice' },
    { id: 2, name: 'Natural Female Voice' },
  ];

  const voiceMap: Record<string, Record<string, Record<string, string>>> = {
    'fitness at home': {
      'Hook Video': {
        'Deep Male Voice': '/fitnessmale.mp3',
        'Natural Female Voice': '/fitnessfemale.mp3',
      },
      'Value Drop': {
        'Deep Male Voice': '/fitnessmalevd.mp3',
        'Natural Female Voice': '/fitnessfemalevd.mp3',
      },
    },
  };

  // --- Only scroll after animation is done! ---
  const scrollToAnchor = (id: string, offset: number = -40) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 350); // Wait for animation to finish!
  };

  // --- Step functions ---

  const generateVoice = async () => {
    setTransitioning(true);
    setShowScriptBox(false);
    setTimeout(() => {
      const url = voiceMap[selectedTopic]?.[selectedFormat]?.[selectedVoice];
      if (url) {
        setAudioUrl(url);
        setStep('voice');
        setVoiceReady(true);
        setTimeout(() => setShowPreviewButton(true), 200);
      } else {
        setError('❌ Voice file not found for this combination.');
      }
      setTransitioning(false);
      scrollToAnchor('step-anchor', -180);
    }, 500);
  };

  const generatePreview = async () => {
    setStep('previewGen');
    setShowPreviewPhone(false);

    setTimeout(() => setStep('preview'), 800);

    setTimeout(() => setShowPreviewPhone(true), 1100);

    setTimeout(() => {
      if (previewRef.current) {
        previewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1500);
  };

  const parseScriptToBlocks = (script: string): { type: string; text: string }[] => {
    const lines = script.split('\n').filter(line => line.trim() !== '');
    const blocks: { type: string; text: string }[] = [];
    lines.forEach(line => {
      const splitIndex = line.indexOf(':');
      if (splitIndex !== -1) {
        blocks.push({
          type: line.substring(0, splitIndex).trim(),
          text: line.substring(splitIndex + 1).trim(),
        });
      }
    });
    return blocks;
  };

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topicInput = selectedTopic.toLowerCase().trim();
    const availableTopics = Object.keys(topics);
    const matchedTopic = availableTopics.find(topic =>
      topic.includes(topicInput)
    );
    if (matchedTopic) {
      setSelectedTopic(matchedTopic);
      setError('');
      setStep('format');
      setTimeout(() => scrollToAnchor('step-anchor'), 300);
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
      const combined = scripts
        .map((block: any) => `${block.type.toUpperCase()}: ${block.text}`)
        .join('\n\n');
      setFullScript(combined);
      setDisplayedText('');
      setTyping(true);
      setShowScriptBox(false);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(true);
      setLoading(false);
      setTimeout(() => scrollToAnchor('step-anchor'), 350);
    }, 800);
  };

  // --- Typing animation: requestAnimationFrame loop for smoothness! ---
  useEffect(() => {
    if (typing && fullScript) {
      setShowScriptBox(true);
      setDisplayedText('');
      let index = 0;
      let frame: number;
      const type = () => {
        setDisplayedText(prev => prev + fullScript[index]);
        index++;
        if (index < fullScript.length) {
          frame = window.requestAnimationFrame(type);
        } else {
          setTyping(false);
          const el = document.getElementById('voice-actions');
          if (window.innerWidth < 768 && el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      };
      frame = window.requestAnimationFrame(type);
      return () => window.cancelAnimationFrame(frame);
    }
  }, [typing, fullScript]);

  return (
    <section className="py-8 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-black pb-4 shadow-md shadow-[#C2886D]/10" id="step-anchor">
          <h2 className="text-4xl font-bold text-[#C2886D] text-center mb-2">
            Try QuietlyRich Demo
          </h2>
          <div className="max-w-xl mx-auto">
            <ProgressBar currentStep={step} />
          </div>
        </div>

        <p className="text-gray-400 text-center mb-6">
          Turn any idea into a voice-powered, scroll-stopping video. In 30 seconds.
        </p>

        {/* Two-Column Layout */}
        <motion.div layout className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait" initial={false}>
              {step === 'topic' && (
                <motion.form
                  key="topic"
                  onSubmit={handleTopicSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="text-sm text-gray-500 mb-1 block">
                    Step 1 of 5: Choose Your Topic
                  </span>
                  <h3 className="text-xl font-semibold mb-1">
                    🔍 What do you want to make a video about?
                  </h3>
                  <p className="text-xs text-gray-400 italic mb-2">
                    For example:{' '}
                    <span className="text-[#C2886D]">Why rich people stay quiet</span>,{' '}
                    <span className="text-[#C2886D]">Budget eating</span>,{' '}
                    <span className="text-[#C2886D]">Focus tips</span>...
                  </p>
                  <input
                    type="text"
                    placeholder="Type your topic..."
                    value={selectedTopic}
                    onChange={e => setSelectedTopic(e.target.value)}
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-3 rounded-md text-white placeholder-gray-500 text-sm"
                  />
                  {error && <div className="text-red-400 text-sm">{error}</div>}
                  <LoadingButton
                    onClick={() => {
                      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                      handleTopicSubmit(fakeEvent);
                    }}
                    loading={loading}
                  >
                    🔎 Search Topics
                  </LoadingButton>
                </motion.form>
              )}

              {step === 'format' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-4"
                >
                  <span className="text-sm text-gray-500 mb-1 block">
                    Step 2 of 5: Choose a Funnel Format
                  </span>
                  <h3 className="text-xl font-semibold mb-1">🛠 Choose a video style</h3>
                  <p className="text-xs text-gray-400 italic mb-2">
                    Want to hook viewers or drop pure value? Pick your approach.
                  </p>
                  {['Hook Video', 'Value Drop'].map(format => (
                    <div
                      key={format}
                      onClick={() => handleFormatSelect(format)}
                      className="flex justify-between items-center p-3 rounded-lg border h-24 cursor-pointer transition border-[#444] bg-[#111] hover:border-[#C2886D]"
                    >
                      <div className="font-medium">{format}</div>
                      <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">
                        Use →
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column Placeholder */}
          <div className="w-full lg:w-1/2 flex flex-col items-center" id="preview-right">
            {(step === 'topic' || step === 'format') && (
              <div className="text-center text-gray-400 mt-6">
                <p>Loading {step === 'topic' ? 'Topic Options' : 'Formats'}...</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Step 3: Script Reveal */}
        <AnimatePresence mode="wait" initial={false}>
          {step === 'script' && showScriptBox && !transitioning && (
            <motion.div
              key="script"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col mt-4 mb-2"
            >
              <span className="text-sm text-gray-500 mb-1 block">
                Step 3 of 5: Review Your Script
              </span>
              <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  readOnly
                  value={displayedText}
                  placeholder="Your generated script will appear here…"
                  className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                  style={{ minHeight: '480px', maxHeight: '520px' }}
                />
                {typing && (
                  <div className="absolute bottom-2 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Voice Picker */}
        <AnimatePresence initial={false}>
          {step === 'voice' && !transitioning && (
            <motion.div
              key="voicepicker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
              id="voice-actions"
            >
              <Listbox value={selectedVoice} onChange={setSelectedVoice}>
                <div className="relative">
                  <Listbox.Label className="block mb-2 text-sm font-medium text-[#C2886D]">
                    🎤 Pick Your Voice
                  </Listbox.Label>
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
                      {voices.map(voice => (
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
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {voice.name}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <CheckIcon className="h-5 w-5 text-black" aria-hidden="true" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              <div className="glow-text mt-2 text-sm text-gray-400 text-center max-w-sm mx-auto">
                🚀 Want to use your own voice or unlock more?{' '}
                <a href="/upgrade" className="underline text-[#C2886D]">
                  Upgrade here
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Voice CTA */}
        <AnimatePresence initial={false}>
          {step === 'script' && showScriptBox && !transitioning && (
            <motion.div
              key="genvoice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              <LoadingButton onClick={generateVoice} loading={loading}>
                🎙 Generate Voice
              </LoadingButton>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ✅ Voice Ready confirmation */}
        <AnimatePresence initial={false}>
          {step === 'voice' && voiceReady && !transitioning && (
            <motion.div
              key="voiceready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-green-400 text-center mt-6 font-semibold flex items-center justify-center gap-2"
            >
              <span className="text-xl">✅</span>
              <span>Voice Ready! Tap below to preview.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎬 Generate Video Preview CTA */}
        <AnimatePresence initial={false}>
          {step === 'voice' && showPreviewButton && !transitioning && (
            <motion.div
              key="genpreview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <LoadingButton onClick={generatePreview} loading={false}>
                🎬 Generate Video Preview
              </LoadingButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔄 Loading Spinner During PreviewGen */}
        {step === 'previewGen' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center text-[#C2886D] font-semibold mt-6"
          >
            <div className="h-6 w-6 border-2 border-[#C2886D] border-t-transparent rounded-full animate-spin mr-3" />
            Generating Preview...
          </motion.div>
        )}

        {/* Step 5: Final Preview */}
        <AnimatePresence initial={false}>
          {step === 'preview' && (
            <motion.div
              ref={previewRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative w-full flex flex-col items-center mt-10 mb-10"
            >
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 text-sm text-[#C2886D] font-semibold tracking-wide text-center"
              >
                🎬 Your Brand. In Motion.
              </motion.div>

              {/* Glow Aura Behind Preview */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full bg-[#C2886D] opacity-20 animate-pulse w-[300px] h-[450px] z-0" />

              <AnimatePresence initial={false}>
                {showPreviewPhone && (
                  <motion.div
                    key="phone"
                    layoutId="tiktok-preview"
                    initial={{ opacity: 0, y: 80, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="relative z-10 shadow-xl shadow-[#C2886D]/10"
                  >
                    <TikTokPhonePreview
                      script={parseScriptToBlocks(fullScript)}
                      audioUrl={audioUrl}
                    />

                    {audioUrl && (
                      <button
                        onClick={() => {
                          const audio = document.getElementById('preview-audio') as HTMLAudioElement;
                          if (audio) {
                            setIsPlaying(true);
                            audio.currentTime = 0;
                            audio.play();
                            audio.onended = () => setIsPlaying(false);
                          }
                        }}
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#C2886D] text-black font-bold py-2 px-4 text-sm rounded-full shadow-md hover:scale-105 transition animate-pulse"
                      >
                        {isPlaying ? '🔁 Playing...' : '🔊 Play Voice'}
                      </button>
                    )}

                    <div className="absolute bottom-2 right-2 text-[10px] text-white opacity-30">
                      Made with Quietly Rich
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {audioUrl && (
                <audio id="preview-audio" src={audioUrl} className="hidden" preload="auto" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* ✅ Sticky CTA Band */}
        <AnimatePresence initial={false}>
          {step === 'preview' && (
            <motion.div
              key="ctaband"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.7 }}
              className="sticky bottom-0 z-30 bg-black border-t border-[#333] px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
            >
              <a href="/demo-output">
                <button className="bg-[#C2886D] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3745b] transition w-full sm:w-auto">
                  🎉 See Your Full Brand Kit →
                </button>
              </a>
              <a href="/upgrade">
                <button className="bg-[#C2886D] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3745b] transition w-full sm:w-auto">
                  🚀 Upgrade & Unlock More
                </button>
              </a>
              <button
                onClick={() => {
                  const audio = document.getElementById('preview-audio') as HTMLAudioElement;
                  if (audio) {
                    audio.currentTime = 0;
                    audio.play();
                    setIsPlaying(true);
                    audio.onended = () => setIsPlaying(false);
                  }
                }}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                🔁 Replay Voice
              </button>
              <button
                onClick={() => {
                  setStep('topic');
                  setSelectedTopic('');
                  setSelectedFormat('');
                  setDisplayedText('');
                  setFullScript('');
                  setVoiceReady(false);
                  setAudioUrl('');
                  setIsPlaying(false);
                  setTimeout(() => scrollToAnchor('step-anchor', -180), 350);
                }}
                className="text-xs text-gray-500 hover:text-white underline"
              >
                🔄 Start Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
