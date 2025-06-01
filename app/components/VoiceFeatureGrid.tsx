'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, MicrophoneIcon, FilmIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

type Props = {
  fantasyMode: boolean;
};

const features = [
  {
    icon: <SparklesIcon className="h-7 w-7 text-[#C2886D]" />,
    title: 'Faceless, Effortless',
    description: 'No camera needed. QuietlyRich auto-generates your video from just an idea.',
  },
  {
    icon: <MicrophoneIcon className="h-7 w-7 text-[#C2886D]" />,
    title: 'Voice Like a Pro',
    description: 'Pick a powerful voice that sounds like it’s straight from a podcast.',
  },
  {
    icon: <FilmIcon className="h-7 w-7 text-[#C2886D]" />,
    title: 'Video That Hooks',
    description: 'Perfectly timed captions, visuals, and rhythm — optimized for TikTok.',
  },
  {
    icon: <RocketLaunchIcon className="h-7 w-7 text-[#C2886D]" />,
    title: 'Scroll-Stopping Speed',
    description: 'Go from idea to video in under 30 seconds. No editing needed.',
  },
];

export default function VoiceFeatureGrid({ fantasyMode }: Props) {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-12 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Everything You Need to Go Viral
        </motion.h2>

        <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
          We built QuietlyRich for creators who want to go big — fast, faceless, and frictionless.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-[#111] border border-[#222] rounded-xl shadow-lg shadow-[#C2886D]/5"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}