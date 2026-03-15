'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { haptics } from '@/lib/haptics';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  disabled?: boolean;
}

/**
 * PullToRefresh - 스마트 버전
 * 스크롤 위치가 최상단일 때만 활성화되어 스크롤 간섭 없음
 */
export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  disabled = false,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const y = useMotionValue(0);

  // Pull 진행도 (0-1)
  const pullProgress = useTransform(y, [0, threshold], [0, 1]);

  // 인디케이터 회전 각도
  const rotate = useTransform(pullProgress, [0, 1], [0, 360]);

  // 인디케이터 opacity
  const opacity = useTransform(y, [0, 20, threshold], [0, 0.5, 1]);

  // 스크롤 위치 추적 (throttled)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          setScrollY(scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기값 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDragEnd = async () => {
    const currentY = y.get();

    if (currentY >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      haptics.medium();

      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  // 스크롤 위치가 최상단일 때만 pull 활성화
  const shouldEnablePull = scrollY === 0 && !disabled && !isRefreshing;

  return (
    <div ref={containerRef} className="relative">
      {/* Pull 인디케이터 */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity,
          height: y,
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          style={{ rotate }}
        >
          {isRefreshing ? (
            <div className="w-8 h-8 border-3 border-gray-300 border-t-[#F2C811] rounded-full animate-spin" />
          ) : (
            <svg
              className="w-8 h-8 text-[#F2C811]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          )}
          <span className="text-xs font-semibold text-gray-600">
            {isRefreshing ? '새로고침 중...' : '당겨서 새로고침'}
          </span>
        </motion.div>
      </motion.div>

      {/* 콘텐츠 */}
      <motion.div
        drag={shouldEnablePull ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.5, bottom: 0 }}
        onDragEnd={handleDragEnd}
        style={{ y, touchAction: shouldEnablePull ? 'none' : 'auto' }}
        animate={{
          y: isRefreshing ? threshold : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
