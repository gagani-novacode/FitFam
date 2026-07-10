import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../data/products';
import { Footer } from '../components/layout/Footer';

interface CategoryPageProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

// ─── Category meta config ─────────────────────────────────────────────────
type CategoryKey = 'women' | 'men' | 'accessories';

interface CategoryMeta {
  label: string;
  productKey: Product['category'];
}

const categoryMeta: Record<CategoryKey, CategoryMeta> = {
  women: { label: 'Women', productKey: 'Women' },
  men: { label: 'Men', productKey: 'Men' },
  accessories: { label: 'Accessories', productKey: 'Accessories' },
};

// ─── Component ────────────────────────────────────────────────────────────
export const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  isLoading,
  onAddToCart,
  onToggleWishlist,
  wishlistItems,
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount / category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [categoryId]);

  const key = (categoryId ?? '').toLowerCase() as CategoryKey;
  const meta = categoryMeta[key];

  // ── 404 guard ──
  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        <p className="text-sm text-gray-500">The category you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-black text-white px-6 py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-gray-900 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.category === meta.productKey);

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
          <span className="text-gray-800 font-medium">{meta.label}</span>
        </nav>
      </div>

      {/* ── PAGE TITLE ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">
          {meta.label}
        </h1>
      </div>

      {/* ── PRODUCTS GRID ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Loading Collection...</p>
          </div>
        ) : categoryProducts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-gray-900">
              No items yet
            </h2>
            <p className="text-sm text-gray-400 max-w-xs">
              We're stocking up this collection. Check back soon for new arrivals.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-2 bg-black text-white px-8 py-3 text-[11px] font-extrabold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Explore Other Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {categoryProducts.map((product) => {
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
      <Footer />
    </div>
  );
};
