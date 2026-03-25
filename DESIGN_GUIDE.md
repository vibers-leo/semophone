# 세모폰 디자인 시스템

## 색상 시스템

### 브랜드 컬러 (카카오톡 스타일 황색)

| 토큰 | Tailwind | 값 | 용도 |
|------|----------|------|------|
| `brand-50` | `bg-brand-50` | `#FFFEF5` | 매우 연한 황색 배경 |
| `brand-100` | `bg-brand-100` | `#FFFBE6` | 연한 황색 |
| `brand-200` | `bg-brand-200` | `#FFF7CC` | 중간 황색 |
| `brand` (DEFAULT) | `bg-brand` | `#FEE500` | 메인 브랜드 (카카오톡) |
| `brand-600` | `bg-brand-600` | `#FDD835` | 호버 상태 |
| `brand-700` | `bg-brand-700` | `#E5C100` | 진한 황색 |
| `brand-800` | `bg-brand-800` | `#C7A500` | 매우 진한 황색 |

### 다크 계열

| 토큰 | Tailwind | 값 | 용도 |
|------|----------|------|------|
| `dark` | `bg-dark` | `#1A1A1A` | 메인 다크 (텍스트, 배경) |
| `dark-surface` | `bg-dark-surface` | `#222222` | 다크 카드 배경 |
| `dark-hover` | `bg-dark-hover` | `#2A2A2A` | 다크 호버 |

### 따뜻한 배경

| 토큰 | Tailwind | 값 | 용도 |
|------|----------|------|------|
| `warm` | `bg-warm` | `#FAF7F0` | 따뜻한 베이지 배경 |
| `warm-light` | `bg-warm-light` | `#FFFFFF` | 화이트 |
| `warm-dark` | `bg-warm-dark` | `#F5F2EA` | 진한 베이지 |

### 그레이 스케일

| 토큰 | 값 | 용도 |
|------|------|------|
| `gray-50` | `#FAFAFA` | 초연한 배경 |
| `gray-100` | `#F5F5F5` | 연한 배경 |
| `gray-200` | `#E5E5E5` | 구분선 |
| `gray-300` | `#D4D4D4` | 비활성 테두리 |
| `gray-400` | `#A3A3A3` | 비활성 텍스트 |
| `gray-500` | `#737373` | 보조 텍스트 |
| `gray-600` | `#525252` | 진한 보조 텍스트 |
| `gray-700` | `#404040` | 본문 텍스트 |
| `gray-800` | `#262626` | 강조 텍스트 |
| `gray-900` | `#171717` | 최강조 텍스트 |

### CSS 변수 (globals.css)

```css
:root {
  --brand: #FEE500;
  --brand-dark: #FDD835;
  --brand-light: #FFF8DC;
  --brand-50: #FFFDF0;
  --dark: #1A1A1A;
  --dark-surface: #222222;
  --gray-700: #404040;
  --gray-500: #737373;
  --gray-400: #A3A3A3;
  --gray-300: #D4D4D4;
  --gray-200: #E5E5E5;
  --gray-100: #F5F5F5;
  --bg-warm: #FAF7F0;
}
```

---

## 타이포그래피

### 폰트
```css
font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, 'Noto Sans KR', sans-serif;
```
CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

### Display (Hero)

| 토큰 | 크기 | 줄간격 | 자간 | 두께 |
|------|------|--------|------|------|
| `display-2xl` | 72px (4.5rem) | 1.1 | -0.02em | 800 |
| `display-xl` | 60px (3.75rem) | 1.1 | -0.02em | 800 |
| `display-lg` | 48px (3rem) | 1.2 | -0.01em | 700 |

### Heading

| 토큰 | 크기 | 줄간격 | 자간 | 두께 |
|------|------|--------|------|------|
| `heading-xl` | 36px (2.25rem) | 1.25 | -0.01em | 700 |
| `heading-lg` | 30px (1.875rem) | 1.3 | -0.01em | 700 |
| `heading-md` | 24px (1.5rem) | 1.35 | 0 | 600 |
| `heading-sm` | 20px (1.25rem) | 1.4 | 0 | 600 |

### Body

| 토큰 | 크기 | 줄간격 | 두께 |
|------|------|--------|------|
| `body-xl` | 18px (1.125rem) | 1.6 | 400 |
| `body-lg` | 16px (1rem) | 1.6 | 400 |
| `body-md` | 14px (0.875rem) | 1.5 | 400 |
| `body-sm` | 12px (0.75rem) | 1.5 | 400 |

### CSS 기본 타이포그래피
```css
body { color: #1A1A1A; line-height: 1.6; }
.section-title { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.05em; }
.section-desc { font-size: 15px; color: var(--gray-500); line-height: 1.8; }
```

---

## 레이아웃

### 컨테이너 최대 너비

| 토큰 | 값 | 용도 |
|------|------|------|
| `container-sm` | 480px | 폼, 좁은 콘텐츠 |
| `container-md` | 720px | 중간 콘텐츠 |
| `container-lg` | 960px | 넓은 콘텐츠 |
| `container-xl` | 1200px | 메인 컨테이너 |

### 헤더
```css
모바일: height 56px;
데스크톱 (1024px+): height 72px;
```

### 섹션 여백
```css
모바일: padding 80px 20px;
데스크톱: padding 100px 24px;
```

### Safe Area (iOS 노치 대응)
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

---

## 간격 시스템 (8의 배수)

| Tailwind | 값 | 용도 |
|----------|------|------|
| `p-4.5` | 18px | 중간 패딩 |
| `p-13` | 52px | — |
| `p-15` | 60px | — |
| `p-18` | 72px | 대형 섹션 패딩 |
| `p-22` | 88px | — |
| `p-26` | 104px | — |
| `p-30` | 120px | — |
| `p-34` | 136px | — |

---

## 라운드 시스템

| 토큰 | 값 | 용도 |
|------|------|------|
| `rounded-sm` | 4px | 작은 요소 |
| `rounded` (DEFAULT) | 8px | 기본 |
| `rounded-md` | 12px | 카드 |
| `rounded-lg` | 16px | 큰 카드 |
| `rounded-xl` | 20px | 모달 |
| `rounded-2xl` | 24px | Hero 이미지 |
| `rounded-3xl` | 32px | 대형 요소 |

---

## 그림자 시스템

| 토큰 | 값 | 용도 |
|------|------|------|
| `shadow-soft` | `0 2px 8px rgba(0,0,0,0.08)` | 미세한 입체감 |
| `shadow-medium` | `0 4px 12px rgba(0,0,0,0.12)` | 카드 |
| `shadow-strong` | `0 8px 24px rgba(0,0,0,0.16)` | 모달/팝업 |
| `shadow-brand` | `0 6px 24px rgba(254,229,0,0.4)` | 브랜드 CTA 버튼 |
| `shadow-brand-hover` | `0 16px 40px rgba(254,229,0,0.6)` | CTA 호버 |
| `shadow-brand-card` | `0 12px 32px rgba(254,229,0,0.20), 0 8px 24px rgba(0,0,0,0.08)` | 브랜드 카드 |

---

## 버튼 스타일

### Primary (브랜드)
```css
.btn-primary {
  background: var(--brand);        /* #FEE500 */
  color: var(--dark);              /* #1A1A1A */
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;          /* 12px */
}
/* hover: background #FDD835 */
/* active: scale(0.95) */
```

### Secondary
```css
.btn-secondary {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
}
```

### Sticky CTA (모바일 하단 고정)
```css
.sticky-cta-btn {
  background: var(--brand);
  color: var(--dark);
  border-radius: 14px;
  font-size: 17px;
  font-weight: 800;
  box-shadow: 0 4px 16px rgba(242,200,17,0.3);
}
```

---

## 애니메이션

| 토큰 | 지속시간 | 설명 |
|------|----------|------|
| `animate-fade-in` | 0.6s | 페이드 인 |
| `animate-slide-up` | 0.5s | 아래에서 위로 슬라이드 |
| `animate-slide-down` | 0.5s | 위에서 아래로 슬라이드 |
| `animate-scale-in` | 0.3s | 확대 등장 |
| `animate-spin-slow` | 3s | 느린 회전 (무한) |

### CSS 전환
```css
.fade-in { opacity: 0; transform: translateY(24px); transition: 0.7s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }
.touch-feedback:active { transform: scale(0.96); }  /* 모바일 앱 느낌 */
```

---

## 반응형 브레이크포인트

```css
모바일: 기본 (< 768px)
  - header 56px, hero padding 100px 20px
  - sticky-cta bottom: 64px (MobileNav 위)

태블릿: @media (min-width: 768px)

데스크톱: @media (min-width: 1024px)
  - header 72px, hero padding 120px 24px
  - 햄버거 숨김, nav-desktop 표시
  - hero-title 52px, stats-big-num 64px
```

---

## Z-Index 계층 (lib/constants/zIndex.ts)

| 토큰 | 용도 |
|------|------|
| `z-base` | 기본 요소 |
| `z-nav` | 네비게이션 |
| `z-bottom-nav` | 모바일 하단 네비 |
| `z-sticky-cta` | 고정 CTA 버튼 |
| `z-header` | 상단 헤더 |
| `z-menu-overlay` | 메뉴 오버레이 |
| `z-menu-panel` | 메뉴 패널 |
| `z-modal-backdrop` | 모달 배경 |
| `z-modal` | 모달 |
| `z-splash` | 로딩 스플래시 |
| `z-critical` | 최우선 |

---

## 체크리스트

모든 페이지/컴포넌트에서 준수:

- [ ] 브랜드 컬러: `bg-brand` (#FEE500), 텍스트 `text-dark` (#1A1A1A)
- [ ] 폰트: Pretendard Variable
- [ ] 컨테이너: `max-w-container-xl` (1200px)
- [ ] 다크 섹션: `bg-dark` (#1A1A1A) + `text-white`
- [ ] 버튼: `btn-primary` (브랜드 황색 + 다크 텍스트)
- [ ] 모바일 터치: `touch-feedback` 클래스 적용
- [ ] Safe Area: iOS 노치/홈바 대응
- [ ] Z-Index: `lib/constants/zIndex.ts` 사용 (하드코딩 금지)
- [ ] 애니메이션: `fade-in` 클래스로 스크롤 등장
