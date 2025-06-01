'use client';

import React, { useState } from 'react';
import QuietlyRichLanding from './components/QuietlyRichLanding';

export default function Home() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <QuietlyRichLanding fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
  );
}
