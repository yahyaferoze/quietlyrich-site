'use client';
import React, { FC } from 'react';

import QuietlyRichLandingHero from '@/components/QuietlyRichLandingHero';
import ResultsProofBarFinal from '@/components/ResultsProofBarFinal';
import VoiceFeatureGrid from './VoiceFeatureGrid';
import HowItWorksContent from '@/components/HowItWorksContent';
import TryDemoIntro from './TryDemoIntro';
import TryDemoSection from '@/components/TryDemoSection';
import VideoPreviewGallery from '@/components/VideoPreviewGallery';
import TestimonialsSectionFixed from '@/components/TestimonialsSectionFixed';
import CompareBarFixed from '@/components/CompareBarFixed';
import TrustBar from '@/components/TrustBar';
import PricingSectionFixed from '@/components/PricingSectionFixed';
import FAQSection from '@/components/FAQSection';
import FinalCTAAndFooter from '@/components/FinalCTAAndFooter';

type Props = {
  fantasyMode: boolean;
  setFantasyMode: (val: boolean) => void;
};

const QuietlyRichLandingPage: FC<Props> = ({ fantasyMode, setFantasyMode }) => {
  return (
    <div className="bg-black text-white">
      {/* HERO SECTION */}
      <QuietlyRichLandingHero fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />

      {/* FAST SOCIAL PROOF / CREDIBILITY BAR */}
      <section className="mt-10">
        <ResultsProofBarFinal />
      </section>

      {/* KEY FEATURE GRID */}
      <section className="mt-16">
        <VoiceFeatureGrid fantasyMode={fantasyMode} />
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-16">
        <HowItWorksContent fantasyMode={fantasyMode} />
      </section>

      {/* TRY DEMO INTRO + SECTION */}
      <section className="mt-16">
        <TryDemoIntro />
        <TryDemoSection fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
      </section>

      {/* PREVIEW GALLERY */}
      <section className="mt-16">
        <VideoPreviewGallery />
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-16">
        <TestimonialsSectionFixed />
      </section>

      {/* COMPARE TABLE */}
      <section className="mt-16">
        <CompareBarFixed />
      </section>

      {/* BRAND/TRUST BAR */}
      <section className="mt-16">
        <TrustBar />
      </section>

      {/* PRICING */}
      <section className="mt-16">
        <PricingSectionFixed fantasyMode={fantasyMode} />
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <FAQSection />
      </section>

      {/* FINAL CTA + FOOTER */}
      <section className="mt-16">
        <FinalCTAAndFooter />
      </section>
    </div>
  );
};

export default QuietlyRichLandingPage;