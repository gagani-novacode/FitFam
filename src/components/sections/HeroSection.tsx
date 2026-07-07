import React from 'react';
// @ts-ignore
import heroBgImage from '../../hero-bg.png';

interface HeroSectionProps {
  onShopClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    /* 1. CONTAINER: On mobile, height scales naturally with the image content (h-auto). 
         On desktop (md and up), it locks back to the full-viewport height layout.
    */
    <section className="relative h-auto md:min-h-[calc(100vh-104px)] w-full flex items-center bg-[#f0f0f0] overflow-hidden select-none">

      {/* Background Image Container */}
      <div className="relative md:absolute md:inset-0 w-full h-full">
        <img
          src={heroBgImage}
          alt="FITFAM Athletes"
          /* 2. IMAGE: 
               - Mobile: 'relative w-full h-auto object-contain' makes the image shrink fully 
                 without losing a single pixel of width or height.
               - Desktop (md:): Switches smoothly back to filling the entire layout frame.
          */
          className="relative md:absolute w-full h-auto md:h-full object-contain md:object-cover object-top"
          referrerPolicy="no-referrer"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      </div>

      {/* 3. WATERMARK OVERLAY: 
           - Mobile: Absolute alignment so it floats neatly over the dynamically shrinking image.
           - Desktop: Standard flex positioning.
      */}
      <div className="absolute inset-x-0 bottom-4 md:bottom-auto md:relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full z-10 flex items-center">

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