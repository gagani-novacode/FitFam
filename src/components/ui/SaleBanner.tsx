import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

interface ActiveSale {
  name: string;
  endDate: string;
}

interface SaleBannerProps {
  isOpaque?: boolean;
}

const SaleBanner: React.FC<SaleBannerProps> = ({ isOpaque = true }) => {
  const [sale, setSale] = useState<ActiveSale | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    api.get('/store/sales/active')
      .then(res => { if (res.data.sale) setSale(res.data.sale); })
      .catch(() => { });
  }, []);

  useEffect(() => {
    if (!sale) return;
    const tick = () => {
      const diff = new Date(sale.endDate).getTime() - Date.now();
      if (diff <= 0) { setSale(null); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sale]);

  if (!sale) return null;

  const message = `⚡ ${sale.name.toUpperCase()} — EXCLUSIVE DEALS ON SELECTED ITEMS · ENDS IN ${timeLeft} · SHOP NOW · `;

  return (
    <div
      className={`transition-colors duration-500 ${isOpaque ? 'bg-[#111111]' : 'bg-transparent'}`}
      style={{
        overflow: 'hidden',
        position: 'relative',
        zIndex: 60,
      }}
    >
      <style>{`
        @keyframes fitfam-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .fitfam-marquee-track {
          display: flex;
          white-space: nowrap;
          animation: fitfam-marquee 28s linear infinite;
          width: max-content;
        }
        .fitfam-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="fitfam-marquee-track" style={{ padding: '9px 0' }}>
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Chakra Petch', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ffffff',
              padding: '0 32px',
            }}
          >
            {message.split('·').map((part, j) => (
              <React.Fragment key={j}>
                {j > 0 && <span style={{ color: '#D4AF37', padding: '0 6px' }}>·</span>}
                {part}
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SaleBanner;
