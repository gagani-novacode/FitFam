import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../data/products';
import { Footer } from '../components/layout/Footer';

interface ShopPageProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  isLoading,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
          <nav className="flex items-center gap-1.5 font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-400 flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[#111111]">Shop</span>
          </nav>
        </div>

        {/* ── PAGE TITLE ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="font-chakra font-semibold text-2xl sm:text-3xl text-[#111111] uppercase tracking-[0.2em]">
            All Products
          </h1>
          <p className="font-chakra text-[11px] uppercase tracking-[0.25em] text-gray-400 mt-2">
            Performance & Streetwear Essentials
          </p>
        </div>

        {/* ── PRODUCTS GRID ───────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <div className="w-7 h-7 border-2 border-gray-200 border-t-[#111111] rounded-full animate-spin"></div>
              <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-gray-400">
                Loading Products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <div className="w-14 h-14 border border-gray-200 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-gray-400 stroke-[1.5]" />
              </div>
              <h2 className="font-chakra font-normal text-sm uppercase tracking-[0.25em] text-[#111111]">
                No products yet
              </h2>
              <p className="font-chakra font-normal text-[11px] text-gray-400 tracking-wider max-w-xs uppercase">
                We're stocking up. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
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

      <Footer />
    </div>
  );
};