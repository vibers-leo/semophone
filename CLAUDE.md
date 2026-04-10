## 전략 문서 (개발 전 반드시 숙지)
- **전략 진단 리포트**: `data/STRATEGY_ANALYSIS.md`
- **PM 공통 지침**: 맥미니 루트 `pm.md`
- **gstack 빌더 철학**: 맥미니 루트 `gstack.md` — Boil the Lake, Search Before Building, 스프린트 프로세스
- **개발 프로세스**: Think → Plan → Build → Review → Test → Ship → Reflect
- **핵심 규칙**: 테스트 동시 작성, 새 패턴 도입 전 검색, 압축률 기반 추정

### 전략 핵심 요약
- 리스크: 🔴 가장 높음 — 사업 모델 검증 전무 (기술만 완성)
- 타겟: 휴대폰 마니아 & 중고폰 구매자 (매우 니치)
- 우선 실행: (1) 사용자 인터뷰 10명, (2) 매장주 인터뷰 5명, (3) 커뮤니티 아웃리치 (2주 내)
- 수익화: 사용자 구독은 어려움 → 매장 B2B 광고 모델 우선 (월 ₩500k/매장)
- 상태: "왜 세모폰인가?" 포지셔닝 재정의 필요 (당근마켓/지름신 대비 차별화)

---

# 세모폰 (Semophone) — 세상의 모든 휴대폰

## 프로젝트 개요
전국 40개 휴대폰 성지 매장을 소개하는 웹앱. 사용자 위치 기반으로 가까운 매장을 찾아주고, 네이버 지도 연동, AI 상담, 이메일 알림 등 복합 기능을 제공한다.

운영 회사: 주식회사 승승장구
도메인: semophone.co.kr / app.semophone.co.kr

---

## 아키텍처

### 기술 스택
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 + 커스텀 CSS (globals.css)
- UI: Radix UI (Dialog, AlertDialog, Tabs), Lucide React, Framer Motion
- Backend: Firebase (Auth, Firestore, Storage) + Firebase Admin
- Maps: 네이버 클라우드 Maps API
- AI: Groq SDK (LLM 상담)
- Email: Resend + Nodemailer
- Analytics: Google Analytics
- Charts: Recharts
- Carousel: Swiper
- PWA 지원 (manifest.json, 오프라인 페이지)

### 외부 서비스 연동
| 서비스 | 용도 | 설정 가이드 |
|--------|------|-------------|
| Firebase | Auth + Firestore + Storage | [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) |
| 네이버 Maps API | 매장 지도 표시 | [SETUP.md](./SETUP.md), [NAVER_API_FIX.md](./NAVER_API_FIX.md) |
| Resend | 이메일 발송 | [RESEND_SETUP_GUIDE.md](./RESEND_SETUP_GUIDE.md) |
| Nodemailer (Gmail SMTP) | 이메일 발송 (레거시) | [EMAIL_SETUP.md](./EMAIL_SETUP.md) |
| Groq AI | AI 상담 챗봇 | groq-sdk 패키지 |
| Google Analytics | 트래픽 분석 | components/analytics/GoogleAnalytics.tsx |

---

## 데이터 흐름

### 매장 데이터
```
data/stores.ts (정적 매장 목록 40개)
  → data/stores_with_landmarks.ts (랜드마크 포함)
  → app/stores/page.tsx (성지찾기 지도/리스트)
  → 네이버 Maps API (지도 렌더링)
  → Geolocation API (사용자 위치 → 가까운 매장 3곳)
```

### 문의 흐름
```
app/contact/page.tsx (문의 폼)
  → POST /api/contact (route.ts)
  → Resend/Nodemailer (이메일 발송)
  → 알림 (NOTIFICATION_SETUP.md 참조)
```

### 구독 흐름
```
app/subscription/page.tsx (구독 관리)
  → POST /api/subscriptions (구독 생성/조회)
  → /api/subscriptions/conversation (AI 상담)
  → lib/subscription/firestore.ts (Firestore 저장)
  → Groq AI (대화형 상담)
```

### 관리자 흐름
```
app/admin/page.tsx (관리자 패널)
  → contexts/AuthContext.tsx (Firebase Auth)
  → Firebase Admin SDK (서버사이드 인증)
  → Firestore (매장/구독/문의 관리)
```

---

## 라우트 구조

### 공개 페이지
| 경로 | 설명 |
|------|------|
| `/` | 랜딩 페이지 (Hero + Stats + Trust + CTA 섹션) |
| `/stores` | 성지찾기 — 네이버 지도 + 매장 리스트 + 위치 기반 |
| `/about` | 회사 소개 |
| `/contact` | 문의하기 (이메일 폼) |
| `/history` | 연혁 |
| `/careers` | 채용 정보 |
| `/partnership` | 제휴/입점 문의 |
| `/subscription` | 구독 서비스 |
| `/privacy` | 개인정보처리방침 |
| `/terms` | 이용약관 |
| `/offline` | 오프라인 대응 (PWA) |

### API 라우트
| 경로 | 메서드 | 설명 |
|------|--------|------|
| `/api/contact` | POST | 문의 이메일 발송 (Resend) |
| `/api/subscriptions` | GET/POST | 구독 CRUD |
| `/api/subscriptions/conversation` | POST | Groq AI 상담 대화 |

### 관리자
| 경로 | 설명 |
|------|------|
| `/admin` | 관리자 대시보드 (Firebase Auth 보호) |

---

## 주요 컴포넌트

### 랜딩 섹션 (components/sections/)
| 컴포넌트 | 설명 |
|----------|------|
| `CinematicHero` / `CompactHero` / `MinimalHero` / `SimplifiedHero` | Hero 배너 변형 |
| `MinimalStats` / `NumbersSpeak` | 숫자 통계 섹션 |
| `StoreNetwork` | 매장 네트워크 시각화 |
| `TrustSection` / `TrustMinimal` / `TrustSignals` | 신뢰 지표 |
| `IconBenefits` / `WhySection` | 혜택/장점 소개 |
| `ProcessTimeline` / `GrowthTimeline` / `Timeline` | 프로세스/연혁 |
| `CustomerExperience` | 고객 후기 |
| `GallerySection` | 매장 갤러리 |
| `FinalCTA` / `MinimalCTA` | 최종 전환 유도 |
| `ApplicationForm` / `ApplicationSection` | 입점 신청 |
| `JobsSection` / `TeamCulture` / `VisionStatement` | 채용/팀 문화 |

### 공통 컴포넌트
| 경로 | 설명 |
|------|------|
| `components/layouts/` | 레이아웃 (Header, Footer, MobileNav 등) |
| `components/ui/` | 공용 UI (버튼, 다이얼로그 등 — Radix 기반) |
| `components/auth/` | 인증 관련 |
| `components/admin/` | 관리자 전용 |
| `components/analytics/` | Google Analytics |

### 주요 라이브러리
| 경로 | 설명 |
|------|------|
| `lib/firebase/config.ts` | Firebase 클라이언트 초기화 |
| `lib/firebase/storage.ts` | Firebase Storage 유틸 |
| `lib/subscription/` | 구독 서비스 로직 (Firestore, AI 대화, 환율, 검색) |
| `lib/constants/zIndex.ts` | Z-Index 중앙 관리 |
| `contexts/AuthContext.tsx` | Firebase Auth 상태 관리 |
| `hooks/` | 커스텀 훅 (useApplications, useBenefits, useJobs, useScrollLock, useSwipe) |
| `data/` | 정적 데이터 (매장 목록, 채용, 연혁) |

---

## Firestore 데이터 구조

```
subscriptions/{id}        # 구독 데이터
conversations/{id}        # AI 상담 대화 로그
contacts/{id}             # 문의 데이터
applications/{id}         # 입점 신청
```

---

## 인프라 가이드 (기존 문서)

| 문서 | 내용 |
|------|------|
| [SETUP.md](./SETUP.md) | 네이버 Maps API 초기 설정 |
| [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) | Firebase 프로젝트 설정 |
| [EMAIL_SETUP.md](./EMAIL_SETUP.md) | Gmail SMTP 이메일 설정 |
| [RESEND_SETUP_GUIDE.md](./RESEND_SETUP_GUIDE.md) | Resend 이메일 설정 |
| [NOTIFICATION_SETUP.md](./NOTIFICATION_SETUP.md) | 알림 발송 설정 |
| [NAVER_API_FIX.md](./NAVER_API_FIX.md) | 네이버 API 인증 실패 해결 |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | 문제 해결 가이드 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel 배포 가이드 |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | app.semophone.co.kr 도메인 배포 |
| [EXPO_VS_NEXTJS.md](./EXPO_VS_NEXTJS.md) | Expo vs Next.js 기술 비교 |
| [세모폰 매장현황.md](./세모폰%20매장현황.md) | 매장 현황 관리 문서 |

---

## SEO 설정

- 메타데이터: `app/layout.tsx`에 OpenGraph, Twitter Card, 네이버 사이트 인증 포함
- `app/robots.ts` — 크롤러 접근 규칙
- `app/sitemap.ts` — 동적 사이트맵 생성
- PWA: manifest.json, apple-touch-icon, theme-color `#F2C811`

---

## 개발 규칙

### 코드 스타일
- Tailwind CSS 유틸리티 클래스 사용 (CSS 변수 병행)
- 한글 우선: 모든 UI 텍스트와 주석은 한국어
- TypeScript strict mode
- 컴포넌트: Radix UI + CVA (class-variance-authority) + clsx/tailwind-merge

### Git 규칙
- 커밋 메시지: 한글 (feat:, fix:, refactor:, chore: 접두사), [TCC] 태그
- `git add .` 사용 금지 — 항상 특정 파일 지정
- remote: vibers-leo/semophone

## 주요 명령어

```bash
bun install                                  # 의존성 설치 (루트에서)
bun run dev --filter=@vibers/semophone       # 개발 서버 (localhost:3001)
bun run build --filter=@vibers/semophone     # 빌드
```

## AI Recipe 이미지 API

이 프로젝트는 **AI Recipe 중앙 이미지 서비스**를 사용합니다.

### 사용 가능한 함수

```typescript
import { searchStockImage, generateAIImage } from '@/lib/ai-recipe-client';
```

### Stock Image 검색
```typescript
const image = await searchStockImage('phone store interior', {
  orientation: 'landscape',
  size: 'medium',
});
// → { url, provider, alt, photographer, ... }
```

### AI 이미지 생성
```typescript
const image = await generateAIImage('modern phone store promotion banner', {
  size: 'large',
  provider: 'auto',
});
// → { url, prompt, provider }
```

### 주의사항
- Server Action이나 API Route에서만 사용 (API 키 보호)
- Rate Limit: 1000회/일 (semophone 프로젝트 전체)
- AI Recipe 서버 실행 필요: http://localhost:3300

### 실전 예제
```typescript
// 매장 갤러리 이미지 검색
const gallery = await searchStockImage('mobile phone shop', {
  orientation: 'landscape'
});

// 프로모션 배너 AI 생성
const banner = await generateAIImage(
  'smartphone promotion banner, vibrant yellow theme, modern design'
);
```

---

## 상위 브랜드
- 회사: 계발자들 (Vibers)
- 모노레포: /Users/juuuno/Desktop/macminim4/dev/nextjs


## 세션로그 기록 (필수)
- 모든 개발 대화의 주요 내용을 `session-logs/` 폴더에 기록할 것
- 파일명: `YYYY-MM-DD_한글제목.md` / 내용: 한글
- 세션 종료 시, 마일스톤 달성 시, **컨텍스트 압축 전**에 반드시 저장
- 상세 포맷은 상위 CLAUDE.md 참조

---

## 파일 스토리지 — NCP Object Storage ⚠️

> **`lib/ncp-storage.ts` 직접 수정 금지. 레거시 파일임.**
> **환경변수 변경**: `NCP_STORAGE_ACCESS_KEY` → `NCP_ACCESS_KEY` / `NCP_STORAGE_SECRET_KEY` → `NCP_SECRET_KEY` / `NCP_STORAGE_BUCKET` → `NCP_BUCKET_NAME=wero-bucket`

- 버킷: `wero-bucket`
- 전체 가이드: `packages/storage/NCP_STORAGE_GUIDE.md`

```ts
// 이력서 업로드 (기존 코드 그대로 사용 가능):
import { uploadResumeToNCP } from '../lib/ncp-storage';

// 새 기능에서는 @vibers/storage 직접 사용:
import { uploadBuffer } from '@vibers/storage/server';
```

## 배포 규칙
- 배포 트리거 후 `gh run watch <run-id>`로 완료까지 대기. "N분 후 됩니다"로 끝내지 말 것.
- 예상 시간을 알려준 경우, 그 시간 후 반드시 다시 확인하고 결과 메시지 전달.
- 성공 시: 배포 완료 확인 + 접속 테스트. 실패 시: 로그 분석 + 원인 + 수정 방안 + 조치사항 안내.
