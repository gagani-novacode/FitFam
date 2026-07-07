import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { products, Product } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Shop</span>
        </nav>
      </div>

      {/* ── PAGE TITLE ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">
          Shop
        </h1>
      </div>

      {/* ── PRODUCTS GRID ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900">
              No products yet
            </h2>
            <p className="text-sm text-gray-400 max-w-xs">
              We're stocking up. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {products.map((product) => {
              const isWishlisted = wishlistItems.some((w) => w.id === product.id);
              return (
                <div
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={(p) => { onAddToCart(p); }}
                    onToggleWishlist={(p) => { onToggleWishlist(p); }}
                    isWishlisted={isWishlisted}
                    portrait
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
