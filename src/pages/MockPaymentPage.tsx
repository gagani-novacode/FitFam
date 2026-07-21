import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, XCircle, Loader2, ShieldCheck } from 'lucide-react';
import { api } from '../lib/api';

export const MockPaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderRef = searchParams.get('orderRef');
  const amount   = searchParams.get('amount')   || '0.00';
  const currency = searchParams.get('currency') || 'LKR';
  const orderId  = searchParams.get('orderId')  || orderRef || '';

  const [cardNumber, setCardNumber]   = useState('');
  const [expiry, setExpiry]           = useState('');
  const [cvv, setCvv]                 = useState('');
  const [name, setName]               = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep]               = useState<'form' | 'processing' | 'done'>('form');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!orderRef) navigate('/');
  }, [orderRef, navigate]);

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handlePay = async () => {
    if (!cardNumber || !expiry || !cvv || !name) return;
    setIsProcessing(true);
    setStep('processing');

    try {
      // Simulate processing delay
      await new Promise(r => setTimeout(r, 2000));

      // Mark order as PAID directly via backend
      await api.post('/store/payment/confirm', {
        orderRef,
        paymentDetails: {
          method: 'MOCK_PAYHERE',
          id: `MOCK-${Date.now()}`,
        },
      });

      setStep('done');
      // Brief pause to show success, then go to order success page
      await new Promise(r => setTimeout(r, 1500));
      navigate('/order-success');

    } catch (err: any) {
      console.error('Mock payment error:', err);
      setIsProcessing(false);
      setStep('form');
      alert(err?.response?.data?.error || 'Payment simulation failed. Try again.');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('fitfam_pending_orderRef');
    navigate('/checkout');
  };

  // ── Processing overlay ────────────────────────────────────────────────────
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-sm w-full mx-4">
          <Loader2 className="w-12 h-12 text-[#E5003B] animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-800 mb-1">Processing Payment</h2>
          <p className="text-sm text-gray-500">Please wait, do not close this window…</p>
        </div>
      </div>
    );
  }

  // ── Success flash ──────────────────────────────────────────────────────────
  if (step === 'done') {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-sm w-full mx-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-800 mb-1">Payment Successful!</h2>
          <p className="text-sm text-gray-500">Redirecting you back…</p>
        </div>
      </div>
    );
  }

  // ── Payment Form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center py-10 px-4">

      {/* Dev sandbox badge */}
      <div className="mb-4 bg-amber-100 border border-amber-300 text-amber-700 text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        SANDBOX MODE — No real charges will be made
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">

        {/* ── PayHere-style header ──────────────────────────────────────── */}
        <div className="bg-[#E5003B] px-6 py-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-[#E5003B] font-black text-xs leading-tight text-center">Pay<br/>Here</span>
          </div>
          <div className="text-white">
            <p className="text-xs opacity-80 mb-0.5">novacode technology</p>
            <p className="text-xs opacity-70 mb-1">Order {orderId.slice(0, 24)}…</p>
            <p className="text-2xl font-bold">{currency} {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* ── Card form ─────────────────────────────────────────────────── */}
        <div className="p-6 space-y-4">

          {/* Card number */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(formatCard(e.target.value))}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono focus:border-[#E5003B] outline-none pr-12"
              />
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Expiry</label>
              <input
                type="text"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono focus:border-[#E5003B] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono focus:border-[#E5003B] outline-none"
              />
            </div>
          </div>

          {/* Card holder */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Card Holder Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name on card"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#E5003B] outline-none"
            />
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-[#E5003B] hover:bg-[#c0002f] text-white py-3.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            Pay {currency} {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} Now
          </button>

          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-full text-gray-400 hover:text-gray-600 py-2 text-sm transition-colors cursor-pointer"
          >
            Cancel and go back
          </button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <Lock className="w-3 h-3 text-gray-300" />
            <span className="text-[11px] text-gray-300">256-bit SSL secured · Powered by PayHere</span>
          </div>
        </div>
      </div>

      {/* Accepted cards */}
      <div className="mt-4 flex items-center gap-3">
        {['VISA', 'MC', 'AMEX', 'eZcash', 'mCash'].map(c => (
          <span key={c} className="text-[10px] bg-white border border-gray-200 rounded px-2 py-1 text-gray-400 font-semibold">{c}</span>
        ))}
      </div>
    </div>
  );
};
