'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaStar } from 'react-icons/fa';

type FantasyModeContextType = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
  toggleFantasyMode: () => void;
};

const FantasyModeContext = createContext<FantasyModeContextType | undefined>(undefined);

export function FantasyModeProvider({ children }: { children: ReactNode }) {
  const [fantasyMode, setFantasyMode] = useState(false);

  // Persist fantasy mode across reloads
  useEffect(() => {
    const stored = localStorage.getItem('fantasyMode');
    if (stored !== null) setFantasyMode(stored === 'true');
  }, []);
  useEffect(() => {
    localStorage.setItem('fantasyMode', String(fantasyMode));
  }, [fantasyMode]);

  const toggleFantasyMode = () => setFantasyMode((v) => !v);

  return (
    <FantasyModeContext.Provider value={{ fantasyMode, setFantasyMode, toggleFantasyMode }}>
      {children}
    </FantasyModeContext.Provider>
  );
}

// 🎯 Final CTA + Footer
export default function FinalCTAAndFooter() {
  return (
    <>
      {/* Final Call-to-Action */}
      <section className="relative bg-gradient-to-br from-[#0B0814] via-[#1c102d] to-[#0B0814] py-20 px-6 border-t border-[#291d45] overflow-hidden">
        {/* Glow Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#6A00FF]/20 via-transparent to-[#C2886D]/10 blur-[100px] opacity-80"
          animate={{ opacity: [0.6, 0.85, 0.6] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#C2886D] via-[#fff] to-[#6A00FF] bg-clip-text text-transparent drop-shadow-lg"
          >
            Ready to Build Your Faceless Brand?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Join 10,000+ creators who use QuietlyRich to create viral, monetizable content —
            all without showing their face. No credit card required.
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-200">
              <FaCheckCircle className="text-green-400" /> No Editing Needed
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-200">
              <FaCheckCircle className="text-green-400" /> Faceless Content
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-gray-200">
              <FaStar className="text-yellow-400" /> Rated 4.9/5
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="#try-demo"
              className="relative bg-gradient-to-tr from-[#C2886D] via-[#fff7f3] to-[#6A00FF] text-black font-semibold px-10 py-4 rounded-2xl shadow-2xl text-lg border border-[#C2886D]/60 backdrop-blur-lg transition-all duration-200 hover:scale-105"
              style={{ boxShadow: '0 0 40px 0 #C2886D44' }}
            >
              Try It Free
            </Link>
            <Link
              href="#pricing"
              className="text-white/80 hover:underline text-base tracking-wide font-medium"
            >
              View Pricing →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="text-center text-gray-500 text-xs py-6 bg-[#0B0814] border-t border-[#1a1a1a]">
        © {new Date().getFullYear()} QuietlyRich. All rights reserved.
      </footer>
    </>
  );
}