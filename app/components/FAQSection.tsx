'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Do I need to show my face on camera?",
    a: "Nope! QuietlyRich was built for faceless creators. You can go viral without ever appearing on camera. The AI scripts, voices, and videos do the work for you.",
  },
  {
    q: "What is Fantasy Mode?",
    a: "Fantasy Mode lets you generate AI content with any celebrity, character, or original persona—instantly. Create podcasts, interviews, or stories starring anyone you can imagine. Only on QuietlyRich.",
  },
  {
    q: "Can I monetize videos made with QuietlyRich?",
    a: "Yes! Every paid plan comes with a full commercial license, so you can use QuietlyRich videos for TikTok, YouTube, Instagram, or your own brand channels.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Try the demo free with no credit card required. Experience the full flow before you commit.",
  },
  {
    q: "Can I use my own voice?",
    a: "Absolutely. You can upload and clone your voice for unique, branded content. Or, use any of our viral AI voices.",
  },
  {
    q: "How fast can I make a video?",
    a: "Most creators go from idea to TikTok-ready preview in under 30 seconds. Just pick a topic, review your script, choose a voice, and hit preview.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black text-white py-24 px-4 md:px-0 border-t border-[#1a1a1a]">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-[#C2886D] drop-shadow">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-[#222] rounded-xl bg-[#101010] overflow-hidden transition hover:border-[#C2886D] group"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-lg font-semibold focus:outline-none text-left group-hover:text-[#C2886D] transition"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-content-${idx}`}
            >
              <span>{faq.q}</span>
              <motion.span
                animate={{ rotate: open === idx ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-3 text-2xl select-none"
              >
                ▶
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === idx && (
                <motion.div
                  id={`faq-content-${idx}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 text-gray-300 text-base"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="text-center mt-14">
        <a
          href="#try-demo"
          className="inline-block bg-gradient-to-r from-[#C2886D] via-[#6A00FF] to-[#9C4DFF] text-black font-bold py-3 px-8 rounded-xl shadow-xl transition hover:scale-105"
        >
          Still have questions? Try the demo now →
        </a>
      </div>
    </section>
  );
}