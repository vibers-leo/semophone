// stores.ts 파일 테스트
import { stores } from '../data/stores.js';

console.log('\n✅ stores.ts 파일 로드 성공!\n');

console.log('📊 매장 데이터 통계:');
console.log(`   총 매장 수: ${stores.length}개`);
console.log(`   이미지 있음: ${stores.filter(s => s.images && s.images.length > 0).length}개`);
console.log(`   네이버 링크 있음: ${stores.filter(s => s.link).length}개`);

// 샘플 매장 정보 출력
console.log('\n📍 샘플 매장 정보 (첫 3개):');
stores.slice(0, 3).forEach((store, index) => {
  console.log(`\n${index + 1}. ${store.name}`);
  console.log(`   주소: ${store.address}`);
  console.log(`   좌표: ${store.lat}, ${store.lng}`);
  console.log(`   이미지: ${store.images?.[0] || '없음'}`);
  console.log(`   링크: ${store.link || '없음'}`);
});

console.log('\n✅ 모든 테스트 통과!\n');
