'use client';
import React, { useState } from 'react';
import HowItWorksContent from '@/components/HowItWorksContent';

export default function HowItWorksPage() {
  const [fantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <HowItWorksContent fantasyMode={fantasyMode} />
    </main>
  );
}
