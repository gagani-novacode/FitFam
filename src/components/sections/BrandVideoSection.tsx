import React from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore - Keeps TypeScript happy without configuring .d.ts files
import brandVideo from '../../brand-video.mp4';

export const BrandVideoSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24" id="brand-story">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col items-start justify-center space-y-6 max-w-md mx-auto lg:mx-0 lg:pl-12 py-8">
            <h2 className="text-2xl md:text-3xl font-medium text-[#111111] tracking-tight">
              Be Your Own Brand
            </h2>
            <p className="text-sm md:text-base text-[#111111] leading-relaxed font-light">
              &ldquo;One day all this hard work will make sense for best version of you&rdquo;
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-white text-black border border-black px-10 py-2.5 text-sm font-normal tracking-wide hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Shop Now
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full h-[400px] md:h-[550px] lg:h-[650px] flex items-center justify-center">
            <div className="w-full h-full bg-black overflow-hidden relative shadow-sm">
              <video
                controls
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                {/* Vite will bundle and resolve this variable to the correct public URL */}
                <source src={brandVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};