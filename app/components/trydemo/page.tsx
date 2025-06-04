'use client';
export const dynamic = 'force-dynamic'; // ✅ Prevents static rendering

import React, { useState } from 'react';
import TryDemo from '@/components/TryDemo'; // ✅ Use alias if set correctly in tsconfig

export default function TryDemoPage() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
    </main>
  );
}

