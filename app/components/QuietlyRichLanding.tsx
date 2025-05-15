'use client';

import React from "react";
import { motion } from "framer-motion";
import TryDemo from "./TryDemo";
import TikTokPhonePreview from "./TikTokPhonePreview";

export default function QuietlyRichLanding() {
  return (
    <>
      {/* HERO – Cinematic */}
      <motion.section
        id="hero"
        className="relative h-screen bg-gradient-to-b from-black via-[#140032] to-[#6A00FF]/40 text-white flex items-center justify-center overflow-hidden px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/20 rounded-full blur-[180px] -top-24 -left-24 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/20 rounded-full blur-[140px] -bottom-20 -right-20 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-28 md:pt-0">
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-6"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Turn Ideas Into <span className="text-[#C2886D]">Faceless Fame</span><br />
              In 30 Seconds.
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-md leading-relaxed mx-auto md:mx-0 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              No face. No mic. Just AI, quietly building you an empire.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="#try-demo"
                className="bg-[#C2886D] text-white px-6 py-3 rounded-full font-medium text-sm shadow-md hover:scale-105 transition"
              >
                Start Free
              </a>
              <button className="border border-gray-500 text-gray-300 px-6 py-3 rounded-full hover:border-white hover:text-white transition text-sm">
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Hero Video */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="/quietlyrich-homepage-clip-1.mp4"
                  type="video/mp4"
                />
                Sorry, your browser doesn’t support embedded videos.
              </video>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-white text-sm opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2 }}
        >
          ↓ Scroll to see how it works
        </motion.div>
      </motion.section>
            {/* SECTION – Fantasy Mode */}
            <section
        id="fantasy-mode"
        className="bg-[#0b0b0b] text-white py-36 px-6 relative overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Left Text Block */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h2
              className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              🎮 Fantasy Mode:
              <br />
              Content That Was Never Meant to Exist
            </motion.h2>
            <motion.p
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-6"
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Skits with footballers. Fake debates. Meme news. Dream fights. QuietlyRich lets you script, voice, and animate wild content — all facelessly.
            </motion.p>

            <ul className="text-left text-sm text-gray-300 space-y-3 pl-5 list-disc">
              <li>Auto-generate funny AI podcasts with avatars</li>
              <li>Make Messi & Ronaldo argue about boxing 🥊</li>
              <li>Create parody news: “Haaland joins your 5-a-side team”</li>
              <li>Fake interviews, anime skits, cartoon edits</li>
              <li>Works with any voice, tone, or topic</li>
            </ul>

            <div className="mt-8">
              <a
                href="#try-demo"
                className="inline-block bg-[#C2886D] text-white px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition"
              >
                Try Fantasy Mode Free
              </a>
            </div>
          </div>

          {/* Right Sample Preview Grid */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {[
              "Messi vs Ronaldo Podcast",
              "Fake UFC/Anime Skits",
              "Babyface Parodies",
              "Meme News Clips",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 text-sm text-gray-300 shadow-inner"
              >
                <p className="font-semibold text-white mb-2">🎭 {title}</p>
                <p className="text-xs leading-snug">
                  Created with AI voices, avatars, and scripts — ready for TikTok.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* SECTION – Who It’s For */}
            <section
        id="audience"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Who QuietlyRich Is Built For
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Whether you're scaling a brand, testing TikToks, or making content for clients — QuietlyRich lets you do it facelessly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "🎥",
                title: "Faceless Creators",
                desc: "Produce daily content without showing your face. Script, voice, and preview with no editing.",
              },
              {
                icon: "💼",
                title: "Agencies & Freelancers",
                desc: "Deliver high-converting content to clients — no need to hire writers or editors.",
              },
              {
                icon: "🎭",
                title: "Meme Channels",
                desc: "Make trending formats like AI Drake, fake interviews, and reaction debates at scale.",
              },
              {
                icon: "📱",
                title: "Short Form Experts",
                desc: "Test 10+ styles across TikTok, Reels, and Shorts hands-free. Find your hit formula fast.",
              },
              {
                icon: "📚",
                title: "Coaches & Experts",
                desc: "Turn knowledge into faceless video lessons. Build trust without being on camera.",
              },
              {
                icon: "🧠",
                title: "AI-First Marketers",
                desc: "Use AI-generated voice, visuals, and hooks to create persuasive content in seconds.",
              },
            ].map((persona, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 text-left shadow-sm hover:shadow-[#C2886D]/20 transition-all"
              >
                <div className="text-3xl mb-4">{persona.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 font-serif">
                  {persona.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{persona.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* SECTION – Inside the QuietlyRich Engine */}
            <section
        id="features"
        className="bg-[#0a0a0a] text-white py-36 px-6 relative overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Inside the QuietlyRich Engine
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
            Everything you need to grow quietly, consistently, and automatically — built into one system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "🧠",
                title: "AI Script Generator",
                desc: "Get scroll-hook intros, punchy facts, and conversion CTAs in your tone. Fully auto-written.",
              },
              {
                icon: "🎙️",
                title: "Voice & Clone System",
                desc: "Choose a viral voice or upload your own — cloned and ready for future videos.",
              },
              {
                icon: "📱",
                title: "TikTok-Style Previews",
                desc: "Instantly watch your video in a phone frame with synced voice and captions.",
              },
              {
                icon: "📆",
                title: "Smart Export & Schedule",
                desc: "Download or queue videos into your posting calendar with one tap.",
              },
              {
                icon: "⚡",
                title: "Auto Funnel Scripts",
                desc: "Built-in lines for shares, follows, and comments — baked into every script.",
              },
              {
                icon: "🎮",
                title: "Fantasy Mode",
                desc: "Fake podcasts. Parody news. AI debates. Animate the impossible in one click.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 shadow-sm hover:shadow-[#C2886D]/20 transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 font-serif">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* SECTION – Comparison */}
            <section
        id="comparison"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Why Creators Choose QuietlyRich
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
            Here’s how we outperform typical “AI tools” — built for creators, not just content.
          </p>

          <div className="grid gap-6">
            {[
              {
                title: "Faceless Creation",
                quietly: "✅ Yes — fully designed for creators who never want to show their face.",
                other: "❌ No — assumes you’re speaking or on camera.",
              },
              {
                title: "Fantasy Content",
                quietly: "✅ Yes — podcast skits, fake fights, memes, and satire built in.",
                other: "❌ No — only does standard explainers or repurposed content.",
              },
              {
                title: "AI Voice Memory",
                quietly: "✅ Yes — remembers tone and pacing across your projects.",
                other: "❌ No — resets voice every time.",
              },
              {
                title: "Preview Before Export",
                quietly: "✅ Yes — full scroll-ready preview before you post.",
                other: "❌ No — outputs static or raw videos only.",
              },
              {
                title: "Auto Funnel Scripting",
                quietly: "✅ Yes — includes CTA lines, comment baits, follow hooks.",
                other: "❌ No — just writes generic content.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-stretch justify-between bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 hover:shadow-[#C2886D]/20 transition-shadow duration-300 group"
              >
                <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6 border-b md:border-b-0 md:border-r border-[#2a2a2a]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-[#C2886D] text-sm font-medium mb-1">QuietlyRich</p>
                  <p className="text-gray-400 text-sm">{item.quietly}</p>
                </div>
                <div className="w-full md:w-1/2 md:pl-6">
                  <p className="text-white font-bold mb-1">Other Tools</p>
                  <p className="text-gray-400 text-sm">{item.other}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION – Try Demo */}
      <section
        id="try-demo"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[180px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Try QuietlyRich For Yourself
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Watch AI write, voice, and preview your faceless video — no sign-up needed.
          </p>

          <div className="max-w-4xl mx-auto bg-[#111] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg">
            <TryDemo />
          </div>
        </div>
      </section>

      {/* SECTION – Final CTA */}
      <section
        id="cta"
        className="relative z-10 bg-[#0e0e0e] py-28 px-6 text-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-[#C2886D]/10 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-[#6A00FF]/10 blur-[100px] rounded-full z-0" />

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Build in Silence. Go Viral Loudly.
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
            Join thousands of creators scaling faceless content — no camera, no burnout, no problem.
          </p>
          <a
            href="#try-demo"
            className="inline-block bg-[#C2886D] text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:scale-105 transition"
          >
            Start Free Today
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0d0d] border-t border-[#1a1a1a] text-gray-400 text-sm py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white text-xl font-serif font-bold mb-4">QuietlyRich</h3>
            <p>Faceless content, powered by AI. Built to help you grow — quietly.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul>
              <li><a href="#how" className="hover:text-white">How It Works</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-12 text-xs">
          © {new Date().getFullYear()} QuietlyRich. All rights reserved.
        </div>
      </footer>
    </>
  );
}