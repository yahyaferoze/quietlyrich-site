// components/FantasyModeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface FantasyModeContextType {
  fantasyMode: boolean;
  setFantasyMode: (active: boolean) => void;
  toggleFantasyMode: () => void;
}

const FantasyModeContext = createContext<FantasyModeContextType | undefined>(undefined);

export const FantasyModeProvider = ({ children }: { children: ReactNode }) => {
  const [fantasyMode, setFantasyModeState] = useState(false);

  // Persist Fantasy Mode across sessions
  useEffect(() => {
    const stored = window?.localStorage?.getItem("fantasyMode");
    if (stored === "true") setFantasyModeState(true);
  }, []);

  useEffect(() => {
    window?.localStorage?.setItem("fantasyMode", fantasyMode ? "true" : "false");
    if (fantasyMode) {
      document.body.classList.add("fantasy-mode");
    } else {
      document.body.classList.remove("fantasy-mode");
    }
  }, [fantasyMode]);

  const setFantasyMode = (active: boolean) => setFantasyModeState(active);

  const toggleFantasyMode = () => setFantasyModeState((prev) => !prev);

  return (
    <FantasyModeContext.Provider value={{ fantasyMode, setFantasyMode, toggleFantasyMode }}>
      {children}
    </FantasyModeContext.Provider>
  );
};

export const useFantasyMode = (): FantasyModeContextType => {
  const context = useContext(FantasyModeContext);
  if (!context) throw new Error("useFantasyMode must be used within a FantasyModeProvider");
  return context;
};