import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X, Heart, Trash2, Home, Instagram, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Track expanded state for main categories and subcategories (All default to false)
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    Women: false,
    Men: false,
    'CAMO SERIES': false, // Nested tracking key
  });

  const toggleDropdown = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Close all dropdowns whenever the mobile menu is toggled shut
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setExpandedCategories({
        Women: false,
        Men: false,
        'CAMO SERIES': false,
      });
    }
  }, [isMobileMenuOpen]);

  // Track scrolling to apply shadow
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

  // New structured format supporting image_29a8a7.png styling
  const navLinks = [
    {
      name: 'Women',
      value: 'Women',
      to: '/category/women',
      subItems: [
        { name: 'Oversize',        to: '/category/women' },
        { name: 'Crop Tops',       to: '/category/women' },
        { name: 'Shorts',          to: '/category/women' },
        { name: 'Leggings',        to: '/category/women' },
        { name: 'Tops & Short Set',to: '/category/women' },
      ]
    },
    {
      name: 'Men',
      value: 'Men',
      to: '/category/men',
      subItems: [
        {
          name: 'CAMO SERIES',
          to: '/category/men',
          nestedItems: [
            { name: 'CAMO Dry-Fit Tees',    to: '/category/men' },
            { name: 'CAMO Premium Shorts',  to: '/category/men' },
            { name: 'CAMO Squat Short',     to: '/category/men' },
          ]
        },
        { name: 'UNMARKED',         to: '/category/men' },
        { name: 'Oversize',         to: '/category/men' },
        { name: 'Short',            to: '/category/men' },
        { name: 'Stringers',        to: '/category/men' },
        { name: 'DRY — FIT T Shirt',to: '/category/men' },
        { name: 'Pants',            to: '/category/men' },
        { name: 'Tank Tops',        to: '/category/men' },
      ]
    },
    { name: 'Accessories', value: 'Accessories', to: '/category/accessories' },
    { name: 'FAQs',        value: 'faqs',         to: '/faq' },
    { name: 'Contact Us',  value: 'contact',       to: '/contact' },
  ];

  // Navigate and close the mobile drawer
  const mobileNavigate = (to: string) => {
    setIsMobileMenuOpen(false);
    navigate(to);
  };

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

  const selectCategory = (val: string, to?: string) => {
    setActiveCategory(val);
    setIsMobileMenuOpen(false);
    if (to) navigate(to);
  };

  // Framer Motion Variants for Smooth Drawer Transitions
  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 }
    },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 38, staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
  };

  // Submenu roll-down variants
  const dropdownVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.25, ease: "easeInOut" } }
  };

  return (
    <>
      {/* TOP HEADER NAVIGATION */}
      <header
        className={`fixed top-0 left-0 w-full z-40 bg-white transition-all duration-300 ${isScrolled ? 'border-b border-gray-100 shadow-sm py-1' : 'border-b border-transparent py-1'
          }`}
      >
        <div className="w-full px-3 sm:px-5 lg:px-8 relative flex items-center justify-between h-12">
          {/* Left Corner: Hamburger Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 border border-black hover:bg-gray-50 text-gray-900 cursor-pointer transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

          {/* Center: Centered Logo and Brand Title */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#" className="flex items-center group cursor-pointer" onClick={() => setActiveCategory('all')}>
              <div className="flex flex-col justify-center mr-2">
                <div className="w-6 h-1.5 bg-black mb-1 [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
                <div className="w-4 h-1.5 bg-black mb-1 [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
                <div className="w-2 h-1.5 bg-black [clip-path:polygon(0_0,100%_0,calc(100%-4px)_100%,0_100%)]"></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bebas text-[28px] tracking-[0.3em] text-[#111111] font-bold">FITFAM</span>
                <span className="text-[7.5px] tracking-[0.65em] text-[#888888] font-bold -mt-0.5 font-mono uppercase">ACTIVE</span>
              </div>
            </a>
          </div>

          {/* Right Corner: Search and Cart Action Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-1 hover:bg-gray-100 rounded-full text-gray-800 transition-colors cursor-pointer"
              title="Cart"
            >
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
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-md py-4 px-4 z-50 animate-fade-in">
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

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-40 py-3 px-6 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-center gap-x-65">
          <a href="#" onClick={() => setActiveCategory('all')} className="text-gray-900 hover:text-gray-600 transition-colors p-1.5" title="Home">
            <Home className="w-5 h-5 stroke-[1.75]" />
          </a>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-900 hover:text-gray-600 transition-colors p-1.5 cursor-pointer" title="Menu">
            <Menu className="w-5 h-5 stroke-[1.75]" />
          </button>
          <button onClick={() => { setIsSearchOpen(!isSearchOpen); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-900 hover:text-gray-600 transition-colors p-1.5 cursor-pointer" title="Search">
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>
          <button className="text-gray-900 hover:text-gray-600 transition-colors p-1.5 cursor-pointer" title="Account">
            <User className="w-5 h-5 stroke-[1.75]" />
          </button>
          <button onClick={() => setIsCartDrawerOpen(true)} className="relative text-gray-900 hover:text-gray-600 transition-colors p-1.5 cursor-pointer" title="Cart">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white rounded-full text-[8px] font-bold flex items-center justify-center font-mono">
                {totalCartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsWishlistDrawerOpen(true)} className="relative text-gray-900 hover:text-gray-600 transition-colors p-1.5 cursor-pointer" title="Wishlist">
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white rounded-full text-[8px] font-bold flex items-center justify-center font-mono">
                {wishlistItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MENU DRAWER WITH ACCORDION DROPDOWNS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-out Drawer Body */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="relative w-[90vw] sm:w-[420px] md:w-[500px] lg:w-[1350px] bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto z-10"
            >
              <div className="relative flex items-center justify-between mb-10">
                <div className="flex flex-col leading-none items-center">
                  <span className="font-bebas text-3xl tracking-[0.4em] text-[#111111] font-bold text-center">
                    FITFAM
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute right-0 p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X className="w-5 h-5 text-gray-900" />
                </button>
              </div>

              {/* Menu Navigation items block */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const hasDropdown = !!link.subItems;
                  const isExpanded = expandedCategories[link.name];

                  return (
                    <motion.div variants={linkVariants} key={link.name} className="flex flex-col">
                      {hasDropdown ? (
                        /* Trigger Button for Men/Women Accordion Rows */
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className="w-full text-left text-lg font-heading font-bold uppercase tracking-wider pb-2 flex justify-between items-center border-b border-gray-50 text-gray-900 hover:text-black cursor-pointer"
                        >
                          <span>{link.name}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-900 stroke-[2]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-900 stroke-[2]" />
                          )}
                        </button>
                      ) : (
                        /* Standard Top Level Links — router-aware */
                        <button
                          onClick={() => mobileNavigate(link.to)}
                          className={`w-full text-left text-lg font-heading font-bold uppercase tracking-wider border-b border-gray-50 pb-2 flex justify-between items-center cursor-pointer ${
                            activeCategory === link.value ? 'text-black' : 'text-gray-900 hover:text-black'
                          }`}
                        >
                          {link.name}
                        </button>
                      )}

                      {/* Dropdown Options List Container */}
                      {hasDropdown && (
                        <motion.div
                          initial="closed"
                          animate={isExpanded ? "open" : "closed"}
                          variants={dropdownVariants}
                          className="overflow-hidden flex flex-col pl-1"
                        >
                          <div className="pt-3 pb-2 flex flex-col space-y-3">
                            {link.subItems?.map((subItem) => {
                              const hasNested = !!subItem.nestedItems;
                              const isNestedExpanded = expandedCategories[subItem.name];

                              if (hasNested) {
                                return (
                                  <div key={subItem.name} className="flex flex-col">
                                    {/* Nested trigger header line (e.g. CAMO SERIES) */}
                                    <button
                                      onClick={() => toggleDropdown(subItem.name)}
                                      className="w-full text-left text-[15px] font-heading font-bold uppercase tracking-wide py-1 flex justify-between items-center text-gray-900 hover:text-black cursor-pointer"
                                    >
                                      <span>{subItem.name}</span>
                                      {isNestedExpanded ? (
                                        <ChevronUp className="w-3.5 h-3.5 text-gray-900 stroke-[2]" />
                                      ) : (
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-900 stroke-[2]" />
                                      )}
                                    </button>

                                    {/* Nested Items List rollout */}
                                    <motion.div
                                      initial="closed"
                                      animate={isNestedExpanded ? "open" : "closed"}
                                      variants={dropdownVariants}
                                      className="overflow-hidden flex flex-col pl-3"
                                    >
                                      <div className="pt-2 pb-1 flex flex-col space-y-2.5">
                                        {subItem.nestedItems?.map((nestedItem) => (
                                          <button
                                            key={nestedItem.name}
                                            onClick={() => mobileNavigate((nestedItem as any).to ?? link.to)}
                                            className="text-left text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors tracking-wide cursor-pointer"
                                          >
                                            {nestedItem.name}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  </div>
                                );
                              }

                              // Standard Sub-Item row
                              return (
                                <button
                                  key={subItem.name}
                                  onClick={() => mobileNavigate((subItem as any).to ?? link.to)}
                                  className="text-left text-[15px] font-medium text-gray-900 hover:text-gray-600 transition-colors tracking-wide py-0.5 cursor-pointer"
                                >
                                  {subItem.name}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Actions/Social Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-auto pt-12 border-t border-gray-100 pb-4 flex flex-col items-start justify-start text-left opacity-50"
              >
                <div className="flex items-center gap-6 mb-4 text-gray-900 opacity-50">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors" title="Facebook">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" /></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors" title="Instagram">
                    <Instagram className="w-5 h-5 stroke-[1.75]" />
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors" title="Pinterest">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.23 2.64 7.85 6.39 9.33-.1-.79-.19-2 .04-2.87l1.18-5s-.3-.6-.3-1.49c0-1.4 0-2.45 1.83-2.45 1.01 0 1.5.76 1.5 1.67 0 1.01-.64 2.52-.98 3.92-.28 1.17.58 2.12 1.73 2.12 2.08 0 3.68-2.19 3.68-5.36 0-2.8-2.01-4.76-4.89-4.76-3.33 0-5.29 2.5-5.29 5.09 0 1.01.39 2.09.87 2.67.1.11.11.21.08.33l-.33 1.35c-.05.2-.17.25-.39.15-1.43-.67-2.33-2.77-2.33-4.46 0-3.63 2.64-6.97 7.61-6.97 4 0 7.11 2.85 7.11 6.66 0 3.97-2.5 7.17-5.97 7.17-1.16 0-2.26-.61-2.63-1.32l-.72 2.74c-.26 1-1 2.26-1.5 3.07C10.99 21.89 11.49 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors" title="TikTok">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.69 4.13.9.95 2.15 1.52 3.46 1.66v3.83c-1.39-.08-2.75-.54-3.9-1.33-.27-.19-.52-.41-.76-.64-.02 2.24-.01 4.48-.02 6.72-.07 2.85-1.3 5.72-3.6 7.37-2.19 1.61-5.18 2.04-7.75 1.18-2.52-.8-4.63-2.88-5.35-5.43-.88-3.04.18-6.52 2.64-8.5 1.94-1.6 4.67-2.13 7.07-1.42V13c-1.2-.47-2.6-.2-3.56.66-.94.82-1.33 2.18-.94 3.37.36 1.15 1.51 1.97 2.72 1.97 1.48-.02 2.75-1.24 2.84-2.72.04-3.13.02-6.26.03-9.39.01-2.3-.01-4.6.02-6.91z" /></svg>
                  </a>
                </div>
                <div className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
                  &copy; 2025 FITFAM All rights reserved
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART DRAWER (Slide-out from Right) */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-900" />
                <h3 className="font-heading text-lg uppercase font-bold tracking-wider">Your Active Cart</h3>
                <span className="bg-[#111111] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mb-4 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-gray-900 mb-1">Your cart is empty</p>
                  <p className="text-xs text-gray-400 max-w-xs">Load up with premium sportswear & oversized tees and gear up!</p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      const shopSection = document.getElementById('shop');
                      if (shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 bg-[#111111] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-black cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs uppercase font-heading font-semibold text-gray-900 tracking-wider truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[10px] text-gray-400 mb-1">{item.product.category}</div>

                      {/* Price / Koko calculation */}
                      <div className="text-xs font-bold text-gray-900 font-mono mb-2">
                        {item.quantity} × LK {item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-xs hover:bg-gray-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary block */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 pb-20">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-semibold uppercase text-gray-500">Subtotal</span>
                  <span className="text-lg font-bold text-gray-950 font-mono">
                    LK {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-sm p-3 mb-4">
                  <div className="flex justify-between items-center text-xs text-indigo-900">
                    <span>Split with Koko Pay:</span>
                    <strong className="font-mono">3 X LK {(cartSubtotal / 3).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full bg-[#111111] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full text-center text-xs text-gray-500 hover:text-black font-semibold uppercase tracking-wider mt-3 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER (Slide-out from Right) */}
      {isWishlistDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWishlistDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h3 className="font-heading text-lg uppercase font-bold tracking-wider">Your Active Wishlist</h3>
                <span className="bg-[#111111] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              </div>
              <button
                onClick={() => setIsWishlistDrawerOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Heart className="w-12 h-12 text-gray-200 mb-4 stroke-[1.5]" />
                  <p className="text-sm font-semibold text-gray-900 mb-1">Your wishlist is empty</p>
                  <p className="text-xs text-gray-400 max-w-xs">Save high-performance gear here to grab them before they sell out!</p>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div key={product.id} className="flex gap-4 pb-4 border-b border-gray-100 items-center justify-between">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover bg-gray-50 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs uppercase font-heading font-semibold text-gray-900 tracking-wider truncate">
                          {product.name}
                        </h4>
                        <div className="text-[10px] text-gray-400 mb-1">{product.category}</div>
                        <div className="text-xs font-bold text-gray-900 font-mono">
                          LK {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onRemoveFromWishlist(product.id);
                        }}
                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 pb-20">
                <p className="text-xs text-center text-gray-500 mb-4">You have {wishlistItems.length} premium training items saved.</p>
                <button
                  onClick={() => setIsWishlistDrawerOpen(false)}
                  className="w-full bg-[#111111] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  Close Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};