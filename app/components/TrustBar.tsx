'use client';

import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <div className="w-full bg-[#181028] py-3 flex flex-col md:flex-row justify-center items-center gap-2 shadow-inner text-sm font-medium text-[#C2886D] border-b border-[#291d45]">
      <span>
        Trusted by <span className="font-bold text-white">10,000+</span> faceless creators
      </span>
      <span className="hidden md:inline">|</span>
      <span className="flex gap-3 items-center">
        <span>As seen on</span>
        <img
          src="/tiktok-logo.svg"
          alt="TikTok logo"
          className="w-6 h-6"
          loading="lazy"
          role="img"
        />
        <img
          src="/reddit-logo.svg"
          alt="Reddit logo"
          className="w-6 h-6"
          loading="lazy"
          role="img"
        />
        <img
          src="/youtube-logo.svg"
          alt="YouTube logo"
          className="w-6 h-6"
          loading="lazy"
          role="img"
        />
      </span>
    </div>
  );
};

export default TrustBar;