import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api, fixImageUrl } from '../lib/api';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const [view, setView] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<any>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.user);
          if (res.data.user?.email) {
            setLoadingOrders(true);
            try {
              const ordersRes = await api.get(`/store/orders/my?email=${encodeURIComponent(res.data.user.email)}`);
              if (ordersRes.data.ok) {
                setOrders(ordersRes.data.orders);
              }
            } catch (err) {
              console.error("Failed to fetch user orders", err);
            } finally {
              setLoadingOrders(false);
            }
          }
        } catch {
          localStorage.removeItem('token');
        }
      }
    };
    fetchUserAndOrders();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.post('/auth/login', { email: loginEmail, password: loginPassword });
      if (res.data.ok) {
        localStorage.setItem('token', res.data.user.token);
        setUser(res.data.user);
        if (res.data.user?.email) {
          setLoadingOrders(true);
          try {
            const ordersRes = await api.get(`/store/orders/my?email=${encodeURIComponent(res.data.user.email)}`);
            if (ordersRes.data.ok) {
              setOrders(ordersRes.data.orders);
            }
          } catch (err) {
            console.error("Failed to fetch user orders", err);
          } finally {
            setLoadingOrders(false);
          }
        }
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    try {
      const res = await api.post('/auth/register', {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        password: regPassword,
      });
      if (res.data.ok) {
        localStorage.setItem('token', res.data.user.token);
        setUser(res.data.user);
        setOrders([]);
      }
    } catch (err: any) {
      setRegError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setOrders([]);
  };

  const inputClass = "w-full border border-gray-300 px-4 py-3 text-sm text-[#111111] placeholder-gray-400 focus:border-[#111111] outline-none transition-colors font-chakra tracking-wide";

  // ── Logged in ──────────────────────────────────────────────────
  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
          {/* Account Overview Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-gray-200 gap-4">
            <div>
              <h1 className="font-chakra text-2xl sm:text-3xl font-bold tracking-[0.1em] text-[#111111] uppercase">
                My Account
              </h1>
              <p className="font-chakra text-xs text-[#555555] tracking-widest mt-1">
                Welcome back, <span className="text-[#111111] font-semibold">{user.firstName} {user.lastName}</span> ({user.email})
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Order History Section */}
          <div className="mt-10">
            <h2 className="font-chakra text-lg font-bold tracking-[0.15em] text-[#111111] uppercase mb-6">
              Order History
            </h2>

            {loadingOrders ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#111111] rounded-full animate-spin mx-auto mb-3" />
                <p className="font-chakra text-xs uppercase tracking-widest text-[#555555]">
                  Loading your orders...
                </p>
              </div>
            ) : orders.length === 0 ? (
              <div className="border border-dashed border-gray-200 p-12 text-center">
                <p className="font-chakra text-xs text-[#555555] tracking-widest uppercase mb-4">
                  No orders placed yet with this email address.
                </p>
                <Button variant="primary" size="md" onClick={() => navigate('/shop')}>
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const statusColors: Record<string, string> = {
                    PAID: 'bg-green-100 text-green-800 border-green-200',
                    DISPATCHED: 'bg-blue-100 text-blue-800 border-blue-200',
                    COMPLETED: 'bg-purple-100 text-purple-800 border-purple-200',
                    CHECKOUT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    FAILED: 'bg-red-100 text-red-800 border-red-200',
                    CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
                    EXPIRED: 'bg-gray-100 text-gray-600 border-gray-200',
                  };

                  const dateFormatted = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'N/A';

                  return (
                    <div
                      key={order._id || order.orderRef}
                      className="border border-gray-200 p-6 transition-all hover:border-gray-400"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-3">
                        <div>
                          <p className="font-chakra text-[10px] uppercase tracking-widest text-[#777777]">
                            Order Reference
                          </p>
                          <p className="font-chakra text-sm font-bold text-[#111111] tracking-wider">
                            {order.orderRef}
                          </p>
                        </div>
                        <div>
                          <p className="font-chakra text-[10px] uppercase tracking-widest text-[#777777]">
                            Date
                          </p>
                          <p className="font-chakra text-xs text-[#111111] font-semibold">
                            {dateFormatted}
                          </p>
                        </div>
                        <div>
                          <p className="font-chakra text-[10px] uppercase tracking-widest text-[#777777]">
                            Status
                          </p>
                          <span
                            className={`inline-block text-[10px] font-chakra font-bold tracking-widest uppercase px-2.5 py-1 border ${
                              statusColors[order.status] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div>
                          <p className="font-chakra text-[10px] uppercase tracking-widest text-[#777777]">
                            Total Amount
                          </p>
                          <p className="font-chakra text-sm font-bold text-[#111111]">
                            LKR {order.total ? order.total.toLocaleString() : '0'}
                          </p>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {order.items?.map((item: any, idx: number) => {
                          const prod = item.product || {};
                          const imageSrc =
                            prod.image ||
                            (prod.images && prod.images.length > 0 ? fixImageUrl(prod.images[0]) : null) ||
                            'https://via.placeholder.com/100';

                          return (
                            <div key={idx} className="flex items-center gap-4 py-2">
                              <img
                                src={imageSrc}
                                alt={prod.name || 'Product'}
                                className="w-14 h-14 object-cover border border-gray-100 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-chakra text-xs font-bold text-[#111111] uppercase tracking-wider truncate">
                                  {prod.name || 'Product'}
                                </h4>
                                <p className="font-chakra text-[11px] text-[#555555]">
                                  Size: <span className="font-semibold text-[#111111]">{item.size}</span> | Qty: <span className="font-semibold text-[#111111]">{item.qty}</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-chakra text-xs font-semibold text-[#111111]">
                                  LKR {(item.lineTotal || (item.unitPrice * item.qty) || 0).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Login view ─────────────────────────────────────────────────
  if (view === 'login') {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-white px-4 py-16">
          <div className="w-full max-w-md">

            <h2 className="font-chakra text-2xl font-bold tracking-[0.1em] text-[#111111] uppercase text-center mb-2">
              Login
            </h2>
            <p className="font-chakra text-xs text-[#555555] tracking-widest text-center mb-8">
              Please enter your e-mail and password:
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              {loginError && (
                <p className="font-chakra text-xs text-red-600 tracking-wide">{loginError}</p>
              )}

              <input
                type="email"
                required
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className={inputClass}
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className={`${inputClass} pr-24`}
                />
                <button
                  type="button"
                  className="absolute right-8 top-1/2 -translate-y-1/2 font-chakra text-[11px] text-[#555555] hover:text-[#111111] transition-colors cursor-pointer tracking-wide"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111] transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#111111] cursor-pointer"
                />
                <span className="font-chakra text-xs text-[#555555] tracking-wide">Remember me</span>
              </label>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" fullWidth>
                  Login
                </Button>
              </div>
            </form>

            <p className="font-chakra text-xs text-[#555555] tracking-wide text-center mt-6">
              Don't have an account?{' '}
              <button
                onClick={() => setView('register')}
                className="font-chakra text-xs text-[#111111] font-semibold underline tracking-wide cursor-pointer"
              >
                Create one
              </button>
            </p>

          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Register view ──────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-white px-4 py-16">
        <div className="w-full max-w-md">

          <h2 className="font-chakra text-2xl font-bold tracking-[0.1em] text-[#111111] uppercase text-center mb-2">
            Register
          </h2>
          <p className="font-chakra text-xs text-[#555555] tracking-widest text-center mb-8">
            Please fill in the information below:
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            {regError && (
              <p className="font-chakra text-xs text-red-600 tracking-wide">{regError}</p>
            )}

            <input
              type="text"
              required
              placeholder="First name"
              value={regFirstName}
              onChange={e => setRegFirstName(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              required
              placeholder="Last name"
              value={regLastName}
              onChange={e => setRegLastName(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              className={inputClass}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              className={inputClass}
            />

            <p className="font-chakra text-xs text-[#555555] tracking-wide leading-relaxed">
              Your personal data will be used to support your experience throughout this website,
              to manage access to your account, and for other purposes described in our{' '}
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="font-chakra text-xs text-[#111111] underline cursor-pointer"
              >
                privacy policy
              </button>.
            </p>

            <div className="pt-2">
              <Button variant="primary" size="md" type="submit" fullWidth>
                Create My Account
              </Button>
            </div>
          </form>

          <p className="font-chakra text-xs text-[#555555] tracking-wide text-center mt-6">
            Already have an account?{' '}
            <button
              onClick={() => setView('login')}
              className="font-chakra text-xs text-[#111111] font-semibold underline tracking-wide cursor-pointer"
            >
              Log in
            </button>
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
};