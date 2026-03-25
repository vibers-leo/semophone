'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { haptics } from '@/lib/haptics';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number; // 새로고침 트리거 임계값 (px)
}

/**
 * Pull-to-Refresh 컴포넌트
 * 아래로 드래그하여 콘텐츠 새로고침
 */
export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, threshold], [0, 360]);
  const opacity = useTransform(y, [0, threshold / 2, threshold], [0, 0.5, 1]);

  const handleDragStart = () => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      setIsPulling(true);
    }
  };

  const handleDragEnd = async (event: any, info: any) => {
    setIsPulling(false);

    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true);
      haptics.medium();

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        y.set(0);
      }
    } else {
      y.set(0);
    }
  };

  return (
    <div className="relative overflow-auto" ref={containerRef}>
      {/* Pull Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          height: threshold,
          marginTop: -threshold,
          opacity,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full border-4 border-brand border-t-transparent"
          style={{ rotate }}
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? {
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          } : {}}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragDirectionLock
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.5, bottom: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
