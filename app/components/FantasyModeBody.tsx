'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

export default function FantasyModeBody({ children }: { children: React.ReactNode }) {
  const { fantasyMode } = useFantasyMode();

  return (
    <body
      className={`antialiased bg-black text-white min-h-screen overflow-x-hidden
        ${fantasyMode ? "fantasy-mode" : ""}
      `}
    >
      {children}
    </body>
  );
}
