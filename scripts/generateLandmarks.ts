import fs from 'fs';
import path from 'path';

// 매장 이름에서 랜드마크 자동 생성
function generateLandmarkFromName(storeName: string, address: string): string {
  const landmarks: string[] = [];

  // 지하철역 추출
  const stationMatch = storeName.match(/([가-힣]+역|[가-힣]+선)/);
  if (stationMatch) {
    const station = stationMatch[0];
    if (station.includes('역')) {
      landmarks.push(`${station} 인근`);
    }
  }

  // 주요 장소명 추출
  const placeKeywords = ['시청', '대학교', '학원가', '시장', '프라자', 'CGV', '로데오', '미리내'];
  for (const keyword of placeKeywords) {
    if (storeName.includes(keyword)) {
      landmarks.push(`${keyword} 근처`);
      break;
    }
  }

  // 구/동 정보 (주소에서)
  const districtMatch = address.match(/([가-힣]+구)\s+([가-힣]+동)/);
  if (districtMatch) {
    const [, gu, dong] = districtMatch;
    if (!landmarks.length) {
      landmarks.push(`${gu} ${dong}`);
    }
  }

  // 기본값
  if (landmarks.length === 0) {
    landmarks.push('매장 상세 정보 참조');
  }

  return landmarks.join(' / ');
}

async function main() {
  console.log('🚀 랜드마크 자동 생성 시작\n');

  // stores.ts 읽기
  const storesPath = path.join(process.cwd(), 'data', 'stores.ts');
  const content = fs.readFileSync(storesPath, 'utf-8');

  // 정규식으로 매장 정보 추출
  const storePattern = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*address:\s*"([^"]+)"/g;
  const stores: Array<{ id: number; name: string; address: string }> = [];

  let match;
  while ((match = storePattern.exec(content)) !== null) {
    stores.push({
      id: parseInt(match[1]),
      name: match[2],
      address: match[3]
    });
  }

  console.log(`📊 총 ${stores.length}개 매장 발견\n`);

  // 각 매장별 landmark 생성
  const results: Record<number, string> = {};

  for (const store of stores) {
    const landmark = generateLandmarkFromName(store.name, store.address);
    results[store.id] = landmark;

    console.log(`✅ ID ${store.id}: ${store.name}`);
    console.log(`   📍 ${landmark}\n`);
  }

  // JSON 파일로 저장
  const outputPath = path.join(process.cwd(), 'scripts', 'landmarks_auto.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✨ 완료! 결과 저장: ${outputPath}`);
  console.log(`📊 생성된 랜드마크: ${Object.keys(results).length}개\n`);

  // stores.ts 업데이트용 코드 생성
  console.log('━'.repeat(60));
  console.log('📝 stores.ts에 추가할 코드:\n');

  let updatedContent = content;

  for (const [idStr, landmark] of Object.entries(results)) {
    const id = parseInt(idStr);

    // 각 매장 객체에 landmark 추가
    const pattern = new RegExp(
      `(\\{[^}]*id:\\s*${id},[^}]*subRegion:\\s*"[^"]+",)`,
      'g'
    );

    updatedContent = updatedContent.replace(pattern, (match) => {
      // 이미 landmark가 있으면 건너뛰기
      if (match.includes('landmark')) {
        return match;
      }
      // subRegion 뒤에 landmark 추가
      return match + `\n    landmark: "${landmark}",`;
    });
  }

  // 업데이트된 내용을 새 파일로 저장
  const updatedPath = path.join(process.cwd(), 'data', 'stores_with_landmarks.ts');
  fs.writeFileSync(updatedPath, updatedContent, 'utf-8');

  console.log(`\n✅ 업데이트된 파일 생성: data/stores_with_landmarks.ts`);
  console.log('\n💡 다음 단계:');
  console.log('   1. stores_with_landmarks.ts 파일 확인');
  console.log('   2. 내용이 정확하면 stores.ts로 교체:');
  console.log('      mv data/stores_with_landmarks.ts data/stores.ts');
  console.log('   3. 개발 서버 재시작');
  console.log('\n📌 참고: 자동 생성된 랜드마크는 기본값입니다.');
  console.log('   실제 매장 정보로 수동 업데이트를 권장합니다.');
}

main().catch(console.error);
