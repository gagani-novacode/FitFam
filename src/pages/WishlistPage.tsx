import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../data/products';

interface WishlistPageProps {
  wishlistItems: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistItems,
  onAddToCart,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const formatPrice = (value: number) =>
    `රු ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Wishlist</span>
        </nav>
      </div>

      {/* Page title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">Wishlist</h1>
        {wishlistItems.length > 0 && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{wishlistItems.length} saved item{wishlistItems.length > 1 ? 's' : ''}</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {wishlistItems.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
              <Heart className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-900">Your wishlist is empty</h2>
            <p className="text-sm text-gray-400 max-w-xs">Save items you love and come back to them anytime.</p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-2 bg-black text-white px-8 py-3 text-[11px] font-extrabold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
              {wishlistItems.map((product) => (
                <div key={product.id} className="group relative bg-white border border-gray-100 hover:shadow-md transition-shadow">

                  {/* Image */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                        {product.badge}
                      </span>
                    )}
                    {/* Remove from wishlist button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white cursor-pointer shadow-sm"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{product.category}</p>
                    <h3
                      className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3 cursor-pointer hover:underline"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full flex items-center justify-center gap-2 border border-black text-black text-[11px] font-bold uppercase tracking-widest py-2.5 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/shop')}
                className="border border-gray-300 text-gray-600 text-[11px] font-bold uppercase tracking-widest px-8 py-3 hover:border-black hover:text-black transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
