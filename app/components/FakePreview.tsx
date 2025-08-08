// components/FakePreview.tsx
import React from "react";

interface FakePreviewProps {
  script: string;
  isFantasyMode?: boolean;
}

const previewStyles = {
  normal: "bg-neutral-900 border border-neutral-700 shadow-xl",
  fantasy:
    "bg-gradient-to-br from-fuchsia-900 via-purple-800 to-indigo-900 border-2 border-fuchsia-400 shadow-[0_0_30px_10px_rgba(136,0,255,0.3)] animate-glow",
};

export default function FakePreview({
  script,
  isFantasyMode = false,
}: FakePreviewProps) {
  const lines = script
    .split(/\n+/)
    .filter((line) => line.trim())
    .map((line, i) => (
      <span
        key={i}
        className={`block mb-2 text-lg md:text-xl ${
          isFantasyMode
            ? "text-fuchsia-300 font-semibold tracking-wide animate-pulse"
            : "text-neutral-100"
        }`}
      >
        {line}
      </span>
    ));

  return (
    <div
      className={`rounded-2xl p-6 w-full max-w-md mx-auto min-h-[200px] ${
        isFantasyMode ? previewStyles.fantasy : previewStyles.normal
      } transition-all duration-500`}
      aria-label="AI Video Preview"
    >
      <div className="flex flex-col justify-center items-center h-full w-full min-h-[150px]">
        {lines.length ? (
          lines
        ) : (
          <span className="text-neutral-500 italic">
            Video script preview will appear here.
          </span>
        )}
      </div>
    </div>
  );
}