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

      <footer id="fitfam-footer" style={{ background: '#f0efeb', color: '#111', paddingTop: '60px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

          {/* 3-column grid: About+Legal | Personal+Shop | Connect */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

            {/* Column 1: ABOUT + LEGAL */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h4 className="footer-heading">ABOUT</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/faq" className="footer-link">FAQs</Link></li>
                  <li><Link to="/shipping" className="footer-link">Shipping &amp; Returns</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">LEGAL</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li><Link to="/terms" className="footer-link">Terms &amp; Conditions</Link></li>
                  <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 2: PERSONAL + SHOP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h4 className="footer-heading">PERSONAL</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li><Link to="/wishlist" className="footer-link">Wishlist</Link></li>
                  <li><Link to="/account" className="footer-link">My account</Link></li>
                  <li><Link to="/cart" className="footer-link">Checkout</Link></li>
                  <li><Link to="/cart" className="footer-link">Cart</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="footer-heading">SHOP</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li><Link to="/category/women" className="footer-link">Women</Link></li>
                  <li><Link to="/category/accessories" className="footer-link">Accessories</Link></li>
                  <li><Link to="/category/men" className="footer-link">Men</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3: CONNECT */}
            <div>
              <h4 className="footer-heading">CONNECT</h4>

              <div style={{ marginBottom: '28px' }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#555', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  <Instagram size={18} />
                </a>
              </div>

              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#555', marginBottom: '12px' }}>
                  Subscribe to our newsletter
                </p>
                {subscribed ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#111', letterSpacing: '0.1em' }}>
                    <Check size={14} /> Subscribed successfully.
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #aaa', paddingBottom: '8px' }}>
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '11px', color: '#111', letterSpacing: '0.06em', fontFamily: 'Chakra Petch, sans-serif' }}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        style={{ background: 'none', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', color: '#111', fontFamily: 'Chakra Petch, sans-serif', paddingLeft: '12px', opacity: loading ? 0.5 : 1 }}
                      >
                        {loading ? 'WAIT...' : 'SIGN UP'}
                      </button>
                    </form>
                    {errorMsg && (
                      <p style={{ fontSize: '10px', color: '#dc2626', marginTop: '6px', letterSpacing: '0.05em' }}>
                        {errorMsg}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#888', fontWeight: 400 }}>
              ©2025 FITFAM ALL RIGHTS RESERVED
            </p>
            <button
              onClick={scrollToTop}
              style={{ position: 'absolute', right: 0, background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: '4px' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#111')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888')}
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