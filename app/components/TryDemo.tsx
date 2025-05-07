'use client';

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';
import { topics } from '../lib/scripts';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function TryDemo() {
  const [step, setStep] = useState<'topic'|'format'|'script'|'voice'|'previewGen'|'preview'>('topic');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [fullScript, setFullScript] = useState<string>('');
  const [displayedText, setDisplayedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(true);
  const [error, setError] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Deep Male Voice');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [dots, setDots] = useState('');

  const voices = [
    { id: 1, name: 'Deep Male Voice' },
    { id: 2, name: 'Natural Female Voice' },
  ];

  const parseScriptToBlocks = (script: string) => {
    const lines = script.split('\n').filter(l => l.trim() !== '');
    return lines.map(line => {
      const idx = line.indexOf(':');
      return {
        type: line.substring(0, idx).trim(),
        text: line.substring(idx + 1).trim()
      };
    });
  };

  // Loading button dots
  useEffect(() => {
    if (loading) {
      const i = setInterval(() => setDots(d => (d.length < 3 ? d + '.' : '')), 600);
      return () => clearInterval(i);
    }
  }, [loading]);

  const handleTopicSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const input = selectedTopic.toLowerCase().trim();
    const match = Object.keys(topics).find(t => t.includes(input));
    if (match) {
      setSelectedTopic(match);
      setError('');
      setStep('format');
    } else {
      setError('❌ This topic is not available in the demo. Upgrade to unlock full access!');
    }
  };

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
    if (!selectedTopic) return;
    const key = selectedTopic.toLowerCase().trim();
    const scripts = (topics as any)[key]?.[format];
    if (!scripts) {
      setError('❌ This format is locked for this topic.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const combined = scripts.map((b: any) => `${b.type.toUpperCase()}: ${b.text}`).join('\n\n');
      setFullScript(combined);
      setDisplayedText('');
      setTyping(true);
      setStep('script');
      setVoiceReady(false);
      setShowPreviewButton(true);
      setLoading(false);
    }, 800);
  };

  const generateVoice = () => {
    setLoading(true);
    setTimeout(() => {
      let file = '/voice-fitness-2.mp3';
      if (selectedTopic.toLowerCase() === 'fitness at home') {
        file = selectedFormat === 'Hook Video'
          ? (selectedVoice==='Deep Male Voice' ? '/fitnessmale.mp3' : '/fitnessfemale.mp3')
          : (selectedVoice==='Deep Male Voice' ? '/fitnessmalevd.mp3' : '/fitnessfemalevd.mp3');
      }
      setAudioUrl(file);
      setVoiceReady(true);
      setLoading(false);
      setStep('voice');
    }, 1000);
  };

  const generatePreview = () => {
    localStorage.setItem('brandKit', JSON.stringify({
      topic: selectedTopic,
      format: selectedFormat,
      voice: selectedVoice,
      script: fullScript,
      audioUrl
    }));
    setStep('previewGen');
    setTimeout(() => setStep('preview'), 2000);
  };

  // Typing animation
  useEffect(() => {
    if (!typing || !fullScript) return;
    let i = 0;
    const start = setTimeout(() => {
      (async () => {
        while (i < fullScript.length) {
          setDisplayedText(d => d + fullScript[i]);
          await new Promise(r => setTimeout(r, fullScript[i]==='\n' && fullScript[i+1]==='\n'? 300 : 18));
          i++;
        }
        setTyping(false);
      })();
    }, 700);
    return () => clearTimeout(start);
  }, [typing, fullScript]);

  // Auto-scroll
  useEffect(() => {
    if (textareaRef.current && typing) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText, typing]);

  return (
    <section className="py-20 md:py-28 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid md:grid-cols-[1fr_380px] gap-12 md:gap-20 items-start">
        {/* Left column */}
        <div>
          <AnimatePresence mode="wait">
            {step==='topic' && (
              <motion.form
                onSubmit={handleTopicSubmit}
                key="topic"
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }}
                className="space-y-4"
              >
                <span className="text-sm text-gray-500">Step 1 of 5: Choose Your Topic</span>
                <h3 className="text-xl font-semibold">🔍 Enter Your Topic</h3>
                <p className="text-xs text-gray-400 italic">What niche do you want to dominate today?</p>
                <input
                  type="text"
                  placeholder="e.g. Fitness, Skin care, Focus..."
                  value={selectedTopic}
                  onChange={e => setSelectedTopic(e.target.value)}
                  className="w-full bg-[#111] border-2 border-[#C2886D] p-3 rounded-md text-white placeholder-gray-500 text-sm"
                />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <LoadingButton onClick={handleTopicSubmit} loading={loading}>
                  Search Topics
                </LoadingButton>
              </motion.form>
            )}

            {step==='format' && (
              <motion.div
                key="format"
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0 }}
                className="space-y-4"
              >
                <span className="text-sm text-gray-500">Step 2 of 5: Choose a Funnel Format</span>
                <h3 className="text-xl font-semibold">🛠 Choose Your Funnel Format</h3>
                <p className="text-xs text-gray-400 italic">First impressions count—pick wisely.</p>
                {['Hook Video','Value Drop'].map(fmt => (
                  <div
                    key={fmt}
                    onClick={()=>handleFormatSelect(fmt)}
                    className="flex justify-between items-center p-4 border rounded-lg bg-[#111] hover:border-[#C2886D] cursor-pointer transition"
                  >
                    <span className="font-medium">{fmt}</span>
                    <button className="bg-[#C2886D] text-black px-3 py-1 rounded-md text-sm">Use →</button>
                  </div>
                ))}
              </motion.div>
            )}

            {(step==='script'||step==='voice'||step==='previewGen'||step==='preview') && (
              <motion.div
                key="script-box"
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0 }}
                className="flex flex-col"
              >
                {step==='script' && (
                  <>
                    <span className="text-sm text-gray-500">Step 3 of 5: Review Your Script</span>
                    <p className="text-xs text-gray-400 italic mb-2">Watch it unfold like magic.</p>
                  </>
                )}
                <h3 className="text-xl font-semibold mb-2">📜 Your Script</h3>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    readOnly
                    value={displayedText}
                    placeholder="Your generated script will appear here…"
                    className="w-full bg-[#111] border-2 border-[#C2886D] p-4 rounded-md text-white placeholder-gray-500 text-sm resize-y overflow-y-auto"
                    style={{ minHeight:'460px', maxHeight:'520px' }}
                  />
                  {typing && (
                    <div className="absolute bottom-2 left-4 right-4 h-1 bg-gradient-to-r from-[#C2886D] via-transparent to-[#C2886D] animate-pulse rounded-full"/>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step==='script' && (
            <div className="mt-6">
              <Listbox value={selectedVoice} onChange={setSelectedVoice}>
                <div className="relative">
                  <Listbox.Label className="block mb-2 text-sm font-medium text-[#C2886D]">🎤 Choose a Voice</Listbox.Label>
                  <Listbox.Button className="w-full bg-[#111] border border-[#C2886D] py-3 pl-4 pr-10 text-left rounded-md text-white focus:ring-2 focus:ring-[#C2886D] transition">
                    <span className="block truncate">{selectedVoice}</span>
                    <ChevronUpDownIcon className="absolute right-3 top-3 h-5 w-5 text-[#C2886D] pointer-events-none"/>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute mt-2 w-full bg-[#111] rounded-md shadow-lg ring-1 ring-[#C2886D] max-h-60 overflow-auto z-50">
                      {voices.map(v => (
                        <Listbox.Option
                          key={v.id}
                          value={v.name}
                          className={({active}) =>
                            `cursor-pointer select-none py-2 pl-10 pr-4 ${active?'bg-[#C2886D] text-black':'text-white'}`
                          }
                        >
                          {({selected}) => (
                            <>
                              <span className={selected?'font-medium':'font-normal'}>{v.name}</span>
                              {selected && <CheckIcon className="absolute left-0 top-2 h-5 w-5 text-black"/>}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <div className="glow-text mt-2 text-sm text-center">
                🚀 More premium voices & custom voice cloning available on upgrade!
              </div>
            </div>
          )}

          <div className="mt-2 text-xs text-center text-gray-400">
            Want your own cloned voice? <span className="font-semibold text-[#C2886D]">Upgrade now!</span>
          </div>

          <div className="mt-6 space-y-4">
            {step==='script' && <LoadingButton onClick={generateVoice} loading={loading}>🎙 Generate Voice</LoadingButton>}
            {step==='voice' && voiceReady && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-green-400 text-center">✅ Voice Ready!</motion.div>
            )}
            {step==='voice' && showPreviewButton && (
              <LoadingButton onClick={generatePreview} loading={false}>🎬 Generate Preview</LoadingButton>
            )}
            {step==='previewGen' && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-center items-center text-[#C2886D] font-semibold">
                <div className="h-6 w-6 border-2 border-[#C2886D] border-t-transparent rounded-full animate-spin mr-3"/>
                Preparing Preview…
              </motion.div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex justify-center items-center pt-2 min-h-[500px]">
          {step==='previewGen' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center">
              <div className="h-16 w-16 border-4 border-[#C2886D] border-t-transparent rounded-full animate-spin mb-4"/>
              <p className="text-[#C2886D] font-semibold">Preparing Preview…</p>
            </motion.div>
          )}

          {step==='preview' && (
            <div className="relative flex flex-col items-center -mt-4">
              <span className="text-sm text-gray-500 mb-1">Step 5 of 5: Preview Your Brand Kit</span>
              <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="mb-4 text-sm text-[#C2886D] font-semibold">
                🎬 Preview Mode — See your brand come to life
              </motion.div>
              <div className="absolute inset-0 blur-2xl bg-[#C2886D] opacity-20 rounded-full w-[300px] h-[450px]"/>
              <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} className="relative z-10 shadow-xl shadow-[#C2886D]/10">
                <TikTokPhonePreview script={parseScriptToBlocks(fullScript)} audioUrl={audioUrl}/>
                {audioUrl && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-[#C2886D] font-semibold mb-2">🔊 Play Voice Preview</p>
                    <audio controls src={audioUrl} className="w-full max-w-xs mx-auto rounded-lg"/>
                  </div>
                )}
              </motion.div>
              <a href="/demo-output" className="mt-6">
                <button className="bg-[#C2886D] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#b3745b] transition">
                  🎉 See Your Full Brand Kit →
                </button>
              </a>
              <div className="bg-[#111] border border-[#C2886D] p-4 rounded-md text-center max-w-md mt-6">
                <p className="text-sm text-[#C2886D] font-semibold mb-2">❤️ Inspired by your preview?</p>
                <p className="text-xs text-gray-300 mb-4">
                  Upgrade to unlock unlimited topics, formats, and AI voiceovers.
                </p>
                <a href="/upgrade">
                  <button className="bg-[#C2886D] text-black px-4 py-2 rounded-md font-bold hover:bg-[#b3745b] transition">
                    🚀 Upgrade & Unlock More
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Reusable LoadingButton
function LoadingButton({
  onClick,
  loading,
  children
}: { onClick:()=>void; loading:boolean; children:React.ReactNode }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (loading) {
      const i = setInterval(() => setDots(d => (d.length<3?d+'.':'')), 400);
      return () => clearInterval(i);
    }
  }, [loading]);

  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileTap={{scale:0.94}}
      whileHover={{scale:1.03}}
      className={`w-full py-3 rounded-md font-semibold transition overflow-hidden ${
        loading
          ? 'bg-gradient-to-r from-[#C2886D] via-[#e0b8a4] to-[#C2886D] animate-pulse shadow-lg shadow-[#C2886D]/40'
          : 'bg-[#C2886D] text-black hover:shadow-md hover:shadow-[#C2886D]/40'
      }`}
    >
      {loading
        ? <span className="flex items-center justify-center gap-2">Loading{dots}</span>
        : <span>{children}</span>
      }
    </motion.button>
  );
}