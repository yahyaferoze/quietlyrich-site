"use client";
import React, { useEffect, useState } from "react";

export default function DemoOutput() {
  const [brand, setBrand] = useState({
    name: "AlphaWaves",
    niche: "Personal Growth for Gen Z",
    voice: "Viral-Style AI Male Voice",
    style: "Motivational micro-scripts",
    sampleScript:
      "No one’s coming to save you. But that’s the best part — you get to build your own empire.",
    voiceSampleUrl: "/assets/alpha-voice.mp3",
  });

  return (
    <main className="min-h-screen bg-neutral-900 text-white px-6 py-12">
      <section className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-serif font-bold">
          🎉 Your Faceless Brand Is Ready
        </h1>
        <p className="text-lg text-neutral-400">
          We’ve created your brand’s identity. No face. No burnout. Just quiet
          execution.
        </p>

        <div className="bg-neutral-800 rounded-xl p-6 mt-8 space-y-4 text-left shadow-lg border border-neutral-700">
          <div>
            <strong>Brand Name:</strong> {brand.name}
          </div>
          <div>
            <strong>Niche:</strong> {brand.niche}
          </div>
          <div>
            <strong>Voice Style:</strong> {brand.voice}
          </div>
          <div>
            <strong>Content Style:</strong> {brand.style}
          </div>
          <div>
            <strong>Sample Script:</strong> {brand.sampleScript}
          </div>
        </div>

        {/* Placeholder: Hook this to real voice audio later */}
        <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-neutral-100">
          🔊 Hear Voice Sample
        </button>

        <div className="mt-10 space-y-4">
          <p className="text-xl font-semibold">
            Ready to generate your first 30 pieces of content?
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="/pricing"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
            >
              Unlock Full Kit
            </a>
            <a
              href="/signup"
              className="underline text-neutral-300 hover:text-white"
            >
              Start Free
            </a>
          </div>
        </div>

        <div className="mt-12 text-neutral-500 text-sm">
          "Launched in 15 minutes. 250K views. Didn’t record a thing."
          <br />– Faceless Creator, TikTok
        </div>
      </section>
    </main>
  );
}