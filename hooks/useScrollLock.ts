import { useEffect } from 'react';
import { scrollLock } from '@/lib/scrollLock';

/**
 * 스크롤 잠금 커스텀 훅
 *
 * 모달이나 메뉴가 열릴 때 자동으로 스크롤을 잠그고,
 * 닫힐 때 자동으로 해제합니다.
 *
 * @param isLocked - 스크롤을 잠글지 여부
 *
 * @example
 * ```tsx
 * function MyModal({ isOpen }) {
 *   useScrollLock(isOpen);
 *
 *   if (!isOpen) return null;
 *   return <div>Modal Content</div>;
 * }
 * ```
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      scrollLock.lock();
    }

    return () => {
      if (isLocked) {
        scrollLock.unlock();
      }
    };
  }, [isLocked]);
}
