/**
 * Firestore 데이터 마이그레이션 스크립트
 *
 * 사용법:
 * 1. Firebase Console에서 프로젝트를 생성하고 .env.local에 환경변수를 설정하세요
 * 2. npm install -D ts-node 실행
 * 3. npx ts-node scripts/migrateToFirestore.ts 실행
 */

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { stores } from '../data/stores';

// 매장 데이터 마이그레이션
async function migrateStores() {
  console.log('📦 매장 데이터 마이그레이션 시작...');

  for (const store of stores) {
    try {
      await addDoc(collection(db, 'stores'), {
        ...store,
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`  ✅ ${store.name}`);
    } catch (error) {
      console.error(`  ❌ ${store.name} 마이그레이션 실패:`, error);
    }
  }

  console.log(`\n✨ 총 ${stores.length}개 매장 마이그레이션 완료!\n`);
}

// 기본 혜택 데이터 생성
async function createDefaultBenefits() {
  console.log('💎 혜택 데이터 생성 시작...');

  const benefits = [
    {
      icon: '💰',
      title: '지원금 최대로!',
      description: '성지에서만 가능한 최대 지원금',
      order: 1,
      isActive: true
    },
    {
      icon: '🤝',
      title: '단통법 폐지!',
      description: '지원금 제한없는 자유로운 개통',
      order: 2,
      isActive: true
    },
    {
      icon: '⚡',
      title: '즉시 개통',
      description: '30분 내 빠른 개통 완료',
      order: 3,
      isActive: true
    },
    {
      icon: '🛡️',
      title: '365일 사후관리',
      description: '개통 후에도 끝까지 책임',
      order: 4,
      isActive: true
    },
  ];

  for (const benefit of benefits) {
    try {
      await addDoc(collection(db, 'benefits'), {
        ...benefit,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`  ✅ ${benefit.title}`);
    } catch (error) {
      console.error(`  ❌ ${benefit.title} 생성 실패:`, error);
    }
  }

  console.log(`\n✨ 총 ${benefits.length}개 혜택 데이터 생성 완료!\n`);
}

// 메인 실행 함수
(async () => {
  try {
    console.log('\n🚀 Firestore 마이그레이션 시작\n');
    console.log('='.repeat(50));
    console.log('');

    await createDefaultBenefits();
    await migrateStores();

    console.log('='.repeat(50));
    console.log('\n🎉 모든 마이그레이션이 완료되었습니다!\n');
    console.log('다음 단계:');
    console.log('  1. Firebase Console에서 데이터 확인');
    console.log('  2. /admin/login에서 관리자 로그인');
    console.log('  3. /admin/benefits와 /admin/stores에서 데이터 확인\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ 마이그레이션 중 오류 발생:', error);
    console.error('\n확인사항:');
    console.error('  - .env.local 파일에 Firebase 환경변수가 설정되었는지 확인');
    console.error('  - Firebase Console에서 프로젝트가 생성되었는지 확인');
    console.error('  - Firestore Database가 활성화되었는지 확인\n');

    process.exit(1);
  }
})();
