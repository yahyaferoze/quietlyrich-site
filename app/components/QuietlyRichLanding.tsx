

// src/QuietlyRichLanding.tsx
// ===========================
//      QuietlyRich Landing

// ===========================

'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TryDemo from "../components/TryDemo";
import {
  Sparkles,
  FileText,
  Mic,
  CalendarCheck,
  Target,
  Menu,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function QuietlyRichLanding() {
  // mobile menu + scroll‑to‑top
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // smooth anchors & scroll listener
  useEffect(() => {
    document.querySelectorAll("a[href^='#']").forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href")!.substring(1);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      })
    );
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "How It Works" steps
  const steps = [
    {
      title: "Choose Niche",
      desc: "Pick your niche persona to focus your content direction.",
    },
    {
      title: "Generate Scripts",
      desc: "Let our AI generate viral short-form content scripts.",
    },
    {
      title: "Add Voiceover",
      desc: "Use auto-generated voiceovers or upload your own.",
    },
    {
      title: "Schedule & Grow",
      desc: "Publish with one click and watch your reach grow silently.",
    },
  ];
  const [stepIndex, setStepIndex] = useState(0);

  // "Features" grid
  const features = [
    {
      icon: <Sparkles className="text-[#C2886D]" />,
      title: "AI-Powered Content Generator",
      desc: "Create viral scripts in seconds — tailored to your niche.",
    },
    {
      icon: <Target className="text-[#C2886D]" />,
      title: "Niche Persona Wizard",
      desc: "Define your tone, audience, and goals with ease.",
    },
    {
      icon: <CalendarCheck className="text-[#C2886D]" />,
      title: "Export & Schedule System",
      desc: "Push content to your calendar, ready to post.",
    },
    {
      icon: <FileText className="text-[#C2886D]" />,
      title: "Built-In Funnel Templates",
      desc: "Auto-inject high-converting CTAs into your posts.",
    },
    {
      icon: <Mic className="text-[#C2886D]" />,
      title: "Growth Blueprint Included",
      desc: "Use our QuietlyRich method to scale without burnout.",
    },
  ];

  // Pricing toggle
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <main className="bg-black text-white scroll-smooth">
      {/* Header */}
      <motion.header
        className="fixed w-full top-0 left-0 bg-black/70 backdrop-blur-md z-50 border-b border-[#1e1e1e]"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#C2886D"
              strokeWidth="2"
            >
              <path d="M12 2L19 21H5L12 2Z" />
            </svg>
            <span className="text-[#C2886D] font-bold text-xl font-serif">
              QuietlyRich
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 uppercase text-gray-300 text-sm">
            <a href="#how" className="hover:text-white">
              How It Works
            </a>
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#stackflow" className="hover:text-white">
              System
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#cta"
            className="hidden md:inline-block bg-[#C2886D] px-5 py-2 rounded-full text-sm font-medium shadow-md hover:scale-105 transition"
          >
            Start Free
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md">
            <a
              href="#how"
              className="block py-2 px-6 text-gray-300 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block py-2 px-6 text-gray-300 hover:text-white"
            >
              Features
            </a>
            <a
              href="#stackflow"
              className="block py-2 px-6 text-gray-300 hover:text-white"
            >
              System
            </a>
            <a
              href="#pricing"
              className="block py-2 px-6 text-gray-300 hover:text-white"
            >
              Pricing
            </a>
            <a
              href="#cta"
              className="block py-2 px-6 text-gray-300 hover:text-white"
            >
              Get Started
            </a>
          </div>
        )}
      </motion.header>

      {/* Hero */}
      <motion.section
        id="hero"
        className="pt-44 pb-36 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background glows */}
        <motion.div className="absolute w-[700px] h-[700px] bg-[#C2886D] opacity-15 rounded-full blur-[120px] top-1/4 -left-32 z-0" />
        <motion.div className="absolute w-[500px] h-[500px] bg-[#f8f2ec] opacity-10 rounded-full blur-[120px] bottom-0 -right-32 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            The AI Tool That Builds{" "}
            <span className="text-[#C2886D]">Faceless Brands</span> For You
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            QuietlyRich helps creators grow silently with AI‑generated scripts,
            voiceovers, and one‑click publishing—no camera, no burnout.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#try-demo"
              className="bg-[#C2886D] px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Try Free Demo
            </a>
            <a
              href="#how"
              className="border border-gray-500 text-gray-300 px-6 py-3 rounded-xl hover:text-white hover:border-white transition"
            >
              How It Works
            </a>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 px-6 bg-black text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
    Start Faceless. Scale Fearlessly.
  </h2>
  <p className="text-gray-400 max-w-xl mx-auto mb-10">
    Not sure where to begin? Choose how you want to show up — and we’ll build your growth system around it.
  </p>
  <div className="flex flex-wrap justify-center gap-6">
    {[
      "Fully AI (no face, no voice)",
      "I’ll record my voice",
      "Clone my voice with AI",
      "I’ll show my face (optional)",
      "Use a viral-style voice",
    ].map((option, i) => (
      <div key={i} className="bg-[#111] text-white border border-[#2a2a2a] px-6 py-4 rounded-xl max-w-xs hover:scale-105 transition">
        {option}
      </div>
    ))}
  </div>
</motion.section>


      {/* How It Works */}
      <motion.section
        id="how"
        className="pt-36 pb-20 px-6 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#C2886D] mb-6">
              How QuietlyRich Works
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              From blank page to published content—our system guides you in four
              steps.
            </p>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setStepIndex(i)}
                  className={`p-5 rounded-xl cursor-pointer transition-all ${
                    stepIndex === i
                      ? "bg-[#181818] shadow-lg scale-[1.02]"
                      : "hover:bg-[#121212] hover:scale-[1.01]"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold ${
                      stepIndex === i ? "text-[#C2886D]" : "text-white"
                    }`}
                  >
                    Step {i + 1}: {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 md:mt-16">
            <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl shadow-xl p-8 w-full max-w-md h-[280px] flex items-center justify-center text-center">
              <p className="text-gray-400 text-sm">
                Preview:{" "}
                <span className="text-white font-medium">
                  {steps[stepIndex].title}
                </span>{" "}
                visuals go here
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        className="py-36 px-6 bg-black"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Inside the QuietlyRich Engine
          </h2>
          <p className="text-gray-400 mb-20 leading-relaxed mx-auto max-w-2xl">
            Designed to keep you consistent, faceless, and scalable—without the
            burnout.
          </p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-[#0f0f0f] p-6 rounded-2xl border border-[#1e1e1e] shadow-sm hover:shadow-[#C2886D]/20"
              >
                <div className="text-3xl mb-4 group-hover:scale-105 transition">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-serif tracking-tight">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stackflow */}
      <motion.section
        id="stackflow"
        className="pt-32 pb-36 px-6 bg-black relative overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4">
            The QuietlyRich Stackflow
          </h2>
          <p className="text-gray-400 mb-20 leading-relaxed mx-auto max-w-2xl">
            A proven system that takes you from blank page to automated
            influence—with zero face, zero burnout.
          </p>
          <div className="absolute top-[calc(50%+30px)] left-1/2 transform -translate-x-1/2 w-[85%] h-[2px] bg-gradient-to-r from-transparent via-[#C2886D]/40 to-transparent blur-md z-0" />
          <motion.div
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 text-center shadow-sm hover:shadow-[#C2886D]/20"
              >
                <div className="mb-4">
                  {i === 0 && <Target className="h-6 w-6 text-[#C2886D]" />}
                  {i === 1 && <FileText className="h-6 w-6 text-[#C2886D]" />}
                  {i === 2 && <Mic className="h-6 w-6 text-[#C2886D]" />}
                  {i === 3 && (
                    <CalendarCheck className="h-6 w-6 text-[#C2886D]" />
                  )}
                </div>
                <h3 className="text-white font-bold text-lg font-serif mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        id="pricing"
        className="py-36 px-6 bg-black"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Pricing Made Simple
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed mx-auto max-w-2xl">
            Choose a plan that fits your growth—whether you’re starting solo or
            scaling silently with a team.
          </p>

          {/* Billing toggle */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center bg-[#121212] border border-[#1e1e1e] rounded-full p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2 text-sm font-medium rounded-full transition ${
                  billing === "monthly"
                    ? "bg-[#C2886D] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2 text-sm font-medium rounded-full transition ${
                  billing === "yearly"
                    ? "bg-[#C2886D] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {[
              {
                plan: "Free",
                monthly: 0,
                yearly: 0,
                features: ["3 content templates", "Basic CTA generator"],
              },
              {
                plan: "Pro",
                monthly: 29,
                yearly: 299,
                savings: 49,
                highlight: true,
                features: [
                  "Unlimited templates",
                  "Daily drops",
                  "Voiceover snippets",
                  "Full automation",
                ],
              },
              {
                plan: "Agency",
                monthly: 99,
                yearly: 799,
                savings: 389,
                features: [
                  "Team access",
                  "Influencer tracker",
                  "Dedicated GPT",
                  "Client reporting",
                ],
              },
            ].map((tier, i) => {
              const price =
                billing === "yearly"
                  ? `£${tier.yearly}`
                  : `£${tier.monthly}/mo`;
              const saveText =
                billing === "yearly" && tier.savings
                  ? `Save £${tier.savings}/year`
                  : null;

              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border flex flex-col relative transition-all ${
                    tier.highlight
                      ? "border-[#C2886D] shadow-lg bg-[#181818]"
                      : "border-[#1e1e1e] bg-[#121212]"
                  }`}
                >
                  {tier.plan === "Pro" && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C2886D] px-3 py-1 rounded-full text-black text-xs font-semibold shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-white text-xl font-serif font-bold mb-2">
                      {tier.plan}
                    </h3>
                    <p className="text-3xl font-bold text-[#C2886D] mb-1">
                      {price}
                    </p>
                    {saveText && (
                      <p className="text-[#C2886D] text-sm mb-4 font-medium">
                        {saveText}
                      </p>
                    )}
                    <ul className="space-y-2 text-gray-400 mb-6">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#C2886D] rounded-full" />{" "}
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2 mt-auto bg-[#C2886D] text-white rounded-full text-sm font-medium transition hover:scale-105">
                      {tier.plan === "Free" ? "Start Now" : "Upgrade"}
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* About */}
      <motion.section
        id="about"
        className="py-32 px-6 bg-black relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute w-[600px] h-[600px] bg-[#C2886D]/10 blur-[180px] rounded-full -top-40 left-10 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            About QuietlyRich
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed">
            QuietlyRich was born out of frustration with overcomplicated content
            tools. We believe creators deserve faceless, scalable growth without
            burnout.
          </p>
          <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl px-8 py-10 shadow-xl max-w-3xl mx-auto">
            <p className="text-gray-300 text-xl italic mb-4 leading-relaxed">
              “I built QuietlyRich because creators like us deserve tools that
              make building empires feel calm, elegant, and silent—not chaotic.”
            </p>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/36.jpg"
                alt="Founder"
                className="w-12 h-12 rounded-full border border-[#C2886D] object-cover"
              />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">
                  Yahya, Founder of QuietlyRich
                </p>
                <p className="text-gray-400 text-xs">
                  Visionary + Silent Builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        className="py-36 px-6 bg-black relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute w-[600px] h-[600px] bg-[#C2886D]/10 blur-[160px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-6">
            Loved by Silent Creators
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Hear from faceless creators scaling effortlessly with QuietlyRich.
          </p>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            loop
            autoplay={{ delay: 6000 }}
            pagination={{ clickable: true }}
            className="max-w-3xl mx-auto"
          >
            {[
              {
                name: "Amelia Hart",
                role: "Content Creator",
                quote:
                  "QuietlyRich helped me grow anonymously while staying creative. It's a game changer!",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "Liam Bennett",
                role: "Agency Owner",
                quote:
                  "We scaled 10x with QuietlyRich. The automation and AI features are top-tier.",
                image: "https://randomuser.me/api/portraits/men/52.jpg",
              },
              {
                name: "Sophia Kim",
                role: "Brand Strategist",
                quote:
                  "Everything just works. It’s powerful, sleek, and totally faceless-friendly.",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Noah Clarke",
                role: "TikTok Coach",
                quote:
                  "Finally a platform that understands viral content. QuietlyRich nails it!",
                image: "https://randomuser.me/api/portraits/men/21.jpg",
              },
              {
                name: "Zara Patel",
                role: "Solo Entrepreneur",
                quote:
                  "No fluff, just results. I now batch content in hours instead of days.",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
              },
            ].map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl px-8 py-10 shadow-xl text-center">
                  <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 rounded-full border border-[#C2886D] object-cover"
                    />
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* Comparison */}
      <motion.section
        id="comparison"
        className="py-36 px-6 bg-black relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute w-[600px] h-[600px] bg-[#C2886D]/10 blur-[180px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4">
            Why Creators Choose QuietlyRich
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
            Here’s how we outperform typical “AI tools”—designed for creators,
            not just content.
          </p>
          <div className="grid gap-6">
            {[
              {
                title: "Faceless Growth",
                quietly:
                  "Yes—optimized for building brands without being on camera.",
                other: "No—most platforms focus on on-camera content.",
              },
              {
                title: "System + AI",
                quietly: "Yes—strategy blueprint plus AI, not just tools.",
                other: "No—just generates content with no growth plan.",
              },
              {
                title: "Voice Memory",
                quietly: "Yes—remembers your tone over time.",
                other: "No—each session starts from scratch.",
              },
              {
                title: "Auto Funnels",
                quietly: "Yes—inserts high‑converting CTAs automatically.",
                other: "No—manual funnel setup required.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-stretch justify-between bg-[#121212] border border-[#1e1e1e] rounded-2xl p-6 hover:shadow-[#C2886D]/20 transition-shadow duration-300 group"
              >
                <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6 border-b md:border-b-0 md:border-r border-[#2a2a2a]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-[#C2886D] text-sm font-medium mb-1">
                    QuietlyRich
                  </p>
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
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        className="py-36 px-6 bg-black relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute w-[600px] h-[600px] bg-[#C2886D]/10 blur-[160px] rounded-full -top-32 -left-20 z-0" />
        <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[120px] rounded-full -bottom-20 right-0 z-0" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-left">
            {[
              {
                q: "Do I need to show my face?",
                a: "Not at all. QuietlyRich is built for faceless creators.",
              },
              {
                q: "Can I use this for clients?",
                a: "Yes—Agency plan includes team management & reporting.",
              },
              {
                q: "Need design skills?",
                a: "Nope—AI handles everything; you just approve and publish.",
              },
              { q: "Free trial?", a: "Yes—start free and upgrade anytime." },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-[#121212] border border-[#2a2a2a] rounded-xl px-6 py-4 hover:shadow-lg hover:shadow-[#C2886D]/10 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-white text-base font-medium">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#C2886D]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    {item.q}
                  </div>
                  <span className="group-open:rotate-45 transform transition-transform duration-300">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Demo placeholder */}
      <TryDemo />

      {/* Final Call to Action */}
      <section
        id="cta"
        className="relative z-10 bg-[#0e0e0e] py-28 px-6 text-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-[#C2886D]/10 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-[#C2886D]/10 blur-[100px] rounded-full z-0" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Ready to Grow Without Burnout?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
            Join hundreds of silent creators scaling with QuietlyRich—no
            meetings, no burnout, just consistent faceless growth.
          </p>
          <a
            href="#"
            className="inline-block bg-[#C2886D] text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:scale-105 transition"
          >
            Start Free Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-[#1a1a1a] text-gray-400 text-sm py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white text-xl font-serif font-bold mb-4">
              QuietlyRich
            </h3>
            <p>Build in silence. Earn in style.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul>
              <li>
                <a href="#how" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-12 text-xs">
          © {new Date().getFullYear()} QuietlyRich. All rights reserved.
        </div>
      </footer>

      {/* scroll‑to‑top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-[#C2886D] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          ↑ Top
        </button>
      )}
    </main>
  );
}



