import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Package, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';
// @ts-ignore
import menImage from '../assets/men.jpg';
// @ts-ignore
import womenImage from '../assets/women.jpg';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-b border-gray-100 pb-10 mb-10 last:border-0 last:mb-0 last:pb-0">
    <h2 className="text-xl font-semibold text-gray-900 mb-5 tracking-wide">{title}</h2>
    {children}
  </div>
);

// ─── About Page ───────────────────────────────────────────────────────────
export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  // Slides: left text card + right image pair
  const slides = [
    {
      tag: 'A UNIQUE',
      line1: 'BE YOUR',
      line2: 'OWN',
      line3: 'BRAND',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    },
    {
      tag: 'PERFORMANCE',
      line1: 'BUILT FOR',
      line2: 'THE',
      line3: 'GRIND',
      image: menImage,
    },
    {
      tag: 'FOR EVERY',
      line1: 'FEMALE',
      line2: 'ATHLETE',
      line3: 'IN YOU',
      image: womenImage,
    },
    {
      tag: 'MADE FOR',
      line1: 'YOUR',
      line2: 'BEST',
      line3: 'VERSION',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-advance every 4 s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-white">

      {/* ── BREADCRUMB ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">About Us</span>
        </nav>
      </div>

      {/* ── PAGE TITLE ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">About Us</h1>
      </div>

      {/* ── THE VISION ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">

          {/* Left: Section label */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">The Vision</h2>
          </div>

          {/* Right: Quote + body */}
          <div>
            <blockquote className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5 leading-snug">
              &quot; BE YOUR OWN BRAND &quot;
            </blockquote>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
              Our mission is to bring fashion to your fitness and training. FITFAM brings you a new experience by trendy
              fashion series and clothing that goes beyond the ordinary clothing brand. Here's a chance to become a
              happier version of yourself connecting with{' '}
              <span className="font-semibold text-gray-900">FITFAM</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ── SLIDESHOW ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">

          {/* LEFT — text card */}
          <div className="relative bg-white border border-gray-100 flex items-center min-h-[340px] sm:min-h-[420px] overflow-hidden">

            {/* Dot navigation — left edge */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'h-6 bg-gray-900' : 'h-1.5 bg-gray-300'
                    }`}
                />
              ))}
            </div>

            {/* Text content */}
            <div className="pl-12 pr-8 py-12 w-full">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-4">
                {slide.tag}
              </p>
              <div className="leading-none mb-6">
                <p className="text-4xl sm:text-5xl font-bold text-gray-200 uppercase tracking-tight">{slide.line1}</p>
                <p className="text-5xl sm:text-7xl font-black text-gray-900 uppercase tracking-tight -mt-1">{slide.line2}</p>
                <p className="text-4xl sm:text-5xl font-bold text-gray-200 uppercase tracking-tight -mt-1">{slide.line3}</p>
              </div>
              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center gap-2 bg-black text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Click Here
                <span className="text-base leading-none">›</span>
              </button>
            </div>
          </div>

          {/* RIGHT — image */}
          <div className="relative overflow-hidden min-h-[340px] sm:min-h-[420px] bg-gray-50">
            <img
              key={current}
              src={slide.image}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700"
              style={{ opacity: 1 }}
            />
          </div>

        </div>
      </div>

    </div>
  );
};


// ── Accordion item ────────────────────────────────────────────────────────
const AccordionItem: React.FC<{ index: number; question: string; answer: React.ReactNode }> = ({
  index,
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
      >
        <span className="text-sm text-gray-800 font-normal">
          {index}. {question}
        </span>
        <span className="text-lg leading-none text-gray-400 group-hover:text-gray-700 transition-colors ml-4 flex-shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-6">
          <div className="text-sm text-gray-500 leading-relaxed">{answer}</div>
        </div>
      )}
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Orders:',
      //color: 'text-[#e8a020]',          // amber
      items: [
        {
          q: 'How many days it will take to deliver my address?',
          a: 'Will be delivered within 6-8 working days.',
        },
        {
          q: 'Any more questions?',
          a: 'Fell free to contact us on our hotline or send us an email at info@fitfamilie.com we will be happy to assist you',
        },
      ],
    },
    {
      title: 'Shipping & Returns:',
      //color: 'text-[#2563eb]',          // blue
      items: [
        {
          q: 'How do I exchange or return an order?',
          a: 'Once you receive the item and wish to exchange it , feel free ti contact our customer service advisers who will assist you with your request. Please read our Returns Policy for more information.',
        },
        {
          q: 'Will I receive confirmation of my order?',
          a: 'You will be notified via email.',
        },
      ],
    },
    {
      title: 'Payment:',
      //color: 'text-[#16a34a]',          // green
      items: [
        {
          q: 'What payment methods do you accept?',
          a: (
            <div>
              <p className="mb-2">You can make payments through:</p>
              <ul className="space-y-1">
                <li>01 Visa</li>
                <li>02 Mastercard</li>
                <li>03 Amex</li>
                <li>Trusted gateways</li>
              </ul>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">FAQs</span>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">FAQs</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {sections.map(({ title, items }) => (
          <div key={title}>
            {/* Coloured category heading */}
            <h2 className={`text-base font-bold mb-1 `}>{title}</h2>
            <div>
              {items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  index={i + 1}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Shipping &amp; Returns</span>
        </nav>
      </div>

      {/* Title */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">Shipping &amp; Returns</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12 text-sm text-gray-700 leading-relaxed">

        {/* ── DELIVERY METHODS TABLE ────────────────────────────────── */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-900">Delivery Method</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Delivery Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Standard Delivery (Colombo) 1–2 Days</td>
                  <td className="py-3 text-right text-gray-600">Rs. 350</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Standard Delivery 3–5 Days</td>
                  <td className="py-3 text-right text-gray-600">Rs. 450</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-400 italic">
            Delays of delivery may occur due to invalid addresses or other causes.
          </p>
        </div>

        {/* ── INTERNATIONAL SHIPPING ────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">International Shipping</h2>
          <p className="text-gray-500">Unfortunately, we do not ship internationally.</p>
        </div>

        {/* ── ANY ISSUES ───────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">Any Issues</h2>
          <p className="text-gray-500 mb-2">Please contact us for any issues regarding your delivery.</p>
          <p>
            <a href="mailto:info@fitfamilie.com" className="text-gray-800 underline hover:text-black">info@fitfamilie.com</a>
          </p>
          <p className="mt-2">
            Visit:{' '}
            <button onClick={() => navigate('/contact')} className="text-gray-800 underline hover:text-black cursor-pointer">
              Contact Us page
            </button>
          </p>
        </div>

        {/* ── GENERAL RETURN POLICY ────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">General Return Policy</h2>
          <p className="text-gray-500 mb-4">
            We want you to be happy with your purchase. If you are not completely satisfied with your purchase, you may return it to us for an exchange or refund. Please review our Return Policy here.
          </p>
          <p className="text-gray-500 mb-4">
            If applicable we will send our delivery partner to collect your return. Please make sure to add the below details clearly outside on your return parcel.
          </p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc">
            <li>Your address</li>
            <li>Your Phone Number</li>
            <li>Our address – 138/7 Pamunuwilla, Goanwala, Kelaniya</li>
            <li>Mobile number – 0740873222</li>
          </ul>
        </div>

        {/* ── REFUND POLICY ────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">Refund Policy</h2>
          <p className="text-gray-500 mb-4">
            In order to be eligible for a refund, you have to return the product within <strong className="text-gray-800">07 days</strong> of your purchase. If the product is damaged in any way, or you have initiated the return after 07 days have passed, you will not be eligible for a refund.
          </p>
          <p className="text-gray-700 font-medium mb-2">In order for the product to be eligible for a Refund, make sure these conditions are met:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Product must be returned in its original packaging</li>
            <li>Product wasn't used or damaged</li>
            <li>Product must include original tags</li>
          </ul>
          <p className="text-gray-700 font-medium mb-2">Aside from these conditions, there are products that can be returned but are not refundable:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Digital items</li>
            <li>Personalized items</li>
            <li>Change of mind</li>
          </ul>
          <p className="text-gray-500">
            After we receive your product, our team of professionals will inspect it and process your refund. The money will be refunded to the Original Payment Method you've used during the purchase. We reserve the right to refuse a refund if the items have any signs of wear, alterations, misuse or damage. The refund will not include any delivery charges.
          </p>
        </div>

        {/* ── EXCHANGE POLICY ──────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">Exchange Policy</h2>
          <p className="text-gray-500 mb-4">
            Products can be exchanged for a different size, provided that such variation is available. Customers are allowed to exchange items within <strong className="text-gray-800">07 days</strong>. Exchanges exceeding 07 days will not be processed.
          </p>
          <p className="text-gray-700 font-medium mb-2">In order to be eligible for exchanges make sure that the following conditions are met:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Product must be returned in its original packaging</li>
            <li>Product wasn't used or damaged</li>
            <li>Product must include original tags</li>
          </ul>
          <p className="text-gray-500 mb-2">
            If a replacement unit for the size/specific model is no longer available, we will issue store credit, which can be used within 4 months.
          </p>
          <p className="text-gray-500 mb-2">
            Your exchanged product will be processed once items are received and conditions confirmed.
          </p>
          <p className="text-gray-500">
            You are given the right to exchange the item <strong className="text-gray-800">one time</strong>, provided that all conditions in the Exchange Policy are met.
          </p>
        </div>

        {/* ── HOW TO INITIATE A RETURN ─────────────────────────────── */}
        <div className="border-t border-gray-100 pt-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">How to Initiate A Return</h2>
          <p className="text-gray-500 mb-4">
            If you have a request for Return, Refund or Exchange and if you have further clarification and questions, please do not hesitate to contact us through:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>Email Address: <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a></li>
            <li>Phone Number: <a href="tel:0740873222" className="underline hover:text-black">0740873222</a></li>
          </ul>
        </div>

        {/* ── DIVIDER ──────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-10">
          <p className="text-[10px] uppercase tracking-widest text-gray-300 text-center mb-10">— — —</p>
        </div>

        {/* ── REFUND POLICY 2 ──────────────────────────────────────── */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3">Refund Policy</h2>
          <p className="text-gray-500 mb-4">
            If your product is defective/damaged or incorrect/incomplete at the time of delivery, please contact us within <strong className="text-gray-800">14 days</strong> of your purchase. Your product may be eligible for a refund or replacement.
          </p>
          <p className="text-gray-700 font-medium mb-2">In order for the product to be eligible for a Refund, make sure these conditions are met:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Product must be returned in its original packaging</li>
            <li>Product wasn't used or damaged</li>
            <li>Product must include original tags (if applicable)</li>
          </ul>
          <p className="text-gray-700 font-medium mb-2">Refunds Not Accepted If:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>You change your mind</li>
            <li>Your circumstances change</li>
            <li>You find cheaper products elsewhere</li>
          </ul>
          <p className="text-gray-700 font-semibold mb-2">EXCEPTIONS</p>
          <p className="text-gray-500 mb-2">The following items cannot be returned or exchanged:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Digital Items</li>
            <li>Personalized Items</li>
          </ul>
          <p className="text-gray-500">
            After we receive your product, our team of professionals will inspect it and process your refund or replacement. The money will be refunded to the Original Payment Method you've used during the purchase.
          </p>
        </div>

      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <button onClick={() => navigate('/')} className="text-xs text-gray-400 hover:text-black uppercase tracking-widest mb-8 inline-block cursor-pointer transition-colors">
          ← Back to Home
        </button>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-10 tracking-wide">Contact Us</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, label: 'Phone', value: '+94 77 000 0000' },
            { icon: Mail, label: 'Email', value: 'hello@fitfam.lk' },
            { icon: MapPin, label: 'Location', value: 'Colombo, Sri Lanka' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="border border-gray-100 p-5 text-center">
              <Icon className="w-6 h-6 mx-auto mb-3 text-gray-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-1">{label}</p>
              <p className="text-xs text-gray-500">{value}</p>
            </div>
          ))}
        </div>

        <Section title="Send us a message">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-600 mb-1">Message</label>
              <textarea rows={5} className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-black outline-none resize-none" placeholder="How can we help?" />
            </div>
            <button type="submit" className="bg-black text-white px-8 py-3 text-xs uppercase font-extrabold tracking-widest hover:bg-gray-900 transition-colors cursor-pointer">
              Send Message
            </button>
          </form>
        </Section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Introduction',
      body: (
        <>
          <p className="mb-3">Welcome to <strong>FITFAM (Be Your Own Brand)</strong>!</p>
          <p className="mb-3">These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at <strong>www.fitfamilie.com</strong> (together or individually "Service") operated by FITFAM.</p>
          <p className="mb-3">Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
          <p className="mb-3">Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
          <p>If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
        </>
      ),
    },
    {
      title: '2. Communications',
      body: <p>By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>.</p>,
    },
    {
      title: '3. Purchases',
      body: (
        <>
          <p className="mb-3">If you wish to purchase any product or service made available through Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.</p>
          <p className="mb-3">You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
          <p className="mb-3">We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
          <p className="mb-3">We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
          <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
        </>
      ),
    },
    {
      title: '4. Contests, Sweepstakes and Promotions',
      body: <p>Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</p>,
    },
    {
      title: '5. Refunds',
      body: <p>We issue refunds for Contracts within 1 day of the original purchase of the Contract.</p>,
    },
    {
      title: '6. Content',
      body: <p>Content found on or through this Service are the property of FIT FAM or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>,
    },
    {
      title: '7. Prohibited Uses',
      body: (
        <>
          <p className="mb-3">You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
          <ul className="space-y-2 pl-4 list-disc mb-4">
            {['In any way that violates any applicable national or international law or regulation.',
              'For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.',
              'To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.',
              'To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.',
              'In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.',
              'To engage in any other conduct that restricts or inhibits anyone\'s use or enjoyment of Service.',
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p className="mb-3">Additionally, you agree not to:</p>
          <ul className="space-y-2 pl-4 list-disc">
            {['Use Service in any manner that could disable, overburden, damage, or impair Service.',
              'Use any robot, spider, or other automatic device, process, or means to access Service.',
              'Use any manual process to monitor or copy any of the material on Service without prior written consent.',
              'Use any device, software, or routine that interferes with the proper working of Service.',
              'Introduce any viruses, trojan horses, worms, logic bombs, or other malicious material.',
              'Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service.',
              'Attack Service via a denial-of-service attack or a distributed denial-of-service attack.',
              'Take any action that may damage or falsify Company rating.',
              'Otherwise attempt to interfere with the proper working of Service.',
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      ),
    },
    {
      title: '8. Analytics',
      body: <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>,
    },
    {
      title: '9. No Use By Minors',
      body: <p>Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</p>,
    },
    {
      title: '10. Accounts',
      body: (
        <>
          <p className="mb-3">When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p>
          <p className="mb-3">You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
          <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
        </>
      ),
    },
    {
      title: '11. Intellectual Property',
      body: <p>Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of FIT FAM and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of FIT FAM.</p>,
    },
    {
      title: '12. Copyright Policy',
      body: (
        <>
          <p className="mb-3">We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights ("Infringement") of any person or entity.</p>
          <p className="mb-3">If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>, with the subject line: "Copyright Infringement".</p>
          <p>You may be held accountable for damages (including costs and attorneys' fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
        </>
      ),
    },
    {
      title: '13. DMCA Notice and Procedure for Copyright Infringement Claims',
      body: (
        <>
          <p className="mb-3">You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing:</p>
          <ul className="space-y-2 pl-4 list-disc mb-3">
            {['An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright\'s interest.',
              'A description of the copyrighted work that you claim has been infringed, including the URL of the location where the copyrighted work exists.',
              'Identification of the URL or other specific location on Service where the material that you claim is infringing is located.',
              'Your address, telephone number, and email address.',
              'A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.',
              'A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner\'s behalf.',
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p>You can contact our Copyright Agent via email at <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>.</p>
        </>
      ),
    },
    {
      title: '14. Error Reporting and Feedback',
      body: <p>You may provide us either directly at <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a> or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service ("Feedback"). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback.</p>,
    },
    {
      title: '15. Links To Other Web Sites',
      body: (
        <>
          <p className="mb-3">Our Service may contain links to third party web sites or services that are not owned or controlled by FIT FAM.</p>
          <p className="mb-3">FIT FAM has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
          <p className="mb-3 uppercase text-xs leading-relaxed">YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
          <p className="uppercase text-xs leading-relaxed">WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</p>
        </>
      ),
    },
    {
      title: '16. Disclaimer Of Warranty',
      body: <p className="uppercase text-xs leading-relaxed">THESE SERVICES ARE PROVIDED BY COMPANY ON AN "AS IS" AND "AS AVAILABLE" BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK. COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>,
    },
    {
      title: '17. Limitation Of Liability',
      body: <p className="uppercase text-xs leading-relaxed">EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.</p>,
    },
    {
      title: '18. Termination',
      body: (
        <>
          <p className="mb-3">We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
          <p className="mb-3">If you wish to terminate your account, you may simply discontinue using Service.</p>
          <p>All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
        </>
      ),
    },
    {
      title: '19. Governing Law',
      body: (
        <>
          <p className="mb-3">These Terms shall be governed and construed in accordance with the laws of <strong>Sri Lanka</strong>, which governing law applies to agreement without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
        </>
      ),
    },
    {
      title: '20. Changes To Service',
      body: <p>We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period.</p>,
    },
    {
      title: '21. Amendments To Terms',
      body: (
        <>
          <p className="mb-3">We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
          <p className="mb-3">Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
          <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
        </>
      ),
    },
    {
      title: '22. Waiver And Severability',
      body: (
        <>
          <p className="mb-3">No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
          <p>If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
        </>
      ),
    },
    {
      title: '23. Acknowledgement',
      body: <p className="uppercase text-xs leading-relaxed">BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>,
    },
    {
      title: '24. Contact Us',
      body: <p>Please send your feedback, comments, requests for technical support by email: <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>.</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Terms &amp; Conditions</span>
        </nav>
      </div>

      {/* Title */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">Terms &amp; Conditions</h1>
        <p className="text-xs text-gray-400 mt-3 uppercase tracking-widest">Last updated: January 2025</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10 text-sm text-gray-600 leading-relaxed">
        {sections.map(({ title, body }) => (
          <div key={title} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
            <h2 className="font-semibold text-gray-900 mb-3">{title}</h2>
            {body}
          </div>
        ))}
      </div>

    </div>
  );
};


export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Introduction',
      body: (
        <>
          <p className="mb-3">Welcome to <strong>FIT FAM</strong>.</p>
          <p className="mb-3">FIT FAM ("us", "we", or "our") operates <strong>www.fitfamilie.com</strong> (hereinafter referred to as "Service").</p>
          <p className="mb-3">Our Privacy Policy governs your visit to www.fitfamilie.com, and explains how we collect, safeguard and disclose information that results from your use of our Service.</p>
          <p className="mb-3">We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
          <p>Our Terms and Conditions ("Terms") govern all use of our Service and together with the Privacy Policy constitutes your agreement with us ("agreement").</p>
        </>
      ),
    },
    {
      title: '2. Definitions',
      body: (
        <ul className="space-y-3">
          {[
            ['SERVICE', 'means the www.fitfamilie.com website operated by FIT FAM.'],
            ['PERSONAL DATA', 'means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).'],
            ['USAGE DATA', 'is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).'],
            ['COOKIES', 'are small files stored on your device (computer or mobile device).'],
            ['DATA CONTROLLER', 'means a natural or legal person who determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.'],
            ['DATA PROCESSORS (OR SERVICE PROVIDERS)', 'means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.'],
            ['DATA SUBJECT', 'is any living individual who is the subject of Personal Data.'],
            ['THE USER', 'is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.'],
          ].map(([term, def]) => (
            <li key={term as string}><strong className="text-gray-800">{term}</strong> — {def}</li>
          ))}
        </ul>
      ),
    },
    {
      title: '3. Information Collection and Use',
      body: <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>,
    },
    {
      title: '4. Types of Data Collected',
      body: (
        <>
          <p className="font-semibold text-gray-800 mb-2">Personal Data</p>
          <p className="mb-3">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
          <ul className="space-y-1 pl-4 list-disc mb-4">
            {['Email address', 'First name and last name', 'Phone number', 'Address, Country, State, Province, ZIP/Postal code, City', 'Cookies and Usage Data', 'Bank Details'].map(i => <li key={i}>{i}</li>)}
          </ul>
          <p className="mb-5">We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.</p>

          <p className="font-semibold text-gray-800 mb-2">Usage Data</p>
          <p className="mb-3">We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device ("Usage Data").</p>
          <p className="mb-3">This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          <p className="mb-5">When you access Service with a device, this Usage Data may include information such as the type of device you use, your device unique ID, the IP address of your device, your device operating system, the type of Internet browser you use, unique device identifiers and other diagnostic data.</p>

          <p className="font-semibold text-gray-800 mb-2">Tracking Cookies Data</p>
          <p className="mb-3">We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>
          <p className="mb-3">Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p>
          <p className="mb-3">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
          <p className="mb-2">Examples of Cookies we use:</p>
          <ul className="space-y-1 pl-4 list-disc mb-5">
            {['Session Cookies: We use Session Cookies to operate our Service.', 'Preference Cookies: We use Preference Cookies to remember your preferences and various settings.', 'Security Cookies: We use Security Cookies for security purposes.', 'Advertising Cookies: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.'].map(i => <li key={i}>{i}</li>)}
          </ul>

          <p className="font-semibold text-gray-800 mb-2">Other Data</p>
          <p>While using our Service, we may also collect the following information: sex, age, date of birth, place of birth, passport details, citizenship, registration at place of residence and actual address, telephone number (work, mobile), details of documents on education, qualification, professional training, employment agreements, NDA agreements, information on bonuses and compensation, information on marital status, family members, social security (or other taxpayer identification) number, office location and other data.</p>
        </>
      ),
    },
    {
      title: '5. Use of Data',
      body: (
        <>
          <p className="mb-3">FIT FAM uses the collected data for various purposes:</p>
          <ul className="space-y-1 pl-4 list-disc">
            {['to provide and maintain our Service;', 'to notify you about changes to our Service;', 'to allow you to participate in interactive features of our Service when you choose to do so;', 'to provide customer support;', 'to gather analysis or valuable information so that we can improve our Service;', 'to monitor the usage of our Service;', 'to detect, prevent and address technical issues;', 'to fulfil any other purpose for which you provide it;', 'to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;', 'to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;', 'to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;', 'in any other way we may describe when you provide the information;', 'for any other purpose with your consent.'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </>
      ),
    },
    {
      title: '6. Retention of Data',
      body: (
        <>
          <p className="mb-3">We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
          <p>We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
        </>
      ),
    },
    {
      title: '7. Transfer of Data',
      body: (
        <>
          <p className="mb-3">Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
          <p className="mb-3">If you are located outside <strong className="text-gray-800">Sri Lanka</strong> and choose to provide information to us, please note that we transfer the data, including Personal Data, to Sri Lanka and process it there.</p>
          <p className="mb-3">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
          <p>FIT FAM will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
        </>
      ),
    },
    {
      title: '8. Disclosure of Data',
      body: (
        <>
          <p className="mb-3">We may disclose personal information that we collect, or you provide:</p>
          <div className="space-y-3">
            <div><p className="font-medium text-gray-800">Disclosure for Law Enforcement.</p><p>Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p></div>
            <div><p className="font-medium text-gray-800">Business Transaction.</p><p>If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.</p></div>
            <div>
              <p className="font-medium text-gray-800 mb-2">Other cases. We may disclose your information also:</p>
              <ul className="space-y-1 pl-4 list-disc">
                {['to our subsidiaries and affiliates;', 'to contractors, service providers, and other third parties we use to support our business;', 'to fulfill the purpose for which you provide it;', 'for the purpose of including your company\'s logo on our website;', 'for any other purpose disclosed by us when you provide the information;', 'with your consent in any other cases;', 'if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.'].map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      title: '9. Security of Data',
      body: <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>,
    },
    {
      title: '10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)',
      body: (
        <>
          <p className="mb-3">If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR.</p>
          <p className="mb-3">We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
          <p className="mb-3">If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>.</p>
          <p className="mb-2">In certain circumstances, you have the following data protection rights:</p>
          <ul className="space-y-1 pl-4 list-disc mb-3">
            {['the right to access, update or to delete the information we have on you;', 'the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;', 'the right to object. You have the right to object to our processing of your Personal Data;', 'the right of restriction. You have the right to request that we restrict the processing of your personal information;', 'the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format;', 'the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information;'].map(i => <li key={i}>{i}</li>)}
          </ul>
          <p>Please note that we may ask you to verify your identity before responding to such requests. You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data.</p>
        </>
      ),
    },
    {
      title: '11. Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)',
      body: (
        <>
          <p className="mb-3">CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. According to CalOPPA we agree to the following:</p>
          <ul className="space-y-1 pl-4 list-disc mb-3">
            {['users can visit our site anonymously;', 'our Privacy Policy link includes the word "Privacy", and can easily be found on the home page of our website;', 'users will be notified of any privacy policy changes on our Privacy Policy Page;', `users are able to change their personal information by emailing us at info@fitfamilie.com.`].map(i => <li key={i}>{i}</li>)}
          </ul>
          <p className="font-medium text-gray-800 mb-1">Our Policy on "Do Not Track" Signals:</p>
          <p>We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</p>
        </>
      ),
    },
    {
      title: '12. Your Data Protection Rights under the California Consumer Privacy Act (CCPA)',
      body: (
        <>
          <p className="mb-3">If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us what personal information we have about you, to delete your personal information, or to stop selling your personal information.</p>
          <p>We don't sell or rent your personal information to any third parties for any purpose. To exercise your California data protection rights, please send your request(s) by email: <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>. The CCPA took effect on 01/01/2020.</p>
        </>
      ),
    },
    {
      title: '13. Service Providers',
      body: (
        <>
          <p className="mb-3">We may employ third party companies and individuals to facilitate our Service ("Service Providers"), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.</p>
          <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
        </>
      ),
    },
    {
      title: '14. Analytics',
      body: <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>,
    },
    {
      title: '15. CI/CD tools',
      body: <p>We may use third-party Service Providers to automate the development process of our Service.</p>,
    },
    {
      title: '16. Behavioral Remarketing',
      body: <p>We may use remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimise and serve ads based on your past visits to our Service.</p>,
    },
    {
      title: '17. Payments',
      body: (
        <>
          <p className="mb-3">We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).</p>
          <p className="mb-3">We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
          <p><strong className="text-gray-800">Payhere.</strong></p>
        </>
      ),
    },
    {
      title: '18. Links to Other Sites',
      body: (
        <>
          <p className="mb-3">Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
          <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
        </>
      ),
    },
    {
      title: '19. Children\'s Privacy',
      body: (
        <>
          <p className="mb-3">Our Services are not intended for use by children under the age of 18 ("Child" or "Children").</p>
          <p>We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.</p>
        </>
      ),
    },
    {
      title: '20. Changes to This Privacy Policy',
      body: (
        <>
          <p className="mb-3">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <p className="mb-3">We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update "effective date" at the top of this Privacy Policy.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
        </>
      ),
    },
    {
      title: '21. Contact Us',
      body: <p>If you have any questions about this Privacy Policy, please contact us by email: <a href="mailto:info@fitfamilie.com" className="underline hover:text-black">info@fitfamilie.com</a>.</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 font-medium">Privacy Policy</span>
        </nav>
      </div>

      {/* Title */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-wide">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Effective date: 2022-10-02</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10 text-sm text-gray-600 leading-relaxed">
        {sections.map(({ title, body }) => (
          <div key={title} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
            <h2 className="font-semibold text-gray-900 mb-3">{title}</h2>
            {body}
          </div>
        ))}
      </div>

    </div>
  );
};
