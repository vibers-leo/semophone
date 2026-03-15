/**
 * 스크롤 잠금 중앙 관리 유틸리티
 *
 * 여러 모달/메뉴가 중첩되어 열려도 안전하게 스크롤을 관리합니다.
 * 카운터 기반으로 작동하여 마지막 모달/메뉴가 닫힐 때만 스크롤을 복원합니다.
 *
 * @example
 * ```typescript
 * import { scrollLock } from '@/lib/scrollLock';
 *
 * // 모달 열 때
 * scrollLock.lock();
 *
 * // 모달 닫을 때
 * scrollLock.unlock();
 * ```
 */
class ScrollLockManager {
  private lockCount = 0;
  private originalOverflow = '';
  private originalPaddingRight = '';

  /**
   * 스크롤을 잠급니다.
   *
   * 첫 번째 잠금 시에만 실제로 body의 overflow를 hidden으로 설정합니다.
   * 스크롤바 너비만큼 paddingRight를 추가하여 레이아웃 shift를 방지합니다.
   */
  lock() {
    if (this.lockCount === 0) {
      // 현재 상태 저장
      this.originalOverflow = document.body.style.overflow;
      this.originalPaddingRight = document.body.style.paddingRight;

      // 스크롤바 너비 계산 (레이아웃 shift 방지)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // 스크롤 잠금
      document.body.style.overflow = 'hidden';
    }

    this.lockCount++;
  }

  /**
   * 스크롤 잠금을 해제합니다.
   *
   * 카운터를 감소시키고, 모든 잠금이 해제되었을 때만 실제로 스크롤을 복원합니다.
   */
  unlock() {
    if (this.lockCount > 0) {
      this.lockCount--;
    }

    // 마지막 잠금이 해제되면 원래 상태로 복원
    if (this.lockCount === 0) {
      document.body.style.overflow = this.originalOverflow;
      document.body.style.paddingRight = this.originalPaddingRight;
    }
  }

  /**
   * 비상 리셋 (에러 발생 시 사용)
   *
   * 모든 카운터를 초기화하고 스크롤을 즉시 복원합니다.
   */
  reset() {
    this.lockCount = 0;
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

export const scrollLock = new ScrollLockManager();
