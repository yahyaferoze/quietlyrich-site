// Top unchanged
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
      let file = '/voice-fitness-2.mp3'; // fallback default

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

  // ✅ STRATEGIC UPGRADE: Capture brand data and save to localStorage
  function generatePreview() {
    const brandKit = {
      topic: selectedTopic,
      format: selectedFormat,
      voice: selectedVoice,
      script: fullScript,
      audioUrl: audioUrl,
    };

    localStorage.setItem("brandKit", JSON.stringify(brandKit));

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
            {/* EXISTING FLOW (unchanged) */}
            {/* ... [step-based logic remains the same] */}

            {/* END OF PREVIEW: Add CTA to see brand kit */}
            {step === 'preview' && (
              <div className="flex justify-center mt-6">
                <a href="/demo-output">
                  <button className="bg-[#C2886D] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#b3745b]">
                    🎉 See Your Full Brand Kit →
                  </button>
                </a>
              </div>
            )}
          </div>

          {/* Right Side (TikTok preview etc) */}
          {/* ... (unchanged) */}
        </div>
      </div>
    </section>
  );
}

// Reusable Button Component (unchanged)
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