import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-black shadow-brand hover:bg-primary-hover hover:shadow-brand-hover',
  secondary:
    'bg-black text-brand shadow-xl hover:bg-gray-900 hover:shadow-2xl',
  outlined:
    'bg-gray-100 text-gray-700 hover:bg-gray-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
  xl: 'px-16 py-6 text-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  className = '',
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'rounded-full font-bold hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : 'inline-block'}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
