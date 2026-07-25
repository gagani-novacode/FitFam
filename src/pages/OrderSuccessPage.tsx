import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { api } from '../lib/api';

type OrderStatus = 'polling' | 'PAID' | 'FAILED' | 'EXPIRED' | 'CANCELLED' | 'timeout';

export const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OrderStatus>('polling');
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptRef = useRef(0);
  const MAX_ATTEMPTS = 15; // 15 × 2s = 30s timeout

  useEffect(() => {
    // With this block:
    const paymentMethod = localStorage.getItem('fitfam_payment_method');
    const ref = localStorage.getItem('fitfam_pending_orderRef');

    if (paymentMethod === 'koko_mock') {
      localStorage.removeItem('fitfam_payment_method');
      localStorage.removeItem('fitfam_pending_orderRef');
      setOrderRef(ref);
      setStatus('PAID');
      return; // skip polling entirely
    }
    if (!ref) {
      // No pending order — redirect home
      navigate('/');
      return;
    }
    setOrderRef(ref);

    // Start polling the backend for order status
    const poll = async () => {
      attemptRef.current += 1;

      if (attemptRef.current > MAX_ATTEMPTS) {
        clearInterval(intervalRef.current!);
        setStatus('timeout');
        return;
      }

      try {
        const res = await api.get(`/store/order/status/${ref}`);
        const s: string = res.data.status;

        if (['PAID', 'FAILED', 'EXPIRED', 'CANCELLED'].includes(s)) {
          clearInterval(intervalRef.current!);
          setOrderData(res.data.order);
          setStatus(s as OrderStatus);

          if (s === 'PAID') {
            clearInterval(intervalRef.current!);
            setOrderData(res.data.order);
            setStatus(s as OrderStatus);
            localStorage.removeItem('fitfam_pending_orderRef');

            // Add this:
            if (localStorage.getItem('fitfam_clear_cart_on_success')) {
              localStorage.removeItem('fitfam_clear_cart_on_success');
              window.dispatchEvent(new Event('fitfam:clear-cart'));
            }
          }
        }
      } catch (err) {
        console.error('Status polling error:', err);
      }
    };

    // Poll immediately, then every 2 seconds
    poll();
    intervalRef.current = setInterval(poll, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [navigate]);

  // ── PAID ──────────────────────────────────────────────────────────────────
  if (status === 'PAID') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Summary Card */}
          {orderData && (
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-5 text-left mb-8">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Order Reference</span>
                <span className="text-xs font-mono font-bold text-gray-800">{orderRef}</span>
              </div>

              <div className="space-y-2 mb-4">
                {(orderData.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-[13px] text-gray-600">
                    <span>{item.qty}× item (Size: {item.size})</span>
                    <span className="font-medium">රු{Number(item.lineTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-sm font-bold text-gray-900">Total Paid</span>
                <span className="text-sm font-bold text-gray-900">
                  රු{Number(orderData.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {orderData.paymentMethod && (
                <p className="text-[11px] text-gray-400 mt-2 text-right uppercase tracking-wider">
                  via {orderData.paymentMethod}
                </p>
              )}
            </div>
          )}

          <p className="text-[12px] text-gray-400 mb-8">
            A confirmation email has been sent to{' '}
            <strong className="text-gray-600">{orderData?.customer?.email || 'your email'}</strong>.
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── FAILED / EXPIRED / CANCELLED ─────────────────────────────────────────
  if (['FAILED', 'EXPIRED', 'CANCELLED'].includes(status)) {
    const messages: Record<string, { title: string; desc: string }> = {
      FAILED: {
        title: 'Payment Failed',
        desc: 'Your payment could not be processed. No charges have been made. Please try again.',
      },
      EXPIRED: {
        title: 'Order Expired',
        desc: 'Your checkout session timed out. The reserved stock has been released. Please place a new order.',
      },
      CANCELLED: {
        title: 'Payment Cancelled',
        desc: 'You cancelled the payment. No charges were made. You can try again at any time.',
      },
    };

    const info = messages[status] || messages.FAILED;

    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h1>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">{info.desc}</p>

          {orderRef && (
            <p className="text-[11px] text-gray-400 mb-6 font-mono">Ref: {orderRef}</p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                localStorage.removeItem('fitfam_pending_orderRef');
                navigate('/checkout');
              }}
              className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('fitfam_pending_orderRef');
                navigate('/');
              }}
              className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── TIMEOUT (webhook took too long) ───────────────────────────────────────
  if (status === 'timeout') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-amber-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h1>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            Your payment is being verified. This can take a few minutes. If payment was successful,
            you'll receive a confirmation email shortly.
          </p>

          {orderRef && (
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-8">
              <p className="text-[12px] text-gray-500">Your order reference:</p>
              <p className="text-sm font-mono font-bold text-gray-800 mt-1">{orderRef}</p>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 py-3.5 text-sm font-semibold transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // ── POLLING (spinner while waiting for webhook) ───────────────────────────
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="flex justify-center mb-6">
          <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Confirming your payment…</h1>
        <p className="text-sm text-gray-500">
          Please wait while we verify your payment. This usually takes just a few seconds.
        </p>
        <div className="mt-6 flex justify-center gap-1.5">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i < attemptRef.current ? 'bg-gray-800 w-3' : 'bg-gray-200 w-3'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
