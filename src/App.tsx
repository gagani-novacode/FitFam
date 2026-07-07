import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage, FaqPage, ShippingReturnsPage, ContactPage, TermsPage, PrivacyPage } from './pages/InfoPages';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { products, Product } from './data/products';
import { Check, X, CreditCard, ShoppingBag, Landmark, Sparkles, Heart } from 'lucide-react';

interface CartItem {
  product: Product;
  quantity: number;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'cart' | 'wishlist' | 'success';
}

// ─── Inner app (needs to be inside BrowserRouter to use hooks) ─────────────
function AppInner() {
  // Persistence cache — ALL UNCHANGED from your original
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cached = localStorage.getItem('fitfam_cart');
    return cached ? JSON.parse(cached) : [];
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const cached = localStorage.getItem('fitfam_wishlist');
    return cached ? JSON.parse(cached) : [];
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Checkout Modal states — ALL UNCHANGED
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Billing details — UNCHANGED
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'koko'
  });

  // Toasts — UNCHANGED
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cache updates — UNCHANGED
  useEffect(() => {
    localStorage.setItem('fitfam_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fitfam_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Toast helper — UNCHANGED
  const showToast = (text: string, type: 'cart' | 'wishlist' | 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // All handlers — UNCHANGED
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Increased quantity of ${product.name} in cart!`, 'cart');
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`${product.name} added to cart!`, 'cart');
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    const product = cartItems.find(item => item.product.id === productId)?.product;
    if (product) showToast(`${product.name} removed from cart.`, 'success');
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const isSaved = prev.some((item) => item.id === product.id);
      if (isSaved) {
        showToast(`${product.name} removed from wishlist.`, 'wishlist');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`${product.name} saved to wishlist!`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) showToast(`${product.name} removed from wishlist.`, 'wishlist');
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Filtered products — UNCHANGED
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subText && product.subText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 350;
  const orderTotal = cartSubtotal + deliveryFee;

  // Checkout handlers — UNCHANGED
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingDetails.firstName || !billingDetails.lastName || !billingDetails.address || !billingDetails.phone) {
      alert('Please fill in all mandatory delivery details.');
      return;
    }
    const randomId = 'FFA-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutSuccess(true);
    setCartItems([]);
  };

  const resetCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep(1);
    setCheckoutSuccess(false);
    setOrderId('');
  };

  // Shared props passed down to pages
  const sharedProps = {
    onAddToCart: handleAddToCart,
    onToggleWishlist: handleToggleWishlist,
    wishlistItems,
  };

  return (
    <div className="relative min-h-screen bg-white">

      {/* NAVBAR — stays on every page, UNCHANGED */}
      <Navbar
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateCartQuantity={handleUpdateQuantity}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSearchQueryChange={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* PAGE ROUTES */}
      <div className="pt-[68px]">
        <Routes>
          {/* Home page — all your existing sections */}
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                filteredProducts={filteredProducts}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                {...sharedProps}
              />
            }
          />

          {/* Product detail page */}
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            }
          />

          {/* Category pages — Women, Men, Accessories */}
          <Route
            path="/category/:categoryId"
            element={
              <CategoryPage
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            }
          />

          {/* All-products shop page */}
          <Route
            path="/shop"
            element={
              <ShopPage
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            }
          />

          {/* ── INFO / LEGAL PAGES (footer links) ─────────────────────── */}
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/faq"      element={<FaqPage />} />
          <Route path="/shipping" element={<ShippingReturnsPage />} />
          <Route path="/contact"  element={<ContactPage />} />
          <Route path="/terms"    element={<TermsPage />} />
          <Route path="/privacy"  element={<PrivacyPage />} />

          {/* ── PERSONAL PAGES ───────────────────────────────── */}
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistItems={wishlistItems}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onOpenCheckout={() => setIsCheckoutOpen(true)}
              />
            }
          />

          {/* ── ACCOUNT PAGE ──────────────────────────────────── */}
          <Route path="/account" element={<AccountPage />} />

          {/* ── 404 CATCH-ALL ─────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {/* FLOATING TOASTS — UNCHANGED, global so stays here */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-[#111111] text-white border border-gray-800 shadow-2xl p-4 flex items-center justify-between gap-3 animate-slide-up rounded-sm"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'cart' && <ShoppingBag className="w-4 h-4 text-indigo-400" />}
              {toast.type === 'wishlist' && <Heart className="w-4 h-4 text-red-500 fill-current" />}
              {toast.type === 'success' && <Check className="w-4 h-4 text-green-400" />}
              <span className="text-xs font-semibold uppercase tracking-wider">{toast.text}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* CHECKOUT MODAL — UNCHANGED, global so stays here */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={resetCheckout} />

          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden z-10 rounded-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#111111] text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h3 className="font-heading text-lg uppercase tracking-wider font-extrabold">
                  {checkoutSuccess ? 'Order Placed!' : 'Athletic Order Checkout'}
                </h3>
              </div>
              <button onClick={resetCheckout} className="p-1 hover:bg-white/15 rounded-full text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutSuccess ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white mb-6 shadow-lg animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="font-heading text-2xl uppercase tracking-wider font-black text-gray-950 mb-2">
                    WELCOME TO THE FITFAM FAMILY!
                  </h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">
                    Order Ref ID: <span className="font-mono font-bold text-black">{orderId}</span>
                  </p>
                  <div className="border border-gray-200 p-6 rounded-sm w-full max-w-md bg-gray-50 text-left mb-8 space-y-3">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-bold border-b border-gray-200 pb-2">
                      Delivery Summary
                    </div>
                    <div className="text-xs text-gray-700"><strong>Name:</strong> {billingDetails.firstName} {billingDetails.lastName}</div>
                    <div className="text-xs text-gray-700"><strong>Phone:</strong> {billingDetails.phone}</div>
                    <div className="text-xs text-gray-700"><strong>Destination:</strong> {billingDetails.address}, {billingDetails.city}</div>
                    <div className="text-xs text-gray-700"><strong>Method:</strong> {billingDetails.paymentMethod === 'koko' ? 'Koko 3-installments' : 'Cash on Delivery'}</div>
                  </div>
                  <p className="text-xs text-gray-400 mb-6 max-w-md">
                    We will notify you via email and send a SMS verification code once your Fitfam athlete gear is packaged and dispatched from our warehouse.
                  </p>
                  <button onClick={resetCheckout} className="bg-black text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-widest hover:bg-gray-900 cursor-pointer">
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-gray-400 border-b border-gray-100 pb-4">
                    <span className={checkoutStep === 1 ? 'text-black' : ''}>1. Delivery Info</span>
                    <span>/</span>
                    <span className={checkoutStep === 2 ? 'text-black' : ''}>2. Payment Method</span>
                  </div>

                  {checkoutStep === 1 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">First Name *</label>
                          <input type="text" required value={billingDetails.firstName}
                            onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
                            className="w-full border border-gray-300 px-3 py-2 text-xs focus:border-black outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Last Name *</label>
                          <input type="text" required value={billingDetails.lastName}
                            onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
                            className="w-full border border-gray-300 px-3 py-2 text-xs focus:border-black outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Email Address</label>
                          <input type="email" value={billingDetails.email}
                            onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                            className="w-full border border-gray-300 px-3 py-2 text-xs focus:border-black outline-none"
                            placeholder="athlete@fitfam.com" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Phone Number *</label>
                          <input type="tel" required value={billingDetails.phone}
                            onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                            className="w-full border border-gray-300 px-3 py-2 text-xs focus:border-black outline-none"
                            placeholder="e.g. +94 77 XXXXXXX" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Delivery Address *</label>
                        <input type="text" required value={billingDetails.address}
                          onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                          className="w-full border border-gray-300 px-3 py-2.5 text-xs focus:border-black outline-none"
                          placeholder="Street, Apartment or Office suit" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">City *</label>
                        <input type="text" required value={billingDetails.city}
                          onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                          className="w-full border border-gray-300 px-3 py-2 text-xs focus:border-black outline-none"
                          placeholder="e.g. Colombo / Kandy" />
                      </div>
                      <div className="pt-4">
                        <button type="button" onClick={() => setCheckoutStep(2)}
                          disabled={!billingDetails.firstName || !billingDetails.lastName || !billingDetails.address || !billingDetails.phone}
                          className="w-full bg-[#111111] text-white py-3 text-xs uppercase font-extrabold tracking-widest disabled:opacity-50 cursor-pointer">
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase font-extrabold text-gray-700 tracking-wider">
                          Select Payment Method
                        </label>
                        <div onClick={() => setBillingDetails({ ...billingDetails, paymentMethod: 'koko' })}
                          className={`border-2 p-4 flex items-center justify-between cursor-pointer transition-all ${billingDetails.paymentMethod === 'koko' ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-black'}`}>
                          <div className="flex gap-3 items-center">
                            <Sparkles className="w-5 h-5 text-indigo-600" />
                            <div>
                              <div className="text-xs uppercase font-extrabold tracking-wider text-indigo-900 flex items-center gap-1.5">
                                Split with Koko
                                <span className="bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-xs">POPULAR</span>
                              </div>
                              <p className="text-[10px] text-gray-500">
                                Pay in 3 interest-free payments of <strong>LK {(orderTotal / 3).toLocaleString('en-US', { maximumFractionDigits: 2 })}</strong>
                              </p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${billingDetails.paymentMethod === 'koko' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                        <div onClick={() => setBillingDetails({ ...billingDetails, paymentMethod: 'cod' })}
                          className={`border-2 p-4 flex items-center justify-between cursor-pointer transition-all ${billingDetails.paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-black'}`}>
                          <div className="flex gap-3 items-center">
                            <Landmark className="w-5 h-5 text-gray-800" />
                            <div>
                              <div className="text-xs uppercase font-extrabold tracking-wider text-gray-900">Cash on Delivery (COD)</div>
                              <p className="text-[10px] text-gray-500">Pay with cash when the athletic gear arrives at your doorstep.</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${billingDetails.paymentMethod === 'cod' ? 'border-black bg-black' : 'border-gray-300'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        </div>
                      </div>
                      <div className="border border-gray-100 bg-gray-50 p-4 space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Subtotal Items</span>
                          <span className="font-mono">LK {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Delivery Fee (Sri Lanka Post/Courier)</span>
                          <span className="font-mono">LK {deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-950 border-t border-gray-200 pt-2">
                          <span>TOTAL PAYMENT</span>
                          <span className="font-mono">LK {orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button type="button" onClick={() => setCheckoutStep(1)}
                          className="w-1/3 border border-gray-300 text-gray-600 py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-gray-50 cursor-pointer">
                          Back
                        </button>
                        <button type="submit"
                          className="w-2/3 bg-black text-white py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-gray-900 cursor-pointer shadow-md">
                          Place Order (LK {orderTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })})
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Wrap in BrowserRouter ─────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}