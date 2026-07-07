import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'hot' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const baseStyles = 'inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 tracking-widest';
  
  const variants = {
    new: 'bg-[#111111] text-white',
    sale: 'bg-[#FF0000] text-white',
    hot: 'bg-[#FF0000] text-white',
    default: 'bg-[#888888] text-white'
  };

  const currentVariant = variant === 'default' && children 
    ? (children.toString().toLowerCase() === 'new' ? 'new' : children.toString().toLowerCase() === 'sale' ? 'sale' : children.toString().toLowerCase() === 'hot' ? 'hot' : 'default')
    : variant;

  return (
    <span className={`${baseStyles} ${variants[currentVariant as keyof typeof variants]} ${className}`}>
      {children}
    </span>
  );
};
