'use client';

import React, { useState } from 'react';
import QuietlyRichLandingPage from './components/QuietlyRichLandingPage';

export default function Home() {
  const [fantasyMode, setFantasyMode] = useState(false);

  return (
    <QuietlyRichLandingPage fantasyMode={fantasyMode} setFantasyMode={setFantasyMode} />
  );
}
