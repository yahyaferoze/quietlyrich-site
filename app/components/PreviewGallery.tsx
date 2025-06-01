'use client';

import React from 'react';

type PreviewGalleryProps = {
  fantasyMode: boolean;
};

const previewClips = (fantasyMode: boolean) =>
  fantasyMode
    ? [
        {
          video: "/fantasy-podcast-preview.mp4",
          label: "Fantasy: Meme Podcast",
          stats: "21.3K views · 95% replay rate",
        },
        {
          video: "/fantasy-anime-battle.mp4",
          label: "Fantasy: Anime Battle",
          stats: "14.2K views · 91% watch time",
        },
        {
          video: "/fantasy-fake-news.mp4",
          label: "Fantasy: Parody News",
          stats: "10.8K views · 89% engagement",
        },
        {
          video: "/fantasy-skit.mp4",
          label: "Fantasy: Viral Skit",
          stats: "18.7K views · 92% replay",
        },
      ]
    : [
        {
          video: "/quietlyrich-homepage-clip-1.mp4",
          label: "Fitness Example",
          stats: "12.4K views · 87% watch time",
        },
        {
          video: "/3 health myths.mp4",
          label: "Side Hustle Example",
          stats: "10.1K views · 83% watch time",
        },
        {
          video: "/hiden movies.mp4",
          label: "Movie Recap Example",
          stats: "8.7K views · 90% engagement",
        },
        {
          video: "/losing fat .mp4",
          label: "Nutrition Example",
          stats: "15.3K views · 85% watch time",
        },
        {
          video: "/passive income tips.mp4",
          label: "Passive Income Example",
          stats: "9.4K views · 88% avg watch",
        },
        {
          video: "/example-preview.mp4",
          label: "Chill/Motivational",
          stats: "11.2K views · 92% replay rate",
        },
      ];

export default function PreviewGallery({ fantasyMode }: PreviewGalleryProps) {
  const clips = previewClips(fantasyMode);

  return (
    <section
      id="preview-gallery"
      className="bg-black text-white py-36 px-6 relative overflow-hidden"
    >
      {/* Subtle BG Glows for Depth */}
      <div className="absolute w-[600px] h-[600px] bg-[#6A00FF]/10 blur-[200px] rounded-full -top-32 -left-20 z-0 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-[#C2886D]/10 blur-[160px] rounded-full -bottom-20 right-0 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#C2886D] mb-4 drop-shadow">
          See QuietlyRich in Action
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed text-lg">
          {fantasyMode
            ? "Real AI-powered fantasy outputs — dream podcasts, fake memes, and wild skits, all ready to go viral."
            : "Real AI outputs, built facelessly — ready to go viral."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {clips.map((clip, i) => (
            <div
              key={i}
              className="relative bg-[#181028] border border-[#291d45] rounded-2xl p-3 overflow-hidden group hover:shadow-lg hover:shadow-[#C2886D]/20 transition-all"
            >
              <div className="aspect-[9/16] w-full rounded-xl overflow-hidden shadow-xl border-2 border-[#29214d] group-hover:border-[#C2886D] transition">
                <video
                  src={clip.video}
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                <p className="text-base text-white font-bold mb-1">{clip.label}</p>
                <p className="text-xs text-[#C2886D] font-medium">{clip.stats}</p>
              </div>
              <div className="absolute top-4 right-4 bg-[#C2886D] text-black text-xs px-3 py-1 rounded-full shadow">
                {i % 2 === 0 ? "TikTok Viral" : "Made with AI"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
