import React from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  /** Use tall portrait aspect ratio instead of square (for category pages) */
  portrait?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  portrait = false,
}) => {
  const { name, price, originalPrice, image, isNew, isSale, badge, subText } = product;

  // Formatter for LK Price
  const formatPrice = (value: number) => {
    return `රු ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 3-installment calculation (e.g., Koko payments)
  const installmentAmount = (price / 3).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="group relative flex flex-col h-full bg-white border border-gray-100 transition-shadow hover:shadow-md">

      {/* 1. IMAGE CONTAINER — square by default, tall portrait on category pages */}
      <div className={`relative w-full overflow-hidden bg-gray-50 flex items-center justify-center ${portrait ? 'aspect-[3/4]' : 'aspect-square'}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500" // REMOVED: group-hover:scale-105[cite: 2]
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top left badges[cite: 2] */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {badge && <Badge>{badge}</Badge>}
          {isSale && !badge && <Badge variant="sale">SALE</Badge>}
          {isNew && !badge && <Badge variant="new">NEW</Badge>}
        </div>

        {/* 2. RIGHT SIDE HOVER ACTIONS */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="bg-white text-gray-800 p-2 hover:bg-black hover:text-white transition-colors rounded-full shadow-md cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Add to Cart Button[cite: 2] */}
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-white text-gray-800 p-2 hover:bg-black hover:text-white transition-colors rounded-full shadow-md cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information[cite: 2] */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 mb-1 font-medium">
          {product.category}
        </div>

        <h3 className="font-heading text-sm uppercase tracking-wider text-gray-900 line-clamp-2 min-h-[40px] mb-2 font-semibold">
          {name}
        </h3>

        {subText && (
          <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">
            {subText}
          </p>
        )}

        {/* Price block[cite: 2] */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-gray-950 font-mono">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
            <span>or 3 X {installmentAmount} with</span>
            <span className="font-extrabold uppercase text-indigo-600 tracking-wider">koko</span>
            <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center text-[8px] font-bold cursor-help" title="Interest-free installments with Koko">i</div>
          </div>
        </div>
      </div>
    </div>
  );
};