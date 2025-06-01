'use client';

import React, { useEffect, useState } from 'react';
import QuietlyRichLanding from './components/QuietlyRichLanding';
import { useFantasyMode } from './components/FantasyModeContext';

export default function Home() {
  const { fantasyMode } = useFantasyMode(); // from context
  const [mounted, setMounted] = useState(false);

  // 🛠 Add a local override setFantasyMode if needed
  const [localFantasyMode, setFantasyMode] = useState(fantasyMode);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QuietlyRichLanding
      fantasyMode={localFantasyMode}
      setFantasyMode={setFantasyMode}
    />
  );
}
