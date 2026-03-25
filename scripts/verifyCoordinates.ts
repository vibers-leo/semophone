import fs from 'fs/promises';
import dotenv from 'dotenv';

// .env.local 로드
dotenv.config({ path: '.env.local' });

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_MAP_CLIENT_SECRET!;

interface StoreData {
  storeNo: number;
  oldName: string;
  newName: string;
  address: string;
  naverUrl: string;
  imagePath: string | null;
  imageOriginal: string | null;
}

interface CoordinateResult {
  storeNo: number;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  success: boolean;
  error?: string;
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!NAVER_CLIENT_SECRET) {
    console.error('⚠️  NAVER_MAP_CLIENT_SECRET 환경변수가 설정되지 않았습니다.');
    return null;
  }

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
      },
    });

    const data = await response.json();

    if (data.addresses && data.addresses.length > 0) {
      return {
        lat: parseFloat(data.addresses[0].y),
        lng: parseFloat(data.addresses[0].x),
      };
    }
  } catch (error) {
    console.error(`  API 오류: ${error}`);
  }

  return null;
}

async function verifyCoordinates() {
  console.log('🗺️  좌표 검증 시작...\n');

  if (!NAVER_CLIENT_SECRET) {
    console.error('❌ NAVER_MAP_CLIENT_SECRET 환경변수가 필요합니다.');
    console.error('   네이버 클라우드 콘솔(https://console.ncloud.com)에서:');
    console.error('   1. AI·Application Service > Maps > Application 선택');
    console.error('   2. Client Secret 확인');
    console.error('   3. .env.local 파일에 다음 줄 추가:');
    console.error('      NAVER_MAP_CLIENT_SECRET=your_client_secret_here\n');
    return;
  }

  // 매장 데이터 로드
  const storeDataContent = await fs.readFile('data/storeDataWithImages.json', 'utf-8');
  const storeData: StoreData[] = JSON.parse(storeDataContent);

  const results: CoordinateResult[] = [];

  for (const store of storeData.filter(s => s.address)) {
    console.log(`검증 중: ${store.newName}`);

    // 네이버 지오코딩으로 좌표 가져오기
    const coords = await geocodeAddress(store.address);

    if (!coords) {
      console.log(`⚠️  주소를 찾을 수 없음: ${store.address}\n`);
      results.push({
        storeNo: store.storeNo,
        name: store.newName,
        address: store.address,
        lat: null,
        lng: null,
        success: false,
        error: '좌표를 찾을 수 없음',
      });
      continue;
    }

    results.push({
      storeNo: store.storeNo,
      name: store.newName,
      address: store.address,
      lat: coords.lat,
      lng: coords.lng,
      success: true,
    });

    console.log(`✅ 좌표: ${coords.lat}, ${coords.lng}\n`);

    // API Rate Limit 방지
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // 결과 저장
  await fs.writeFile(
    'data/coordinateVerification.json',
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  // 요약
  const successCount = results.filter(r => r.success).length;
  console.log('\n📊 검증 완료!');
  console.log(`   총 매장: ${results.length}개`);
  console.log(`   성공: ${successCount}개`);
  console.log(`   실패: ${results.length - successCount}개`);

  if (successCount < results.length) {
    console.log('\n⚠️  좌표를 찾을 수 없는 매장:');
    results
      .filter(r => !r.success)
      .forEach(r => {
        console.log(`   ${r.name}: ${r.address}`);
      });
  }
}

verifyCoordinates().catch(console.error);
