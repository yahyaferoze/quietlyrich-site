'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

type Props = {
  children: React.ReactNode;
};

export default function BodyWithFantasyMode({ children }: Props) {
  const { fantasyMode } = useFantasyMode();

  return (
    <body className={`antialiased min-h-screen overflow-x-hidden ${fantasyMode ? "fantasy-mode" : "bg-black text-white"}`}>
      {children}
    </body>
  );
}
