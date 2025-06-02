'use client';
export const dynamic = 'force-dynamic'; // ✅ prevent Next from server-rendering this

import React, { useState } from 'react';
import TryDemo from '@/components/TryDemo'; // ✅ Use @ path alias to avoid path issues

export default function TryDemoPage() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <TryDemo fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
    </main>
  );
}