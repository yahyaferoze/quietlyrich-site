'use client';

import React from 'react';

export default function FinalCTAAndFooter() {
  return (
    <>
      {/* FINAL CALL TO ACTION */}
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