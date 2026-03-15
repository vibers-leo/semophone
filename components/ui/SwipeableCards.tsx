'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { haptics } from '@/lib/haptics';

interface SwipeableCardsProps {
  children: ReactNode[];
  className?: string;
}

/**
 * SwipeableCards - 스와이프 가능한 카드 슬라이더
 * 모바일 앱처럼 카드를 좌우로 스와이프
 */
export function SwipeableCards({ children, className = '' }: SwipeableCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // 카드 너비 계산
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // 모바일: 전체 너비 - padding, 데스크톱: 카드 3개
        const isMobile = window.innerWidth < 768;
        setCardWidth(isMobile ? width - 32 : (width - 48) / 3);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // 스와이프 감지 임계값
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (Math.abs(offset) > swipeThreshold || Math.abs(velocity) > velocityThreshold) {
      if (offset > 0 && currentIndex > 0) {
        // 오른쪽 스와이프 (이전)
        setCurrentIndex(prev => prev - 1);
        haptics.light();
      } else if (offset < 0 && currentIndex < children.length - 1) {
        // 왼쪽 스와이프 (다음)
        setCurrentIndex(prev => prev + 1);
        haptics.light();
      }
    }
  };

  // 모바일 여부 확인
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 카드 컨테이너 */}
      <motion.div
        className="flex gap-4"
        drag={isMobile ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={{
          x: isMobile ? -currentIndex * (cardWidth + 16) : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y' // 세로 스크롤 허용
        }}
      >
        {children.map((child, index) => (
          <motion.div
            key={index}
            style={{
              minWidth: isMobile ? `${cardWidth}px` : 'calc((100% - 32px) / 3)',
              flexShrink: 0
            }}
            whileTap={isMobile ? { scale: 0.98 } : undefined}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {/* 진행 인디케이터 (모바일만) */}
      {isMobile && children.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                haptics.light();
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-brand w-6'
                  : 'bg-gray-300 w-2'
              }`}
              aria-label={`카드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
