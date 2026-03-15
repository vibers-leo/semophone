import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circle' | 'text';
  lines?: number; // text variant일 때 줄 수
}

/**
 * Skeleton 로딩 컴포넌트
 * 콘텐츠 로딩 중 shimmer 효과 표시
 */
export function Skeleton({
  className,
  variant = 'default',
  lines = 1,
}: SkeletonProps) {
  const shimmerClass = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]";
  const shimmerStyle = { animation: 'shimmer 1.5s ease-in-out infinite' };

  if (variant === 'circle') {
    return (
      <div
        className={cn(
          "rounded-full",
          shimmerClass,
          className
        )}
        style={shimmerStyle}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 rounded",
              shimmerClass,
              i === lines - 1 && "w-4/5", // 마지막 줄은 80% 너비
              className
            )}
            style={shimmerStyle}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded",
        shimmerClass,
        className
      )}
      style={shimmerStyle}
    />
  );
}

/**
 * Store 카드용 Skeleton
 */
export function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      <div className="flex items-start gap-4">
        {/* 로고 Skeleton */}
        <Skeleton variant="circle" className="w-16 h-16 flex-shrink-0" />
        
        {/* 정보 Skeleton */}
        <div className="flex-1 min-w-0">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton variant="text" lines={2} className="h-3" />
        </div>
      </div>
      
      {/* 버튼 Skeleton */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    </div>
  );
}

/**
 * Grid 레이아웃용 Skeleton
 */
export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <StoreCardSkeleton key={i} />
      ))}
    </div>
  );
}
