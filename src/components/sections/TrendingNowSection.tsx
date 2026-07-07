import React, { useState } from 'react';
import { Product } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';

interface TrendingNowSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

type TabType = 'Top Rated' | 'Features' | 'New Arrivals';

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('Top Rated');

  const tabs: TabType[] = ['Top Rated', 'Features', 'New Arrivals'];

  // Filter products by active tab tag and limit to 4 items
  const filteredProducts = products
    .filter((product) => product.tags?.includes(activeTab))
    .slice(0, 4);

  return (
    <section className="py-20 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-sans text-2xl sm:text-3xl tracking-wider text-gray-950 uppercase">
            TRENDING NOW
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-gray-100 mb-10">
          <div className="flex space-x-6 sm:space-x-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  /* CHANGED: Swapped default text styles to transition cleanly to orange on hover and when active */
                  className={`pb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative cursor-pointer ${isActive
                    ? 'text-[#de9933] font-extrabold'
                    : 'text-gray-400 hover:text-[#de9933]'
                    }`}
                >
                  {tab}
                  {/* CHANGED: Set the bottom border active track line to matching orange background */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.75 bg-[#de9933]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistItems.some((item) => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted}
              />
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm font-mono">
            No items in this collection currently available. Check back soon.
          </div>
        )}

      </div>
    </section>
  );
};