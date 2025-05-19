'use client';

import React from 'react';
import QuietlyRichLandingHero from './QuietlyRichLandingHero';
import TrustBar from './TrustBar';
import HowItWorksSection from './HowItWorksSection';
import PreviewGallerySection from './PreviewGallerySection';
import ResultsProofBar from './ResultsProofBar';
import TestimonialsSection from './TestimonialsSection';
import TryDemoSection from './TryDemoSection';
import PricingSection from './PricingSection';
import CompareBar from './CompareBar';
import FAQSection from './FAQSection';
import FinalCTAAndFooter from './FinalCTAAndFooter';

type QuietlyRichLandingProps = {
  fantasyMode: boolean;
  setFantasyMode: (v: boolean) => void;
};

export default function QuietlyRichLanding({
  fantasyMode,
  setFantasyMode,
}: QuietlyRichLandingProps) {
  return (
    <div className="relative">
      {/* Floating Fantasy Mode ON Badge */}
      {fantasyMode && (
        <div className="fixed top-6 right-6 z-50 bg-[#6A00FF] text-white px-4 py-2 rounded-full shadow-lg animate-pulse pointer-events-none">
          <span role="img" aria-label="Magic">🪄</span> Fantasy Mode ON
        </div>
      )}

      {/* HERO SECTION */}
      <QuietlyRichLandingHero
        fantasyMode={fantasyMode}
        setFantasyMode={setFantasyMode}
      />

      {/* TRUST BAR */}
      <TrustBar />

      {/* HOW IT WORKS */}
      <HowItWorksSection fantasyMode={fantasyMode} />

      {/* PREVIEW GALLERY */}
      <PreviewGallerySection fantasyMode={fantasyMode} />

      {/* RESULTS BAR */}
      <ResultsProofBar />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* TRY DEMO */}
      <TryDemoSection fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />

      {/* PRICING */}
      <PricingSection />

      {/* COMPARE BAR */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-[#C2886D] text-center mb-4">How QuietlyRich Compares</h3>
        <CompareBar />
      </div>

      {/* FAQ + NEWSLETTER */}
      <FAQSection />

      {/* FINAL CTA + FOOTER */}
      <FinalCTAAndFooter />
    </div>
  );
}