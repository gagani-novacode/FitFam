import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, X, Heart } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Product } from '../../data/products';

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
  onSearchQueryChange,
  setActiveCategory
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenu, setOpenMenu] = useState<'men' | 'women' | null>(null);

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

  // Navbar turns opaque when scrolled or hovered
  const isOpaque = !isHomePage || isScrolled || isHovered;

  return (
    <>
      {/* TOP HEADER NAVIGATION */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setOpenMenu(null); }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isOpaque ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-transparent'}`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center h-16 relative">

          {/* LEFT: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 h-full flex-1">
            {/* Men */}
            <div className="relative h-full flex items-center">
              <button
                onMouseEnter={() => setOpenMenu('men')}
                className={`relative text-[13px] font-chakra font-normal tracking-[0.2em] uppercase transition-colors py-2 cursor-pointer ${isOpaque ? 'text-gray-900 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
              >
                Men
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${openMenu === 'men' ? 'w-full' : 'w-0'}`} />
              </button>
            </div>

            {/* Women */}
            <div className="relative h-full flex items-center">
              <button
                onMouseEnter={() => setOpenMenu('women')}
                className={`relative text-[13px] font-chakra font-normal tracking-[0.2em] uppercase transition-colors py-2 cursor-pointer ${isOpaque ? 'text-gray-900 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
              >
                Women
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${openMenu === 'women' ? 'w-full' : 'w-0'}`} />
              </button>
            </div>

            {/* Accessories */}
            <div className="relative h-full flex items-center group">
              <Link
                to="/category/accessories"
                onMouseEnter={() => setOpenMenu(null)}
                className={`relative text-[13px] font-chakra font-normal tracking-[0.2em] uppercase transition-colors py-2 ${isOpaque ? 'text-gray-900 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
              >
                Accessories
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </nav>

          {/* CENTER: Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link to="/" onClick={() => setActiveCategory('all')} className="flex items-center gap-3 group cursor-pointer">
              <div className="flex flex-col justify-center">
                <div className={`w-6 h-[3px] mb-1.5 transition-colors [clip-path:polygon(0_0,100%_0,calc(100%-5px)_100%,0_100%)] ${isOpaque ? 'bg-[#111111]' : 'bg-white'}`}></div>
                <div className={`w-4 h-[3px] mb-1.5 transition-colors [clip-path:polygon(0_0,100%_0,calc(100%-5px)_100%,0_100%)] ${isOpaque ? 'bg-[#111111]' : 'bg-white'}`}></div>
                <div className={`w-2.5 h-[3px] transition-colors [clip-path:polygon(0_0,100%_0,calc(100%-5px)_100%,0_100%)] ${isOpaque ? 'bg-[#111111]' : 'bg-white'}`}></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-chakra text-[28px] tracking-[0.4em] font-bold transition-colors ${isOpaque ? 'text-[#111111]' : 'text-white'}`}>
                  FITFAM
                </span>
                <span className={`font-chakra text-[10px] tracking-[0.8em] font-normal uppercase transition-colors mt-1 ${isOpaque ? 'text-[#888888]' : 'text-white/70'}`}>
                  ACTIVE
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT: Icon Actions */}
          <div className="flex items-center space-x-5 ml-auto">
            {/* Direct Navigation: Account */}
            <button
              onClick={() => navigate('/account')}
              className={`relative group flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${isOpaque ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
            >
              <User className="w-[16px] h-[16px] stroke-[1.5]" />
              <span className="text-[9px] font-chakra font-normal tracking-[0.15em] uppercase">Account</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Direct Navigation: Wishlist */}
            <button
              onClick={() => navigate('/wishlist')}
              className={`relative group flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${isOpaque ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
            >
              <div className="relative">
                <Heart className="w-[16px] h-[16px] stroke-[1.5]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 w-3 h-3 bg-[#D4AF37] text-white rounded-full text-[7px] font-bold flex items-center justify-center font-mono">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-chakra font-normal tracking-[0.15em] uppercase">Wishlist</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`relative group flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${isOpaque ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
            >
              <Search className="w-[16px] h-[16px] stroke-[1.5]" />
              <span className="text-[9px] font-chakra font-normal tracking-[0.15em] uppercase">Search</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Direct Navigation: Cart */}
            <button
              onClick={() => navigate('/cart')}
              className={`relative group flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${isOpaque ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}
            >
              <div className="relative">
                <ShoppingBag className="w-[16px] h-[16px] stroke-[1.5]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-3 h-3 bg-[#D4AF37] text-white rounded-full text-[7px] font-bold flex items-center justify-center font-mono">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-chakra font-normal tracking-[0.15em] uppercase">Cart</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>

        {/* MEGA MENU: MEN */}
        {openMenu === 'men' && (
          <div className="w-full bg-white border-t border-gray-100 shadow-xl" onMouseLeave={() => setOpenMenu(null)}>
            <div className="max-w-7xl mx-auto px-16 py-8 flex gap-16">
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Featured</span>
                <Link to="/category/men" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">All Men</Link>
                <Link to="/category/men/UNMARKED" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Unmarked</Link>
                <Link to="/category/men/CAMO" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Camo Series</Link>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Tops</span>
                <Link to="/category/men/DRY-FIT%20T%20Shirt" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Dry-Fit T-Shirts</Link>
                <Link to="/category/men/Oversize" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Oversize</Link>
                <Link to="/category/men/Stringers" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Stringers</Link>
                <Link to="/category/men/Tank%20Tops" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Tank Tops</Link>
                <Link to="/category/men/CAMO%20Dry-Fit%20Tees" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Camo Dry-Fit Tees</Link>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Bottoms</span>
                <Link to="/category/men/Short" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Shorts</Link>
                <Link to="/category/men/Pants" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Pants</Link>
                <Link to="/category/men/CAMO%20Premium%20Shorts" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Camo Premium Shorts</Link>
                <Link to="/category/men/CAMO%20Squat%20Short" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Camo Squat Shorts</Link>
              </div>
            </div>
          </div>
        )}

        {/* MEGA MENU: WOMEN */}
        {openMenu === 'women' && (
          <div className="w-full bg-white border-t border-gray-100 shadow-xl" onMouseLeave={() => setOpenMenu(null)}>
            <div className="max-w-7xl mx-auto px-16 py-8 flex gap-16">
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Featured</span>
                <Link to="/category/women" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">All Women</Link>
                <Link to="/category/women/Tops%20%26%20Short%20Set" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Tops & Short Set</Link>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Tops</span>
                <Link to="/category/women/Crop%20Tops" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Crop Tops</Link>
                <Link to="/category/women/Oversize" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Oversize</Link>
              </div>
              <div className="flex flex-col gap-2 min-w-[140px]">
                <span className="text-[10px] font-chakra font-semibold tracking-[0.2em] text-gray-400 uppercase pb-2 border-b border-gray-100">Bottoms</span>
                <Link to="/category/women/Shorts" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Shorts</Link>
                <Link to="/category/women/Leggings" onClick={() => setOpenMenu(null)} className="text-[12px] font-chakra font-normal uppercase text-gray-700 hover:text-[#D4AF37] tracking-wider transition-colors py-0.5">Leggings</Link>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH PANEL */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 px-4 z-50">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium sportswear..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); onSearchQueryChange(e.target.value); }}
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
    </>
  );
};