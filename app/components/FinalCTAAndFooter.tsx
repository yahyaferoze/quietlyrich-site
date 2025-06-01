'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FantasyModeContextType = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
  toggleFantasyMode: () => void;
};

const FantasyModeContext = createContext<FantasyModeContextType | undefined>(undefined);

export function FantasyModeProvider({ children }: { children: ReactNode }) {
  const [fantasyMode, setFantasyMode] = useState(false);

  // Optional: Persist fantasy mode across reloads (uncomment to enable)
   useEffect(() => {
    const stored = localStorage.getItem('fantasyMode');
     if (stored !== null) setFantasyMode(stored === "true");
   }, []);
  useEffect(() => {
     localStorage.setItem('fantasyMode', String(fantasyMode));
   }, [fantasyMode]);

  const toggleFantasyMode = () => setFantasyMode((v) => !v);

  return (
    <FantasyModeContext.Provider value={{ fantasyMode, setFantasyMode, toggleFantasyMode }}>
      {children}
    </FantasyModeContext.Provider>
  );
}

export default function FinalCTAAndFooter() {
    return (
      <footer className="text-center text-gray-400 text-sm py-8">
        © 2025 QuietlyRich. All rights reserved.
      </footer>
    );
  }
  