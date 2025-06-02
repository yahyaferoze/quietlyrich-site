'use client';

import React from 'react';
import QuietlyRichLandingHero from './QuietlyRichLandingHero';
import ResultsProofBarFinal from './ResultsProofBarFinal';
import TestimonialsSectionFixed from './TestimonialsSectionFixed';
import CompareBarFixed from './CompareBarFixed';
import PreviewGallery from './PreviewGallery';
import PricingSectionFixed from './PricingSectionFixed';
import FinalCTAAndFooter from './FinalCTAAndFooter';
import TrustBar from './TrustBar';
import FAQSection from './FAQSection';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

export default function QuietlyRichLandingPage({ fantasyMode, setFantasyMode }: Props) {
  return (
    <div className={fantasyMode ? 'fantasy-mode bg-black text-white' : 'bg-black text-white'}>
      {/* Example toggle button for Fantasy Mode */}
      <div className="flex justify-end p-4">
        <button
          className={`px-4 py-2 rounded ${fantasyMode ? 'bg-purple-700' : 'bg-[#C2886D]'} text-white font-bold shadow`}
          onClick={() => setFantasyMode(!fantasyMode)}
        >
          {fantasyMode ? 'Exit Fantasy Mode' : 'Try Fantasy Mode'}
        </button>
      </div>
      <QuietlyRichLandingHero />

      <section className="mt-16">
        <ResultsProofBarFinal />
      </section>

      <section className="mt-16">
        <TestimonialsSectionFixed />
      </section>

      <section className="mt-16">
        <CompareBarFixed />
      </section>

      <section className="mt-16">
        <PreviewGallery fantasyMode={fantasyMode} />
      </section>

      <section className="mt-16">
        <PricingSectionFixed fantasyMode={fantasyMode} />
      </section>

      <section className="mt-16">
        <FAQSection />
      </section>

      <section className="mt-16">
        <TrustBar />
      </section>

      <section className="mt-16">
        <FinalCTAAndFooter />
      </section>
    </div>
  );
}