'use client';

import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <div className="w-full bg-[#181028] py-3 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 shadow-inner text-sm font-medium text-[#C2886D] border-b border-[#291d45] relative z-10">
      <span className="text-center">
        Trusted by <span className="font-bold text-white">10,000+</span> faceless creators
      </span>
      <span className="hidden md:inline">|</span>
      <span className="flex gap-3 items-center">
        <span>As seen on</span>
        <img
          src="/tiktok-logo.svg"
          alt="TikTok"
          className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/reddit-logo.svg"
          alt="Reddit"
          className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <img
          src="/youtube-logo.svg"
          alt="YouTube"
          className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
      </span>
    </div>
  );
};

export default TrustBar;
