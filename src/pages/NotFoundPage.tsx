import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold mb-4">404 — Page not found</p>
      <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tight text-gray-900 mb-4">Oops.</h1>
      <p className="text-sm text-gray-500 max-w-xs mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 text-[11px] font-extrabold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/shop')}
          className="border border-black text-black px-8 py-3 text-[11px] font-extrabold uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          Shop All
        </button>
      </div>
    </div>
  );
};
