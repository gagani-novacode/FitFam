import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOpenCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onOpenCheckout,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const formatPrice = (value: number) =>
    `රු ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = 350;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Cart</span>
        </nav>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">Your Cart</h1>
        {cartItems.length > 0 && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">
            {cartItems.reduce((n, i) => n + i.quantity, 0)} item{cartItems.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {cartItems.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-gray-300" />
            </div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-gray-900">Your cart is empty</h2>
            <p className="text-sm text-gray-400 max-w-xs">Add some athletic gear and come back to check out.</p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-2 bg-black text-white px-8 py-3 text-[11px] font-extrabold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* ── CART ITEMS ─────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-gray-100 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                <span>Product</span>
                <span className="text-center w-28">Quantity</span>
                <span className="text-right w-24">Total</span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-6 flex gap-4 items-start">

                    {/* Image */}
                    <div
                      className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-gray-50 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">{product.category}</p>
                        <h3
                          className="text-sm font-semibold text-gray-900 line-clamp-2 cursor-pointer hover:underline mb-1"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{formatPrice(product.price)} each</p>
                      </div>

                      {/* Qty + total + remove */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 flex-shrink-0">
                        {/* Quantity stepper */}
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => {
                              if (quantity > 1) onUpdateQuantity(product.id, quantity - 1);
                              else onRemoveFromCart(product.id);
                            }}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="text-sm font-bold text-gray-900 w-24 text-right">
                          {formatPrice(product.price * quantity)}
                        </span>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveFromCart(product.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue shopping */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/shop')}
                  className="text-[11px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>

            {/* ── ORDER SUMMARY ──────────────────────────────────────── */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="border border-gray-100 p-6 sticky top-24">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery fee</span>
                    <span className="font-mono">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Koko note */}
                <p className="text-[10px] text-gray-400 mb-5">
                  or 3 interest-free payments of{' '}
                  <span className="font-bold text-indigo-600">
                    {formatPrice(total / 3)}
                  </span>{' '}
                  with <span className="font-extrabold uppercase tracking-wider text-indigo-600">koko</span>
                </p>

                <button
                  onClick={onOpenCheckout}
                  className="w-full bg-black text-white py-3.5 text-[11px] font-extrabold uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[10px] text-center text-gray-400 mt-3">
                  Cash on Delivery &amp; Koko accepted
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
