import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword]   = useState(false);
  const [rememberMe, setRememberMe]       = useState(false);

  // Register state
  const [regEmail, setRegEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — no real auth
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — no real auth
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── LOGIN CARD ──────────────────────────────────────────────── */}
        <div className="bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 mb-7">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-600 outline-none transition-colors"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password *"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-600 outline-none transition-colors pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Remember me + Lost password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-gray-300 accent-gray-900 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-800 underline transition-colors cursor-pointer"
              >
                Lost your password?
              </button>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold px-8 py-3 transition-colors cursor-pointer"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        {/* ── REGISTER CARD ────────────────────────────────────────────── */}
        <div className="bg-white p-8 sm:p-10 shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 mb-7">Register</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-gray-600 outline-none transition-colors"
              />
            </div>

            <p className="text-sm text-gray-500">
              A password will be sent to your email address.
            </p>

            <p className="text-sm text-gray-500 leading-relaxed">
              Your personal data will be used to support your experience throughout
              this website, to manage access to your account, and for other purposes
              described in our{' '}
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="text-[#c0a020] hover:underline cursor-pointer"
              >
                privacy policy
              </button>
              .
            </p>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#c0392b] hover:bg-[#a93226] text-white text-sm font-semibold px-8 py-3 transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
