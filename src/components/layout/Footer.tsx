import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    /* CHANGED: Increased pb-6 to pb-24 so the footer elements lift cleanly above your sticky bottom nav bar */
    <footer id="footer" className="bg-[#111111] text-white pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TOP: Centered Minimalist Newsletter Sign-up */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-md text-center">
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm tracking-wider uppercase">
                <Check className="w-4 h-4 text-white" /> Subscribed successfully.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-gray-700 pb-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none font-light tracking-wide"
                />
                <button
                  type="submit"
                  className="text-xs font-semibold uppercase tracking-wider text-white pl-4 hover:text-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MAIN FOOTER LINKS: 4-column grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 text-left">

          {/* Section 1: INFORMATION */}
          <div className="w-full">
            <h4 className="text-[13px] uppercase tracking-widest text-white font-bold mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-3 text-[15px] text-gray-300 font-light pl-0.5">
              <li><Link to="/about"    className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq"      className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link to="/contact"  className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Section 2: PERSONAL */}
          <div className="w-full">
            <h4 className="text-[13px] uppercase tracking-widest text-white font-bold mb-4">
              PERSONAL
            </h4>
            <ul className="space-y-3 text-[15px] text-gray-300 font-light pl-0.5">
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">My account</Link></li>
              <li><Link to="/cart"    className="hover:text-white transition-colors">Checkout</Link></li>
              <li><Link to="/cart"    className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Section 3: SHOP */}
          <div className="w-full">
            <h4 className="text-[13px] uppercase tracking-widest text-white font-bold mb-4">
              SHOP
            </h4>
            <ul className="space-y-3 text-[15px] text-gray-300 font-light pl-0.5">
              <li><Link to="/category/women"       className="hover:text-white transition-colors">Women</Link></li>
              <li><Link to="/category/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/category/men"         className="hover:text-white transition-colors">Men</Link></li>
            </ul>
          </div>

          {/* Section 4: LEGAL */}
          <div className="w-full">
            <h4 className="text-[13px] uppercase tracking-widest text-white font-bold mb-4">
              LEGAL
            </h4>
            <ul className="space-y-3 text-[15px] text-gray-300 font-light pl-0.5">
              <li><Link to="/terms"   className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-[#1a1a1a] flex items-center justify-between relative">
          <div className="w-full text-center">
            <p className="text-[11px] text-gray-400 tracking-wide font-light">
              ©2025 FITFAM All rights reserved
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="absolute right-0 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};