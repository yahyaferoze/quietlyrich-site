'use client';

import React from 'react';
type Props = {
  fantasyMode: boolean;
};

export default function PricingSectionFixed({ fantasyMode }: Props) {
  // now you can conditionally render based on fantasyMode

  return (
    <section id="pricing" className="relative px-6 py-36 bg-[#0a0a0a] text-white overflow-hidden">
      {/* BG visual glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6a00ff]/10 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c2886d]/10 blur-[160px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4">
          {fantasyMode ? 'Fantasy or Real. Your Brand. One Price.' : 'Start Quietly. Scale Loudly.'}
        </h2>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
          One simple plan to unlock full access to QuietlyRich. Unlimited voices, scripts, previews — all yours.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-3 md:col-span-1 bg-[#181028] border border-[#291d45] p-6 rounded-2xl shadow-md">
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Free Trial</p>
            <h3 className="text-3xl font-bold text-white mb-4">£0</h3>
            <ul className="text-left text-sm text-gray-300 space-y-2 mb-6">
              <li>✅ Try Demo Tool</li>
              <li>✅ Limited script preview</li>
              <li>🚫 No audio or full preview export</li>
            </ul>
            <a
              href="/signup"
              className="block w-full text-center bg-[#C2886D] text-black font-bold py-2 px-4 rounded-xl hover:bg-[#b3745b] transition"
            >
              Try Free
            </a>
          </div>

          <div className="col-span-3 md:col-span-1 bg-[#1c132e] border-2 border-[#C2886D] p-6 rounded-2xl shadow-lg relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C2886D] text-black text-xs font-semibold px-4 py-1 rounded-full">
              Most Popular
            </span>
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Creator Plan</p>
            <h3 className="text-3xl font-bold text-white mb-4">£29/mo</h3>
            <ul className="text-left text-sm text-gray-300 space-y-2 mb-6">
              <li>✅ Unlimited script generation</li>
              <li>✅ Unlimited voice samples</li>
              <li>✅ 30 high-quality previews per month</li>
              <li>✅ Commercial license</li>
              <li>✅ Fantasy mode access</li>
            </ul>
            <a
              href="/pricing"
              className="block w-full text-center bg-[#C2886D] text-black font-bold py-2 px-4 rounded-xl hover:bg-[#b3745b] transition"
            >
              Unlock Full Access
            </a>
          </div>

          <div className="col-span-3 md:col-span-1 bg-[#181028] border border-[#291d45] p-6 rounded-2xl shadow-md">
            <p className="text-sm font-semibold text-[#C2886D] uppercase mb-2">Annual Deal</p>
            <h3 className="text-3xl font-bold text-white mb-4">£290/yr</h3>
            <ul className="text-left text-sm text-gray-300 space-y-2 mb-6">
              <li>✅ Everything in Creator Plan</li>
              <li>✅ Save 2 months</li>
              <li>✅ Bonus: 100 preview exports</li>
            </ul>
            <a
              href="/signup"
              className="block w-full text-center border border-[#C2886D] text-[#C2886D] font-bold py-2 px-4 rounded-xl hover:bg-[#C2886D] hover:text-black transition"
            >
              Pay Annually
            </a>
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500 italic">
          Cancel anytime. 100% satisfaction guarantee.
        </p>
      </div>
    </section>
  );
}