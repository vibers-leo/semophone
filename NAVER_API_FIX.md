# 네이버 지도 API 인증 실패 해결 방법

## 현재 증상
- "네이버 지도 Open API 인증이 실패했습니다" 에러
- 지도가 잠깐 보였다가 사라짐

## 해결 방법

### 1단계: 네이버 클라우드 콘솔 확인

1. https://console.ncloud.com/ 접속
2. **AI·Application Service** > **Maps** 선택
3. **semophone** Application 클릭

### 2단계: 서비스 설정 확인

**중요: 다음 항목들을 반드시 확인하세요!**

#### ✅ Service 선택 확인
- [ ] **Web Dynamic Map** 체크 확인
  - 체크되어 있지 않으면 반드시 체크!
  - Static Map, Directions 등은 별도 API (필요 없음)

#### ✅ Web 서비스 URL 확인
다음 URL들이 등록되어 있어야 합니다:
```
http://localhost:3000
http://localhost:*
http://127.0.0.1:3000
```

**주의사항:**
- `https`가 아닌 `http` 사용
- 포트 번호 포함
- 와일드카드 `*` 사용 가능

#### ✅ Client ID 확인
- Client ID: `oed9vqd3fz`
- 이 ID가 **Web Dynamic Map용** 인지 확인
- API Gateway용 Secret Key와 혼동하지 말 것!

### 3단계: 설정 변경 후 저장

1. **Web Dynamic Map** 체크
2. **Web 서비스 URL** 추가
3. **저장** 버튼 클릭 ✅
4. 변경사항이 적용될 때까지 1-2분 대기

### 4단계: 브라우저 캐시 삭제

1. F12 (개발자 도구) 열기
2. Network 탭 선택
3. **Disable cache** 체크
4. 페이지 새로고침 (Ctrl + Shift + R)

### 5단계: 개발 서버 재시작

```bash
# 현재 서버 종료 (Ctrl + C)
# 재시작
cd semophone
npm run dev
```

### 6단계: 브라우저 콘솔 확인

F12 > Console 탭에서 에러 메시지 확인:

```
❌ "Uncaught Error: InvalidCredentials"
   → Client ID가 잘못되었거나 Web Dynamic Map이 활성화되지 않음

❌ "Uncaught Error: RefererNotAllowedMapError"
   → 도메인(localhost:3000)이 허용 목록에 없음

❌ "Uncaught Error: ServiceNotEnabled"
   → Web Dynamic Map 서비스가 선택되지 않음
```

## 가장 흔한 실수

### ❌ 실수 1: Web Dynamic Map 미선택
Application을 등록했지만 **Web Dynamic Map**을 체크하지 않음

**해결:**
- Application 수정
- **Web Dynamic Map** 체크
- 저장

### ❌ 실수 2: URL 미등록
localhost:3000이 Web 서비스 URL에 없음

**해결:**
- Web 서비스 URL에 `http://localhost:3000` 추가
- 저장

### ❌ 실수 3: 저장 안 함
설정을 변경했지만 저장 버튼을 누르지 않음

**해결:**
- 반드시 **저장** 버튼 클릭!

### ❌ 실수 4: API 타입 혼동
- Web Dynamic Map (클라이언트용) ✅
- Maps API Gateway (서버용) ❌

## 빠른 체크리스트

```
[ ] 네이버 클라우드 콘솔에서 Application 확인
[ ] Web Dynamic Map 체크됨
[ ] http://localhost:3000 URL 등록됨
[ ] 저장 버튼 클릭함
[ ] 1-2분 대기함
[ ] 브라우저 캐시 삭제함 (Ctrl + Shift + R)
[ ] 개발 서버 재시작함
[ ] 여전히 안 되면 콘솔 에러 메시지 확인
```

## 여전히 문제가 있다면

브라우저 콘솔(F12 > Console)의 에러 메시지 전체를 복사해서 확인하세요.
