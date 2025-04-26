'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

export default function TryDemo() {
  const [fullScript, setFullScript] = useState('');
  const [previewScript, setPreviewScript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [step, setStep] = useState<'start' | 'script' | 'voice' | 'preview'>('start');
  const audioRef = useRef<HTMLAudioElement>(null);

  function generateFakeScript() {
    const fake = `
**[Opening Scene: Close-Up Shot of the Creator]**
**Text Overlay:** "STOP SCROLLING!" 🚨

**Creator:** (with an excited expression) "Did you know you're wasting HALF your day without realizing it?"

**[Cut to B-Roll: Fast-paced montage of people doing everyday tasks like brushing teeth, checking phones.]**

**Creator:** "Yep, the average person spends over 4 hours a day on activities that don't actually improve their life! 😱"

**Creator:** (whispering) "I've got a crazy hack that'll change everything!"

**Text Overlay:** "Follow for Part 2!" 🚀
`;
    setFullScript(fake.trim());
    setStep('script');
  }

  function generateFakeVoice() {
    setAudioUrl('/voice-fitness-1.mp3'); // This file must exist inside /public folder
    setStep('voice');
  }

  function generatePreview() {
    setStep('preview');
  }

  return (
    <section className="py-12 bg-black text-white min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#C2886D] text-center mb-2">Try QuietlyRich Demo</h2>
        <p className="text-gray-400 text-center mb-10">Explore AI-generated TikTok funnels & voice-powered scripts.</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <div className="space-y-6">
            {step === 'start' && (
              <motion.button 
                onClick={generateFakeScript} 
                className="bg-[#C2886D] text-black py-3 w-full rounded-lg font-semibold"
              >
                📝 Generate Fake Script
              </motion.button>
            )}

            {step === 'script' && (
              <>
                <div className="bg-[#111] p-4 rounded-lg border border-[#C2886D] min-h-[400px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{fullScript}</pre>
                </div>
                <motion.button 
                  onClick={generateFakeVoice}
                  className="bg-[#C2886D] text-black py-3 w-full rounded-lg font-semibold"
                >
                  🎙 Generate Voice
                </motion.button>
              </>
            )}

            {step === 'voice' && (
              <motion.button 
                onClick={generatePreview}
                className="bg-[#C2886D] text-black py-3 w-full rounded-lg font-semibold"
              >
                🎬 Generate Preview
              </motion.button>
            )}
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center pt-2 min-h-[500px]">
            {step === 'preview' && (
              <TikTokPhonePreview script={fullScript} audioUrl={audioUrl} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}