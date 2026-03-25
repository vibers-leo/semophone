# 세모폰 — 프로젝트 현황

> 최종 업데이트: 2026-03-24 by [TCC]
> 상태: v6.0 운영 중, 모노레포 통합 완료

## 현재 상태
- [x] Next.js 16 App Router 마이그레이션
- [x] 랜딩 페이지 v6.0 (카카오 옐로우 브랜드)
- [x] 성지찾기 — 네이버 지도 + 위치 기반 매장 검색
- [x] 전국 40개 매장 데이터 (서울/경기/인천/지방)
- [x] Firebase Auth + Firestore 연동
- [x] 관리자 대시보드
- [x] 문의하기 (Resend 이메일)
- [x] AI 상담 (Groq SDK)
- [x] 구독 서비스
- [x] SEO (OpenGraph, sitemap, robots)
- [x] PWA (manifest, 오프라인)
- [x] Google Analytics
- [x] 모노레포 통합 (@vibers/semophone)
- [x] 빌드 통과
- [x] git remote (vibers-leo/semophone)
- [x] dev 확인 (localhost:3001)

## 기술 스택
| 항목 | 내용 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Custom CSS |
| Backend | Firebase (Auth, Firestore, Storage) + Firebase Admin |
| Maps | 네이버 클라우드 Maps API |
| AI | Groq SDK |
| Email | Resend + Nodemailer |
| UI | Radix UI, Framer Motion, Swiper, Recharts |
| Package | @vibers/semophone |

## 라우트 현황
| 라우트 | 상태 | 비고 |
|--------|------|------|
| `/` (랜딩) | 운영 중 | v6.0, 다수 섹션 컴포넌트 |
| `/stores` (성지찾기) | 운영 중 | 네이버 지도 연동 |
| `/about` | 운영 중 | 회사 소개 |
| `/contact` | 운영 중 | Resend 이메일 |
| `/history` | 운영 중 | 연혁 |
| `/careers` | 운영 중 | 채용 |
| `/partnership` | 운영 중 | 제휴/입점 |
| `/subscription` | 운영 중 | AI 상담 포함 |
| `/admin` | 운영 중 | Firebase Auth 보호 |
| `/privacy` | 운영 중 | |
| `/terms` | 운영 중 | |
| `/api/contact` | 운영 중 | POST — 이메일 발송 |
| `/api/subscriptions` | 운영 중 | GET/POST |
| `/api/subscriptions/conversation` | 운영 중 | Groq AI 상담 |

## 인프라 문서 현황
| 문서 | 상태 |
|------|------|
| README.md | 작성 완료 |
| SETUP.md | 작성 완료 |
| FIREBASE_SETUP.md | 작성 완료 |
| EMAIL_SETUP.md | 작성 완료 |
| RESEND_SETUP_GUIDE.md | 작성 완료 |
| NOTIFICATION_SETUP.md | 작성 완료 |
| NAVER_API_FIX.md | 작성 완료 |
| TROUBLESHOOTING.md | 작성 완료 |
| DEPLOYMENT.md | 작성 완료 |
| DEPLOYMENT_GUIDE.md | 작성 완료 |
| EXPO_VS_NEXTJS.md | 작성 완료 |

## 다음 액션
- [ ] 매장 데이터 Firestore 이관 (현재 정적 파일)
- [ ] 매장 상세 페이지 (`/stores/[id]`)
- [ ] 사용자 리뷰 기능
- [ ] 푸시 알림 (PWA)
- [ ] NCP Docker 배포 전환
