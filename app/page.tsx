'use client';

import React, { useEffect, useState } from 'react';
import QuietlyRichLanding from './components/QuietlyRichLanding';
import { useFantasyMode } from './components/FantasyModeContext';

export default function Home() {
  const { fantasyMode, setFantasyMode } = useFantasyMode(); // ✅ extract both
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QuietlyRichLanding fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
  );
}
