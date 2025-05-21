'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function FantasyModeBody({ children, className }: Props) {
  const { fantasyMode } = useFantasyMode();

  const allClassNames = `${className ?? ""} ${fantasyMode ? "fantasy-mode" : ""}`.trim();

  return <div className={allClassNames}>{children}</div>;
}