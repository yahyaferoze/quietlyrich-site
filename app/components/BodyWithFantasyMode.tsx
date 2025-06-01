'use client';

import React, { useEffect } from "react";
import { useFantasyMode } from "./FantasyModeContext";

type Props = {
  children: React.ReactNode;
};

/**
 * Applies .fantasy-mode class to the actual <body> tag in the DOM,
 * not just to a nested element (critical for global/themed styles).
 */
export default function BodyWithFantasyMode({ children }: Props) {
  const { fantasyMode } = useFantasyMode();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      if (fantasyMode) {
        body.classList.add("fantasy-mode");
      } else {
        body.classList.remove("fantasy-mode");
      }
    }
  }, [fantasyMode]);

  return <>{children}</>;
}
