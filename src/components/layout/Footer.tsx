import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUp, Instagram } from 'lucide-react';
import { api } from '../../lib/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.post('/newsletter/subscribe', { email: email.trim() });
      if (res.data.ok) {
        setSubscribed(true);
        setTimeout(() => {
          setSubscribed(false);
          setEmail('');
        }, 4000);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to subscribe. Please try again.');
      setTimeout(() => {
        setErrorMsg('');
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap');
        #fitfam-footer * { font-family: 'Chakra Petch', sans-serif; }
        #fitfam-footer a { text-decoration: none; }
        #fitfam-footer .footer-link { font-size: 11px; letter-spacing: 0.08em; color: #555; font-weight: 400; transition: color 0.2s; }
        #fitfam-footer .footer-link:hover { color: #111; }
        #fitfam-footer .footer-heading { font-size: 11px; letter-spacing: 0.15em; font-weight: 600; margin-bottom: 20px; color: #111; }
      `}</style>

      <footer id="fitfam-footer" className="bg-[#f0efeb] text-[#111] pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">

          {/* Responsive grid: 2 columns on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 md:gap-12 mb-12">

            {/* Column 1: ABOUT + LEGAL */}
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="footer-heading">ABOUT</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/faq" className="footer-link">FAQs</Link></li>
                  <li><Link to="/shipping" className="footer-link">Shipping &amp; Returns</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">LEGAL</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li><Link to="/terms" className="footer-link">Terms &amp; Conditions</Link></li>
                  <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 2: PERSONAL + SHOP */}
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="footer-heading">PERSONAL</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
                  <li><Link to="/account" className="footer-link">My account</Link></li>
                  <li><Link to="/cart" className="footer-link">Checkout</Link></li>
                  <li><Link to="/cart" className="footer-link">Cart</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">SHOP</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-3">
                  <li><Link to="/category/women" className="footer-link">Women</Link></li>
                  <li><Link to="/category/accessories" className="footer-link">Accessories</Link></li>
                  <li><Link to="/category/men" className="footer-link">Men</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3: CONNECT */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <h4 className="footer-heading !mb-4">CONNECT</h4>

              <div className="mb-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#555] hover:text-[#111] transition-colors inline-block"
                >
                  <Instagram size={18} />
                </a>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.08em] text-[#555] mb-3">
                  Subscribe to our newsletter
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-[11px] text-[#111] tracking-[0.1em]">
                    <Check size={14} /> Subscribed successfully.
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubscribe} className="flex items-center border-b border-[#aaa] pb-2">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="flex-1 bg-transparent border-none outline-none text-[11px] text-[#111] tracking-[0.06em] font-chakra"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-none border-none cursor-pointer text-[10px] font-semibold tracking-[0.15em] text-[#111] font-chakra pl-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'WAIT...' : 'SIGN UP'}
                      </button>
                    </form>
                    {errorMsg && (
                      <p className="text-[10px] color-[#dc2626] mt-1.5 tracking-[0.05em]">
                        {errorMsg}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-300 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-[10px] tracking-[0.12em] text-[#888] font-normal uppercase">
              ©2025 FITFAM ALL RIGHTS RESERVED
            </p>
            <button
              onClick={scrollToTop}
              className="text-[#888] hover:text-[#111] transition-colors p-1"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>
      </footer>
    </>
  );
};