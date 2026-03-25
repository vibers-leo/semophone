import fs from 'fs';
import path from 'path';

// subRegion 매핑 규칙
const subRegionMapping: Record<number, string> = {
  // 경기 - 기타 (3개)
  1: "기타",     // 광명
  2: "기타",     // 광주
  20: "기타",    // 용인

  // 경기 - 부천 (14개)
  3: "부천",     // 신중동역
  4: "부천",     // 잼존프라자
  5: "부천",     // 북부역
  6: "부천",     // 부천대학교
  7: "부천",     // 도당
  8: "부천",     // 소사역
  9: "부천",     // 상동
  10: "부천",    // 부천중동
  11: "부천",    // 삼산체육관
  12: "부천",    // 신중동
  13: "부천",    // 원미
  14: "부천",    // 중동
  15: "부천",    // 부천역
  16: "부천",    // 부천시청

  // 경기 - 성남/분당 (3개)
  17: "성남/분당", // 분당서현
  18: "성남/분당", // 분당이매
  19: "성남/분당", // 판교역

  // 서울 - 서부 (5개)
  21: "서부",    // 까치산역 (강서)
  26: "서부",    // 목동1단지 (양천)
  27: "서부",    // 목동역 (양천)
  28: "서부",    // 오목교1번 (양천)
  29: "서부",    // 오목교8번 (양천)

  // 서울 - 동부 (4개)
  22: "동부",    // 서울대입구역 (관악)
  23: "동부",    // 신림역 (관악)
  24: "동부",    // 샤로수길 (관악)
  25: "동부",    // 봉천 (관악)

  // 인천 - 남부 (2개)
  30: "남부",    // 간석 (남동)
  31: "남부",    // 주안6동 (미추홀)

  // 인천 - 북부 (3개)
  32: "북부",    // 부평문화 (부평)
  33: "북부",    // 부평삼산 (부평)
  34: "북부",    // 부평남부역 (부평)

  // 인천 - 송도 (5개)
  36: "송도",    // 송도학원가
  37: "송도",    // 송도2공구
  38: "송도",    // 송도풍림아이원
  39: "송도",    // 송도3공구
  40: "송도",    // 송도1공구
};

async function updateStoreRegions() {
  const storesFilePath = path.join(process.cwd(), 'data', 'stores.ts');
  let content = fs.readFileSync(storesFilePath, 'utf-8');

  console.log('🔄 매장 데이터에 subRegion 추가 중...\n');

  // 각 매장 ID에 대해 subRegion 추가
  for (const [idStr, subRegion] of Object.entries(subRegionMapping)) {
    const id = parseInt(idStr);

    // id: X 패턴 찾기
    const idPattern = new RegExp(`(\\{[^}]*id:\\s*${id},[^}]*region:\\s*"[^"]+",)`, 'g');

    content = content.replace(idPattern, (match) => {
      // 이미 subRegion이 있으면 건너뛰기
      if (match.includes('subRegion')) {
        return match;
      }
      // region 뒤에 subRegion 추가
      return match + `\n    subRegion: "${subRegion}",`;
    });

    console.log(`✅ ID ${id}: ${subRegion}`);
  }

  // 파일 저장
  fs.writeFileSync(storesFilePath, content, 'utf-8');

  console.log('\n✨ 완료! stores.ts 파일이 업데이트되었습니다.');
  console.log(`   ${Object.keys(subRegionMapping).length}개 매장에 subRegion 추가됨`);
}

updateStoreRegions().catch(console.error);
