'use client';
import React, { FC } from 'react';

import QuietlyRichLandingHero from '@/components/QuietlyRichLandingHero';
import HowItWorksContent from '@/components/HowItWorksContent';
import VideoPreviewGallery from '@/components/VideoPreviewGallery';
import TryDemoSection from '@/components/TryDemoSection';
import PricingSectionFixed from '@/components/PricingSectionFixed';
import FAQSection from '@/components/FAQSection';
import FinalCTAAndFooter from '@/components/FinalCTAAndFooter';
import TrustBar from '@/components/TrustBar';
import TestimonialsSectionFixed from '@/components/TestimonialsSectionFixed';
import CompareBarFixed from '@/components/CompareBarFixed';
import ResultsProofBarFinal from '@/components/ResultsProofBarFinal';
import TryDemoIntro from './TryDemoIntro';
import VoiceFeatureGrid from './VoiceFeatureGrid';
type Props = {
  fantasyMode: boolean;
  setFantasyMode: (val: boolean) => void;
};

const QuietlyRichLandingPage: FC<Props> = ({ fantasyMode, setFantasyMode }) => {
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
        <VideoPreviewGallery />
      </section>

      <TryDemoIntro />   {/* ← Add this line */}
     
  

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
        <HowItWorksContent fantasyMode={fantasyMode} />
      </section>
      <section className="mt-16">
        <FinalCTAAndFooter />
      </section>
      <section className="mt-16">
        <TryDemoSection fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
      </section>

      <section className="mt-16">
        <FinalCTAAndFooter />
      </section>
      
    </div>
    
  );

};

export default QuietlyRichLandingPage;