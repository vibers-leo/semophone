import { ReactNode } from 'react';
import { cn } from '@vibers/ui';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * 벤토 그리드 레이아웃
 * 모바일 앱처럼 카드 기반 그리드 레이아웃 제공
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6",
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        "auto-rows-[200px]",
        "w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
