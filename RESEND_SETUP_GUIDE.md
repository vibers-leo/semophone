# Resend 이메일 설정 가이드

## Resend란?
- Next.js/Vercel 환경에 최적화된 이메일 발송 서비스
- Gmail SMTP보다 안정적이고 설정이 간단함
- 무료 플랜: 월 3,000통까지 무료

## 설정 방법

### 1. Resend 계정 생성
1. https://resend.com 접속
2. "Sign Up" 클릭하여 계정 생성 (GitHub 계정으로 로그인 가능)

### 2. API 키 발급
1. Resend 대시보드 로그인
2. 좌측 메뉴에서 "API Keys" 클릭
3. "Create API Key" 버튼 클릭
4. Name: `semophone-production` 입력
5. Permission: "Sending access" 선택
6. 생성된 API 키 복사 (re_xxxxxxxxxx 형식)

### 3. 도메인 인증 (선택사항, 권장)
**기본값 사용 (권장 - 빠름):**
- 아무 설정 없이 `onboarding@resend.dev`를 발신자로 사용
- 장점: 즉시 사용 가능
- 단점: 발신자가 semophone.co.kr이 아님

**자체 도메인 사용 (프로페셔널):**
1. Resend 대시보드에서 "Domains" 클릭
2. "Add Domain" 클릭
3. 도메인 입력: `semophone.co.kr`
4. DNS 설정 화면에서 제공하는 레코드를 도메인 관리 페이지에 추가:
   - TXT 레코드 (인증용)
   - MX 레코드
   - CNAME 레코드 (DKIM)
5. "Verify Domain" 클릭 (최대 48시간 소요, 보통 5분 내 완료)

### 4. Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수 추가:

#### 필수 환경변수
```
RESEND_API_KEY=re_xxxxxxxxxx (2단계에서 복사한 API 키)
```

#### 선택 환경변수
```
# 도메인 인증 완료 시
RESEND_FROM_EMAIL=noreply@semophone.co.kr

# 도메인 인증 안 했으면 (기본값 사용)
RESEND_FROM_EMAIL=onboarding@resend.dev
```

#### 기존 이메일 관련 환경변수 (제거 가능)
~~EMAIL_USER~~ (더 이상 사용 안 함)
~~EMAIL_APP_PASSWORD~~ (더 이상 사용 안 함)

### 5. 환경변수 적용
1. Vercel 대시보드 → Settings → Environment Variables
2. `RESEND_API_KEY` 추가:
   - Name: `RESEND_API_KEY`
   - Value: `re_xxxxxxxxxx`
   - Environments: Production, Preview, Development 모두 체크
3. Save 클릭
4. **Redeploy 필수**: Deployments 탭에서 최신 배포를 "Redeploy" 클릭

### 6. 테스트
1. https://semophone.co.kr 접속
2. Footer의 "문의하기" 클릭
3. 테스트 문의 작성 후 제출
4. Vercel 로그 확인: `✅ Contact notification email sent successfully via Resend`
5. 수신자 이메일함 확인 (스팸함도 확인)

## 환경변수 전체 목록 (Resend 기준)

```bash
# Resend 이메일 (필수)
RESEND_API_KEY=re_xxxxxxxxxx
RESEND_FROM_EMAIL=noreply@semophone.co.kr (또는 onboarding@resend.dev)

# 이메일 수신자 (선택, 기본값: juuuno1116@gmail.com)
CONTACT_EMAIL_RECIPIENTS=juuuno1116@gmail.com,admin@semophone.co.kr

# SMS 발송 (뿌리오)
PPURIO_ACCOUNT=designdlab
PPURIO_API_KEY=your_ppurio_api_key
PPURIO_SENDER_NUMBER=05071489XXXX
CONTACT_SMS_RECIPIENTS=010XXXXXXXX,010YYYYYYYY
```

## 문제 해결

### 이메일이 안 오는 경우
1. Vercel 로그 확인
   - Functions 탭에서 `/api/contact` 로그 확인
   - 에러 메시지 확인

2. Resend 대시보드 확인
   - Logs 탭에서 발송 기록 확인
   - Bounce/Rejected 상태 확인

3. 스팸함 확인
   - 첫 발송 시 스팸으로 분류될 수 있음
   - "정크메일 아님" 처리

### API 키 에러
```
Error: Invalid API key
```
→ RESEND_API_KEY 값이 `re_`로 시작하는지 확인
→ Vercel에서 Redeploy 했는지 확인

### 도메인 인증 실패
```
Error: Domain not verified
```
→ Resend 대시보드에서 도메인 인증 상태 확인
→ DNS 레코드가 올바르게 추가되었는지 확인
→ 인증 완료 전까지는 `onboarding@resend.dev` 사용

## Resend vs Gmail SMTP 비교

| 항목 | Resend | Gmail SMTP |
|------|--------|------------|
| Vercel 호환성 | ✅ 완벽 지원 | ⚠️ 불안정 |
| 설정 난이도 | ✅ 쉬움 | ❌ 어려움 (앱 비밀번호) |
| 발송 속도 | ✅ 빠름 (0.5초) | ⚠️ 느림 (2-3초) |
| 발송 제한 | 3,000통/월 (무료) | 500통/일 |
| 신뢰도 | ✅ 높음 | ⚠️ 스팸 처리 위험 |
| 모니터링 | ✅ 대시보드 제공 | ❌ 없음 |

## 추가 기능 (선택사항)

### 이메일 템플릿 관리
Resend는 React 컴포넌트로 이메일 템플릿을 관리할 수 있습니다:
- `@react-email/components` 사용
- 재사용 가능한 템플릿 컴포넌트 작성
- 미리보기 기능 제공

### 발송 분석
Resend 대시보드에서 제공:
- 발송 성공률
- 열람률 (Open Rate)
- 클릭률 (Click Rate)
- Bounce/Rejected 분석

---

**참고 문서:**
- Resend 공식 문서: https://resend.com/docs
- Next.js 통합 가이드: https://resend.com/docs/send-with-nextjs
