import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';

interface PickYourCategorySectionProps {
  activeCategory?: string;
}

export const PickYourCategorySection: React.FC<PickYourCategorySectionProps> = () => {
  const navigate = useNavigate();
  const categories = [
    { name: 'Women', value: 'Women' },
    { name: 'Men', value: 'Men' },
    { name: 'Accessories', value: 'Accessories' }
  ];

  const handleCategoryClick = (value: string) => {
    navigate(`/category/${value.toLowerCase()}`);
  };

  return (
    <section className="py-20 bg-[#F5F5F5]" id="pick-category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Title */}
        <div className="mb-10">
          <h2 className="font-bebas text-4xl sm:text-5xl font-bold tracking-wider text-gray-950 uppercase">
            PICK YOUR CATEGORY
          </h2>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat) => {
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.value)}
                className="border-2 border-black font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 text-black bg-transparent transition-all duration-300 hover:bg-black hover:text-white cursor-pointer min-w-[140px]"
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Instagram Follow Row */}
        <div className="flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-gray-300 bg-white hover:border-black text-gray-800 hover:text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 rounded-sm shadow-xs cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-pink-600 fill-transparent" />
            <span>Follow to Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};