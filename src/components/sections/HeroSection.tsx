import React from 'react';
// @ts-ignore
import heroBgImage from '../../hero-bg.png';

interface HeroSectionProps {
  onShopClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    /* 1. CONTAINER: Increased height on mobile from h-auto to a striking 75vh (75% of viewport height).
          On desktop, it smoothly adapts back to full screen height minus the new top navbar height.
    */
    <section className="relative h-[75vh] md:min-h-[calc(100vh-48px)] w-full flex items-center bg-[#f0f0f0] overflow-hidden select-none">

      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBgImage}
          alt="FITFAM Athletes"
          /* 2. IMAGE: 
                Changed mobile to 'absolute h-full object-cover' to cleanly fill the brand new 
                75vh tall container space without leaving empty background gaps.
          */
          className="absolute inset-0 w-full h-full object-cover object-top"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      </div>

      {/* 3. WATERMARK OVERLAY: 
            Positioned cleanly over the taller image presentation frame.
      */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-auto md:relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full z-10 flex items-center">

        {/* Large Logo & Text Lockup - Compact padding and background to look pristine overlaying the layout */}
        <div className="flex items-center gap-3 md:gap-6 bg-white/40 backdrop-blur-xs p-2.5 md:p-6 rounded-xs shadow-xs">

          {/* Custom Wing/Bar Icon Structure */}
          <div className="flex flex-col justify-center">
            <div className="w-10 md:w-13 h-2 md:h-3 bg-[#111111] mb-1 md:mb-3.5 [clip-path:polygon(0_0,100%_0,calc(100%-9px)_100%,0_100%)]"></div>
            <div className="w-8 md:w-10 h-2 md:h-3 bg-[#111111] mb-1 md:mb-3.5 [clip-path:polygon(0_0,100%_0,calc(100%-9px)_100%,0_100%)]"></div>
            <div className="w-5 md:w-7 h-2 md:h-3 bg-[#111111] [clip-path:polygon(0_0,100%_0,calc(100%-9px)_100%,0_100%)]"></div>
          </div>

          {/* Typography block */}
          <div className="flex flex-col leading-none">
            <span className="font-bebas text-xl sm:text-5xl md:text-7xl tracking-[0.25em] text-[#111111] font-bold uppercase">
              FITFAM
            </span>
            <span className="text-[8px] sm:text-xs md:text-base tracking-[0.68em] text-[#555555] font-bold mt-0.5 md:mt-1 font-mono uppercase pl-0.5">
              ACTIVE
            </span>
          </div>

        </div>

      </div>

    </section>
  );
};