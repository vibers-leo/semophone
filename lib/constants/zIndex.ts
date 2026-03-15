/**
 * Z-Index 계층 구조 상수
 *
 * 세모폰 앱의 모든 z-index 값을 중앙에서 관리합니다.
 *
 * ## 계층 순서 (낮음 → 높음)
 * 1. **기본 레이어** (0-10) - 일반 콘텐츠, 장식 요소
 * 2. **네비게이션** (40-60) - 상단 헤더, 하단 모바일 네비
 * 3. **고정 UI** (100-200) - Sticky CTA, Header
 * 4. **메뉴** (500-501) - 햄버거 메뉴 (모달보다 낮음)
 * 5. **모달** (1000-1001) - 모달 배경 & 콘텐츠
 * 6. **시스템** (9998-9999) - 스플래시, Toast, Alert
 *
 * @example
 * ```tsx
 * // Tailwind 클래스로 사용
 * <div className="z-modal">Modal Content</div>
 * <div className="z-menu-overlay">Menu Overlay</div>
 * ```
 *
 * @example
 * ```typescript
 * // TypeScript에서 직접 사용
 * import { Z_INDEX } from '@/lib/constants/zIndex';
 * const modalZIndex = Z_INDEX.MODAL; // 1001
 * ```
 */
export const Z_INDEX = {
  /** 기본 레이어 (0) */
  BASE: 0,

  /** 네비게이션 (40) */
  NAV: 40,

  /** 하단 모바일 네비게이션 (50) */
  BOTTOM_NAV: 50,

  /** 고정 CTA 버튼 (100) */
  STICKY_CTA: 100,

  /** Header (200) */
  HEADER: 200,

  /** 햄버거 메뉴 오버레이 (500) - 모달보다 낮음 */
  MENU_OVERLAY: 500,

  /** 햄버거 메뉴 패널 (501) */
  MENU_PANEL: 501,

  /** 모달 배경 (1000) */
  MODAL_BACKDROP: 1000,

  /** 모달 콘텐츠 (1001) */
  MODAL: 1001,

  /** 로딩 스플래시 (9998) */
  LOADING_SPLASH: 9998,

  /** 중요 알림 - Toast, Alert, Install Prompt (9999) */
  CRITICAL: 9999,
} as const;

export type ZIndexLayer = typeof Z_INDEX[keyof typeof Z_INDEX];

/**
 * Z-Index 설명 (문서화용)
 */
export const Z_INDEX_DOCS: Record<number, string> = {
  [Z_INDEX.BASE]: '기본 레이어',
  [Z_INDEX.NAV]: '상단 네비게이션',
  [Z_INDEX.BOTTOM_NAV]: '하단 모바일 네비',
  [Z_INDEX.STICKY_CTA]: '고정 CTA 버튼',
  [Z_INDEX.HEADER]: 'Header',
  [Z_INDEX.MENU_OVERLAY]: '햄버거 메뉴 오버레이',
  [Z_INDEX.MENU_PANEL]: '햄버거 메뉴 패널',
  [Z_INDEX.MODAL_BACKDROP]: '모달 배경',
  [Z_INDEX.MODAL]: '모달 콘텐츠',
  [Z_INDEX.LOADING_SPLASH]: '로딩 스플래시',
  [Z_INDEX.CRITICAL]: '중요 알림 (Toast, Alert, Install Prompt)',
};
