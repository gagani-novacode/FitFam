import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';

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
  const navigate = useNavigate();

  const newProducts = products.filter(p => p.tags?.includes('New Arrivals') || p.isNewProduct);

  // Show only first 8 products (2 rows × 4 columns)
  const displayProducts = newProducts.slice(0, 8);

  return (
    <section className="py-20 bg-white" id="new-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned heading */}
        <div className="mb-10">
          <h2 className="font-chakra font-normal text-[22px] tracking-[0.25em] text-gray-950 uppercase">
            New Collection
          </h2>
        </div>

        {/* 4-column grid, 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
          {displayProducts.map((product) => {
            const isWishlisted = wishlistItems.some(item => item.id === product.id);
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

        {/* View All button */}
        <div className="flex justify-center mt-14">
          <Button variant="outline" size="md" onClick={() => { window.scrollTo(0, 0); navigate('/shop'); }}>
            View All
          </Button>
        </div>

      </div>
    </section>
  );
};