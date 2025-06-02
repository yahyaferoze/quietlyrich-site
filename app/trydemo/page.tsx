'use client';
export const dynamic = 'force-dynamic'; // ✅ Fixes the prerender error

import React, { useState } from 'react';
import TryDemo from '@/components/TryDemo';// ✅ Confirmed correct from your folder tree

export default function TryDemoPage() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
    </main>
  );
}
