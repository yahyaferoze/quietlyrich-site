'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

type Stat = {
  label: string;
  sub?: string;
  icon?: React.ReactNode;
};

const STATS: Stat[] = [
  {
    label: '+18,550 Followers',
    sub: 'Last 30 days',
    icon: <FaCheckCircle className="text-green-400" aria-hidden="true" />,
  },
  {
    label: '92% Avg Watch Time',
    sub: 'Across demo niches',
    icon: <FaCheckCircle className="text-green-400" aria-hidden="true" />,
  },
  {
    label: '7 Videos in 40 Minutes',
    sub: 'Batch-produced',
    icon: <FaCheckCircle className="text-green-400" aria-hidden="true" />,
  },
];

export default function ResultsProofBarFinal() {
  return (
    <section
      aria-label="Creator results and proof"
      className="relative w-full border-y border-[#2e1f40] bg-[#120a02] overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[1100px] h-[220px] blur-[120px] opacity-40"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 40%, rgba(106,0,255,.25), rgba(194,136,109,.14) 60%, transparent 80%)',
          }}
        />
      </motion.div>

      {/* Desktop/tablet: centered row */}
      <div className="hidden md:block py-4 px-6">
        <motion.div
          className="mx-auto flex items-center justify-center gap-8 text-sm md:text-base font-medium text-[#f2f6ff]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.span
                initial={{ scale: 0.9, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="shrink-0"
              >
                {s.icon}
              </motion.span>
              <div className="flex flex-col leading-tight">
                <span className="text-white">{s.label}</span>
                {s.sub && (
                  <span className="text-[11px] text-white/60">{s.sub}</span>
                )}
              </div>

              {/* Divider */}
              {i !== STATS.length - 1 && (
                <span className="mx-4 h-4 w-px bg-white/10" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: marquee */}
      <div className="md:hidden py-3 px-2">
        <div
          className="relative overflow-hidden"
          role="marquee"
          aria-label="Creator results scrolling"
        >
          <div className="flex items-center gap-6 animate-[proof-marquee_18s_linear_infinite] hover:[animation-play-state:paused]">
            {[...STATS, ...STATS].map((s, i) => (
              <div key={i} className="flex items-center gap-2 min-w-max">
                <FaCheckCircle className="text-green-400" aria-hidden="true" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[13px] text-white font-medium">
                    {s.label}
                  </span>
                  {s.sub && (
                    <span className="text-[10px] text-white/60">{s.sub}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local CSS for marquee keyframes (scoped with Tailwind arbitrary) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes proof-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `,
        }}
      />
    </section>
  );
}