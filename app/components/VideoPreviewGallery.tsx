'use client';

import React from 'react';

const videos = [
  {
    id: 1,
    title: '5 Passive Income Ideas That Work',
    caption: '"Number 3 will change your life..."',
    views: '2.3M',
    category: 'Finance',
    videoSrc: '/videos/passive-income.mp4',
  },
  {
    id: 2,
    title: 'Anime Characters Who Could End Reality',
    caption: '"These powers are actually terrifying..."',
    views: '1.8M',
    category: 'Anime',
    videoSrc: '/videos/anime-reality.mp4',
  },
  {
    id: 3,
    title: 'Gym Mistakes Killing Your Gains',
    caption: '"Stop doing this immediately..."',
    views: '3.1M',
    category: 'Fitness',
    videoSrc: '/videos/gym-mistakes.mp4',
  },
  {
    id: 4,
    title: 'Psychology Tricks That Control Minds',
    caption: '"This works on everyone..."',
    views: '4.2M',
    category: 'Psychology',
    videoSrc: '/videos/psychology-tricks.mp4',
  },
  {
    id: 5,
    title: 'Ancient Mysteries Still Unsolved',
    caption: '"Scientists are baffled..."',
    views: '1.9M',
    category: 'History',
    videoSrc: '/videos/ancient-mysteries.mp4',
  },
];

export default function VideoPreviewGallery() {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Viral Videos Made by <span className="text-[#3B82F6]">QuietlyRich</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Real faceless videos going viral right now. Each one created in under 30 seconds.
        </p>

        {/* Scrollable row */}
        <div className="flex overflow-x-auto gap-6 hide-scrollbar justify-center px-1">
          {videos.map((video) => (
            <div
              key={video.id}
              className="min-w-[220px] max-w-[240px] bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#222] flex-shrink-0 shadow-md hover:shadow-[#3B82F6]/30 transition"
            >
              <div className="relative w-full h-60 bg-black">
                <video
                  src={video.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {video.category}
                </div>
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded">
                  👁 {video.views}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold leading-snug mb-1">{video.title}</h3>
                <p className="text-xs italic text-gray-400">{video.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-center text-sm sm:text-base">
          <div className="text-[#3B82F6] font-bold">
            12M+ <span className="text-white block font-normal">Total Views</span>
          </div>
          <div className="text-[#3B82F6] font-bold">
            850K+ <span className="text-white block font-normal">Videos Created</span>
          </div>
          <div className="text-[#3B82F6] font-bold">
            25 <span className="text-white block font-normal">Viral Niches</span>
          </div>
          <div className="text-purple-400 font-bold">
            4.9/5 <span className="text-white block font-normal">Creator Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}