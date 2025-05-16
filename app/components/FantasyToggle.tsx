'use client';

import React, { useState } from 'react';

export default function FantasyToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-center my-8">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#C2886D] rounded-full peer dark:bg-gray-700 peer-checked:bg-[#C2886D] transition"></div>
        <span className="ml-3 text-sm font-medium text-white">
          Fantasy Mode {enabled ? 'On' : 'Off'}
        </span>
      </label>
    </div>
  );
}