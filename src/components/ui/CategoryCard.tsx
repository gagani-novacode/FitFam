import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  link: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  image,
  link
}) => {
  return (
    <Link
      to={link}
      className="group relative block w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-gray-900 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
        loading="lazy"
      />

      {/* Dark gradient overlay + Uniform darken overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 bg-black/0 transition-all duration-300 group-hover:bg-black/40" />

      {/* 1. Name Centered Exactly in the Middle */}
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
        <h3 className="font-heading text-4xl font-bold text-white uppercase tracking-wider select-none">
          {name}
        </h3>
      </div>

      {/* 2. Shop Now Link Pushed to the Bottom */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center pb-8 text-center">
        <span className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-1 border-b border-transparent group-hover:border-white transition-all duration-300 pb-1">
          Shop Now <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
};