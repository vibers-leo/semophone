import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4; // 그리드 span 크기 (가로)
  rowSpan?: 1 | 2 | 3 | 4; // 세로 span
  hover?: boolean; // 호버 효과 여부
  gradient?: boolean; // 그라디언트 배경
  onClick?: () => void;
}

/**
 * 벤토 그리드 카드 컴포넌트
 * 다양한 크기와 스타일의 카드 제공
 */
export function BentoCard({
  children,
  className,
  span = 1,
  rowSpan = 1,
  hover = false,
  gradient = false,
  onClick,
}: BentoCardProps) {
  const spanClasses = {
    1: 'col-span-1',
    2: 'md:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white border border-gray-200",
        "shadow-soft",
        "transition-all duration-300",
        spanClasses[span],
        rowSpanClasses[rowSpan],
        hover && "hover:shadow-medium hover:-translate-y-1 cursor-pointer active:scale-[0.98]",
        gradient && "bg-gradient-to-br from-brand/5 to-brand/20",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// BentoCard 내부 요소들
export function BentoCardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-4 md:p-6", className)}>
      {children}
    </div>
  );
}

export function BentoCardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-lg md:text-xl font-bold text-gray-900", className)}>
      {children}
    </h3>
  );
}

export function BentoCardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm md:text-base text-gray-600 mt-2", className)}>
      {children}
    </p>
  );
}

export function BentoCardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-4 md:p-6 pt-0", className)}>
      {children}
    </div>
  );
}
