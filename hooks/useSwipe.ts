'use client';

import { useState } from 'react';
import { PanInfo } from 'framer-motion';

export interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // 최소 스와이프 거리 (px)
  velocityThreshold?: number; // 최소 스와이프 속도
}

/**
 * Framer Motion 기반 스와이프 제스처 감지 Hook
 * 
 * @example
 * const swipeHandlers = useSwipe({
 *   onSwipeDown: () => closeModal(),
 *   threshold: 100
 * });
 * 
 * <motion.div
 *   drag="y"
 *   dragConstraints={{ top: 0, bottom: 0 }}
 *   onDragEnd={swipeHandlers.handleDragEnd}
 * />
 */
export function useSwipe(options: SwipeOptions = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocityThreshold = 500,
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    const { offset, velocity } = info;
    const swipeDistance = Math.abs(offset.x) > Math.abs(offset.y) ? offset.x : offset.y;
    const swipeVelocity = Math.abs(velocity.x) > Math.abs(velocity.y) ? velocity.x : velocity.y;

    // 수평 스와이프
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > velocityThreshold) {
        if (offset.x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (offset.x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    }
    // 수직 스와이프
    else {
      if (Math.abs(offset.y) > threshold || Math.abs(velocity.y) > velocityThreshold) {
        if (offset.y > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (offset.y < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }
  };

  return {
    isDragging,
    handleDragStart,
    handleDragEnd,
  };
}
