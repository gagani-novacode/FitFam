import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';
import { api } from '../lib/api';
import { Footer } from '../components/layout/Footer';

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
            localStorage.removeItem('fitfam_pending_orderRef');

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

    poll();
    intervalRef.current = setInterval(poll, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [navigate]);

  // ── PAID ──────────────────────────────────────────────────────────────────
  if (status === 'PAID') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#111111] stroke-[1.5]" />
              </div>
            </div>

            <h1 className="font-chakra font-semibold text-2xl text-[#111111] uppercase tracking-[0.2em] mb-2">
              Order Confirmed
            </h1>
            <p className="font-chakra text-[11px] text-gray-400 uppercase tracking-widest mb-8 leading-relaxed">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>

            {/* Order Summary Card */}
            {orderData && (
              <div className="border border-gray-200 p-5 text-left mb-8 font-chakra">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                    Order Reference
                  </span>
                  <span className="text-xs font-mono font-bold text-[#111111]">{orderRef}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {(orderData.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-xs text-gray-500">
                      <span>{item.qty}× Item (Size: {item.size})</span>
                      <span className="text-[#111111]">
                        Rs {Number(item.lineTotal).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#111111]">
                    Total Paid
                  </span>
                  <span className="text-xs font-semibold text-[#111111]">
                    Rs {Number(orderData.total).toLocaleString('en-US', { minimumFractionDigits: 2 })} LKR
                  </span>
                </div>

                {orderData.paymentMethod && (
                  <p className="text-[10px] text-gray-400 mt-2 text-right uppercase tracking-[0.2em]">
                    via {orderData.paymentMethod}
                  </p>
                )}
              </div>
            )}

            <p className="font-chakra text-[11px] text-gray-400 uppercase tracking-wider mb-8">
              A confirmation email has been sent to{' '}
              <strong className="text-[#111111]">{orderData?.customer?.email || 'your email'}</strong>.
            </p>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#111111] hover:bg-black text-white py-3.5 font-chakra font-normal text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <Footer />
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
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-500 stroke-[1.5]" />
              </div>
            </div>

            <h1 className="font-chakra font-semibold text-2xl text-[#111111] uppercase tracking-[0.2em] mb-2">
              {info.title}
            </h1>
            <p className="font-chakra text-[11px] text-gray-400 uppercase tracking-wider mb-6 leading-relaxed">
              {info.desc}
            </p>

            {orderRef && (
              <p className="font-chakra text-[10px] text-gray-400 mb-8 font-mono tracking-widest uppercase">
                Ref: {orderRef}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  localStorage.removeItem('fitfam_pending_orderRef');
                  navigate('/checkout');
                }}
                className="w-full bg-[#111111] hover:bg-black text-white py-3.5 font-chakra font-normal text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('fitfam_pending_orderRef');
                  navigate('/');
                }}
                className="w-full border border-gray-200 text-[#111111] hover:border-[#111111] py-3.5 font-chakra font-normal text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Back to Shop
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── TIMEOUT (webhook took too long) ───────────────────────────────────────
  if (status === 'timeout') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin stroke-[1.5]" />
              </div>
            </div>

            <h1 className="font-chakra font-semibold text-2xl text-[#111111] uppercase tracking-[0.2em] mb-2">
              Payment Pending
            </h1>
            <p className="font-chakra text-[11px] text-gray-400 uppercase tracking-wider mb-6 leading-relaxed">
              Your payment is being verified. This can take a few minutes. If payment was successful,
              you'll receive a confirmation email shortly.
            </p>

            {orderRef && (
              <div className="border border-gray-200 p-4 mb-8 font-chakra">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  Your Order Reference
                </p>
                <p className="text-xs font-mono font-bold text-[#111111] mt-1">{orderRef}</p>
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-200 text-[#111111] hover:border-[#111111] py-3.5 font-chakra font-normal text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── POLLING (spinner while waiting for webhook) ───────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <Loader2 className="w-10 h-10 text-[#111111] animate-spin stroke-[1.5]" />
          </div>
          <h1 className="font-chakra font-semibold text-xl text-[#111111] uppercase tracking-[0.2em] mb-2">
            Confirming Payment…
          </h1>
          <p className="font-chakra text-[11px] text-gray-400 uppercase tracking-wider leading-relaxed">
            Please wait while we verify your payment. This usually takes just a few seconds.
          </p>
          <div className="mt-8 flex justify-center gap-1.5">
            {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-300 ${i < attemptRef.current ? 'bg-[#111111] w-4' : 'bg-gray-200 w-2'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};