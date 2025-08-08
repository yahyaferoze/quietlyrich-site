'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FantasyModeContextType {
  fantasyMode: boolean;
  setFantasyMode: (active: boolean) => void;
  toggleFantasyMode: () => void;
}

const FantasyModeContext = createContext<FantasyModeContextType | undefined>(undefined);

export const FantasyModeProvider = ({ children }: { children: ReactNode }) => {
  const [fantasyMode, setFantasyModeState] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fantasyMode');
      if (stored === 'true') setFantasyModeState(true);
    } catch {
      /* ignore SSR/localStorage issues */
    }
  }, []);

  // Save to localStorage & toggle body class
  useEffect(() => {
    try {
      localStorage.setItem('fantasyMode', fantasyMode ? 'true' : 'false');
    } catch {}
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('fantasy-mode', fantasyMode);
    }
  }, [fantasyMode]);

  const setFantasyMode = (active: boolean) => setFantasyModeState(active);
  const toggleFantasyMode = () => setFantasyModeState(prev => !prev);

  return (
    <FantasyModeContext.Provider value={{ fantasyMode, setFantasyMode, toggleFantasyMode }}>
      {children}
    </FantasyModeContext.Provider>
  );
};

export const useFantasyMode = (): FantasyModeContextType => {
  const context = useContext(FantasyModeContext);
  if (!context) throw new Error('useFantasyMode must be used within a FantasyModeProvider');
  return context;
};