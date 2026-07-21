import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, X, Heart, Trash2, ArrowRight, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { api } from '../../lib/api'; // Adjust this path if your api utility file is elsewhere

interface NavbarProps {
  cartItems: { product: Product; quantity: number }[];
  wishlistItems: Product[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onSearchQueryChange: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlistItems,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onRemoveFromWishlist,
  onSearchQueryChange,
  activeCategory,
  setActiveCategory,
  onOpenCheckout
}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign-In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQueryChange(searchTerm);
    setIsSearchOpen(false);
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchQueryChange('');
  };

  const handleNavbarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const res = await api.post('/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (res.data.ok && res.data.user?.token) {
        localStorage.setItem('token', res.data.user.token);
        setIsAccountDrawerOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        navigate('/account');
        window.location.reload();
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* TOP HEADER NAVIGATION */}
      <header
        className={`fixed top-0 left-0 w-full z-40 bg-white transition-all duration-300 ${isScrolled ? 'border-b border-gray-100 shadow-sm py-1' : 'border-b border-transparent py-1'
          }`}
      >
        <div className="w-full px-3 sm:px-5 lg:px-8 flex items-center justify-between h-12 relative">

          {/* Left Side: Logo and Brand Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group cursor-pointer" onClick={() => setActiveCategory('all')}>
              <div className="flex flex-col justify-center mr-2">
                <div className="w-6 h-1.5 bg-black mb-1 [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
                <div className="w-4 h-1.5 bg-black mb-1 [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
                <div className="w-2 h-1.5 bg-black [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bebas text-[28px] tracking-[0.3em] text-[#111111] font-bold">FITFAM</span>
                <span className="text-[7.5px] tracking-[0.65em] text-[#888888] font-bold -mt-0.5 font-mono uppercase">ACTIVE</span>
              </div>
            </Link>
          </div>

          {/* Center Side: Dropdown Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 h-full">
            {/* Women Menu Dropdown */}
            <div className="relative group h-full flex items-center">
              <button
                //onClick={() => navigate('/category/women')}
                className="relative text-s font-bold tracking-widest text-gray-900 hover:text-[#D4AF37] transition-colors py-2 cursor-pointer"
              >
                Women
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-lg py-2 hidden group-hover:block z-50">
                <Link to="/category/women" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">All Women</Link>
                <Link to="/category/women/Oversize" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Oversize</Link>
                <Link to="/category/women/Crop%20Tops" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Crop Tops</Link>
                <Link to="/category/women/Shorts" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Shorts</Link>
                <Link to="/category/women/Leggings" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Leggings</Link>
                <Link to="/category/women/Tops%20%26%20Short%20Set" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Tops & Short Set</Link>
              </div>
            </div>

            {/* Men Menu Dropdown */}
            <div className="relative group h-full flex items-center">
              <button
                //onClick={() => navigate('/category/men')}
                className="relative text-s font-bold tracking-widest text-gray-900 hover:text-[#D4AF37] transition-colors py-2 cursor-pointer"
              >
                Men
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-white border border-gray-100 shadow-lg py-2 hidden group-hover:block z-50">
                <div className="relative group/nested">
                  <span className="flex justify-between items-center px-4 py-2 text-xs font-bold uppercase text-gray-900 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors cursor-pointer">
                    CAMO SERIES
                  </span>
                  <div className="absolute left-full top-0 w-52 bg-white border border-gray-100 shadow-lg py-2 hidden group-hover/nested:block">
                    <Link to="/category/men" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Dry-Fit Tees</Link>
                    <Link to="/category/men" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Premium Shorts</Link>
                    <Link to="/category/men" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Squat Short</Link>
                  </div>
                </div>
                <Link to="/category/men" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">All Men</Link>
                <Link to="/category/men/CAMO%20Dry-Fit%20Tees" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Dry-Fit Tees</Link>
                <Link to="/category/men/CAMO%20Premium%20Shorts" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Premium Shorts</Link>
                <Link to="/category/men/CAMO%20Squat%20Short" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">CAMO Squat Short</Link>
                <Link to="/category/men/UNMARKED" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">UNMARKED</Link>
                <Link to="/category/men/Oversize" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Oversize</Link>
                <Link to="/category/men/Stringers" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Stringers</Link>
                <Link to="/category/men/Short" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Short</Link>
                <Link to="/category/men/DRY-FIT%20T%20Shirt" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">DRY — FIT T Shirt</Link>
                <Link to="/category/men/Pants" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Pants</Link>
                <Link to="/category/men/Tank%20Tops" className="block px-4 py-2 text-xs font-semibold uppercase text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors">Tank Tops</Link>
              </div>
            </div>

            {/* Accessories Link */}
            <div className="relative group h-full flex items-center">
              <Link
                //to="/category/accessories"
                className="relative text-s font-bold tracking-widest text-gray-900 hover:text-[#D4AF37] transition-colors py-2"
              >
                Accessories
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </nav>

          {/* Right Corner: Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer" title="Search">
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsAccountDrawerOpen(true)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer"
              title="Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button onClick={() => setIsWishlistDrawerOpen(true)} className="relative p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer" title="Wishlist">
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[8px] font-bold flex items-center justify-center font-mono">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsCartDrawerOpen(true)} className="relative p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer" title="Cart">
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCartCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[8px] font-bold flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Search Panel */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 px-4 z-50">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium sportswear..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearchQueryChange(e.target.value);
                }}
                className="w-full text-sm outline-none bg-transparent py-2 border-b border-gray-200 focus:border-black transition-colors"
                autoFocus
              />
              {searchTerm && (
                <button type="button" onClick={clearSearch} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button type="submit" className="bg-black text-white px-4 py-2 text-xs uppercase font-semibold tracking-wider hover:bg-gray-900 cursor-pointer">
                Find
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ACCOUNT SIGN-IN DRAWER */}
      {isAccountDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsAccountDrawerOpen(false)} />
          <div className="relative w-full max-w-[440px] bg-white h-full shadow-2xl flex flex-col z-10 px-8 sm:px-12 py-6">

            <div className="flex items-center justify-between mb-16 mt-2">
              <h3 className="flex-1 text-center font-sans text-[15px] font-medium tracking-wide text-gray-900 pl-6">Sign in</h3>
              <button onClick={() => setIsAccountDrawerOpen(false)} className="p-1 text-gray-400 hover:text-black transition-colors cursor-pointer">
                <X className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>
            </div>

            <form onSubmit={handleNavbarLogin} className="flex-1 flex flex-col space-y-5">
              {loginError && (
                <div className="text-xs text-red-600 bg-red-50 p-2 border border-red-100 uppercase tracking-wider">
                  {loginError}
                </div>
              )}

              <div className="w-full">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-black transition-colors rounded-none"
                />
              </div>

              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 pr-10 text-[13px] text-gray-800 placeholder-gray-400 outline-none focus:border-black transition-colors rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                >
                  <Eye className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11.5px] pt-1">
                <label className="flex items-center gap-2 text-gray-600 font-normal cursor-pointer select-none">
                  <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 accent-black rounded-none cursor-pointer" />
                  Remember me
                </label>
                <a href="#lost-password" className="text-gray-900 font-normal hover:underline">Lost your password?</a>
              </div>

              <div className="space-y-3 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#cc2e2e] text-white py-3.5 text-xs font-semibold tracking-wider hover:bg-[#b52424] transition-colors rounded-none cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Sign in'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountDrawerOpen(false);
                    navigate('/account');
                  }}
                  className="w-full bg-white text-black border border-black py-3.5 text-xs font-semibold tracking-wider hover:bg-gray-50 transition-colors rounded-none cursor-pointer"
                >
                  Create An Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsCartDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-900" />
                <h3 className="font-heading text-lg uppercase font-bold tracking-wider">Your Active Cart</h3>
                <span className="bg-[#111111] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">{totalCartCount}</span>
              </div>
              <button onClick={() => setIsCartDrawerOpen(false)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-gray-900 mb-1">Your cart is empty</p>
                  <button onClick={() => setIsCartDrawerOpen(false)} className="mt-4 bg-[#111111] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-black cursor-pointer">Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs uppercase font-heading font-semibold text-gray-900 tracking-wider truncate">{item.product.name}</h4>
                      <div className="text-[10px] text-gray-400 mb-1">{item.product.category}</div>
                      <div className="text-xs font-bold text-gray-900 font-mono mb-2">
                        {item.quantity} × LK {item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-200">
                          <button onClick={() => onUpdateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 text-xs hover:bg-gray-50">-</button>
                          <span className="px-3 py-1 text-xs font-mono">{item.quantity}</span>
                          <button onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-xs hover:bg-gray-50">+</button>
                        </div>
                        <button onClick={() => onRemoveFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 pb-20">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-semibold uppercase text-gray-500">Subtotal</span>
                  <span className="text-lg font-bold text-gray-950 font-mono">LK {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <button onClick={() => { setIsCartDrawerOpen(false); onOpenCheckout(); }} className="w-full bg-[#111111] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black flex items-center justify-center gap-2 cursor-pointer">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={() => setIsWishlistDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="font-heading text-lg uppercase font-bold tracking-wider">Your Active Wishlist</h3>
                <span className="bg-[#111111] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">{wishlistItems.length}</span>
              </div>
              <button onClick={() => setIsWishlistDrawerOpen(false)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart className="w-12 h-12 text-gray-200 mb-4 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-gray-900 mb-1">Your wishlist is empty</p>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div key={product.id} className="flex gap-4 pb-4 border-b border-gray-100 items-center justify-between">
                    <div className="flex gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs uppercase font-heading font-semibold text-gray-900 tracking-wider truncate">{product.name}</h4>
                        <div className="text-[10px] text-gray-400 mb-1">{product.category}</div>
                        <div className="text-xs font-bold text-gray-900 font-mono">LK {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                      </div>
                    </div>
                    <button onClick={() => onRemoveFromWishlist(product.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};