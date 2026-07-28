import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Package, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';
// @ts-ignore
import menImage from '../assets/men.jpg';
// @ts-ignore
import womenImage from '../assets/women.jpg';
import { Footer } from '../components/layout/Footer';

// ── Shared breadcrumb nav ─────────────────────────────────────────────────
const Breadcrumb: React.FC<{ label: string }> = ({ label }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
      <nav className="flex items-center gap-1.5 font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-400">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <span className="text-[#111111]">{label}</span>
      </nav>
    </div>
  );
};

// ── Shared page title ─────────────────────────────────────────────────────
const PageTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
    <h1 className="font-chakra font-normal text-[#111111] text-3xl sm:text-4xl uppercase tracking-[0.3em]">
      {title}
    </h1>
    {subtitle && (
      <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-3">
        {subtitle}
      </p>
    )}
  </div>
);

// ── Section wrapper used on Contact page ─────────────────────────────────
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-b border-gray-100 pb-10 mb-10 last:border-0 last:mb-0 last:pb-0">
    <h2 className="font-chakra font-normal text-[#111111] text-sm uppercase tracking-[0.3em] mb-5">
      {title}
    </h2>
    {children}
  </div>
);


// ─── About Page ───────────────────────────────────────────────────────────
export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-white">

      <Breadcrumb label="About Us" />
      <PageTitle title="About Us" />

      {/* ── THE VISION ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start">

          <div>
            <h2 className="font-chakra font-normal text-[#111111] text-2xl sm:text-3xl uppercase tracking-[0.25em]">
              The Vision
            </h2>
          </div>

          <div>
            <blockquote className="font-chakra font-normal text-[#111111] text-xl sm:text-2xl uppercase tracking-[0.2em] mb-5 leading-snug">
              &quot; BE YOUR OWN BRAND &quot;
            </blockquote>
            <p className="font-chakra font-normal text-sm text-gray-500 leading-relaxed max-w-xl">
              Our mission is to bring fashion to your fitness and training. FITFAM brings you a new experience by trendy
              fashion series and clothing that goes beyond the ordinary clothing brand. Here's a chance to become a
              happier version of yourself connecting with{' '}
              <span className="text-[#111111]">FITFAM</span>.
            </p>
          </div>
        </div>
      </div>

      {/* ── SLIDESHOW ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">

          {/* LEFT — text card */}
          <div className="relative bg-white border border-gray-100 flex items-center min-h-[340px] sm:min-h-[420px] overflow-hidden">

            {/* Dot navigation */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'h-6 bg-[#111111]' : 'h-1.5 bg-gray-300'
                    }`}
                />
              ))}
            </div>

            {/* Text content */}
            <div className="pl-12 pr-8 py-12 w-full">
              <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
                {slide.tag}
              </p>
              <div className="leading-none mb-8">
                <p className="font-chakra font-normal text-4xl sm:text-5xl text-gray-200 uppercase tracking-tight">{slide.line1}</p>
                <p className="font-chakra font-black text-5xl sm:text-7xl text-[#111111] uppercase tracking-tight -mt-1">{slide.line2}</p>
                <p className="font-chakra font-normal text-4xl sm:text-5xl text-gray-200 uppercase tracking-tight -mt-1">{slide.line3}</p>
              </div>
              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center gap-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-chakra font-normal text-[10px] uppercase tracking-[0.3em] px-6 py-2.5 transition-all duration-300 cursor-pointer"
              >
                Shop Now
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

      <Footer />
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
        <span className="font-chakra font-normal text-[12px] uppercase tracking-[0.2em] text-[#111111]">
          {String(index).padStart(2, '0')}. {question}
        </span>
        <span className="font-chakra font-normal text-lg leading-none text-gray-300 group-hover:text-[#111111] transition-colors ml-4 flex-shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-6">
          <div className="font-chakra font-normal text-[12px] text-gray-500 leading-relaxed tracking-wide">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      title: 'Orders',
      items: [
        {
          q: 'How many days it will take to deliver my address?',
          a: 'Will be delivered within 6–8 working days.',
        },
        {
          q: 'Any more questions?',
          a: 'Feel free to contact us on our hotline or send us an email at info@fitfamilie.com — we will be happy to assist you.',
        },
      ],
    },
    {
      title: 'Shipping & Returns',
      items: [
        {
          q: 'How do I exchange or return an order?',
          a: 'Once you receive the item and wish to exchange it, feel free to contact our customer service advisers who will assist you with your request. Please read our Returns Policy for more information.',
        },
        {
          q: 'Will I receive confirmation of my order?',
          a: 'You will be notified via email.',
        },
      ],
    },
    {
      title: 'Payment',
      items: [
        {
          q: 'What payment methods do you accept?',
          a: (
            <div className="font-chakra font-normal text-[12px] uppercase tracking-[0.2em] space-y-1 text-gray-500">
              <p>You can make payments through:</p>
              <p>01 — Visa</p>
              <p>02 — Mastercard</p>
              <p>03 — Amex</p>
              <p>04 — Trusted gateways</p>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#111111]">FAQs</span>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-chakra font-normal text-[#111111] text-3xl sm:text-4xl uppercase tracking-[0.3em]">FAQs</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        {sections.map(({ title, items }) => (
          <div key={title}>
            <h2 className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4 pb-2 border-b border-gray-100">
              {title}
            </h2>
            <div>
              {items.map((item, i) => (
                <AccordionItem key={item.q} index={i + 1} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};


// ─── Shipping & Returns ───────────────────────────────────────────────────
export const ShippingReturnsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#111111]">Shipping &amp; Returns</span>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-chakra font-normal text-[#111111] text-3xl sm:text-4xl uppercase tracking-[0.3em]">
          Shipping &amp; Returns
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12 font-chakra font-normal text-sm text-gray-600 leading-relaxed">

        {/* Delivery table */}
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    Delivery Method
                  </th>
                  <th className="text-right py-3 font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-500">Standard Delivery (Colombo) 1–2 Days</td>
                  <td className="py-3 text-right text-[#111111]">Rs. 350</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-500">Standard Delivery 3–5 Days</td>
                  <td className="py-3 text-right text-[#111111]">Rs. 450</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-chakra font-normal text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Delays may occur due to invalid addresses or other causes.
          </p>
        </div>

        {[
          {
            heading: 'International Shipping',
            body: <p className="text-gray-500">Unfortunately, we do not ship internationally.</p>,
          },
          {
            heading: 'Any Issues',
            body: (
              <>
                <p className="text-gray-500 mb-2">Please contact us for any issues regarding your delivery.</p>
                <p><a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a></p>
                <p className="mt-2">
                  Visit:{' '}
                  <button onClick={() => navigate('/contact')} className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer">
                    Contact Us page
                  </button>
                </p>
              </>
            ),
          },
          {
            heading: 'General Return Policy',
            body: (
              <>
                <p className="text-gray-500 mb-4">We want you to be happy with your purchase. If you are not completely satisfied, you may return it for an exchange or refund.</p>
                <p className="text-gray-500 mb-4">Please add the following details clearly outside your return parcel.</p>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc">
                  <li>Your address</li>
                  <li>Your Phone Number</li>
                  <li>Our address – 138/7 Pamunuwilla, Goanwala, Kelaniya</li>
                  <li>Mobile number – 0740873222</li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Refund Policy',
            body: (
              <>
                <p className="text-gray-500 mb-4">
                  To be eligible for a refund, return the product within <strong className="text-[#111111]">07 days</strong> of purchase. Products returned after 07 days or in damaged condition are not eligible.
                </p>
                <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Eligible conditions:</p>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
                  <li>Returned in original packaging</li>
                  <li>Unused and undamaged</li>
                  <li>Original tags included</li>
                </ul>
                <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Non-refundable items:</p>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
                  <li>Digital items</li>
                  <li>Personalized items</li>
                  <li>Change of mind</li>
                </ul>
                <p className="text-gray-500">After we receive your product, our team will inspect and process your refund to the original payment method. Delivery charges are not refunded.</p>
              </>
            ),
          },
          {
            heading: 'Exchange Policy',
            body: (
              <>
                <p className="text-gray-500 mb-4">
                  Products may be exchanged for a different size within <strong className="text-[#111111]">07 days</strong>, subject to availability.
                </p>
                <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Eligible conditions:</p>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
                  <li>Returned in original packaging</li>
                  <li>Unused and undamaged</li>
                  <li>Original tags included</li>
                </ul>
                <p className="text-gray-500 mb-2">If the replacement is unavailable, store credit valid for 4 months will be issued.</p>
                <p className="text-gray-500">Each item may be exchanged <strong className="text-[#111111]">one time</strong>, provided all conditions are met.</p>
              </>
            ),
          },
          {
            heading: 'How to Initiate a Return',
            body: (
              <>
                <p className="text-gray-500 mb-4">For any return, refund, or exchange request, contact us via:</p>
                <ul className="space-y-2 text-gray-600">
                  <li>Email: <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a></li>
                  <li>Phone: <a href="tel:0740873222" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">0740873222</a></li>
                </ul>
              </>
            ),
          },
        ].map(({ heading, body }) => (
          <div key={heading} className="border-t border-gray-100 pt-10">
            <h2 className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-[#111111] mb-4">{heading}</h2>
            {body}
          </div>
        ))}

        <div className="border-t border-gray-200 pt-10">
          <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-gray-200 text-center mb-10">— — —</p>
        </div>

        {/* Refund Policy 2 */}
        <div>
          <h2 className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-[#111111] mb-4">Refund Policy</h2>
          <p className="text-gray-500 mb-4">
            If your product is defective, damaged, incorrect, or incomplete at delivery, contact us within <strong className="text-[#111111]">14 days</strong>.
          </p>
          <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Eligible conditions:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Original packaging</li>
            <li>Unused and undamaged</li>
            <li>Original tags (if applicable)</li>
          </ul>
          <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Refunds not accepted if:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>You change your mind</li>
            <li>Your circumstances change</li>
            <li>You find cheaper products elsewhere</li>
          </ul>
          <p className="text-[#111111] font-normal mb-2 text-[11px] uppercase tracking-[0.2em]">Exceptions — cannot be returned or exchanged:</p>
          <ul className="space-y-1 text-gray-600 pl-4 list-disc mb-4">
            <li>Digital Items</li>
            <li>Personalized Items</li>
          </ul>
          <p className="text-gray-500">After receiving your product, our team will inspect and process your refund to the original payment method.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};


// ─── Contact Page ─────────────────────────────────────────────────────────
export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <button
          onClick={() => navigate('/')}
          className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-[#111111] mb-8 inline-block cursor-pointer transition-colors"
        >
          ← Back to Home
        </button>

        <h1 className="font-chakra font-normal text-[#111111] text-3xl sm:text-4xl uppercase tracking-[0.3em] mb-10">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, label: 'Phone', value: '+94 77 000 0000' },
            { icon: Mail, label: 'Email', value: 'hello@fitfam.lk' },
            { icon: MapPin, label: 'Location', value: 'Colombo, Sri Lanka' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="border border-gray-200 p-5 text-center hover:border-[#111111] transition-colors duration-300">
              <Icon className="w-5 h-5 mx-auto mb-3 text-gray-400" />
              <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-[#111111] mb-1">{label}</p>
              <p className="font-chakra font-normal text-[11px] text-gray-500">{value}</p>
            </div>
          ))}
        </div>

        <Section title="Send us a message">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-300 px-3 py-2.5 font-chakra font-normal text-sm text-[#111111] placeholder-gray-400 focus:border-[#111111] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 px-3 py-2.5 font-chakra font-normal text-sm text-[#111111] placeholder-gray-400 focus:border-[#111111] outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="w-full border border-gray-300 px-3 py-2.5 font-chakra font-normal text-sm text-[#111111] placeholder-gray-400 focus:border-[#111111] outline-none resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-chakra font-normal text-[10px] uppercase tracking-[0.3em] px-8 py-3 transition-all duration-300 cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </Section>
      </div>
      <Footer />
    </div>
  );
};


// ─── Shared legal page body ───────────────────────────────────────────────
const LegalPage: React.FC<{
  breadcrumb: string;
  title: string;
  subtitle?: string;
  sections: { title: string; body: React.ReactNode }[];
}> = ({ breadcrumb, title, subtitle, sections }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1">
        <nav className="flex items-center gap-1.5 font-chakra font-normal text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#111111]">{breadcrumb}</span>
        </nav>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="font-chakra font-normal text-[#111111] text-3xl sm:text-4xl uppercase tracking-[0.3em]">{title}</h1>
        {subtitle && (
          <p className="font-chakra font-normal text-[10px] uppercase tracking-[0.25em] text-gray-400 mt-3">{subtitle}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10 font-chakra font-normal text-sm text-gray-500 leading-relaxed">
        {sections.map(({ title: sTitle, body }) => (
          <div key={sTitle} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
            <h2 className="font-chakra font-normal text-[10px] uppercase tracking-[0.3em] text-[#111111] mb-4">{sTitle}</h2>
            {body}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};


// ─── Terms Page ───────────────────────────────────────────────────────────
export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Introduction',
      body: (
        <>
          <p className="mb-3">Welcome to <strong className="text-[#111111]">FITFAM (Be Your Own Brand)</strong>!</p>
          <p className="mb-3">These Terms of Service govern your use of our website at <strong className="text-[#111111]">www.fitfamilie.com</strong> operated by FITFAM.</p>
          <p className="mb-3">Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
          <p className="mb-3">Your agreement with us includes these Terms and our Privacy Policy. You acknowledge that you have read and understood them, and agree to be bound by them.</p>
          <p>If you do not agree, you may not use the Service. Please email <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a> so we can try to find a solution.</p>
        </>
      ),
    },
    { title: '2. Communications', body: <p>By using our Service, you agree to receive newsletters, marketing or promotional materials and other information we may send. You may opt out at any time by following the unsubscribe link or emailing <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
    {
      title: '3. Purchases',
      body: (
        <>
          <p className="mb-3">If you wish to purchase any product or service, you may be asked to supply certain information including your card number, expiration date, billing address, and shipping information.</p>
          <p className="mb-3">You represent and warrant that you have the legal right to use any payment method provided and that the information you supply is true, correct, and complete.</p>
          <p className="mb-3">We may use third-party services for payment processing. By submitting your information, you grant us the right to provide it to these third parties subject to our Privacy Policy.</p>
          <p>We reserve the right to refuse or cancel any order at any time, including if fraud or an unauthorized transaction is suspected.</p>
        </>
      ),
    },
    { title: '4. Contests, Sweepstakes and Promotions', body: <p>Any contests or promotions made available through the Service may be governed by separate rules. If you participate, please review the applicable rules and our Privacy Policy.</p> },
    { title: '5. Refunds', body: <p>We issue refunds for Contracts within 1 day of the original purchase.</p> },
    { title: '6. Content', body: <p>Content found on or through this Service is the property of FIT FAM or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content for commercial purposes without express written permission from us.</p> },
    {
      title: '7. Prohibited Uses',
      body: (
        <>
          <p className="mb-3">You may use Service only for lawful purposes. You agree not to use Service:</p>
          <ul className="space-y-2 pl-4 list-disc mb-4">
            {[
              'In any way that violates any applicable national or international law or regulation.',
              'For the purpose of exploiting or harming minors in any way.',
              'To transmit any advertising or promotional material including spam.',
              'To impersonate Company, an employee, another user, or any person or entity.',
              'In any way that infringes upon the rights of others, or is illegal, threatening, fraudulent, or harmful.',
              "To engage in any conduct that restricts or inhibits anyone's use or enjoyment of Service.",
            ].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p className="mb-3">Additionally, you agree not to use any automated tools to access, monitor, or copy material from Service, introduce malicious code, or attempt unauthorized access to any part of Service.</p>
        </>
      ),
    },
    { title: '8. Analytics', body: <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p> },
    { title: '9. No Use By Minors', body: <p>Service is intended only for individuals at least eighteen (18) years old. By accessing Service, you warrant that you are at least 18 years of age.</p> },
    {
      title: '10. Accounts',
      body: (
        <>
          <p className="mb-3">When you create an account, you guarantee that the information you provide is accurate, complete, and current. Inaccurate information may result in immediate termination of your account.</p>
          <p>You are responsible for maintaining the confidentiality of your account and must notify us immediately upon becoming aware of any breach or unauthorized use.</p>
        </>
      ),
    },
    { title: '11. Intellectual Property', body: <p>Service and its original content, features, and functionality are and will remain the exclusive property of FIT FAM and its licensors. Our trademarks may not be used without prior written consent.</p> },
    {
      title: '12. Copyright Policy',
      body: (
        <>
          <p className="mb-3">We respect intellectual property rights. If you believe copyrighted work has been infringed, please submit your claim to <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a> with the subject "Copyright Infringement".</p>
          <p>You may be held accountable for damages for misrepresentation or bad-faith claims of infringement.</p>
        </>
      ),
    },
    { title: '13. DMCA Notice', body: <p>To submit a DMCA notification, provide our Copyright Agent with: an authorized signature, a description of the copyrighted work, the URL of the infringing material, your contact details, a good faith statement, and a statement of accuracy under penalty of perjury. Email: <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
    { title: '14. Error Reporting and Feedback', body: <p>You may provide feedback directly at <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>. You acknowledge that Company is not under any obligation of confidentiality with respect to Feedback.</p> },
    { title: '15. Links To Other Web Sites', body: <p>Our Service may contain links to third-party websites not owned or controlled by FIT FAM. We assume no responsibility for their content, privacy policies, or practices. We strongly advise you to review their Terms of Service and Privacy Policies.</p> },
    { title: '16. Disclaimer Of Warranty', body: <p className="uppercase text-[11px] leading-relaxed">These services are provided on an "as is" and "as available" basis. Company makes no representations or warranties of any kind, express or implied. You expressly agree that your use of these services is at your sole risk.</p> },
    { title: '17. Limitation Of Liability', body: <p className="uppercase text-[11px] leading-relaxed">Except as prohibited by law, Company shall not be liable for any indirect, punitive, special, incidental, or consequential damage. Liability is limited to the amount paid for the products and/or services.</p> },
    {
      title: '18. Termination',
      body: (
        <>
          <p className="mb-3">We may terminate or suspend your account immediately, without prior notice or liability, for any reason including a breach of Terms.</p>
          <p>All provisions of Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.</p>
        </>
      ),
    },
    {
      title: '19. Governing Law',
      body: (
        <>
          <p className="mb-3">These Terms shall be governed and construed in accordance with the laws of <strong className="text-[#111111]">Sri Lanka</strong>, without regard to conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision will not be considered a waiver of those rights.</p>
        </>
      ),
    },
    { title: '20. Changes To Service', body: <p>We reserve the right to withdraw or amend our Service in our sole discretion without notice.</p> },
    {
      title: '21. Amendments To Terms',
      body: (
        <>
          <p className="mb-3">We may amend Terms at any time by posting the amended terms on this site. Your continued use of Service following posting of revised Terms means you accept and agree to the changes.</p>
        </>
      ),
    },
    { title: '22. Waiver And Severability', body: <p>No waiver of any term shall be deemed a further or continuing waiver of such term. If any provision is held invalid, the remaining provisions will continue in full force and effect.</p> },
    { title: '23. Acknowledgement', body: <p className="uppercase text-[11px] leading-relaxed">By using Service, you acknowledge that you have read these Terms of Service and agree to be bound by them.</p> },
    { title: '24. Contact Us', body: <p>Please send your feedback, comments, or requests for technical support by email: <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
  ];

  return (
    <LegalPage
      breadcrumb="Terms & Conditions"
      title="Terms & Conditions"
      subtitle="Last updated: January 2025"
      sections={sections}
    />
  );
};


// ─── Privacy Page ─────────────────────────────────────────────────────────
export const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: '1. Introduction',
      body: (
        <>
          <p className="mb-3">Welcome to <strong className="text-[#111111]">FIT FAM</strong>.</p>
          <p className="mb-3">FIT FAM ("us", "we", or "our") operates <strong className="text-[#111111]">www.fitfamilie.com</strong> (the "Service").</p>
          <p className="mb-3">Our Privacy Policy governs your visit to our website and explains how we collect, safeguard, and disclose information that results from your use of our Service.</p>
          <p>We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy.</p>
        </>
      ),
    },
    {
      title: '2. Definitions',
      body: (
        <ul className="space-y-3">
          {[
            ['SERVICE', 'The www.fitfamilie.com website operated by FIT FAM.'],
            ['PERSONAL DATA', 'Data about a living individual who can be identified from those data.'],
            ['USAGE DATA', 'Data collected automatically from use of the Service or its infrastructure.'],
            ['COOKIES', 'Small files stored on your device (computer or mobile device).'],
            ['DATA CONTROLLER', 'A natural or legal person who determines the purposes for which personal data are processed. We are a Data Controller of your data.'],
            ['DATA PROCESSORS', 'Any natural or legal person who processes data on behalf of the Data Controller.'],
            ['DATA SUBJECT', 'Any living individual who is the subject of Personal Data.'],
            ['THE USER', 'The individual using our Service. Corresponds to the Data Subject.'],
          ].map(([term, def]) => (
            <li key={term as string}><strong className="text-[#111111]">{term}</strong> — {def}</li>
          ))}
        </ul>
      ),
    },
    { title: '3. Information Collection and Use', body: <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p> },
    {
      title: '4. Types of Data Collected',
      body: (
        <>
          <p className="text-[#111111] text-[11px] uppercase tracking-[0.2em] mb-2">Personal Data</p>
          <p className="mb-3">While using our Service, we may ask you to provide personally identifiable information including:</p>
          <ul className="space-y-1 pl-4 list-disc mb-4">
            {['Email address', 'First name and last name', 'Phone number', 'Address, Country, State, Province, ZIP/Postal code, City', 'Cookies and Usage Data', 'Bank Details'].map(i => <li key={i}>{i}</li>)}
          </ul>
          <p className="mb-5">We may use your Personal Data to contact you with newsletters, marketing, or promotional materials. You may opt out at any time.</p>
          <p className="text-[#111111] text-[11px] uppercase tracking-[0.2em] mb-2">Usage Data</p>
          <p className="mb-5">We may collect information your browser sends when you visit our Service, including IP address, browser type and version, pages visited, time and date of visit, and other diagnostic data.</p>
          <p className="text-[#111111] text-[11px] uppercase tracking-[0.2em] mb-2">Tracking Cookies Data</p>
          <p className="mb-3">We use cookies and similar tracking technologies to track activity on our Service. You can instruct your browser to refuse all cookies, though some parts of the Service may not function properly.</p>
          <ul className="space-y-1 pl-4 list-disc">
            {['Session Cookies', 'Preference Cookies', 'Security Cookies', 'Advertising Cookies'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </>
      ),
    },
    {
      title: '5. Use of Data',
      body: (
        <>
          <p className="mb-3">FIT FAM uses collected data to:</p>
          <ul className="space-y-1 pl-4 list-disc">
            {['provide and maintain our Service', 'notify you about changes', 'provide customer support', 'gather analysis to improve our Service', 'monitor usage and detect technical issues', 'carry out obligations arising from contracts between you and us', 'provide news, special offers, and general information about similar goods and services'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </>
      ),
    },
    { title: '6. Retention of Data', body: <p>We will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy, or as required to comply with legal obligations, resolve disputes, and enforce our agreements.</p> },
    { title: '7. Transfer of Data', body: <p>Your information may be transferred to and maintained on computers outside your jurisdiction. If you are located outside <strong className="text-[#111111]">Sri Lanka</strong> and choose to provide information to us, please note that we transfer and process it in Sri Lanka. FIT FAM will take all steps reasonably necessary to ensure your data is treated securely.</p> },
    {
      title: '8. Disclosure of Data',
      body: (
        <>
          <p className="mb-3">We may disclose personal information:</p>
          <ul className="space-y-1 pl-4 list-disc">
            {['as required by law or valid public authority requests', 'in connection with a merger, acquisition, or asset sale', 'to our subsidiaries, affiliates, and service providers', 'to fulfill the purpose for which you provide it', 'with your consent in any other cases'].map(i => <li key={i}>{i}</li>)}
          </ul>
        </>
      ),
    },
    { title: '9. Security of Data', body: <p>The security of your data is important to us. While we strive to use commercially acceptable means to protect your Personal Data, no method of transmission over the Internet is 100% secure.</p> },
    { title: '10. GDPR Data Protection Rights', body: <p>If you are a resident of the EU/EEA, you have rights under GDPR including the right to access, rectify, object, restrict, port, and withdraw consent for your data. Contact us at <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
    { title: '11. CalOPPA Rights', body: <p>Users can visit our site anonymously. We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track mechanism is in place.</p> },
    { title: '12. CCPA Rights', body: <p>California residents may request to know what data we collect, delete their data, or stop selling it. We do not sell or rent personal information to any third parties. Requests: <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
    { title: '13. Service Providers', body: <p>We may employ third-party companies and individuals to facilitate our Service. These third parties have access to your Personal Data only to perform tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p> },
    { title: '14. Analytics', body: <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p> },
    { title: '15. CI/CD Tools', body: <p>We may use third-party Service Providers to automate the development process of our Service.</p> },
    { title: '16. Behavioral Remarketing', body: <p>We may use remarketing services to advertise on third-party websites after you visit our Service. We and our vendors use cookies to inform, optimize, and serve ads based on your past visits.</p> },
    { title: '17. Payments', body: <p>We use third-party services for payment processing. We do not store or collect your payment card details. Payment processors adhere to PCI-DSS standards. <strong className="text-[#111111]">Payhere.</strong></p> },
    { title: '18. Links to Other Sites', body: <p>Our Service may contain links to third-party sites not operated by us. We strongly advise you to review their Privacy Policy. We assume no responsibility for their content or practices.</p> },
    { title: "19. Children's Privacy", body: <p>Our Services are not intended for children under 18. We do not knowingly collect personally identifiable information from children under 18. If you become aware that a child has provided us with Personal Data, please contact us.</p> },
    { title: '20. Changes to This Privacy Policy', body: <p>We may update our Privacy Policy from time to time. We will notify you by posting the new Privacy Policy on this page and via email or a prominent notice prior to the change becoming effective.</p> },
    { title: '21. Contact Us', body: <p>If you have any questions about this Privacy Policy, please contact us: <a href="mailto:info@fitfamilie.com" className="text-[#111111] underline underline-offset-2 hover:opacity-60 transition-opacity">info@fitfamilie.com</a>.</p> },
  ];

  return (
    <LegalPage
      breadcrumb="Privacy Policy"
      title="Privacy Policy"
      subtitle="Effective date: 2022-10-02"
      sections={sections}
    />
  );
};