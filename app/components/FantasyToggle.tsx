'use client';

import React from 'react';
import { useFantasyMode } from './FantasyModeContext';

export default function FantasyToggle() {
  const { fantasyMode, setFantasyMode } = useFantasyMode();

  return (
    <div className="flex items-center space-x-2 ml-4">
      <label htmlFor="fantasy-toggle" className={`text-xs transition duration-300 ${fantasyMode ? 'text-[#E0B8FF] glow-text' : 'text-gray-400'}`}>
        {fantasyMode ? '🌌 Fantasy Mode On' : 'Fantasy Mode'}
      </label>

      <div className="relative">
        <input
          id="fantasy-toggle"
          type="checkbox"
          className="peer hidden"
          checked={fantasyMode}
          onChange={() => setFantasyMode(!fantasyMode)}
          aria-checked={fantasyMode}
          aria-label="Toggle Fantasy Mode"
        />
        <div className="w-11 h-6 bg-[#444] rounded-full shadow-inner peer-checked:bg-[#6A00FF] transition duration-300"></div>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${fantasyMode ? 'translate-x-5 pulse-glow' : ''}`} />
      </div>
    </div>
  );
}