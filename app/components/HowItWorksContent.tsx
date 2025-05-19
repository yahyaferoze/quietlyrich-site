'use client';

import React from 'react';
import TikTokPhonePreview from './TikTokPhonePreview';

export default function HowItWorksContent({ fantasyMode }: { fantasyMode: boolean }) {
  return (
    <section id="how" className="bg-black text-white py-36 px-6 relative">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4">
          From Idea to Viral — In Under 60 Seconds
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          QuietlyRich writes, voices, and previews your content instantly — faceless, frictionless, and fully AI-powered.
        </p>
      </div>

      <div className="flex flex-col gap-20 md:gap-32 max-w-4xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
              Step 1: Choose Your Topic
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pick a niche, enter your idea, or let AI suggest one based on trending topics.
            </p>
            <div className="flex items-center gap-2 mt-3 text-[#C2886D] text-base">
              <span role="img" aria-label="AI">🧠</span>
              <span>AI Topic Suggestions</span>
            </div>
          </div>
          <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
            <p>Example:</p>
            <div className="mt-2 bg-black p-4 rounded-lg border border-[#1e1e1e]">
              {fantasyMode
                ? "Podcast: What if Kanye interviewed Naruto?"
                : "3 Health Myths That Are Actually Costing You Muscle"}
            </div>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
              Step 2: Let AI Write Your Script
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get a high-retention script with hooks, pacing, and CTAs — written for faceless delivery.
            </p>
            <div className="flex items-center gap-2 mt-3 text-[#C2886D] text-base">
              <span role="img" aria-label="Script">📝</span>
              <span>AI Script Generator</span>
            </div>
          </div>
          <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
            <p>Script Preview:</p>
            <div className="mt-2 p-4 rounded-lg border border-[#1e1e1e] text-left leading-relaxed">
              {fantasyMode
                ? "Ronaldo: 'You really think Messi had a better career?' | Trent: '100%. Let’s talk numbers.'"
                : "Most people don’t realize AI tools can automate side hustles…"}
            </div>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
              Step 3: Pick or Clone a Voice
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Choose from viral AI voices, or upload one to clone your tone for future content.
            </p>
            <div className="flex items-center gap-2 mt-3 text-[#C2886D] text-base">
              <span role="img" aria-label="Voice">🎙️</span>
              <span>Viral Voice Cloner</span>
            </div>
          </div>
          <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
            <p>Voice Options:</p>
            <ul className="mt-2 space-y-1">
              <li>• Calm UK Voice</li>
              <li>• Female Storyteller</li>
              <li>• Upload & Clone Yours</li>
            </ul>
          </div>
        </div>
        {/* Step 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
              Step 4: Watch the TikTok-Ready Preview
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              See your video in a mobile-ready preview — voiced, captioned, and scroll-optimized.
            </p>
            <div className="flex items-center gap-2 mt-3 text-[#C2886D] text-base">
              <span role="img" aria-label="Preview">📱</span>
              <span>TikTok Video Preview</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 shadow-inner">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}