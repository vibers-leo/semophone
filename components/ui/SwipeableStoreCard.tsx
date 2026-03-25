'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, memo } from 'react';
import { haptics } from '@/lib/haptics';

interface SwipeAction {
  icon: string;
  label: string;
  color: 'green' | 'blue' | 'red';
  onSwipe: () => void;
}

interface SwipeableStoreCardProps {
  children: React.ReactNode;
  onCall?: () => void;
  onNavigate?: () => void;
}

const colorMap = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  red: 'bg-red-500',
};

/**
 * SwipeableStoreCard - 스와이프 액션이 있는 매장 카드
 * 왼쪽 스와이프: 전화
 * 오른쪽 스와이프: 길찾기
 */
export const SwipeableStoreCard = memo(function SwipeableStoreCard({
  children,
  onCall,
  onNavigate,
}: SwipeableStoreCardProps) {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // 스와이프 배경색
  const leftBg = useTransform(x, [0, 100], ['rgba(34, 197, 94, 0)', 'rgba(34, 197, 94, 0.9)']);
  const rightBg = useTransform(x, [-100, 0], ['rgba(59, 130, 246, 0.9)', 'rgba(59, 130, 246, 0)']);

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();

    // 스와이프 임계값
    const threshold = 80;

    if (currentX > threshold && onCall) {
      // 오른쪽 스와이프 → 전화
      haptics.medium();
      onCall();
    } else if (currentX < -threshold && onNavigate) {
      // 왼쪽 스와이프 → 길찾기
      haptics.medium();
      onNavigate();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* 왼쪽 스와이프 액션 (전화) */}
      <motion.div
        className="absolute inset-y-0 left-0 w-24 flex items-center justify-center"
        style={{ backgroundColor: leftBg }}
      >
        <div className="text-white text-center">
          <div className="text-2xl mb-1">📞</div>
          <div className="text-xs font-semibold">전화</div>
        </div>
      </motion.div>

      {/* 오른쪽 스와이프 액션 (길찾기) */}
      <motion.div
        className="absolute inset-y-0 right-0 w-24 flex items-center justify-center"
        style={{ backgroundColor: rightBg }}
      >
        <div className="text-white text-center">
          <div className="text-2xl mb-1">🗺️</div>
          <div className="text-xs font-semibold">길찾기</div>
        </div>
      </motion.div>

      {/* 카드 콘텐츠 */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 120 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative bg-white cursor-grab active:cursor-grabbing"
      >
        {children}
      </motion.div>
    </div>
  );
});
