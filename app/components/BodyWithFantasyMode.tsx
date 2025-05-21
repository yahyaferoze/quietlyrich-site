'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

export default function BodyWithFantasyMode({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fantasyMode } = useFantasyMode();

  return (
    <body
      className={`antialiased min-h-screen overflow-x-hidden ${
        fantasyMode ? "fantasy-mode" : "bg-black text-white"
      }`}
    >
      {children}
    </body>
  );
}