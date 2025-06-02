'use client';
import React, { useState } from 'react';
import TryDemo from '@/components/TryDemo';
export default function TryDemoPage() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
    </main>
  );
}