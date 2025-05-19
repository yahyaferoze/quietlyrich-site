'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: "What makes QuietlyRich different from other AI tools?",
    answer: "QuietlyRich is built for true faceless creation—no camera, no editing, no burnout. It’s the only platform with instant Fantasy Mode for wild, meme, or parody content, plus TikTok-native video previews in seconds.",
  },
  {
    question: "Is my data and content safe?",
    answer: "Yes! Your scripts and videos are private, encrypted, and never shared without your permission. We take creator privacy and data protection seriously.",
  },
  {
    question: "Can I monetize faceless content?",
    answer: "Absolutely. Many QuietlyRich creators go viral and monetize via TikTok, YouTube, brand deals, and affiliate links—no need to ever show your face.",
  },
  {
    question: "What is Fantasy Mode?",
    answer: "Fantasy Mode unlocks parody podcasts, meme news, and wild skits—generate dream content you could never film in real life. Instantly swap between normal and Fantasy at any time.",
  },
  {
    question: "Can businesses use QuietlyRich?",
    answer: "Yes! Businesses and agencies use QuietlyRich for automated brand content, client campaigns, and even white-labeled video solutions.",
  },
  {
    question: "Do I need any video editing skills?",
    answer: "Nope. The platform is 100% no-editing, no-design required. Type, click, done.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-black text-white py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-[#232323] rounded-2xl bg-[#161616] border border-[#232323] shadow-lg">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full flex justify-between items-center py-6 px-4 text-left text-lg font-semibold focus:outline-none hover:text-[#C2886D] transition"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-2xl">
                  {open === idx ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${open === idx ? 'max-h-40' : 'max-h-0'}`}
                aria-hidden={open !== idx}
              >
                <p className="px-4 pb-6 text-gray-300 text-base">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Opt-in */}
        <div className="mt-14 text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">
            Get Early Tips & Updates
          </h3>
          <form className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-72 px-5 py-3 rounded-full bg-[#181818] text-white border border-[#232323] focus:border-[#C2886D] outline-none text-base"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#C2886D] text-white font-medium hover:scale-105 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-2">
            No spam—just real creator insights.
          </p>
        </div>
      </div>
    </section>
  );
}