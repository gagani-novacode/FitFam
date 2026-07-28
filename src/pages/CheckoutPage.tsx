import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Product } from '../data/products';
import { api } from '../lib/api';
import { KokoMockModal } from './KokoMockModal';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  onClearCart?: () => void;
}

// ── PayHere: submit hidden form ───────────────────────────────────────────
function submitPayHereForm(payment: Record<string, string>) {
  const actionUrl = payment._action_url;
  if (!actionUrl) {
    console.error('PayHere action URL missing in payload');
    return;
  }
  const { _action_url, ...fields } = payment;
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = actionUrl;
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = String(value);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

// ── Koko: load SDK and trigger widget (real credentials) ──────────────────
function submitKokoPayment(payment: Record<string, string>): Promise<void> {
  return new Promise((resolve, reject) => {
    const KOKO_SDK_URL = 'https://qaapi.paykoko.com/assets/js/koko.js';

    const loadSdk = (): Promise<void> => {
      return new Promise((res, rej) => {
        if ((window as any).KOKO) { res(); return; }
        const existing = document.querySelector(`script[src="${KOKO_SDK_URL}"]`);
        if (existing) {
          existing.addEventListener('load', () => res());
          existing.addEventListener('error', () => rej(new Error('Failed to load Koko SDK')));
          return;
        }
        const script = document.createElement('script');
        script.src = KOKO_SDK_URL;
        script.async = true;
        script.onload = () => res();
        script.onerror = () => rej(new Error('Failed to load Koko SDK'));
        document.head.appendChild(script);
      });
    };

    loadSdk().then(() => {
      const koko = (window as any).KOKO;
      if (!koko) { reject(new Error('Koko SDK not available')); return; }
      koko.pay({
        _mId: payment._mId,
        api_key: payment.api_key,
        _returnUrl: payment._returnUrl,
        _cancelUrl: payment._cancelUrl,
        _responseUrl: payment._responseUrl,
        _amount: payment._amount,
        _currency: payment._currency,
        _reference: payment._reference,
        _orderId: payment._orderId,
        _pluginName: payment._pluginName,
        _pluginVersion: payment._pluginVersion,
        _description: payment._description,
        _firstName: payment._firstName,
        _lastName: payment._lastName,
        _email: payment._email,
        dataString: payment.dataString,
        signature: payment.signature,
        onSuccess: () => resolve(),
        onError: (err: any) => reject(new Error(err?.message || 'Koko payment failed')),
        onCancel: () => reject(new Error('Koko payment was cancelled')),
      });
    }).catch(reject);
  });
}

// ── Shared input class ────────────────────────────────────────────────────
const inputCls =
  'w-full border border-gray-300 px-3 py-2.5 text-sm font-chakra font-normal text-[#111111] placeholder-gray-400 focus:border-[#111111] outline-none transition-colors duration-200 bg-white';

// ── Main Component ────────────────────────────────────────────────────────
export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onClearCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    localStorage.removeItem('fitfam_clear_cart_on_success');
    const pendingRef = localStorage.getItem('fitfam_pending_orderRef');
    if (pendingRef) {
      setReturnedFromPayHere(true);
      localStorage.removeItem('fitfam_pending_orderRef');
    }
  }, []);

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    country: 'Sri Lanka',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    email: '',
    orderNotes: '',
  });

  const [shipDifferent, setShipDifferent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'payhere' | 'koko'>('payhere');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showKokoMock, setShowKokoMock] = useState(false);
  const [pendingOrderRef, setPendingOrderRef] = useState<string | null>(null);
  const [snapshotItems, setSnapshotItems] = useState<CartItem[]>([]);
  const [returnedFromPayHere, setReturnedFromPayHere] = useState(false);

  const displayItems = snapshotItems.length > 0 ? snapshotItems : cartItems;
  const cartSubtotal = displayItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 500;
  const orderTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSnapshotItems(cartItems);

    if (!billingDetails.firstName || !billingDetails.lastName || !billingDetails.address || !billingDetails.phone || !billingDetails.email) {
      setErrorMessage('Please fill in all mandatory billing details.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setIsProcessing(true);

    try {
      const cartRes = await api.get('/store/cart');
      const { orderRef } = cartRes.data.cart;

      for (const item of cartItems) {
        await api.post('/store/cart/add', {
          orderRef,
          productId: item.product.id,
          size: item.size,
          qty: item.quantity,
        });
      }

      const checkoutRes = await api.post('/store/checkout', {
        orderRef,
        customer: {
          firstName: billingDetails.firstName,
          lastName: billingDetails.lastName,
          email: billingDetails.email,
          phone: billingDetails.phone,
          address: billingDetails.address,
          city: billingDetails.city,
          country: billingDetails.country,
          postalCode: billingDetails.postcode,
        },
      });

      if (!checkoutRes.data.ok) {
        throw new Error(checkoutRes.data.error || 'Checkout failed. Please try again.');
      }

      localStorage.setItem('fitfam_pending_orderRef', orderRef);

      if (paymentMethod === 'payhere') {
        const payRes = await api.post('/payhere/store/checkout', { orderRef });
        if (!payRes.data.ok) {
          throw new Error(payRes.data.error || 'Could not initialize PayHere payment.');
        }
        localStorage.setItem('fitfam_clear_cart_on_success', '1');
        submitPayHereForm(payRes.data.payment);
      } else if (paymentMethod === 'koko') {
        setPendingOrderRef(orderRef);
        setIsProcessing(false);
        setShowKokoMock(true);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0]?.msg ||
        err?.message ||
        'Something went wrong. Please try again.';
      setErrorMessage(msg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-[11px] font-chakra font-normal uppercase tracking-[0.2em] text-gray-400 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#111111] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#111111]">Checkout</span>
        </nav>
      </div>

      {/* PAGE TITLE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-chakra font-normal text-[#111111] text-3xl uppercase tracking-[0.3em]">
          Checkout
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Coupon Bar */}
        <div className="border-t border-b border-gray-200 p-4 flex justify-center items-center mb-10 w-full max-w-3xl mx-auto">
          <p className="font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Have a coupon?{' '}
            <button className="text-[#111111] underline underline-offset-2 cursor-pointer hover:opacity-60 transition-opacity">
              Click here to enter your code
            </button>
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 max-w-3xl mx-auto border border-red-300 p-4 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="font-chakra font-normal text-[12px] uppercase tracking-[0.15em] text-red-600">
              {errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: Billing Details */}
          <div className="lg:col-span-7 space-y-5">

            <h2 className="font-chakra font-normal text-[#111111] text-sm uppercase tracking-[0.3em] pb-2 border-b border-gray-200">
              Billing details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                  First name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingDetails.firstName}
                  onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                  Last name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={billingDetails.lastName}
                  onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Country / Region <span className="text-red-400">*</span>
              </label>
              <select
                value={billingDetails.country}
                onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
                className={`${inputCls} appearance-none cursor-pointer`}
              >
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Street address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="House number and street name"
                required
                value={billingDetails.address}
                onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Town / City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={billingDetails.city}
                onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Postcode / ZIP
              </label>
              <input
                type="text"
                value={billingDetails.postcode}
                onChange={(e) => setBillingDetails({ ...billingDetails, postcode: e.target.value })}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={billingDetails.phone}
                onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                className={inputCls}
              />
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Email address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={billingDetails.email}
                onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                className={inputCls}
              />
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={shipDifferent}
                  onChange={(e) => setShipDifferent(e.target.checked)}
                  className="w-3.5 h-3.5 border-gray-400 rounded-none accent-[#111111] cursor-pointer"
                />
                <span className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 group-hover:text-[#111111] transition-colors">
                  Ship to a different address?
                </span>
              </label>
            </div>

            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">
                Order notes <span className="normal-case tracking-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                placeholder="Notes about your order, e.g. special notes for delivery."
                rows={4}
                value={billingDetails.orderNotes}
                onChange={(e) => setBillingDetails({ ...billingDetails, orderNotes: e.target.value })}
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* RIGHT: Order Summary + Payment */}
          <div className="lg:col-span-5">

            <h2 className="font-chakra font-normal text-[#111111] text-sm uppercase tracking-[0.3em] pb-2 border-b border-gray-200 mb-6">
              Your order
            </h2>

            {/* Order table */}
            <div className="border border-gray-200 mb-6">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <span className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500">Product</span>
                <span className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500">Subtotal</span>
              </div>

              <div className="px-4 py-3 border-b border-gray-200 space-y-2.5">
                {(snapshotItems.length > 0 ? snapshotItems : cartItems).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-chakra font-normal text-[12px] text-gray-600 pr-4">
                      {item.product.name} — {item.size} × {item.quantity}
                    </span>
                    <span className="font-chakra font-normal text-[12px] text-[#111111] whitespace-nowrap">
                      රු{(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <span className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500">Subtotal</span>
                <span className="font-chakra font-normal text-[12px] text-[#111111]">
                  රු{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="px-4 py-3 border-b border-gray-200">
                <span className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 block mb-2">Shipment</span>
                <div className="flex justify-between items-center">
                  <span className="font-chakra font-normal text-[12px] text-gray-500">Delivery</span>
                  <span className="font-chakra font-normal text-[12px] text-[#111111]">
                    රු{deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-3.5">
                <span className="font-chakra font-normal text-[11px] uppercase tracking-[0.3em] text-[#111111]">Total</span>
                <span className="font-chakra font-normal text-[15px] text-[#111111]">
                  රු{orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3">
                Pay in 3 installments of රු{(orderTotal / 3).toLocaleString('en-US', { minimumFractionDigits: 2 })} with{' '}
                <span className="text-indigo-600 font-extrabold tracking-tighter normal-case">KOKO</span>
              </p>

              <div className="border border-gray-200 divide-y divide-gray-200">

                {/* PayHere */}
                <label className="block px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'payhere'}
                        onChange={() => setPaymentMethod('payhere')}
                        className="w-3.5 h-3.5 accent-[#111111] cursor-pointer"
                      />
                      <span className="font-chakra font-normal text-[11px] uppercase tracking-[0.25em] text-[#111111]">
                        PayHere
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-4 w-7 bg-blue-50 border border-blue-100 text-[7px] flex items-center justify-center text-blue-500 font-bold tracking-wider">VISA</div>
                      <div className="h-4 w-7 bg-red-50 border border-red-100 text-[7px] flex items-center justify-center text-red-500 font-bold tracking-wider">MC</div>
                      <div className="h-4 w-7 bg-orange-50 border border-orange-100 text-[7px] flex items-center justify-center text-orange-500 font-bold tracking-wider">EZ</div>
                    </div>
                  </div>
                  {paymentMethod === 'payhere' && (
                    <p className="pl-6 font-chakra font-normal text-[11px] text-gray-400 leading-relaxed mt-2">
                      Pay via Visa, MasterCard, AMEX, eZcash, mCash or Internet Banking.
                    </p>
                  )}
                </label>

                {/* Koko */}
                <label className="block px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'koko'}
                        onChange={() => setPaymentMethod('koko')}
                        className="w-3.5 h-3.5 accent-[#111111] cursor-pointer"
                      />
                      <span className="font-chakra font-normal text-[11px] uppercase tracking-[0.25em] text-[#111111] flex items-center gap-1.5">
                        Paykoko <span className="text-indigo-600 font-black text-sm tracking-tighter normal-case">KOKO</span>
                      </span>
                    </div>
                    <span className="font-chakra font-normal text-[9px] uppercase tracking-[0.2em] text-indigo-500 border border-indigo-200 px-2 py-1">
                      3 × රු{(orderTotal / 3).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  {paymentMethod === 'koko' && (
                    <p className="pl-6 font-chakra font-normal text-[11px] text-gray-400 leading-relaxed mt-2">
                      Pay in 3 interest-free installments. You will be redirected to complete your purchase.
                    </p>
                  )}
                </label>
              </div>
            </div>

            <p className="font-chakra font-normal text-[11px] text-gray-400 leading-relaxed mb-6">
              Your personal data will be used to process your order as described in our{' '}
              <button
                type="button"
                onClick={() => navigate('/privacy')}
                className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
              >
                privacy policy
              </button>.
            </p>

            {/* Place Order Button — border style matching the site */}
            <button
              type="submit"
              disabled={isProcessing || (cartItems.length === 0 && snapshotItems.length === 0)}
              className="w-full border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed py-3.5 font-chakra font-normal text-[11px] uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Processing
                </>
              ) : (
                'Place order'
              )}
            </button>

            {isProcessing && (
              <p className="text-center font-chakra font-normal text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-3">
                {paymentMethod === 'koko'
                  ? 'Setting up your order and opening Koko...'
                  : 'Setting up your order and redirecting to PayHere...'}
              </p>
            )}
          </div>
        </form>

        {showKokoMock && (
          <KokoMockModal
            orderRef={pendingOrderRef!}
            total={orderTotal}
            onConfirm={() => {
              setShowKokoMock(false);
              if (onClearCart) onClearCart();
              localStorage.setItem('fitfam_payment_method', 'koko_mock');
              navigate('/order-success');
            }}
            onCancel={() => {
              setShowKokoMock(false);
              setIsProcessing(false);
            }}
          />
        )}
      </div>
    </div>
  );
};