'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

export default function BodyWithFantasyMode({ children }: { children: React.ReactNode }) {
  const { fantasyMode } = useFantasyMode();
  const classNames = `antialiased bg-black text-white min-h-screen overflow-x-hidden ${fantasyMode ? "fantasy-mode" : ""}`;
  return <body className={classNames}>{children}</body>;
}
