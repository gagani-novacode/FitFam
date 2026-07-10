import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { api } from '../lib/api';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  onClearCart?: () => void; // if we want to clear cart on success
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onClearCart }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = 500;
  const orderTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingDetails.firstName || !billingDetails.lastName || !billingDetails.address || !billingDetails.phone) {
      alert('Please fill in all mandatory billing details.');
      return;
    }
    // We will integrate the real backend checkout here later
    alert('Order placed successfully! Backend integration coming next.');
    if (onClearCart) onClearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
          <button
            onClick={() => navigate('/')}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Checkout</span>
        </nav>
      </div>

      {/* ── PAGE TITLE ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
          Checkout
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Coupon Bar */}
        <div className="bg-gray-50 border-t-2 border-gray-200 p-4 text-sm text-gray-600 flex justify-center items-center mb-10 w-full max-w-3xl mx-auto">
          Have a coupon? <button className="font-semibold text-gray-900 ml-1 hover:underline cursor-pointer">Click here to enter your code</button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── LEFT: Billing Details ────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Billing details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">First name <span className="text-red-500">*</span></label>
                <input type="text" required value={billingDetails.firstName} onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
              </div>
              <div>
                <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Last name <span className="text-red-500">*</span></label>
                <input type="text" required value={billingDetails.lastName} onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Country / Region <span className="text-red-500">*</span></label>
              <select value={billingDetails.country} onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none appearance-none bg-white">
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Street address <span className="text-red-500">*</span></label>
              <input type="text" placeholder="House number and street name" required value={billingDetails.address} onChange={(e) => setBillingDetails({ ...billingDetails, address: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none mb-3" />
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Town / City <span className="text-red-500">*</span></label>
              <input type="text" required value={billingDetails.city} onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Postcode / ZIP <span className="text-red-500">*</span></label>
              <input type="text" required value={billingDetails.postcode} onChange={(e) => setBillingDetails({ ...billingDetails, postcode: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Phone <span className="text-red-500">*</span></label>
              <input type="tel" required value={billingDetails.phone} onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Email address <span className="text-red-500">*</span></label>
              <input type="email" required value={billingDetails.email} onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none" />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={shipDifferent} onChange={(e) => setShipDifferent(e.target.checked)} className="w-3.5 h-3.5 text-black border-gray-300 rounded-sm focus:ring-black" />
                <span className="text-[13px] text-gray-700 font-medium">Ship to a different address?</span>
              </label>
            </div>

            <div>
              <label className="block text-[13px] text-gray-700 font-medium mb-1.5">Order notes (optional)</label>
              <textarea placeholder="Notes about your order, e.g. special notes for delivery." rows={4} value={billingDetails.orderNotes} onChange={(e) => setBillingDetails({ ...billingDetails, orderNotes: e.target.value })} className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-500 outline-none resize-none"></textarea>
            </div>

          </div>

          {/* ── RIGHT: Your Order ────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Your order</h2>

            <div className="border border-gray-200 mb-6">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <span className="font-bold text-[13px] text-gray-900">Product</span>
                <span className="font-bold text-[13px] text-gray-900">Subtotal</span>
              </div>
              
              <div className="p-4 border-b border-gray-200 space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[13px] text-gray-600">
                    <span className="pr-4">{item.product.name} - Black, {item.size} × {item.quantity}</span>
                    <span className="font-medium whitespace-nowrap">රු{(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center p-4 border-b border-gray-200 text-[13px]">
                <span className="font-bold text-gray-900">Subtotal</span>
                <span className="font-bold text-gray-900">රු{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="p-4 border-b border-gray-200 text-[13px]">
                <span className="font-bold text-gray-900 block mb-2">Shipment</span>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Delivery:</span>
                  <span>රු{deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 text-[15px]">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">රු{orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[11px] text-gray-500 mb-3 flex items-center gap-1">
                Pay in 3 installments of රු{(orderTotal / 3).toLocaleString('en-US', { minimumFractionDigits: 2 })} with 
                <span className="text-indigo-600 font-extrabold text-xs ml-1">KOKO</span>
              </p>

              <div className="border border-gray-200 divide-y divide-gray-200">
                {/* PayHere */}
                <label className="block p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" checked={paymentMethod === 'payhere'} onChange={() => setPaymentMethod('payhere')} className="w-3.5 h-3.5 text-black border-gray-300 focus:ring-black" />
                      <span className="text-[13px] font-bold text-gray-700">PayHere</span>
                    </div>
                    {/* Placeholder for payment icons */}
                    <div className="flex gap-1">
                      <div className="h-4 w-6 bg-blue-100 rounded-xs"></div>
                      <div className="h-4 w-6 bg-red-100 rounded-xs"></div>
                      <div className="h-4 w-6 bg-orange-100 rounded-xs"></div>
                    </div>
                  </div>
                  {paymentMethod === 'payhere' && (
                    <div className="pl-6 text-[12px] text-gray-500 leading-relaxed bg-white mt-3 border border-transparent">
                      Pay by Visa, MasterCard, AMEX, eZcash, mCash or Internet Banking via PayHere.
                    </div>
                  )}
                </label>

                {/* Koko */}
                <label className="block p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="payment" checked={paymentMethod === 'koko'} onChange={() => setPaymentMethod('koko')} className="w-3.5 h-3.5 text-black border-gray-300 focus:ring-black" />
                    <span className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                      Paykoko <span className="text-indigo-600 font-black text-sm tracking-tighter">KOKO</span>
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <button type="button" onClick={() => navigate('/privacy')} className="font-bold text-gray-700 hover:underline cursor-pointer">privacy policy</button>.
            </p>

            <button type="submit" className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white py-3.5 text-sm font-semibold transition-colors cursor-pointer">
              Place order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
