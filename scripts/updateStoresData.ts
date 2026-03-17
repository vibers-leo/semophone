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

interface ExistingStore {
  id: number;
  name: string;
  address: string;
  phone: string;
  region: string;
  lat: number;
  lng: number;
  images?: string[];
  link?: string;
}

async function updateStoresData() {
  console.log('📝 stores.ts 업데이트 시작...\n');

  // 매장 데이터 읽기
  const mappingContent = await fs.readFile('data/storeDataWithImages.json', 'utf-8');
  const allMapping: StoreData[] = JSON.parse(mappingContent);

  // ⚠️ 빈 데이터 필터링 (TypeScript 에러 방지)
  const mapping = allMapping.filter(store =>
    store.storeNo &&
    store.newName &&
    store.address
  );

  const filteredCount = allMapping.length - mapping.length;
  if (filteredCount > 0) {
    console.log(`⚠️  빈 데이터 ${filteredCount}개 필터링됨`);
  }

  // 기존 stores.ts 읽기
  const storesContent = await fs.readFile('data/stores.ts', 'utf-8');

  // 기존 매장 데이터 파싱 (간단한 정규식으로 추출)
  const existingStores: Map<number, ExistingStore> = new Map();
  const storeMatches = storesContent.matchAll(/\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*address:\s*"([^"]+)",\s*phone:\s*"([^"]+)",\s*region:\s*"([^"]+)",\s*lat:\s*([\d.]+),\s*lng:\s*([\d.]+)/g);

  for (const match of storeMatches) {
    const id = parseInt(match[1]);
    existingStores.set(id, {
      id,
      name: match[2],
      address: match[3],
      phone: match[4],
      region: match[5],
      lat: parseFloat(match[6]),
      lng: parseFloat(match[7]),
    });
  }

  // stores.ts 생성
  const storesCode = `export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  region: string;
  lat: number;
  lng: number;
  images?: string[];
  link?: string;
}

// 실제 휴대폰성지 세모폰 매장 데이터
// 최종 업데이트: ${new Date().toISOString().split('T')[0]}
export const stores: Store[] = [
${mapping.map((store) => {
  const existing = existingStores.get(store.storeNo);

  // 기존 매장이 있으면 좌표 유지, 없으면 임시 좌표
  const lat = existing?.lat || 37.5;
  const lng = existing?.lng || 127.0;
  const phone = existing?.phone || '031-1234-5678';
  const region = store.address.includes('서울') ? '서울' : store.address.includes('인천') ? '인천' : '경기';

  return `  {
    id: ${store.storeNo},
    name: "${store.newName}",
    address: "${store.address}",
    phone: "${phone}",
    region: "${region}",
    lat: ${lat},
    lng: ${lng},${store.imagePath ? `\n    images: ["${store.imagePath}"],` : ''}${store.naverUrl ? `\n    link: "${store.naverUrl}",` : ''}
  }`;
}).join(',\n')}
];
`;

  // 백업 생성
  const backupPath = `data/stores.ts.backup.${Date.now()}`;
  await fs.writeFile(backupPath, storesContent, 'utf-8');
  console.log(`📦 기존 stores.ts 백업: ${backupPath}`);

  // 새 stores.ts 저장
  await fs.writeFile('data/stores.ts', storesCode, 'utf-8');
  console.log('✅ stores.ts 업데이트 완료!');

  // 통계
  const withImages = mapping.filter(s => s.imagePath).length;
  const withLinks = mapping.filter(s => s.naverUrl).length;

  console.log('\n📊 업데이트 통계:');
  console.log(`   총 매장: ${mapping.length}개`);
  console.log(`   이미지 있음: ${withImages}개`);
  console.log(`   네이버 플레이스 링크 있음: ${withLinks}개`);
}

updateStoresData().catch(console.error);
