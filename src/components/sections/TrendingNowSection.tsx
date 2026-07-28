import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';

interface TrendingNowSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export const TrendingNowSection: React.FC<TrendingNowSectionProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}) => {
  const navigate = useNavigate();

  // Show first 8 products (2 rows x 4 cols)
  const filteredProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned heading */}
        <div className="mb-10">
          <h2 className="font-chakra font-normal text-2xl tracking-[0.2em] text-gray-950 uppercase">
            Trending Now
          </h2>
        </div>

        {/* Products Grid — 4 cols, 2 rows */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistItems.some((item) => item.id === product.id);
              return (
                <div
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={(p, size) => onAddToCart(p, size)}
                    onToggleWishlist={(p) => onToggleWishlist(p)}
                    isWishlisted={isWishlisted}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 font-chakra font-normal text-[12px] tracking-[0.15em] uppercase text-gray-400">
            No items currently available. Check back soon.
          </div>
        )}

        {/* View All button */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-14">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/category/all');
              }}
            >
              View All
            </Button>
          </div>
        )}

      </div>
    </section>
  );
};