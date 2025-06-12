'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TikTokPhonePreview from './TikTokPhonePreview';

export default function HowItWorksContent({ fantasyMode }: { fantasyMode: boolean }) {
  const steps = [
    {
      title: 'Choose Your Topic',
      desc: 'Pick a niche, enter your idea, or let AI suggest what’s trending.',
      icon: '🧠',
      feature: 'AI Topic Suggestions',
      detail: 'Real-time trending ideas. Zero research needed.',
      example: fantasyMode
        ? 'Podcast: What if Kanye interviewed Naruto?'
        : '3 Health Myths That Are Actually Costing You Muscle',
      exampleLabel: 'Example:',
    },
    {
      title: 'Let AI Write Your Script',
      desc: 'Get a high-retention script with hooks, pacing, and CTAs — written for faceless delivery.',
      icon: '📝',
      feature: 'AI Script Generator',
      detail: 'Optimized for TikTok, Reels & Shorts.',
      example: fantasyMode
        ? "Ronaldo: 'You really think Messi had a better career?' | Trent: '100%. Let’s talk numbers.'"
        : "Most people don’t realize AI tools can automate side hustles…",
      exampleLabel: 'Script Preview:',
    },
    {
      title: 'Pick or Clone a Voice',
      desc: 'Choose from viral AI voices or upload your own to clone your style.',
      icon: '🎙️',
      feature: 'Viral Voice Cloner',
      detail: 'Upgrade to unlock more voice styles.',
      example: (
        <ul className="space-y-1 text-left">
          <li>• Calm UK Voice</li>
          <li>• Female Storyteller</li>
          <li>• Upload & Clone Yours</li>
        </ul>
      ),
      exampleLabel: 'Voice Options:',
    },
    {
      title: 'Watch the TikTok-Ready Preview',
      desc: 'See your video in a mobile-ready preview — voiced, captioned, and scroll-optimized.',
      icon: '📱',
      feature: 'TikTok Video Preview',
      detail: 'Instant demo — see it before you sign up.',
      example: (
        <TikTokPhonePreview
          script={
            fantasyMode
              ? [
                  { type: 'hook', text: '“Kanye interviews Naruto — and it gets wild.”' },
                  { type: 'fact', text: '"You think pain makes you strong?" - Naruto' },
                  { type: 'cta', text: 'Try Fantasy Mode. Animate the impossible.' },
                ]
              : [
                  { type: 'hook', text: 'Most people don’t realize AI tools can automate side hustles…' },
                  { type: 'fact', text: 'You can generate content, schedule posts, even voice it.' },
                  { type: 'cta', text: 'Start faceless. Build silently. Try QuietlyRich today.' },
                ]
          }
          audioUrl="/fitnessfemale.mp3"
        />
      ),
      exampleLabel: null,
    },
  ];

  return (
    <section id="how" className="bg-black text-white py-36 px-6 relative overflow-hidden">
      {/* Cinematic gradient BG */}
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[180px] rounded-full -top-32 -left-20 z-0 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-white bg-clip-text text-transparent drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          From Idea to Viral — In Under 60 Seconds
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          QuietlyRich writes, voices, and previews your content instantly — faceless, frictionless, and fully AI-powered.
        </motion.p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-20 md:gap-28">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className={`
              flex flex-col md:flex-row ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}
              items-center gap-10 md:gap-16 group
            `}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline / Icon */}
            <div className="md:w-1/2 flex flex-col items-center md:items-start">
              <div className="flex items-center mb-3">
                <span
                  className={`
                    flex items-center justify-center text-2xl md:text-3xl w-14 h-14 md:w-16 md:h-16 
                    rounded-full bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-white shadow-lg mr-4 border-4 border-[#181028]/40
                  `}
                >
                  {step.icon}
                </span>
                <span className="text-lg font-semibold text-[#C2886D] tracking-wide uppercase">
                  Step {idx + 1}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-base md:text-lg mb-2">{step.desc}</p>
              <div className="flex items-center gap-2 mt-3 text-[#C2886D] text-base font-semibold">
                {step.icon}
                <span>{step.feature}</span>
              </div>
              <div className="mt-4 text-xs text-gray-500 italic">{step.detail}</div>
            </div>
            {/* Preview / Example */}
            <div className="md:w-1/2 w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-[#6A00FF]/20 rounded-xl p-6 text-base text-gray-300 shadow-xl">
                {step.exampleLabel && (
                  <p className="font-semibold mb-2 text-[#C2886D]">{step.exampleLabel}</p>
                )}
                <div className="mt-2 text-base font-mono tracking-tight">
                  {typeof step.example === 'string' ? (
                    <div className="bg-black/80 p-4 rounded-lg border border-[#1e1e1e]">
                      {step.example}
                    </div>
                  ) : (
                    step.example
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* CTA at the end */}
      <div className="max-w-4xl mx-auto text-center mt-24 z-10 relative">
        <motion.a
          href="#try-demo"
          className="inline-block bg-gradient-to-tr from-[#C2886D] via-[#6A00FF] to-[#C2886D] text-black font-extrabold text-lg px-10 py-4 rounded-2xl shadow-xl border border-[#C2886D]/60 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          viewport={{ once: true }}
        >
          🚀 Try It Free — See Your First Video in 60 Seconds
        </motion.a>
      </div>
    </section>
  );
}