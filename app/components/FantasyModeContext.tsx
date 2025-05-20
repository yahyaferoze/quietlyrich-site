'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FantasyModeContextType = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
  toggleFantasyMode: () => void;
};

const FantasyModeContext = createContext<FantasyModeContextType | undefined>(undefined);

export function FantasyModeProvider({ children }: { children: ReactNode }) {
  const [fantasyMode, setFantasyMode] = useState(false);

  const toggleFantasyMode = () => setFantasyMode((v) => !v);

  return (
    <FantasyModeContext.Provider value={{ fantasyMode, setFantasyMode, toggleFantasyMode }}>
      {children}
    </FantasyModeContext.Provider>
  );
}

export function useFantasyMode() {
  const context = useContext(FantasyModeContext);
  if (!context) {
    throw new Error('useFantasyMode must be used within a FantasyModeProvider');
  }
  return context;
}