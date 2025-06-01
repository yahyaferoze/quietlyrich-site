'use client';

'use client';
'use client';
// ✅ Corrected Imports (match the exact filenames in /components)
import QuietlyRichLandingHero from './components/QuietlyRichLandingHero';
import ResultsProofBarFinal from './components/ResultsProofBarFinal';
import TestimonialsSectionFixed from './components/TestimonialsSectionFixed';
import CompareBarFixed from './components/CompareBarFixed';
import VoiceFeatureGrid from './components/VoiceFeatureGrid';
import PricingSectionFixed from './components/PricingSectionFixed';
import FinalCTAAndFooter from './components/FinalCTAAndFooter';
import TryDemoSection from './components/TryDemoSection';
import PreviewGallery from './components/PreviewGallery';
import FAQSection from './components/FAQSection';

export default function QuietlyRichLanding() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <QuietlyRichLandingHero />
      <ResultsProofBarFinal />
      <PreviewGallery />
      <TestimonialsSectionFixed />
      <VoiceFeatureGrid />
      <CompareBarFixed />
      <PricingSectionFixed fantasyMode={false} />
      <TryDemoSection fantasyMode={false} />
      <FAQSection />
      <FinalCTAAndFooter />
    </div>
  );
}