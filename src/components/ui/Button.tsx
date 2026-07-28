import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-chakra font-normal uppercase tracking-[0.25em] rounded-none transition-all duration-300 focus:outline-none cursor-pointer';

  const variants = {
    // Solid black — primary actions (e.g. Sign In, Add to Cart, Checkout)
    primary:
      'bg-[#111111] text-white border border-[#111111] hover:bg-black',

    // Bordered — secondary actions (e.g. View All, Shop Now, Create Account)
    outline:
      'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-white',

    // No border — subtle actions (e.g. Cancel, Skip)
    ghost:
      'bg-transparent text-[#111111] border border-transparent hover:border-[#111111]',

    // add to variants object
    hero:
      'bg-transparent text-white border border-white hover:bg-white hover:text-black',
  };

  const sizes = {
    sm: 'text-[10px] px-6 py-2',
    md: 'text-[11px] px-10 py-3',
    lg: 'text-[12px] px-14 py-4',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};