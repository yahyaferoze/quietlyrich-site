'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';
import { topics } from '../lib/scripts';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import ProgressBar from '../components/ProgressBar';

type TryDemoProps = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

function LoadingButton({
  onClick,
  loading,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setDots((d) => (d.length < 3 ? d + '.' : '')), 350);
    return () => clearInterval(id);
  }, [loading]);

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={loading}
      whileTap={{ scale: 0.96 }}
      className={`w-full py-3 rounded-md font-semibold transition relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C2886D] ${
        loading
          ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-lg shadow-[#C2886D]/40'
          : 'bg-[#C2886D] text-black hover:shadow-md hover:shadow-[#C2886D]/40'
      }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-3 w-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
          <span className="text-black font-bold">Loading{dots}</span>
        </div>
      ) : (
        <span className="text-black font-bold">{children}</span>
      )}
    </motion.button>
  );
}

export default function TryDemo({ fantasyMode }: TryDemoProps) {
  type Step = 'topic' | 'format' | 'script' | 'voice' | 'previewGen' | 'preview';
  const [step, setStep] = useState<Step>('topic');

  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [fullScript, setFullScript] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('Deep Male Voice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScriptBox, setShowScriptBox] = useState(false);
  const [showPreviewPhone, setShowPreviewPhone] = useState(false);

  // Lead capture + share
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const shouldReduceMotion = useReducedMotion();

  const voices = useMemo(
    () => [
      { id: 1, name: 'Deep Male Voice' },
      { id: 2, name: 'Natural Female Voice' },
    ],
    []
  );

  const VOICE_MAP: Record<string, Record<string, Record<string, string>>> = {
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

  // central timeout/raf cleanup
  const timers = useRef<number[]>([]);
  const addTimer = (id: number) => timers.current.push(id);
  useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
  }, []);

  const scrollToAnchor = useCallback(
    (id: string, offset = -40, delay = 250) => {
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, delay);
      addTimer(t);
    },
    []
  );

  /* ------------------------------- Handlers ------------------------------ */

  const handleTopicSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault?.();
      const input = selectedTopic.toLowerCase().trim();
      const available = Object.keys(topics);

      // case-insensitive includes; also suggest nearest 3 if no match
      const matched = available.find((t) => t.toLowerCase().includes(input));
      if (!matched) {
        const near = available
          .map((t) => t.toLowerCase())
          .filter((t) => t.includes(input.slice(0, 3)))
          .slice(0, 3);
        setSuggestions(near);
        setError('❌ Topic not available in the demo. Try one of the suggestions below.');
        return;
      }

      setSelectedTopic(matched);
      setError('');
      setSuggestions([]);
      setStep('format');
      scrollToAnchor('step-anchor');
    },
    [selectedTopic, scrollToAnchor]
  );

  const handleFormatSelect = useCallback(
    (format: string) => {
      if (!selectedTopic) return;
      setSelectedFormat(format);

      const scripts = (topics as any)[selectedTopic.toLowerCase()]?.[format];
      if (!scripts) {
        setError('❌ This format is locked for this topic.');
        return;
      }

      setLoading(true);
      const t = window.setTimeout(() => {
        const combined = scripts.map((b: any) => `${b.type.toUpperCase()}: ${b.text}`).join('\n\n');

        setFullScript(combined);
        setDisplayedText('');
        setTyping(!shouldReduceMotion);
        setShowScriptBox(true);
        setStep('script');
        setVoiceReady(false);
        setShowPreviewButton(true);
        setLoading(false);
        scrollToAnchor('step-anchor');
        // focus the script textarea for keyboard users
        window.setTimeout(() => textareaRef.current?.focus(), 50);
      }, shouldReduceMotion ? 200 : 600);
      addTimer(t);
    },
    [selectedTopic, shouldReduceMotion, scrollToAnchor]
  );

  const generateVoice = useCallback(() => {
    setTransitioning(true);
    setShowScriptBox(true);

    const t = window.setTimeout(() => {
      const url = VOICE_MAP[selectedTopic]?.[selectedFormat]?.[selectedVoice];
      if (!url) {
        setError('❌ Voice file not found for this combination.');
        setTransitioning(false);
        return;
      }

      setAudioUrl(url);
      const a = new Audio(url);
      a.preload = 'auto';
      audioRef.current = a;

      setStep('voice');
      setVoiceReady(true);
      addTimer(
        window.setTimeout(() => setShowPreviewButton(true), shouldReduceMotion ? 50 : 150)
      );
      setTransitioning(false);
      scrollToAnchor('step-anchor', -180);
    }, shouldReduceMotion ? 150 : 400);
    addTimer(t);
  }, [selectedFormat, selectedTopic, selectedVoice, shouldReduceMotion, scrollToAnchor]);

  const generatePreview = useCallback(() => {
    if (!voiceReady) return; // guard
    setStep('previewGen');
    setShowPreviewPhone(false);

    addTimer(
      window.setTimeout(() => setStep('preview'), shouldReduceMotion ? 200 : 700)
    );
    addTimer(
      window.setTimeout(() => setShowPreviewPhone(true), shouldReduceMotion ? 250 : 1000)
    );
    addTimer(
      window.setTimeout(
        () => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        shouldReduceMotion ? 350 : 1300
      )
    );
  }, [voiceReady, shouldReduceMotion]);

  const parseScriptToBlocks = useCallback((script: string): { type: string; text: string }[] => {
    return script
      .split('\n')
      .filter((l) => l.trim() !== '')
      .map((line) => {
        const i = line.indexOf(':');
        if (i === -1) return { type: 'LINE', text: line.trim() };
        return { type: line.slice(0, i).trim(), text: line.slice(i + 1).trim() };
      });
  }, []);

  /* ---------------------------- Typing animation ---------------------------- */

  useEffect(() => {
    if (!typing || !fullScript) return;
    setDisplayedText('');

    let index = 0;
    let raf = 0;

    const stepType = () => {
      const chunk = window.innerWidth < 768 ? 3 : 2;
      setDisplayedText((prev) => prev + fullScript.slice(index, index + chunk));
      index += chunk;
      if (index < fullScript.length) {
        raf = window.requestAnimationFrame(stepType);
      } else {
        setTyping(false);
        const el = document.getElementById('voice-actions');
        if (window.innerWidth < 768 && el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    raf = window.requestAnimationFrame(stepType);
    return () => window.cancelAnimationFrame(raf);
  }, [typing, fullScript]);

  /* ------------------------------- Rendering ------------------------------ */

  return (
    <section className="py-8 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Sticky Header */}
        <div id="step-anchor" className="sticky top-0 z-20 bg-black pb-4 shadow-md shadow-[#C2886D]/10">
          <h2 className="text-4xl font-bold text-[#C2886D] text-center mb-2">Try QuietlyRich Demo</h2>
          <div className="max-w-xl mx-auto">
            <ProgressBar currentStep={step} />
          </div>
        </div>

        <p className="text-gray-400 text-center mb-6">
          Turn any idea into a voice-powered, scroll-stopping video. In 30 seconds.
        </p>

        {/* Two-Column Layout */}
        <motion.div layout className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
          {/* Left */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait" initial={false}>
              {step === 'topic' && (
                <motion.form
                  key="topic"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleTopicSubmit(e);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.35 }}
                  className="space-y-4"
                >
                  <span className="text-sm text-gray-500 mb-1 block">Step 1 of 5: Choose Your Topic</span>
                  <h3 className="text-xl font-semibold mb-1">🔍 What do you want to make a video about?</h3>
                  <p className="text-xs text-gray-400 italic mb-2">
                    Try: <span className="text-[#C2886D]">fitness at home</span> (demo topic)
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your topic…"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full bg-[#111] border-2 border-[#C2886D] p-3 rounded-md text-white placeholder-gray-500 text-sm"
                      aria-label="Topic"
                    />
                    <button
                      type="submit"
                      className="hidden sm:inline bg-[#C2886D] text-black px-4 rounded-md font-semibold"
                    >
                      Go
                    </button>
                  </div>

                  {error && <div className="text-red-400 text-sm">{error}</div>}

                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setSelectedTopic(s);
                            setError('');
                            setSuggestions([]);
                          }}
                          className="text-xs bg-[#111] border border-[#333] rounded-md py-2 px-3 hover:border-[#C2886D] transition"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {['fitness at home', 'budget eating', 'focus tips'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedTopic(s);
                          setError('');
                          setSuggestions([]);
                        }}
                        className="text-xs bg-[#111] border border-[#333] rounded-md py-2 hover:border-[#C2886D] transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <LoadingButton onClick={() => handleTopicSubmit()} loading={loading} ariaLabel="Search Topics">
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
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.35, delay: shouldReduceMotion ? 0 : 0.05 }}
                  className="space-y-4"
                >
                  <span className="text-sm text-gray-500 mb-1 block">Step 2 of 5: Choose a Funnel Format</span>
                  <h3 className="text-xl font-semibold mb-1">🛠 Choose a video style</h3>
                  <p className="text-xs text-gray-400 italic mb-2">Hook or value? Pick your approach.</p>

                  {['Hook Video', 'Value Drop'].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => handleFormatSelect(format)}
                      className="w-full flex justify-between items-center p-3 rounded-lg border h-20 cursor-pointer transition border-[#444] bg-[#111] hover:border-[#C2886D]"
                    >
                      <span className="font-medium">{format}</span>
                      <span className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex flex-col items-center" id="preview-right">
            {(step === 'topic' || step === 'format') && (
              <div className="text-center text-gray-400 mt-6 will-change-transform">
                <p>{step === 'topic' ? 'Waiting for your topic…' : 'Pick a format to continue…'}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Step 3: Script */}
        <AnimatePresence mode="wait" initial={false}>
          {step === 'script' && showScriptBox && !transitioning && (
            <motion.div
              key="script"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.4 }}
              className="flex flex-col mt-4 mb-2"
            >
              <span className="text-sm text-gray-500 mb-1 block">Step 3 of 5: Review Your Script</span>
              <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  readOnly
                  value={displayedText}
                  placeholder="Your generated script will appear here…"
                  className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                  style={{ minHeight: '420px', maxHeight: '520px' }}
                  aria-label="Generated script"
                />
                {typing && (
                  <div className="absolute bottom-2 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 4: Voice */}
        <AnimatePresence initial={false}>
          {step === 'voice' && !transitioning && (
            <motion.div
              key="voicepicker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.45 }}
              className="mt-10"
              id="voice-actions"
            >
              <Listbox value={selectedVoice} onChange={setSelectedVoice}>
                <div className="relative">
                  <Listbox.Label className="block mb-2 text-sm font-medium text-[#C2886D]">🎤 Pick Your Voice</Listbox.Label>
                  <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#111] py-3 pl-4 pr-10 text-left border border-[#C2886D] text-white focus:outline-none focus:ring-2 focus:ring-[#C2886D] focus:border-[#C2886D] transition">
                    <span className="block truncate">{selectedVoice}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronUpDownIcon className="h-5 w-5 text-[#C2886D]" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition as={React.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{voice.name}</span>
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

              <div className="mt-2 text-sm text-gray-400 text-center max-w-sm mx-auto">
                🚀 Want custom voices & HD export?{' '}
                <a href="/upgrade" className="underline text-[#C2886D]">Upgrade here</a>
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
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.35 }}
              className="mt-4"
            >
              <LoadingButton onClick={generateVoice} loading={loading} ariaLabel="Generate Voice">
                🎙 Generate Voice
              </LoadingButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Ready */}
        <AnimatePresence initial={false}>
          {step === 'voice' && voiceReady && !transitioning && (
            <motion.div
              key="voiceready"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.45 }}
              className="text-green-400 text-center mt-6 font-semibold flex items-center justify-center gap-2"
            >
              <span className="text-xl">✅</span>
              <span>Voice Ready! Tap below to preview.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Preview CTA */}
        <AnimatePresence initial={false}>
          {step === 'voice' && showPreviewButton && !transitioning && (
            <motion.div
              key="genpreview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, delay: shouldReduceMotion ? 0 : 0.15 }}
              className="mt-4"
            >
              <LoadingButton onClick={generatePreview} loading={false} ariaLabel="Generate Preview">
                🎬 Generate Video Preview
              </LoadingButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PreviewGen spinner */}
        {step === 'previewGen' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center text-[#C2886D] font-semibold mt-6">
            <div className="h-6 w-6 border-2 border-[#C2886D] border-t-transparent rounded-full animate-spin mr-3" />
            Generating Preview...
          </motion.div>
        )}

        {/* Step 5: Final Preview */}
        <AnimatePresence initial={false}>
          {step === 'preview' && (
            <motion.div
              ref={previewRef}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 26 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.6 }}
              className="relative w-full flex flex-col items-center mt-10 mb-10"
            >
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0.2 : 0.4 }} className="mb-4 text-sm text-[#C2886D] font-semibold tracking-wide text-center">
                🎬 Your Brand. In Motion.
              </motion.div>

              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl rounded-full bg-[#C2886D] opacity-20 animate-pulse w-[300px] h-[450px] z-0" />

              <AnimatePresence initial={false}>
                {showPreviewPhone && (
                  <motion.div
                    key="phone"
                    layoutId="tiktok-preview"
                    initial={{ opacity: 0, y: 70, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: shouldReduceMotion ? 0.6 : 1.0 }}
                    className="relative z-10 shadow-xl shadow-[#C2886D]/10"
                  >
                    <TikTokPhonePreview script={parseScriptToBlocks(fullScript)} audioUrl={audioUrl} />

                    {audioUrl && (
                      <button
                        onClick={() => {
                          const audio = audioRef.current;
                          if (!audio) return;
                          setIsPlaying(true);
                          audio.currentTime = 0;
                          audio.play().catch(() => {});
                          audio.onended = () => setIsPlaying(false);
                        }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#C2886D] text-black font-bold py-2 px-4 text-sm rounded-full shadow-md hover:scale-105 transition animate-pulse"
                      >
                        {isPlaying ? '🔁 Playing…' : '🔊 Play Voice'}
                      </button>
                    )}

                    <div className="absolute bottom-2 right-2 text-[10px] text-white/30">
                      Made with Quietly Rich
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {audioUrl && <audio ref={audioRef as any} src={audioUrl} className="hidden" preload="auto" />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky CTA band + SHARE + EMAIL capture */}
        <AnimatePresence initial={false}>
          {step === 'preview' && (
            <motion.div
              key="ctaband"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 52 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
              className="sticky bottom-0 z-30 bg-black/95 backdrop-blur border-t border-[#333] px-4 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
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

              {/* Share */}
              <button
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: 'My Quietly Rich preview',
                        text: 'Check out this AI-generated video preview I made in 60 seconds.',
                        url: window.location.href,
                      });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      addTimer(window.setTimeout(() => setCopied(false), 1500));
                    }
                  } catch {}
                }}
                className="text-xs text-white/80 underline"
              >
                {copied ? '✅ Link copied!' : 'Share / Copy Link'}
              </button>

              {/* Email capture (stub) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: wire to backend/email tool
                  setCopied(true);
                  addTimer(window.setTimeout(() => setCopied(false), 1500));
                }}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Send preview to my email"
                  className="w-full sm:w-64 bg-[#111] border border-[#333] rounded-md px-3 py-2 text-sm text-white placeholder:text-white/40"
                />
                <button type="submit" className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-xs">
                  Send
                </button>
              </form>

              <button
                onClick={() => {
                  const a = audioRef.current;
                  if (!a) return;
                  a.currentTime = 0;
                  a.play().catch(() => {});
                  setIsPlaying(true);
                  a.onended = () => setIsPlaying(false);
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
                  scrollToAnchor('step-anchor', -180, 250);
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