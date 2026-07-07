import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
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
  const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none cursor-pointer';
  
  const variants = {
    primary: 'bg-[#111111] text-white border border-[#111111] hover:bg-black hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-[#888888] text-white border border-[#888888] hover:bg-[#666666] hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-[#111111] text-[#111111] bg-transparent hover:bg-[#111111] hover:text-white active:scale-[0.98]',
    white: 'bg-white text-[#111111] border border-white hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
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
