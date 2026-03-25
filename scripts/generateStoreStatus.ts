import fs from 'fs/promises';

interface StoreData {
  storeNo: number;
  oldName: string;
  newName: string;
  address: string;
  naverUrl: string;
  imagePath: string | null;
  imageOriginal: string | null;
}

interface ImageMapping {
  original: string;
  optimized: string;
  originalSize: number;
  optimizedSize: number;
  storeName: string;
}

async function generateStoreStatus() {
  console.log('📄 세모폰 매장현황.md 생성 시작...\n');

  const mapping: StoreData[] = JSON.parse(await fs.readFile('data/storeDataWithImages.json', 'utf-8'));
  const imageMapping: ImageMapping[] = JSON.parse(await fs.readFile('data/storeImageMapping.json', 'utf-8'));

  // 이미지 통계
  const totalOriginalSize = imageMapping.reduce((sum, img) => sum + img.originalSize, 0);
  const totalOptimizedSize = imageMapping.reduce((sum, img) => sum + img.optimizedSize, 0);
  const reductionRate = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

  const md = `# 세모폰 매장 현황 관리

> 최종 업데이트: ${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR')}

## 프로젝트 개요

상승모바일과 승승장구텔레콤이 "세모폰"으로 브랜드 통합하면서, 매장 사진 및 정보를 체계적으로 관리하기 위한 문서입니다.

### 작업 내용

1. **이미지 최적화**: ${imageMapping.length}개 사진, ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB (${reductionRate}% 감소)
2. **이미지-매장 매핑**: 파일명 기반 자동 매칭
3. **stores.ts 업데이트**: 이미지 경로, 네이버 플레이스 링크 추가
4. **좌표 검증**: 네이버 지오코딩 API (보류 - CLIENT_SECRET 필요)

---

## 매장 정보 (총 ${mapping.filter(s => s.newName).length}개)

| 연번 | 이전명칭 | 새로운명칭 | 주소 | 네이버플레이스 | 이미지경로 |
|------|---------|-----------|------|-------------|----------|
${mapping.filter(s => s.newName).map((store) => {
  const naverLink = store.naverUrl ? `[🔗 링크](${store.naverUrl})` : '-';
  const imagePath = store.imagePath ? `\`${store.imagePath}\`` : '-';
  return `| ${store.storeNo} | ${store.oldName} | ${store.newName} | ${store.address} | ${naverLink} | ${imagePath} |`;
}).join('\n')}

---

## 이미지 최적화 상세

### 통계
- **원본 크기**: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB
- **최적화 크기**: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB
- **감소율**: ${reductionRate}%
- **처리 파일 수**: ${imageMapping.length}개
- **최적화 설정**: 1200x800px, JPEG 85% quality

### 파일별 상세

| 원본 파일명 | 매장명 | 최적화 파일명 | 원본 크기 | 최적화 크기 | 감소율 |
|------------|-------|-------------|---------|-----------|--------|
${imageMapping.map((img) => {
  const reduction = ((1 - img.optimizedSize / img.originalSize) * 100).toFixed(1);
  return `| ${img.original} | ${img.storeName} | \`${img.optimized}\` | ${(img.originalSize / 1024).toFixed(0)}KB | ${(img.optimizedSize / 1024).toFixed(0)}KB | ${reduction}% |`;
}).join('\n')}

---

## 매칭되지 않은 이미지

다음 이미지들은 CSV 데이터에 매칭되는 매장이 없어 stores.ts에 포함되지 않았습니다:

${imageMapping.filter(img =>
  !mapping.some(s => s.imageOriginal === img.original)
).map(img => `- \`${img.original}\` (매장명: ${img.storeName})`).join('\n') || '(없음)'}

---

## 좌표 검증 (보류)

좌표 검증을 실행하려면 네이버 클라우드 콘솔에서 CLIENT_SECRET을 확인하여 \`.env.local\`에 추가해주세요:

\`\`\`bash
NAVER_MAP_CLIENT_SECRET=your_client_secret_here
\`\`\`

그 후 다음 명령어를 실행:

\`\`\`bash
npx ts-node scripts/verifyCoordinates.ts
\`\`\`

---

## 기술 스택

- **이미지 최적화**: Sharp (Node.js)
- **CSV 파싱**: Papa.parse
- **좌표 검증**: 네이버 Maps Geocoding API (보류)
- **저장 위치**: 로컬 \`public/images/stores/\`

---

## 파일 구조

\`\`\`
semophone/
├── public/images/
│   ├── stores/          # 최적화된 매장 사진 (001.jpg ~ 045.jpg)
│   └── 세모폰 매장사진/ # 원본 사진 (백업용, 배포 시 제외)
├── data/
│   ├── stores.ts                    # 매장 데이터 (이미지 경로, 네이버 링크 업데이트됨)
│   ├── storeImageMapping.json       # 이미지 최적화 매핑
│   └── storeDataWithImages.json     # CSV + 이미지 통합 데이터
└── scripts/
    ├── optimizeStoreImages.ts       # 이미지 최적화
    ├── mapStoresToImages.ts         # 이미지-매장 매핑
    ├── verifyCoordinates.ts         # 좌표 검증 (보류)
    ├── updateStoresData.ts          # stores.ts 업데이트
    └── generateStoreStatus.ts       # 이 문서 생성
\`\`\`

---

## 업데이트 로그

- **${new Date().toLocaleDateString('ko-KR')}**: 초기 파일 생성
  - ${imageMapping.length}개 사진 최적화 완료 (${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB)
  - ${mapping.filter(s => s.imagePath).length}개 매장 이미지 매칭 완료
  - stores.ts 업데이트 완료
`;

  await fs.writeFile('세모폰 매장현황.md', md, 'utf-8');
  console.log('✅ 세모폰 매장현황.md 생성 완료!\n');
  console.log('📄 파일 위치: semophone/세모폰 매장현황.md');
}

generateStoreStatus().catch(console.error);
