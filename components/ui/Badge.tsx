interface BadgeProps {
  children: React.ReactNode;
  variant?: 'dark' | 'brand' | 'light';
  className?: string;
}

export default function Badge({ children, variant = 'dark', className = '' }: BadgeProps) {
  const variants = {
    dark: 'bg-dark text-white',
    brand: 'bg-brand text-black',
    light: 'bg-gray-100 text-gray-900',
  };

  return (
    <div className={`px-5 py-2 rounded-full text-sm font-bold ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
