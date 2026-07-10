import React from 'react';
import { categories } from '../../data/categories';
import { CategoryCard } from '../ui/CategoryCard';

// @ts-ignore
import menImage from '../../assets/men.jpg';
// @ts-ignore
import womenImage from '../../assets/women.jpg';

export const CategoryBannersSection: React.FC = () => {
  // Map the local files to their category IDs
  const localImageMap: { [key: string]: string } = {
    'men': menImage,
    'women': womenImage,
  };

  return (
    <section className="w-full bg-white border-t border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer"
          >
            <CategoryCard
              name={cat.name}
              // Fallback to old path if an accessory image isn't imported locally yet
              image={localImageMap[cat.id] || cat.image}
              link={`/category/${cat.id}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};