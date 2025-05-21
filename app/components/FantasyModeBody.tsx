'use client';

import React from "react";
import { useFantasyMode } from "./FantasyModeContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function FantasyModeBody({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    const { fantasyMode } = useFantasyMode();
  
    // Add the class if fantasyMode is enabled
    const allClassNames =
      className +
      (fantasyMode ? " fantasy-mode" : "");
  
    return <body className={allClassNames}>{children}</body>;
  }
  