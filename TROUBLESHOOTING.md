# 네이버 Maps API 인증 실패 해결 방법

## 증상
- "네이버 오픈 API 인증이 실패했습니다" 오류
- 지도가 표시되지 않음

## 해결 방법

### 1. Client ID 확인
`.env.local` 파일의 Client ID가 올바른지 확인:

```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=실제_발급받은_Client_ID
```

**주의:** `your_client_id_here`가 아닌 실제 발급받은 ID여야 합니다!

### 2. 네이버 클라우드 콘솔 설정 확인

1. [네이버 클라우드 플랫폼 콘솔](https://console.ncloud.com/) 접속
2. **AI·Application Service** > **Maps** 선택
3. 등록한 Application 클릭
4. 다음 사항 확인:

#### Service 선택 확인
- ✅ **Web Dynamic Map**이 체크되어 있어야 함
- Static Map, Directions 등은 별도 RESTful API (서버 사이드용)

#### Web 서비스 URL 확인
허용된 도메인 목록에 다음이 포함되어 있어야 함:
- `http://localhost:3000` (개발 환경)
- `http://localhost:*` (모든 로컬 포트)

**추가 방법:**
1. Application 수정
2. "Web 서비스 URL" 섹션에서 URL 추가
3. 저장

### 3. 브라우저 캐시 삭제
1. F12 (개발자 도구) 열기
2. Network 탭에서 "Disable cache" 체크
3. 페이지 새로고침 (Ctrl + Shift + R)

### 4. 개발 서버 재시작
환경 변수를 변경한 경우 반드시 재시작:

```bash
# Ctrl + C로 서버 종료
npm run dev
```

### 5. Client ID 타입 확인

**올바른 방법:** Web Dynamic Map Client ID 사용
```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=abc123xyz456
```

**잘못된 방법:** API Gateway Client Secret 사용하지 말 것
- Maps RESTful API는 서버에서 사용하는 별도 API입니다
- Web Dynamic Map과는 다릅니다

### 6. 콘솔 에러 확인

브라우저 개발자 도구(F12)의 Console 탭에서 정확한 오류 메시지 확인:

```
❌ "Authentication failed" → Client ID 오류
❌ "Invalid domain" → 허용된 도메인 설정 오류
❌ "Service not enabled" → Web Dynamic Map 미선택
```

## 정리

### Web Dynamic Map (현재 사용 중)
- **용도**: 웹 페이지에 지도 표시
- **위치**: 클라이언트 사이드 (브라우저)
- **인증**: Client ID만 필요
- **URL**: `https://openapi.map.naver.com/openapi/v3/maps.js`

### Maps RESTful API (서버용)
- **용도**: Static Map, Geocoding, Directions 등
- **위치**: 서버 사이드
- **인증**: Client ID + Client Secret + 헤더
- **URL**: `https://maps.apigw.ntruss.com/...`

## 여전히 문제가 있다면

1. 네이버 클라우드 콘솔 스크린샷 확인
2. `.env.local` 파일 내용 확인 (Client ID는 가리고)
3. 브라우저 콘솔의 정확한 에러 메시지 확인
