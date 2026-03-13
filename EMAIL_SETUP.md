# 이메일 발송 설정 가이드

문의 폼에서 이메일을 발송하려면 Gmail SMTP를 사용한 환경변수 설정이 필요합니다.

## 1. Gmail 앱 비밀번호 생성

### 1-1. Google 계정 설정
1. [Google 계정](https://myaccount.google.com/) 접속
2. 보안 > 2단계 인증 활성화 (필수)
3. 보안 > 앱 비밀번호 생성

### 1-2. 앱 비밀번호 발급
1. 앱 선택: "메일"
2. 기기 선택: "기타(맞춤 이름)" → "세모폰 웹사이트"
3. 생성된 16자리 비밀번호 복사 (예: `abcd efgh ijkl mnop`)

## 2. 환경변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# Gmail SMTP 설정
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop

# 문의 수신 이메일 (쉼표로 구분하여 여러 개 가능)
CONTACT_EMAIL_RECIPIENTS=didtmdguq632@naver.com,juuuno@naver.com,juuuno1116@gmail.com
```

### 환경변수 설명
- `EMAIL_USER`: 이메일 발송에 사용할 Gmail 주소
- `EMAIL_APP_PASSWORD`: Gmail 앱 비밀번호 (공백 제거)
- `CONTACT_EMAIL_RECIPIENTS`: 문의 접수 시 알림받을 이메일 주소들

## 3. Vercel 배포 시 설정

Vercel 대시보드에서 환경변수 설정:

1. 프로젝트 Settings > Environment Variables
2. 위의 3개 환경변수 추가
3. Production, Preview, Development 모두 체크
4. Redeploy

## 4. 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
# 메인 페이지 하단의 문의 폼에서 테스트 문의 제출
```

## 5. 카카오 알림톡 추가 (선택사항)

카카오 알림톡 기능은 현재 TODO로 남겨두었습니다.
필요 시 다음 단계로 추가할 수 있습니다:

1. 카카오 비즈니스 계정 생성
2. 알림톡 템플릿 등록
3. API 키 발급
4. `/api/contact/route.ts`에서 주석 처리된 카카오 알림 코드 구현

## 트러블슈팅

### "Email configuration needed" 경고
- `.env.local` 파일이 있는지 확인
- 환경변수가 올바르게 설정되었는지 확인
- 개발 서버를 재시작

### "Failed to send email" 오류
- Gmail 앱 비밀번호가 정확한지 확인 (공백 제거)
- Gmail 계정의 2단계 인증이 활성화되어 있는지 확인
- 방화벽이나 보안 프로그램이 SMTP를 차단하지 않는지 확인

### 이메일이 스팸으로 분류됨
- Gmail 설정에서 해당 발신자를 안전한 발신자로 추가
- SPF, DKIM 레코드 설정 (고급)

## 보안 주의사항

⚠️ **절대로 `.env.local` 파일을 Git에 커밋하지 마세요!**

`.gitignore`에 이미 포함되어 있지만, 실수로 커밋하지 않도록 주의하세요.

```bash
# .gitignore에 포함되어야 할 항목
.env
.env.local
.env.*.local
```
