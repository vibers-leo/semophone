import React from 'react';

type BadgeVariant = 'brand' | 'region' | 'rank' | 'distance';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  brand: 'bg-brand text-black',
  region: 'bg-gray-100 text-gray-700',
  rank: 'bg-amber-500 text-white',
  distance: 'bg-emerald-500 text-white',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  variant = 'brand',
  size = 'md',
  className = '',
  children,
}: BadgeProps) {
  const combinedClassName = `
    inline-block
    rounded-full
    font-bold
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  return <span className={combinedClassName}>{children}</span>;
}
