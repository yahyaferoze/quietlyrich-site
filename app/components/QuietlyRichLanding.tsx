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

export default function QuietlyRichLanding({ fantasyMode, setFantasyMode }: Props) {
  return (
    <div className="bg-black text-white">
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