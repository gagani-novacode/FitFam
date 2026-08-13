import React from 'react';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import menImage from '../../assets/top.jpg';
// @ts-ignore
import womenImage from '../../assets/bottom.jpg';
// @ts-ignore
import accessoriesImage from '../../assets/accessories.jpg';

const banners = [
  {
    id: 'tops',
    label: 'Tops',
    image: menImage,
    buttons: [
      { label: 'Men', path: '/category/Men?clothingType=Tops' },
      { label: 'Women', path: '/category/Women?clothingType=Tops' },
    ],
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    image: womenImage,
    buttons: [
      { label: 'Men', path: '/category/Men?clothingType=Bottoms' },
      { label: 'Women', path: '/category/Women?clothingType=Bottoms' },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    image: accessoriesImage,
    buttons: [
      { label: 'Accessories', path: '/category/Accessories' },
    ],
  },
];

export const CategoryBannersSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative overflow-hidden cursor-pointer"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark overlay — deepens on hover */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500" />

            {/* Category Label — centered, always visible */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-chakra font-normal text-white text-3xl uppercase tracking-[0.3em] select-none transition-transform duration-500 group-hover:-translate-y-6">
                {banner.label}
              </h3>
            </div>

            {/* Hover Buttons — slide up from bottom */}
            <div className="absolute inset-x-0 top-1/2 flex flex-row items-center justify-center gap-3 mt-8">
              {banner.buttons.map((btn, index) => (
                <div key={btn.label} className="overflow-hidden" style={{ marginTop: '-1px' }}>
                  <button
                    onClick={() => navigate(btn.path)}
                    className="banner-btn font-chakra font-normal text-[11px] uppercase tracking-[0.3em] px-10 py-2.5 border border-white text-white hover:bg-white hover:text-[#111111] cursor-pointer min-w-[160px]"
                  >
                    {btn.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};