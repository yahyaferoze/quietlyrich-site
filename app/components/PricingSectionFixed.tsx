'use client';

import React from 'react';

const plans = [
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
];

export default function PricingSection() {
  return (
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
          {plans.map((plan, i) => (
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
  );
}