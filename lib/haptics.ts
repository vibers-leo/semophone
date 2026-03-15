/**
 * Haptic Feedback Utility
 * 네이티브 앱처럼 진동 피드백 제공 (iOS/Android 지원)
 */

export const haptics = {
  /**
   * 가벼운 진동 (버튼 탭, 네비게이션 전환)
   */
  light: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  },

  /**
   * 중간 진동 (모달 열기/닫기, 선택 완료)
   */
  medium: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }
  },

  /**
   * 강한 진동 (경고, 중요한 액션)
   */
  heavy: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  },

  /**
   * 성공 패턴 (짧-긴-짧)
   */
  success: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  },

  /**
   * 에러 패턴 (짧-짧-짧)
   */
  error: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([20, 40, 20, 40, 20]);
    }
  },

  /**
   * 선택 패턴 (매우 짧은 진동)
   */
  selection: () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(5);
    }
  },
};
