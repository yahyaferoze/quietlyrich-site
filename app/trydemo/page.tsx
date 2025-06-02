'use client'; // Must be FIRST!
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import TryDemo from '../components/TryDemo'; // or adjust relative path if needed

export default function TryDemoPage() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
    </main>
  );
}

