import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';

interface NewCollectionSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export const NewCollectionSection: React.FC<NewCollectionSectionProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const newProducts = products.filter(p => p.tags?.includes('New Arrivals') || p.isNew);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white" id="new-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center mb-12">
          <h2 className="font-sans text-3xl sm:text-3xl tracking-wider text-gray-950 uppercase">
            NEW COLLECTION
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer rounded-full shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-20 pb-6 scrollbar-none snap-x snap-mandatory no-scrollbar"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {newProducts.map((product) => {
              const isWishlisted = wishlistItems.some(item => item.id === product.id);
              return (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc(50%-40px)] md:w-[calc(33.333%-54px)] flex-shrink-0 snap-start cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={(p) => { onAddToCart(p); }}
                    onToggleWishlist={(p) => { onToggleWishlist(p); }}
                    isWishlisted={isWishlisted}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all cursor-pointer rounded-full shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};