'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  MicrophoneIcon,
  FilmIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/solid';

type Props = {
  fantasyMode: boolean;
};

const featuresNormal = [
  {
    icon: <SparklesIcon className="h-9 w-9 text-[#C2886D] group-hover:text-[#9C4DFF] transition" />,
    title: 'Faceless, Effortless',
    description: 'No camera, no burnout. QuietlyRich auto-generates your video from a simple idea.',
  },
  {
    icon: <MicrophoneIcon className="h-9 w-9 text-[#C2886D] group-hover:text-[#9C4DFF] transition" />,
    title: 'Voice Like a Pro',
    description: 'Choose podcast-quality voices, or clone your own — all instantly AI-powered.',
  },
  {
    icon: <FilmIcon className="h-9 w-9 text-[#C2886D] group-hover:text-[#9C4DFF] transition" />,
    title: 'Video That Hooks',
    description: 'Scroll-stopping captions, visuals, and pacing — optimised for viral reach.',
  },
  {
    icon: <RocketLaunchIcon className="h-9 w-9 text-[#C2886D] group-hover:text-[#9C4DFF] transition" />,
    title: '30-Second Workflow',
    description: 'From prompt to preview in half a minute. No editing or production hassle.',
  },
];

const featuresFantasy = [
  {
    icon: <SparklesIcon className="h-9 w-9 text-[#9C4DFF] group-hover:text-[#C2886D] transition" />,
    title: 'Fantasy Mode Unlocked',
    description: 'Generate podcasts, stories and videos starring anyone — celebrities, icons or original characters.',
  },
  {
    icon: <MicrophoneIcon className="h-9 w-9 text-[#9C4DFF] group-hover:text-[#C2886D] transition" />,
    title: 'AI Voices & Characters',
    description: 'Access a library of legendary voices — or invent your own.',
  },
  {
    icon: <FilmIcon className="h-9 w-9 text-[#9C4DFF] group-hover:text-[#C2886D] transition" />,
    title: 'Animated & Faceless',
    description: 'Next-gen visuals with animated avatars, custom scenes and zero risk of bans.',
  },
  {
    icon: <RocketLaunchIcon className="h-9 w-9 text-[#9C4DFF] group-hover:text-[#C2886D] transition" />,
    title: 'Anything is Possible',
    description: 'Mix worlds, genres and stories. If you can imagine it, you can create it with QuietlyRich.',
  },
];

export default function VoiceFeatureGrid({ fantasyMode }: Props) {
  const features = fantasyMode ? featuresFantasy : featuresNormal;

  return (
    <section className="relative bg-[#0a0a0a] py-24 px-6 md:px-12 border-t border-[#1a1a1a] overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none will-change-transform">
        <motion.div
          className="absolute w-[700px] h-[700px] left-[-250px] top-[-250px] bg-gradient-to-br from-[#6A00FF]/10 via-[#C2886D]/10 to-transparent blur-[120px] rounded-full"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] right-[-180px] bottom-[-180px] bg-gradient-to-tl from-[#9C4DFF]/10 via-[#C2886D]/10 to-transparent blur-[100px] rounded-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#C2886D] via-[#9C4DFF] to-white will-change-transform"
        >
          {fantasyMode ? 'Unleash Your Imagination' : 'Everything You Need to Go Viral'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto will-change-transform"
        >
          {fantasyMode
            ? 'Fantasy Mode lets you create AI content with anyone, anything or any story. Your creativity is the only limit.'
            : 'We built QuietlyRich for creators who want to go big — fast, faceless and frictionless.'}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group p-7 bg-[#111]/80 border border-[#222] rounded-2xl shadow-lg shadow-[#9C4DFF]/10 transition-all hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] will-change-transform"
            >
              <div className="mb-5 flex items-center justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
