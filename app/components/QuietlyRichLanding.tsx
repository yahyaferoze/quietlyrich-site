'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TryDemo from './TryDemo';
import TikTokPhonePreview from './TikTokPhonePreview';

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
              Build <span className="text-[#C2886D]">Faceless Fame</span><br />
              Without Ever Showing Your Face.
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-md leading-relaxed mx-auto md:mx-0 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              QuietlyRich creates scroll-stopping videos with zero camera, zero editing, and zero burnout. AI-powered, faceless, and freakishly viral.
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
                <source src="/quietlyrich-homepage-clip-1.mp4" type="video/mp4" />
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
            {/* SECTION – How It Works */}
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
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left md:w-1/2">
              <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
                Step 1: Choose Your Topic
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pick a niche, enter your idea, or let AI suggest one based on trending topics.
              </p>
            </div>
            <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
              <p>Example:</p>
              <div className="mt-2 bg-black p-4 rounded-lg border border-[#1e1e1e]">
                “3 Health Myths That Are Actually Costing You Muscle”
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left md:w-1/2">
              <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
                Step 2: Let AI Write Your Script
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get a high-retention script with hooks, pacing, and CTAs — written for faceless delivery.
              </p>
            </div>
            <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
              <p>Script Preview:</p>
              <div className="mt-2 p-4 rounded-lg border border-[#1e1e1e] text-left leading-relaxed">
                “Most people don’t realize AI tools can automate side hustles…”
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left md:w-1/2">
              <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
                Step 3: Pick or Clone a Voice
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Choose from viral AI voices, or upload one to clone your tone for future content.
              </p>
            </div>
            <div className="md:w-1/2 bg-[#111] border border-[#2a2a2a] rounded-xl p-6 text-sm text-gray-300">
              <p>Voice Options:</p>
              <ul className="mt-2 space-y-1">
                <li>• Calm UK Voice</li>
                <li>• Female Storyteller</li>
                <li>• Upload & Clone Yours</li>
              </ul>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left md:w-1/2">
              <h3 className="text-2xl font-bold text-[#C2886D] mb-2">
                Step 4: Watch the TikTok-Ready Preview
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                See your video in a mobile-ready preview — voiced, captioned, and scroll-optimized.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl border border-[#2a2a2a] bg-[#111] p-4 shadow-inner">
                <TikTokPhonePreview
                  script={[
                    { type: 'hook', text: 'Most people don’t realize AI tools can automate side hustles…' },
                    { type: 'fact', text: 'You can generate content, schedule posts, even voice it.' },
                    { type: 'cta', text: 'Start faceless. Build silently. Try QuietlyRich today.' },
                  ]}
                  audioUrl="/fitnessfemale.mp3"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
            {/* SECTION – Preview Gallery */}
            <section
        id="preview-gallery"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            See QuietlyRich in Action
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Real AI outputs, built facelessly — ready to go viral.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                video: "/quietlyrich-homepage-clip-1.mp4",
                label: "AI Voice: Calm UK",
                stats: "12.4K views · 87% watch time",
              },
              {
                video: "/3 health myths.mp4",
                label: "AI Voice: American Female",
                stats: "10.1K views · 83% watch time",
              },
              {
                video: "/hiden movies.mp4",
                label: "Niche: Side Hustles",
                stats: "8.7K views · 90% engagement",
              },
              {
                video: "/losing fat .mp4",
                label: "Voice: Bold Male",
                stats: "15.3K views · 85% watch time",
              },
              {
                video: "/passive income tips.mp4",
                label: "Style: Documentary",
                stats: "9.4K views · 88% avg watch",
              },
              {
                video: "/example-preview.mp4",
                label: "Tone: Chill + Motivational",
                stats: "11.2K views · 92% replay rate",
              },
            ].map((clip, i) => (
              <motion.div
                key={i}
                className="relative bg-[#111] border border-[#2a2a2a] rounded-2xl p-3 overflow-hidden group hover:shadow-lg hover:shadow-[#C2886D]/20 transition-all"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg">
                  <video
                    src={clip.video}
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                  <p className="text-sm text-white font-semibold mb-1">{clip.label}</p>
                  <p className="text-xs text-gray-300">{clip.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION – Explore QuietlyRich Styles */}
      <section
        id="styles"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Explore QuietlyRich Styles
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Built for every type of faceless creator — choose your lane, or mix them all.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm text-white">
            {[
              "Vlogger",
              "Reaction Creator",
              "Gamer",
              "Fitness Creator",
              "Food Review",
              "Entertainment",
              "Animals",
              "Product Review",
              "Video Essay",
              "Beauty",
            ].map((style, index) => (
              <div
                key={index}
                className="bg-[#111] border border-[#2a2a2a] rounded-xl py-12 px-4 font-medium hover:shadow-md hover:shadow-[#C2886D]/20 transition text-center"
              >
                {style}
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* SECTION – Testimonials */}
            <section
        id="testimonials"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[160px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[140px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Loved by Faceless Creators
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Hear how QuietlyRich powers growth behind the scenes — without burnout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                name: "Jay N.",
                role: "Anonymous TikTok Creator",
                quote:
                  "I hit 100K followers in 3 weeks using AI scripts — never showed my face once.",
                img: "https://randomuser.me/api/portraits/men/36.jpg",
              },
              {
                name: "Zara Patel",
                role: "Digital Ghostwriter",
                quote:
                  "I batch 7 videos in 40 minutes now. QuietlyRich made me consistent without effort.",
                img: "https://randomuser.me/api/portraits/women/32.jpg",
              },
              {
                name: "Ali R.",
                role: "Voice-Only YouTuber",
                quote:
                  "QuietlyRich writes, voices, and previews everything. I just publish and grow.",
                img: "https://randomuser.me/api/portraits/men/29.jpg",
              },
              {
                name: "Sophia Kim",
                role: "Faceless Brand Coach",
                quote:
                  "My clients love it. They no longer need to hire editors or writers to scale.",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-[#111] border border-[#2a2a2a] rounded-2xl px-8 py-10 shadow-lg text-left group hover:shadow-[#C2886D]/20 transition"
              >
                <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border border-[#C2886D] object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION – Inside the QuietlyRich Engine */}
      <section
        id="features"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Inside the QuietlyRich Engine
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
            Everything you need to create, grow, and scale as a faceless content creator — with zero effort.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "🧠",
                title: "AI Script Generator",
                desc: "Hook-based scripts with smart pacing, CTAs, and retention built in.",
              },
              {
                icon: "🎙️",
                title: "Voice & Clone System",
                desc: "Use viral voices or clone your own — built to drive replay rate.",
              },
              {
                icon: "🎞️",
                title: "TikTok-Ready Previews",
                desc: "Get your video back in a vertical layout with captions, voice, and cuts.",
              },
              {
                icon: "📆",
                title: "Schedule & Export",
                desc: "Download or schedule videos to your platform of choice in 1 tap.",
              },
              {
                icon: "⚡",
                title: "Auto Funnel CTAs",
                desc: "Includes viral endings, follow-up hooks, and share prompts auto-built.",
              },
              {
                icon: "🎮",
                title: "Fantasy Mode Access",
                desc: "Go wild — fake podcasts, fight skits, parody news, and more.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 shadow-sm hover:shadow-[#C2886D]/20 transition-all"
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

      {/* SECTION – Who It's For */}
      <section
        id="who-for"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Who QuietlyRich Is Built For
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Whether you're building a brand, creating for clients, or just trying to go viral — QuietlyRich makes it all faceless.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "🎥",
                title: "Faceless Creators",
                desc: "Make daily videos without showing your face — script, voice, and preview on repeat.",
              },
              {
                icon: "📊",
                title: "Agencies",
                desc: "Deliver scroll-stopping content to multiple clients — no editors or voice artists needed.",
              },
              {
                icon: "🎭",
                title: "Meme Channels",
                desc: "Turn trending moments into funny, AI-generated skits instantly.",
              },
              {
                icon: "💼",
                title: "Entrepreneurs",
                desc: "Educate, convert, and grow without being on camera — ever.",
              },
              {
                icon: "👨‍🏫",
                title: "Coaches & Experts",
                desc: "Teach without talking. Use our faceless video engine to share authority & boost reach.",
              },
              {
                icon: "📱",
                title: "Growth Hackers",
                desc: "Test 10 video styles a day across TikTok, Reels, YouTube Shorts — all hands-free.",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 text-left shadow-sm hover:shadow-[#C2886D]/20 transition-all"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 font-serif">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/* SECTION – Pricing */}
            <section
        id="pricing"
        className="bg-black text-white py-36 px-6 relative overflow-hidden"
      >
        <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[180px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Pricing Made Simple
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Choose a plan that fits your faceless growth — start free, scale when ready.
          </p>

          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center bg-[#121212] border border-[#1e1e1e] rounded-full p-1">
              <button className="px-6 py-2 text-sm font-medium rounded-full bg-[#C2886D] text-white">
                Monthly
              </button>
              <button className="px-6 py-2 text-sm font-medium rounded-full text-gray-400 hover:text-white">
                Yearly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "£0/mo",
                features: [
                  "3 content templates",
                  "Basic script generator",
                  "Limited AI voice access",
                ],
                button: "Start Free",
              },
              {
                name: "Pro",
                price: "£29/mo",
                highlight: true,
                features: [
                  "Unlimited templates",
                  "Daily trending drops",
                  "AI voice + script memory",
                  "Export + preview",
                  "Access to Fantasy Mode",
                ],
                button: "Upgrade",
              },
              {
                name: "Agency",
                price: "£99/mo",
                features: [
                  "All Pro features",
                  "Client access + team seats",
                  "Dedicated voice models",
                  "Performance reporting",
                ],
                button: "Scale With Us",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border flex flex-col relative transition-all ${
                  plan.highlight
                    ? "border-[#C2886D] shadow-lg bg-[#181818]"
                    : "border-[#1e1e1e] bg-[#121212]"
                }`}
              >
                {plan.name === "Pro" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C2886D] px-3 py-1 rounded-full text-black text-xs font-semibold shadow-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-white text-xl font-serif font-bold mb-2">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-[#C2886D] mb-4">
                  {plan.price}
                </p>
                <ul className="space-y-2 text-gray-400 text-sm mb-6">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#C2886D] rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-auto py-2 bg-[#C2886D] text-white rounded-full text-sm font-medium hover:scale-105 transition">
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION – Final Call to Action */}
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