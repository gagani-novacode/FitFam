import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage, FaqPage, ShippingReturnsPage, ContactPage, TermsPage, PrivacyPage } from './pages/InfoPages';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { MockPaymentPage } from './pages/MockPaymentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Product } from './data/products';
import { api, fixImageUrl } from './lib/api';
import { Check, X, CreditCard, ShoppingBag, Landmark, Sparkles, Heart } from 'lucide-react';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'cart' | 'wishlist' | 'success';
}

// ─── Home page has no top-padding (transparent navbar overlays hero).
// All other pages get pt-16 (64px) so content clears the fixed navbar.
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div className={isHome ? '' : 'pt-16'}>
      {children}
    </div>
  );
}

// ─── Inner app (needs to be inside BrowserRouter to use hooks) ─────────────
function AppInner() {
  const navigate = useNavigate();

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

  // Dynamic products from Backend
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/store/products');
        // In App.tsx, update the fetchProducts mapping
        const mapped = res.data.products.map((p: any) => ({
          ...p,
          id: p._id,
          image: fixImageUrl(p.images && p.images.length > 0 ? p.images[0] : 'https://via.placeholder.com/600'),
          images: (p.images || []).map(fixImageUrl),
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Toasts — UNCHANGED
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cache updates — UNCHANGED
  useEffect(() => {
    localStorage.setItem('fitfam_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fitfam_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add this:
  useEffect(() => {
    const handler = () => setCartItems([]);
    window.addEventListener('fitfam:clear-cart', handler);
    return () => window.removeEventListener('fitfam:clear-cart', handler);
  }, []);

  // Toast helper — UNCHANGED
  const showToast = (text: string, type: 'cart' | 'wishlist' | 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // All handlers — UNCHANGED (except size added)
  const handleAddToCart = (product: Product, size: string = 'M') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        showToast(`Increased quantity of ${product.name} (${size}) in cart!`, 'cart');
        return prev.map((item) =>
          item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`${product.name} (${size}) added to cart!`, 'cart');
      return [...prev, { product, quantity: 1, size }];
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
        onOpenCheckout={() => navigate('/checkout')}
      />

      {/* PAGE ROUTES — home page has no top padding so transparent navbar overlays the hero */}
      <PageWrapper>
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
                products={products}
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
                products={products}
                isLoading={isLoadingProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            }
          />

          {/* Subcategory page */}
          <Route
            path="/category/:categoryId/:subCategory"
            element={
              <CategoryPage
                products={products}
                isLoading={isLoadingProducts}
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
                products={products}
                isLoading={isLoadingProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            }
          />

          {/* ── INFO / LEGAL PAGES (footer links) ─────────────────────── */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/shipping" element={<ShippingReturnsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

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
                onOpenCheckout={() => navigate('/checkout')}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onClearCart={() => setCartItems([])} />} />

          {/* ── ORDER SUCCESS / RETURN FROM PAYMENT ───────────── */}
          <Route path="/order-success" element={<OrderSuccessPage />} />

          {/* ── MOCK PAYMENT (local dev — bypasses PayHere domain whitelist) ── */}
          <Route path="/mock-payment" element={<MockPaymentPage />} />

          {/* ── ACCOUNT PAGE ──────────────────────────────────── */}
          <Route path="/account" element={<AccountPage />} />

          {/* ── 404 CATCH-ALL ─────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageWrapper>

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