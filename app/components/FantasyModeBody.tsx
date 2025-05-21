'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function FantasyModeBody({ children, className }: Props) {
  const { fantasyMode } = useFantasyMode();

  // Add the fantasy-mode class if enabled
  const allClassNames = `${className ? className : ""} ${fantasyMode ? "fantasy-mode" : ""}`.trim();

  return <body className={allClassNames}>{children}</body>;
}