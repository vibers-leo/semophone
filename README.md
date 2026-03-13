# 세모폰 - 세상의 모든 휴대폰

**사람과 사람이 만나 세상의 모든 휴대폰의 가격을 내리다**

## 프로젝트 소개

세모폰은 전국 40개 휴대폰 매장을 소개하는 웹앱입니다. 사용자의 위치를 기반으로 가장 가까운 매장 3곳을 찾아주는 기능을 제공합니다.

## 주요 기능

### 1. 랜딩페이지
- 세모폰 브랜드 소개
- 주요 특징 3가지 (전국 40개 매장, 최저가 보장, 신뢰할 수 있는 서비스)
- 시원한 디자인 (follown.co.kr 참고)
- 보라색 계열 브랜드 컬러 (#635dc4)

### 2. 성지찾기 페이지
- **네이버 지도 통합** - 매장 위치를 지도에 시각적으로 표시
- 전국 40개 매장 리스트 표시
- 지도/리스트 뷰 전환 기능
- 지역별 필터링 (서울, 경기, 인천, 대전, 대구, 부산, 광주, 울산, 충남, 전북, 경남)
- 내 위치 기반 가까운 매장 찾기
- 수도권 사용자의 경우 가장 가까운 성지 3개 우선 표시
- 각 매장까지의 거리 표시
- **네이버 플레이스 연동** - 길찾기 및 상세 정보 확인

### 3. 반응형 디자인
- PC와 모바일 모두 최적화
- 모바일: 하단 고정 네비게이션 (홈, 성지찾기)
- PC: 상단 헤더 네비게이션

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: 네이버 클라우드 Maps API
- **Location**: Geolocation API

## 프로젝트 구조

```
semophone/
├── app/
│   ├── layout.tsx          # 루트 레이아웃, 메타데이터
│   ├── page.tsx            # 랜딩페이지
│   ├── stores/
│   │   └── page.tsx        # 성지찾기 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── Navigation.tsx      # 상단 네비게이션 (데스크톱)
│   ├── MobileNav.tsx       # 하단 네비게이션 (모바일)
│   └── NaverMap.tsx        # 네이버 지도 컴포넌트
├── data/
│   └── stores.ts           # 40개 매장 데이터
├── lib/
│   └── distance.ts         # 거리 계산 유틸리티
└── types/
    └── naver-maps.d.ts     # 네이버 Maps API 타입 정의
```

## 실행 방법

### 1. 환경 변수 설정

`.env.local` 파일을 생성하고 네이버 클라우드 Maps API Client ID를 설정하세요:

```bash
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_client_id_here
```

**네이버 클라우드 Maps API 키 발급 방법:**
1. [네이버 클라우드 플랫폼](https://www.ncloud.com/) 접속
2. 콘솔 > AI·Application Service > Maps
3. 애플리케이션 등록
4. Web Dynamic Map 선택
5. Client ID 복사하여 `.env.local`에 설정

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 디자인 참고

- **PC 랜딩페이지**: [follown.co.kr](https://follown.co.kr/) - 시원한 디자인, 큰 폰트, 명확한 섹션 분리
- **PC 스타일**: [옆커폰](https://www.yeopkerphone.com/) - 보라색 계열 색상, 깔끔한 레이아웃
- **모바일**: [옆커폰 앱](https://ykapp.kr/index.php?device=mobile) - 하단 네비게이션, 둥근 모서리 디자인

## 주요 기능 상세

### 위치 기반 매장 찾기

1. 사용자가 "내 위치 찾기" 버튼 클릭
2. 브라우저의 Geolocation API를 통해 현재 위치 획득
3. Haversine 공식을 사용하여 모든 매장까지의 거리 계산
4. 수도권(서울, 경기, 인천) 사용자의 경우:
   - 수도권 매장 중 가장 가까운 3곳 표시
5. 비수도권 사용자의 경우:
   - 전체 매장 중 가장 가까운 3곳 표시
6. 매장 리스트를 거리순으로 정렬하여 표시

### 매장 데이터

- 총 40개 매장
- 각 매장 정보:
  - 이름
  - 주소
  - 전화번호
  - 지역
  - 위도/경도

### 네이버 지도 통합

1. **지도 뷰**:
   - 모든 매장을 지도에 마커로 표시
   - 사용자 위치를 파란색 마커로 표시
   - 지역 필터링 시 해당 지역 매장만 표시

2. **마커 클릭**:
   - 매장 정보창 표시 (이름, 주소, 전화번호)
   - 전화하기 버튼
   - 네이버 지도 길찾기 버튼

3. **네이버 플레이스 연동**:
   - 각 매장 카드에서 네이버 지도로 바로 이동
   - 네이버 앱이 설치된 경우 앱으로 자동 연결
   - 상세 정보, 리뷰, 사진 등 확인 가능

## 브랜드 컬러

- Primary: `#635dc4` (보라색)
- Primary Hover: `#524db3`
- Secondary: `#f6f6f6` (밝은 회색)
- Text Gray: `#666666`

## 라이선스

MIT
