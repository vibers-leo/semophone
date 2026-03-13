# 세모폰 설정 가이드

## 네이버 클라우드 Maps API 설정

### 1. 네이버 클라우드 플랫폼 가입

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 접속
2. 회원가입 또는 로그인
3. 콘솔로 이동

### 2. Maps API 애플리케이션 등록

1. 콘솔 메뉴에서 **AI·Application Service** > **Maps** 선택
2. **Application 등록** 버튼 클릭
3. 애플리케이션 정보 입력:
   - Application 이름: `세모폰` (또는 원하는 이름)
   - Service 선택: **Web Dynamic Map** 체크
   - Web 서비스 URL:
     - 개발: `http://localhost:3000`
     - 프로덕션: `https://yourdomain.com` (실제 도메인으로 변경)

4. **등록** 버튼 클릭

### 3. Client ID 복사

1. 등록된 애플리케이션 목록에서 방금 만든 애플리케이션 확인
2. **인증 정보** 탭에서 **Client ID** 복사

### 4. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 입력:

```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=복사한_Client_ID
```

예시:
```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=abc123def456
```

### 5. 개발 서버 재시작

환경 변수를 설정한 후 개발 서버를 재시작:

```bash
# 기존 서버 종료 (Ctrl + C)
npm run dev
```

## 문제 해결

### 지도가 표시되지 않는 경우

1. **Client ID 확인**: `.env.local` 파일의 Client ID가 정확한지 확인
2. **URL 허용 목록**: 네이버 클라우드 콘솔에서 현재 URL이 허용 목록에 있는지 확인
3. **브라우저 콘솔**: 개발자 도구(F12)에서 오류 메시지 확인

### CORS 오류가 발생하는 경우

네이버 클라우드 콘솔에서 애플리케이션 설정의 Web 서비스 URL에 현재 도메인이 등록되어 있는지 확인

### 위치 권한이 작동하지 않는 경우

1. HTTPS 환경에서만 위치 권한이 정상 작동합니다
2. 로컬 개발 환경(`localhost`)에서는 HTTP도 허용됩니다
3. 브라우저 설정에서 위치 권한이 차단되어 있는지 확인

## API 사용량 및 비용

- 네이버 클라우드 Maps API는 일정량까지 무료로 사용 가능
- 무료 사용량: 월 100만 건의 API 호출
- 자세한 요금제는 [네이버 클라우드 요금 안내](https://www.ncloud.com/product/applicationService/maps) 참고

## 프로덕션 배포 시 주의사항

1. `.env.local` 파일은 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
2. 프로덕션 환경 변수는 호스팅 플랫폼(Vercel, Netlify 등)의 환경 변수 설정에서 추가
3. 네이버 클라우드 콘솔에서 프로덕션 도메인을 Web 서비스 URL에 추가
