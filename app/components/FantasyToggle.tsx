import React from 'react';

type FantasyToggleProps = {
  fantasyMode: boolean;
  setFantasyMode: (value: boolean) => void;
};

export default function FantasyToggle({ fantasyMode, setFantasyMode }: FantasyToggleProps) {
  return (
    <div className="flex items-center space-x-2 ml-4">
      <label htmlFor="fantasy-toggle" className="text-xs text-gray-400">
        Fantasy Mode
      </label>
      <input
        id="fantasy-toggle"
        type="checkbox"
        className="accent-[#C2886D] scale-125"
        checked={fantasyMode}
        onChange={() => setFantasyMode(!fantasyMode)}
        aria-checked={fantasyMode}
        aria-label="Toggle Fantasy Mode"
      />
    </div>
  );
}