import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <p className="font-chakra text-[10px] uppercase tracking-[0.3em] text-gray-400 font-normal mb-3">
          404 — Page Not Found
        </p>

        <h1 className="font-chakra text-6xl sm:text-8xl font-semibold uppercase tracking-[0.1em] text-[#111111] mb-4">
          Oops.
        </h1>

        <p className="font-chakra text-[11px] uppercase tracking-wider text-gray-400 max-w-xs mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="bg-[#111111] text-white px-8 py-3.5 font-chakra text-[10px] font-normal uppercase tracking-[0.3em] hover:bg-black transition-colors duration-200 cursor-pointer"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="border border-gray-300 text-[#111111] px-8 py-3.5 font-chakra text-[10px] font-normal uppercase tracking-[0.3em] hover:border-[#111111] transition-colors duration-200 cursor-pointer"
          >
            Shop All
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};